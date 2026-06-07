const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

type SenseTrustAction =
  | 'create_evidence_manifest'
  | 'create_clinical_commit'
  | 'generate_trust_certificate'
  | 'verify_document_hash'
  | 'revoke_certificate'
  | 'append_audit_event'
  | 'verify_token'

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function supabaseRpc<T>(fn: string, body: Record<string, unknown>) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('missing_supabase_service_secrets')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`${fn}_failed: ${await response.text()}`)
  }

  return (await response.json()) as T
}

async function verifyToken(token: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('missing_supabase_service_secrets')
  }

  const tokenResponse = await fetch(
    `${supabaseUrl}/rest/v1/verification_tokens?select=token,status,document_hash,public_payload,expires_at,trust_certificates(status,certificate_number,version_label,issuer,issued_at,expires_at,revoked_at)&token=eq.${encodeURIComponent(token)}&limit=1`,
    {
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  )

  if (!tokenResponse.ok) {
    throw new Error(`verify_token_failed: ${await tokenResponse.text()}`)
  }

  const [row] = await tokenResponse.json()

  await supabaseRpc('append_audit_event', {
    actor: 'public_verify',
    action: 'access',
    resource: `verification_tokens/${token.slice(0, 8)}`,
    reason: row ? 'qr_verification_opened' : 'qr_verification_not_found',
  })

  if (!row) {
    return {
      token,
      status: 'not_found',
      isValid: false,
      patientVisible: false,
    }
  }

  const certificate = Array.isArray(row.trust_certificates)
    ? row.trust_certificates[0]
    : row.trust_certificates
  const isExpired =
    Boolean(row.expires_at && new Date(row.expires_at).getTime() < Date.now()) ||
    Boolean(certificate?.expires_at && new Date(certificate.expires_at).getTime() < Date.now())
  const isValid = row.status === 'active' && certificate?.status === 'active' && !isExpired

  return {
    token,
    status: isExpired ? 'expired' : certificate?.status ?? row.status,
    isValid,
    certificateNumber: certificate?.certificate_number,
    documentHash: row.document_hash,
    versionLabel: certificate?.version_label,
    issuer: certificate?.issuer,
    issuedAt: certificate?.issued_at,
    expiresAt: certificate?.expires_at ?? row.expires_at,
    revokedAt: certificate?.revoked_at,
    patientVisible: false,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  try {
    const body = await req.json()
    const action = String(body.action ?? '') as SenseTrustAction

    switch (action) {
      case 'create_evidence_manifest':
        return jsonResponse(await supabaseRpc('create_evidence_manifest', { p_case_id: body.case_id }))

      case 'create_clinical_commit':
        return jsonResponse(
          await supabaseRpc('create_clinical_commit', {
            case_id: body.case_id,
            parent_commit_id: body.parent_commit_id ?? null,
            reason: body.reason,
            diff_json: body.diff_json ?? {},
          }),
        )

      case 'generate_trust_certificate':
        return jsonResponse(
          await supabaseRpc('generate_trust_certificate', { document_id: body.document_id }),
        )

      case 'verify_document_hash':
        return jsonResponse(
          await supabaseRpc('verify_document_hash', { document_hash: body.document_hash }),
        )

      case 'revoke_certificate':
        return jsonResponse(
          await supabaseRpc('revoke_certificate', {
            certificate_id: body.certificate_id,
            reason: body.reason,
          }),
        )

      case 'append_audit_event':
        return jsonResponse(
          await supabaseRpc('append_audit_event', {
            actor: body.actor,
            action: body.action_name ?? body.audit_action ?? body.action,
            resource: body.resource,
            reason: body.reason ?? null,
          }),
        )

      case 'verify_token':
        return jsonResponse(await verifyToken(String(body.token ?? '')))

      default:
        return jsonResponse({ error: 'unknown_sensetrust_action' }, 400)
    }
  } catch (error) {
    console.error(error)
    return jsonResponse({ error: error instanceof Error ? error.message : 'unknown_error' }, 500)
  }
})

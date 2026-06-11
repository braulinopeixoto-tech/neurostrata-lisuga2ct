export interface VerificationQrPayload {
  token: string
  path: string
  url: string
}

export function buildVerificationPath(token: string) {
  return `/verify/${encodeURIComponent(token)}`
}

export function buildVerificationUrl(token: string, origin = globalThis.location?.origin ?? ''): VerificationQrPayload {
  const path = buildVerificationPath(token)
  return {
    token,
    path,
    url: `${origin}${path}`,
  }
}

export function buildQrCodePayload(token: string, origin?: string) {
  return buildVerificationUrl(token, origin).url
}

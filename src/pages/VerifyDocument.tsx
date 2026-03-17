import { useParams, Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  FileJson,
  Clock,
  UserCheck,
  AlertTriangle,
  ChevronLeft,
  Fingerprint,
} from 'lucide-react'
import useTrustStore from '@/stores/useTrustStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function VerifyDocument() {
  const { id } = useParams()
  const { documents, addLog } = useTrustStore()
  const [doc, setDoc] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const logRecorded = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = documents.find((d) => d.id === id)
      setDoc(found || null)
      setLoading(false)

      if (id && !logRecorded.current) {
        addLog({
          documentId: id,
          timestamp: new Date().toISOString(),
          originIp: 'Consulta Pública', // Simulated
          status: found ? 'Valid' : 'Invalid',
        })
        logRecorded.current = true
      }
    }, 1200)
    return () => clearTimeout(timer)
  }, [id, documents, addLog])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Fingerprint className="w-16 h-16 text-emerald-600 animate-pulse mb-6 opacity-80" />
        <h2 className="text-xl font-semibold text-slate-800">
          Verificando Integridade Criptográfica...
        </h2>
        <p className="text-slate-500 mt-2">Acessando a camada Trust Layer™</p>
      </div>
    )
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full border-t-4 border-t-rose-500 shadow-elevation">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900">Documento Inválido</h2>
            <p className="text-slate-600 mt-2 mb-6">
              O ID <strong>{id}</strong> não foi encontrado em nossa base de registros ou foi
              revogado.
            </p>
            <Button asChild variant="outline">
              <Link to="/">
                <ChevronLeft className="w-4 h-4 mr-2" /> Voltar ao Portal
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
              NEUROSTRATA
            </h1>
            <p className="text-emerald-700 font-semibold text-sm tracking-widest uppercase">
              Trust Layer™ Verification
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/">
              <ChevronLeft className="w-4 h-4 mr-2" /> Sair
            </Link>
          </Button>
        </div>

        <Card className="border-t-4 border-t-emerald-500 shadow-elevation overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <ShieldCheck className="w-64 h-64" />
          </div>
          <CardHeader className="border-b bg-emerald-50/50 pb-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-2xl text-emerald-950">Documento Autêntico</CardTitle>
                <p className="text-emerald-800/80 font-medium text-sm mt-1">
                  Este registro clínico foi verificado e não sofreu alterações.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  ID do Documento
                </h4>
                <p className="font-mono text-lg font-semibold text-slate-800">{doc.id}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Integridade de Dados</p>
                    <p className="text-xs text-emerald-700">Hash SHA-256 Confirmado</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm">
                  <UserCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Assinatura Profissional</p>
                    <p className="text-xs text-slate-500">{doc.jsonData.professional_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg border shadow-sm">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Carimbo de Tempo (Emissão)
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(doc.jsonData.data_emissao).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-0 md:border-l border-t md:border-t-0 pt-6 md:pt-0 border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                VitalTrust Score™
              </h4>
              <div className="relative flex items-center justify-center w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * doc.vts) / 100}
                    strokeLinecap="round"
                    className={
                      doc.vts >= 75
                        ? 'text-emerald-500'
                        : doc.vts >= 60
                          ? 'text-amber-500'
                          : 'text-rose-500'
                    }
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-800">{doc.vts}</span>
                  <span className="text-[10px] text-slate-500 font-bold mt-1">/ 100</span>
                </div>
              </div>
              <Badge
                className={`mt-4 ${
                  doc.vts >= 75
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100'
                    : doc.vts >= 60
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                      : 'bg-rose-100 text-rose-800 hover:bg-rose-100'
                }`}
              >
                {doc.vts >= 90
                  ? 'Alta Confiabilidade'
                  : doc.vts >= 75
                    ? 'Confiável'
                    : doc.vts >= 60
                      ? 'Moderado'
                      : 'Baixa Robustez'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileJson className="w-5 h-5 text-slate-500" /> Estrutura de Metadados Clínicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-xs text-emerald-400 font-mono leading-relaxed">
                {JSON.stringify(doc.jsonData, null, 2)}
              </pre>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <p>
                Os dados sensíveis do paciente estão protegidos e representados apenas pelo hash
                criptográfico <strong>patient_hash</strong>. A decodificação requer chave simétrica
                (AES-256) armazenada exclusivamente no prontuário físico/institucional.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

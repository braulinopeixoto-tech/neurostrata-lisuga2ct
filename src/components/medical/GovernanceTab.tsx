import {
  Scale,
  FileCheck,
  Landmark,
  Lock,
  ShieldCheck,
  Download,
  History,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function GovernanceTab() {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-slate-800 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Lock className="w-5 h-5 text-slate-700" /> Infraestrutura Trust Layer™ (Camada 5)
            </CardTitle>
            <CardDescription>
              A área médica está diretamente vinculada à cadeia de custódia imutável de evidências.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Todos os laudos e decisões clínicas (Núcleo Diagnóstico) assinados por você geram um
              hash criptográfico (SHA-256). Este processo blinda o profissional contra
              questionamentos futuros e garante a aderência às normas de Prontuário Eletrônico (EHR)
              e LGPD.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                Status de Conformidade da Clínica
              </h4>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">Assinaturas Pendentes</span>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  3 Prontuários
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">Sincronização ICP-Brasil</span>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Ativo
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm pt-2">
                <Button
                  asChild
                  variant="link"
                  className="px-0 h-auto text-blue-600 font-bold w-full justify-between"
                >
                  <Link to="/trust-layer">
                    Acessar Ledger de Auditoria <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-indigo-600 h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Scale className="w-5 h-5 text-indigo-600" /> Integração com Portais Externos
            </CardTitle>
            <CardDescription>
              Compartilhamento controlado (Zero-Knowledge) para fins legais e de auditoria.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors flex items-start gap-4">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-700 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Portal do Defensor (Judicial)</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Emita tokens de acesso temporário para magistrados e advogados visualizarem os
                  Laudos de Estratificação Validados, sem expor notas terapêuticas sensíveis.
                </p>
                <Button variant="link" asChild className="px-0 h-auto mt-2 text-indigo-600 text-xs">
                  <Link to="/defensor-portal">Configurar Acessos Judiciais</Link>
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-colors flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-700 shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Portal do Auditor (Planos de Saúde)
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Justifique protocolos complexos (ex: Neuromodulação) fornecendo acesso de leitura
                  aos gráficos do Núcleo Diagnóstico e Score de Confiabilidade.
                </p>
                <Button variant="link" asChild className="px-0 h-auto mt-2 text-blue-600 text-xs">
                  <Link to="/auditor-portal">Gerar Link para Auditoria</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-none text-white shadow-xl">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold flex items-center justify-center sm:justify-start gap-2">
              <History className="w-5 h-5 text-emerald-400" /> Relatório de Conformidade
              Institucional
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Gere um dossiê completo de todas as atividades médicas rastreadas no sistema para fins
              de acreditação (ONA, JCI) ou inspeção do CRM.
            </p>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold shrink-0">
            <Download className="w-4 h-4 mr-2" /> Baixar Dossiê (PDF)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

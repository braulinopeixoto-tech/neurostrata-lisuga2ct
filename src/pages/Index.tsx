import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Lock,
  Stethoscope,
  User,
  Scale,
  ArrowRight,
  Fingerprint,
  Cpu,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { TrustSection } from '@/components/TrustSection'
import { cn } from '@/lib/utils'

export default function Index() {
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const navigate = useNavigate()

  const profiles = [
    {
      id: 'commander',
      title: 'Profissional de Saúde',
      subtitle: 'Commander Mode',
      icon: Stethoscope,
      path: '/dashboard',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      shadow: 'shadow-indigo-500/20',
      protection: 'Responsabilidade Técnica & Ledger Clínico',
      details:
        'Acesso total aos módulos do NeuroModel™, Motor de Convergência DSM e Gestão Macro. Suas ações são assinadas digitalmente e gravadas no Trust Layer™ garantindo a rastreabilidade e autoria inquestionável.',
    },
    {
      id: 'mydata',
      title: 'Paciente',
      subtitle: 'MyData Mode',
      icon: User,
      path: '/patient-portal',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      shadow: 'shadow-emerald-500/20',
      protection: 'LGPD & Soberania de Dados (Neurodireitos)',
      details:
        'Acesso protegido ao seu Biograma Longitudinal e Laudos Validados. Os dados são anonimizados e você possui controle absoluto sobre o compartilhamento seguro (Soberania de Dados).',
    },
    {
      id: 'auditor',
      title: 'Institucional',
      subtitle: 'Auditor & Defensor',
      icon: Scale,
      path: '/auditor-portal',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      shadow: 'shadow-slate-500/20',
      protection: 'Validade Jurídica & Logs Imutáveis',
      details:
        'Acesso de leitura restrito focado em perícia e auditoria. Todas as visualizações são registradas na cadeia de blocos (Trust Layer™) para garantir o compliance e a cadeia de custódia das evidências.',
    },
  ]

  const handleEnter = () => {
    if (selectedProfile) {
      navigate(selectedProfile.path)
    }
  }

  return (
    <div className="space-y-10 animate-fade-in-up pb-16 max-w-6xl mx-auto px-4 mt-8">
      {/* Gateway Global Protection Matrix */}
      <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
          <Fingerprint className="w-96 h-96 -mt-20 -mr-20 text-white" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 uppercase tracking-widest text-[10px] font-bold">
              Gateway de Integridade Ativo
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" /> Matriz de Proteção Global
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            A infraestrutura NeuroStrata opera sob a Trust Layer™. Todos os dados processados pelo
            motor DSM são criptografados e assegurados por uma cadeia de custódia imutável (Ledger
            Clínico).
          </p>
        </div>
        <div className="flex flex-row md:flex-col gap-6 relative z-10 bg-slate-800/50 p-4 rounded-xl border border-slate-700 w-full md:w-auto">
          <div className="flex flex-col items-start md:items-end flex-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
              <Cpu className="w-3 h-3" /> Hashes Validados
            </span>
            <span className="font-mono text-xl text-emerald-400 font-bold">12.481</span>
          </div>
          <div className="hidden md:block w-full h-px bg-slate-700"></div>
          <div className="hidden md:block w-px h-full bg-slate-700 md:hidden"></div>
          <div className="flex flex-col items-start md:items-end flex-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Ledger Status
            </span>
            <span className="text-emerald-400 text-sm font-semibold flex items-center gap-1">
              Cadeia Imutável
            </span>
          </div>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto mb-10 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Selecione seu Perfil de Acesso</h2>
        <p className="text-slate-500 mt-2">
          O sistema ajustará os protocolos de segurança e a interface de acordo com as permissões da
          sua credencial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={cn(
              'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-t-4',
              profile.border,
              profile.shadow,
            )}
            onClick={() => setSelectedProfile(profile)}
          >
            <CardContent className="p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mb-6',
                  profile.bg,
                  profile.color,
                )}
              >
                <profile.icon className="w-8 h-8" />
              </div>
              <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
                {profile.subtitle}
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{profile.title}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1">
                Acesse como {profile.title.toLowerCase()} com fluxos otimizados.
              </p>
              <div className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-primary group">
                Identificar-se{' '}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TrustSection />

      <Dialog open={!!selectedProfile} onOpenChange={(open) => !open && setSelectedProfile(null)}>
        <DialogContent className="max-w-md">
          {selectedProfile && (
            <>
              <DialogHeader>
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center mb-4',
                    selectedProfile.bg,
                    selectedProfile.color,
                  )}
                >
                  <selectedProfile.icon className="w-6 h-6" />
                </div>
                <DialogTitle className="text-2xl">Acesso: {selectedProfile.title}</DialogTitle>
                <DialogDescription className="text-base pt-2">
                  <strong className="text-slate-900 block mb-1">Camada de Proteção Ativa:</strong>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border',
                      selectedProfile.bg,
                      selectedProfile.color,
                      selectedProfile.border,
                    )}
                  >
                    <Lock className="w-3.5 h-3.5" /> {selectedProfile.protection}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 leading-relaxed border border-slate-100 my-2">
                {selectedProfile.details}
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setSelectedProfile(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleEnter}
                  className={cn(
                    'text-white hover:opacity-90',
                    selectedProfile.id === 'commander'
                      ? 'bg-indigo-600'
                      : selectedProfile.id === 'mydata'
                        ? 'bg-emerald-600'
                        : 'bg-slate-800',
                  )}
                >
                  Entrar no Ambiente Seguro <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

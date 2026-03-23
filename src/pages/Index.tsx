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
  BrainCircuit,
  ActivitySquare,
  Target,
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
      title: 'Clinical OS (Profissional)',
      subtitle: 'Acesso Multidimensional',
      icon: BrainCircuit,
      path: '/patients',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      shadow: 'shadow-amber-500/20',
      protection: 'Responsabilidade Técnica & Ledger Clínico',
      details:
        'Acesso completo ao Núcleo Diagnóstico, Jornada Clínica e Intervenções. As decisões são processadas cruzando matrizes RDoC e DSM-5-TR, com assinatura digital gravada na Trust Layer™.',
    },
    {
      id: 'mydata',
      title: 'Portal do Paciente',
      subtitle: 'Evolução Longitudinal',
      icon: User,
      path: '/patient-portal',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      shadow: 'shadow-emerald-500/20',
      protection: 'Soberania de Dados & LGPD',
      details:
        'Acesso protegido ao Biograma Longitudinal Dinâmico e Laudos Validados. Permite a autoavaliação contínua e controle absoluto sobre o compartilhamento das evidências neurofuncionais.',
    },
    {
      id: 'auditor',
      title: 'Acesso Legal / Auditoria',
      subtitle: 'Verificação Criptográfica',
      icon: Scale,
      path: '/auditor-portal',
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      shadow: 'shadow-slate-500/20',
      protection: 'Validade Jurídica (ICP-Brasil)',
      details:
        'Acesso de leitura restrito focado em perícia e auditoria de operadoras. Todas as visualizações são registradas no log imutável para garantir a cadeia de custódia das evidências.',
    },
  ]

  const handleEnter = () => {
    if (selectedProfile) {
      navigate(selectedProfile.path)
    }
  }

  return (
    <div className="space-y-12 animate-fade-in-up pb-16 max-w-6xl mx-auto px-4 mt-8">
      {/* Hero OS Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <Badge
          variant="outline"
          className="uppercase tracking-widest text-[10px] font-bold bg-slate-100 text-slate-600 border-slate-300 mb-2"
        >
          NeuroStrata V2 — Clinical OS
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
          Sistema Operacional da Saúde Mental Baseado em Evidência
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Convergência diagnóstica automatizada, integração multiprofissional e rastreabilidade
          auditável através da Trust Layer™.
        </p>
      </div>

      {/* Gateway Global Protection Matrix */}
      <div className="bg-slate-900 p-8 rounded-3xl border-2 border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-12">
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          <Fingerprint className="w-[500px] h-[500px] -mt-32 -mr-32 text-white" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h2 className="text-2xl font-bold tracking-tight text-white">Trust Layer™ Ativa</h2>
          </div>
          <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
            Toda a infraestrutura opera sob um ledger criptográfico imutável. Nenhum dado clínico
            pode ser processado no <strong className="text-emerald-400">Núcleo Diagnóstico</strong>{' '}
            sem rastreabilidade de autoria e carimbo temporal.
          </p>
        </div>
        <div className="flex flex-row md:flex-col gap-6 relative z-10 bg-slate-800/50 p-5 rounded-2xl border border-slate-700 w-full md:w-auto backdrop-blur-sm">
          <div className="flex flex-col items-start md:items-end flex-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Hashes ICP-Brasil
            </span>
            <span className="font-mono text-2xl text-emerald-400 font-black tracking-tighter">
              12.481
            </span>
          </div>
          <div className="hidden md:block w-full h-px bg-slate-700/50"></div>
          <div className="hidden md:block w-px h-full bg-slate-700/50 md:hidden"></div>
          <div className="flex flex-col items-start md:items-end flex-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Status da Cadeia
            </span>
            <span className="text-emerald-400 text-sm font-bold flex items-center gap-1.5 bg-emerald-400/10 px-2 py-0.5 rounded">
              Validada
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className={cn(
              'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-t-4 bg-white',
              profile.border,
              profile.shadow,
            )}
            onClick={() => setSelectedProfile(profile)}
          >
            <CardContent className="p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-white shadow-inner',
                  profile.bg,
                  profile.color,
                )}
              >
                <profile.icon className="w-8 h-8" />
              </div>
              <Badge
                variant="outline"
                className={cn(
                  'mb-4 text-[10px] tracking-widest uppercase font-bold',
                  profile.color,
                  profile.border,
                )}
              >
                {profile.subtitle}
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{profile.title}</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">
                {profile.id === 'commander'
                  ? 'Acesse o motor de decisão clínica, convergência diagnóstica e gestão de intervenções.'
                  : `Acesse o ambiente seguro focado em ${profile.title.toLowerCase()}.`}
              </p>
              <div className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-800 group bg-slate-50 py-3 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors">
                Identificar-se{' '}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Layer Architecture Preview */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Arquitetura Integrada em 5 Camadas</h2>
          <p className="text-slate-500 mt-2">
            Como o sistema processa a informação desde a coleta até a auditoria.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-stretch justify-center max-w-5xl mx-auto">
          {[
            {
              name: '1. Input Clínico',
              icon: ActivitySquare,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
              border: 'border-blue-200',
            },
            {
              name: '2. Biomarcadores',
              icon: Cpu,
              color: 'text-purple-600',
              bg: 'bg-purple-50',
              border: 'border-purple-200',
            },
            {
              name: '3. Núcleo Diagnóstico',
              icon: BrainCircuit,
              color: 'text-amber-600',
              bg: 'bg-amber-50',
              border: 'border-amber-200',
            },
            {
              name: '4. Intervenções',
              icon: Target,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
              border: 'border-emerald-200',
            },
            {
              name: '5. Trust Layer™',
              icon: ShieldCheck,
              color: 'text-slate-800',
              bg: 'bg-slate-100',
              border: 'border-slate-300',
            },
          ].map((layer, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center text-center relative group">
              <div
                className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center border shadow-sm z-10 transition-transform group-hover:scale-110',
                  layer.bg,
                  layer.color,
                  layer.border,
                )}
              >
                <layer.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs mt-3 text-slate-700">{layer.name}</span>
              {idx < 4 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-full h-px bg-slate-200 -z-0 border-t border-dashed border-slate-300"></div>
              )}
            </div>
          ))}
        </div>
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
              <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 leading-relaxed border border-slate-200 my-2 shadow-inner">
                {selectedProfile.details}
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setSelectedProfile(null)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleEnter}
                  className={cn(
                    'text-white hover:opacity-90 font-bold',
                    selectedProfile.id === 'commander'
                      ? 'bg-amber-600 hover:bg-amber-700'
                      : selectedProfile.id === 'mydata'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-slate-800 hover:bg-slate-900',
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

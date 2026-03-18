import { Link } from 'react-router-dom'
import {
  User,
  Scale,
  Stethoscope,
  Brain,
  Apple,
  MessageSquare,
  FlaskConical,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Network,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrustSection } from '@/components/TrustSection'
import { cn } from '@/lib/utils'

const professionalAreas = [
  { name: 'Área Médica', icon: Stethoscope, path: '/medical' },
  { name: 'Área Neuropsicológica', icon: Brain, path: '/neuropsychology' },
  { name: 'Área Nutrição Funcional', icon: Apple, path: '/nutrition' },
  { name: 'Área Fono', icon: MessageSquare, path: '/speech-therapy' },
  { name: 'Gestão Metabólica', icon: FlaskConical, path: '/gestao-metabolica' },
  { name: 'Área Psicopedagogia', icon: GraduationCap, path: '/psychopedagogy' },
]

const portals = [
  {
    title: 'TeamFlow™',
    desc: 'Ambiência Translacional para líderes médicos, gestão de casos e convergência diagnóstica.',
    icon: Network,
    path: '/teamflow',
    colorClass: 'border-t-indigo-500',
    iconBg: 'bg-indigo-100 text-indigo-600',
    textClass: 'text-indigo-600',
    btnText: 'Acessar Workspace',
  },
  {
    title: 'Portal do Paciente',
    desc: 'Acesso seguro a laudos, autoavaliação e biograma longitudinal.',
    icon: User,
    path: '/patient-portal',
    colorClass: 'border-t-emerald-500',
    iconBg: 'bg-emerald-100 text-emerald-600',
    textClass: 'text-emerald-600',
    btnText: 'Acessar Portal',
  },
  {
    title: 'Portal do Auditor',
    desc: 'Verificação criptográfica e acesso temporário a documentos sensíveis.',
    icon: ShieldCheck,
    path: '/auditor-portal',
    colorClass: 'border-t-amber-500',
    iconBg: 'bg-amber-100 text-amber-600',
    textClass: 'text-amber-600',
    btnText: 'Acessar Portal',
  },
  {
    title: 'Portal do Defensor',
    desc: 'Gestão de defesas jurídicas apoiadas no Biograma Longitudinal.',
    icon: Scale,
    path: '/defensor-portal',
    colorClass: 'border-t-slate-800',
    iconBg: 'bg-slate-100 text-slate-800',
    textClass: 'text-slate-800',
    btnText: 'Acessar Portal',
  },
]

export default function Index() {
  return (
    <div className="space-y-12 animate-fade-in-up pb-16 max-w-6xl mx-auto px-2 sm:px-6">
      <div className="text-center space-y-4 pt-10 pb-2">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide">
          Bem-vindo ao NeuroStrata
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Central de Acesso Integrado
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Plataforma unificada de inteligência neurofuncional. Selecione o seu perfil para acessar o
          ambiente dedicado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portals.map((portal, i) => (
          <Link key={i} to={portal.path} className="block group">
            <Card
              className={cn(
                'h-full border-t-4 hover:shadow-lg transition-all hover:-translate-y-1 bg-white',
                portal.colorClass,
              )}
            >
              <CardHeader>
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform',
                    portal.iconBg,
                  )}
                >
                  <portal.icon className="w-6 h-6" />
                </div>
                <CardTitle>{portal.title}</CardTitle>
                <CardDescription>{portal.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn('flex items-center text-sm font-bold mt-2', portal.textClass)}>
                  {portal.btnText}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm bg-slate-50/50">
        <CardHeader className="text-center sm:text-left">
          <CardTitle className="text-2xl flex flex-col sm:flex-row items-center sm:justify-start gap-3">
            <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
              <Stethoscope className="w-6 h-6" />
            </div>
            Portal Profissional
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Selecione sua área de atuação para acessar ferramentas e protocolos específicos da sua
            especialidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {professionalAreas.map((area, idx) => (
              <Button
                key={idx}
                variant="outline"
                asChild
                className="h-auto py-6 flex flex-col items-center justify-center gap-3 bg-white hover:border-primary hover:bg-primary/5 transition-all group shadow-sm"
              >
                <Link to={area.path}>
                  <area.icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                    {area.name}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <TrustSection />
    </div>
  )
}

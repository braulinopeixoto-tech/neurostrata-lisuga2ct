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
  Landmark,
  HeartPulse,
  Building2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Index() {
  const professionalAreas = [
    { name: 'Área Médica', icon: Stethoscope, path: '/medical' },
    { name: 'Área Neuropsicológica', icon: Brain, path: '/neuropsychology' },
    { name: 'Área Nutrição Funcional', icon: Apple, path: '/nutrition' },
    { name: 'Área Fono', icon: MessageSquare, path: '/speech-therapy' },
    { name: 'Área Farmaco Clínico', icon: FlaskConical, path: '/pharmacopeia' },
    { name: 'Área Psicopedagogo', icon: GraduationCap, path: '/dashboard' },
  ]

  const externalCertifications = [
    { name: 'Ministério Público', icon: Landmark, desc: 'Acesso Legal EHR' },
    { name: 'OAB / Defensoria', icon: Scale, desc: 'Amparo Jurídico' },
    { name: 'Planos de Saúde', icon: HeartPulse, desc: 'Auditoria Clínica' },
    { name: 'Redes Hospitalares', icon: Building2, desc: 'Integração de Dados' },
  ]

  return (
    <div className="space-y-12 animate-fade-in-up pb-16 max-w-6xl mx-auto px-2 sm:px-6">
      {/* Hero Section */}
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

      {/* Main Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/patient-portal" className="block group">
          <Card className="h-full border-t-4 border-t-emerald-500 hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6" />
              </div>
              <CardTitle>Portal do Paciente</CardTitle>
              <CardDescription>
                Acesso seguro a laudos, questionários de autoavaliação e biograma longitudinal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-bold text-emerald-600 mt-2">
                Acessar Portal{' '}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/auditor-portal" className="block group">
          <Card className="h-full border-t-4 border-t-amber-500 hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <CardTitle>Portal do Auditor</CardTitle>
              <CardDescription>
                Verificação criptográfica e acesso temporário a documentos clínicos sensíveis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-bold text-amber-600 mt-2">
                Acessar Portal{' '}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/defensor-portal" className="block group">
          <Card className="h-full border-t-4 border-t-indigo-500 hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <CardTitle>Portal do Defensor</CardTitle>
              <CardDescription>
                Gestão de defesas jurídicas apoiadas em dados neurofuncionais e Biograma
                Longitudinal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm font-bold text-indigo-600 mt-2">
                Acessar Portal{' '}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Professional Portal Branching */}
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

      {/* Trust & Validation Marks */}
      <div className="space-y-8 pt-8 border-t border-border/60">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Certificações e Validações Institucionais
          </h2>
          <p className="text-muted-foreground mt-2">
            Reconhecimento técnico e jurídico da infraestrutura clínica NeuroStrata.
          </p>
        </div>

        {/* External Entities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {externalCertifications.map((cert, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-border/80 shadow-sm hover:border-primary/40 hover:shadow-md transition-all text-center group"
            >
              <cert.icon className="w-10 h-10 text-slate-400 group-hover:text-primary transition-colors mb-3" />
              <span className="font-semibold text-sm text-foreground">{cert.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{cert.desc}</span>
            </div>
          ))}
        </div>

        {/* Proprietary Validations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-transparent rounded-xl border border-blue-100 hover:shadow-md transition-shadow group">
            <div className="bg-white border border-blue-200 p-3 rounded-xl text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-blue-950 text-lg">Biograma Longitudinal</h4>
              <p className="text-sm text-blue-900/80 mt-1.5 leading-relaxed font-medium">
                Metodologia proprietária com rastreabilidade auditável e certificação ICP-Brasil
                para evolução clínica contínua.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 to-transparent rounded-xl border border-emerald-100 hover:shadow-md transition-shadow group">
            <div className="bg-white border border-emerald-200 p-3 rounded-xl text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-lg">Diagnóstico Validado</h4>
              <p className="text-sm text-emerald-900/80 mt-1.5 leading-relaxed font-medium">
                Sistematização neurofuncional robusta, cruzada com matrizes RDoC e DSM para máxima
                precisão técnica e segurança jurídica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

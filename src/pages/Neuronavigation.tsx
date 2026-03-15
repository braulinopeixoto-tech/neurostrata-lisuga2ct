import {
  Compass,
  Search,
  MapPin,
  Tag,
  Dna,
  FileText,
  ExternalLink,
  BrainCircuit,
  BookOpen,
  Layers,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Neuronavigation() {
  return (
    <div className="space-y-6 animate-fade-in-up max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Compass className="w-8 h-8 text-accent" /> Consulta ao Neurosynth
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Meta-análise automatizada de estudos de neuroimagem.
          </p>
        </div>
        <Button variant="outline" className="bg-muted/50" asChild>
          <a href="https://neurosynth.org" target="_blank" rel="noopener noreferrer">
            Acessar Plataforma Oficial <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-500" /> Capacidades de Busca
            </CardTitle>
            <CardDescription>
              A base de dados permite consultas estruturadas cruzando milhares de fMRI e estudos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { label: 'termos', icon: Tag, desc: 'Conceitos psicológicos e cognitivos' },
                { label: 'tópicos', icon: Layers, desc: 'Agrupamentos temáticos de pesquisa' },
                {
                  label: 'localizações cerebrais',
                  icon: MapPin,
                  desc: 'Coordenadas espaciais XYZ (MNI)',
                },
                { label: 'genes', icon: Dna, desc: 'Expressão gênica cortical associada' },
                {
                  label: 'estudos científicos',
                  icon: FileText,
                  desc: 'Artigos e publicações primárias',
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="mt-0.5 bg-blue-100 p-1.5 rounded text-blue-600">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-primary block capitalize">
                      {item.label}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-accent hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-accent" /> Integração NeuroStrata
            </CardTitle>
            <CardDescription>
              Como nossa infraestrutura processa os metadados do Neurosynth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold text-primary bg-muted px-3 py-2 rounded-md">
                A NeuroStrata utiliza o Neurosynth para:
              </h3>
            </div>
            <ul className="space-y-4 relative border-l-2 border-muted ml-3 pl-5">
              {[
                {
                  title: 'decodificação funcional',
                  desc: 'Tradução de achados de neuroimagem (qEEG/fMRI) em domínios cognitivos e comportamentais específicos.',
                },
                {
                  title: 'associação com literatura científica',
                  desc: 'Ancoragem de hipóteses diagnósticas em metanálises de larga escala atualizadas.',
                },
                {
                  title: 'identificação de padrões convergentes',
                  desc: 'Cruzamento de biomarcadores do paciente com redes neurais previamente mapeadas na literatura.',
                },
              ].map((item, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[27px] top-1.5 w-3 h-3 bg-background border-2 border-accent rounded-full" />
                  <span className="font-semibold text-primary block capitalize mb-1">
                    {item.title}
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1 bg-muted/50 px-4 py-2 rounded-full">
          <BookOpen className="w-4 h-4 mr-1" />
          Fonte:
          <a
            href="https://neurosynth.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-medium hover:underline inline-flex items-center ml-1"
          >
            Neurosynth Platform
          </a>
        </p>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Zap, Brain, Activity, Network } from 'lucide-react'

const MODULES = [
  {
    id: 'initial',
    name: 'Módulo de Regulação Inicial',
    objective: 'Estabilização do sistema nervoso e reestruturação basal.',
    theme: { bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
    items: [
      {
        name: 'REAC NPO / NPPO',
        network: 'Global/Autonômico',
        evidence: 'Alta',
        response: '78%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7065907/',
      },
      {
        name: 'tDCS Anódica DLPFC Esquerdo',
        network: 'CEN (Rede Executiva)',
        evidence: 'Alta',
        response: '65%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7065907/',
      },
      {
        name: 'Neurofeedback SMR',
        network: 'Tálamo-Cortical',
        evidence: 'Média',
        response: '60%',
        link: 'https://www.nature.com/articles/nrn.2016.162',
      },
    ],
  },
  {
    id: 'cortical',
    name: 'Módulo de Reorganização Cortical',
    objective: 'Correção de padrões de rede e oscilações aberrantes.',
    theme: { bar: 'bg-accent', badge: 'bg-orange-50 text-accent border-orange-200' },
    items: [
      {
        name: 'tACS (Estimulação AC)',
        network: 'Oscilações de Rede',
        evidence: 'Alta',
        response: '72%',
        link: 'https://www.nature.com/articles/nrn.2016.162',
      },
      {
        name: 'tDCS Focal HD',
        network: 'Rede de Saliência',
        evidence: 'Média',
        response: '68%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3145200/',
      },
      {
        name: 'TMS (Estimulação Magnética)',
        network: 'DMN',
        evidence: 'Muito Alta',
        response: '80%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7065907/',
      },
    ],
  },
  {
    id: 'functional',
    name: 'Módulo de Treinamento Funcional',
    objective: 'Consolidação de plasticidade e fixação de aprendizado.',
    theme: { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    items: [
      {
        name: 'Neurofeedback Específico',
        network: 'Redes-Alvo',
        evidence: 'Alta',
        response: '70%',
        link: 'https://www.nature.com/articles/nrn.2016.162',
      },
      {
        name: 'Tarefas Cognitivas (CC)',
        network: 'CEN',
        evidence: 'Média',
        response: '55%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3145200/',
      },
      {
        name: 'Treinamento ERP',
        network: 'Processamento',
        evidence: 'Média',
        response: '62%',
        link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7065907/',
      },
    ],
  },
]

export function ModularLibraryTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MODULES.map((mod) => (
          <Card key={mod.id} className="shadow-sm hover:shadow-md transition-all">
            <div className={`h-2 w-full ${mod.theme.bar} rounded-t-lg`} />
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">{mod.name}</CardTitle>
              <CardDescription className="font-medium text-primary mt-1">
                Objetivo: {mod.objective}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mod.items.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-white hover:border-accent/30 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm leading-tight pr-2">{item.name}</h4>
                    <Badge
                      variant="outline"
                      className={`text-[10px] whitespace-nowrap ${mod.theme.badge}`}
                    >
                      {item.evidence}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                    <div className="flex flex-col">
                      <span className="uppercase text-[10px] font-bold">Alvo de Rede</span>
                      <span className="truncate text-foreground font-medium">{item.network}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase text-[10px] font-bold">Taxa de Resposta</span>
                      <span className="font-mono text-primary font-medium">{item.response}</span>
                    </div>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline inline-flex items-center gap-1 opacity-80 group-hover:opacity-100"
                  >
                    Evidência Científica <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-t-4 border-t-violet-500 shadow-sm bg-violet-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-800">
            <Network className="w-5 h-5" /> Intervenções Orientadas por Redes Neurais
          </CardTitle>
          <CardDescription>
            Guias diretos de intervenção para as principais disfunções de rede mapeadas.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-rose-500" />
              <h3 className="font-bold text-lg">Hiperatividade DMN</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Default Mode Network excessivamente ativa (ruminação, depressão).
            </p>
            <div className="space-y-2">
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Zap className="w-4 h-4 mr-2 text-accent" /> tACS Alpha (10Hz)
              </Badge>
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Brain className="w-4 h-4 mr-2 text-accent" /> Neurofeedback Alpha
              </Badge>
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Zap className="w-4 h-4 mr-2 text-accent" /> TMS em Córtex Pré-Frontal Medial
              </Badge>
            </div>
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3145200/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-accent mt-4 inline-block underline"
            >
              Ref: Brain Networks/Menon (PMC3145200)
            </a>
          </div>

          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-lg">Hipoatividade Rede Executiva</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Central Executive Network com baixa conectividade (TDAH, disfunção executiva).
            </p>
            <div className="space-y-2">
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Zap className="w-4 h-4 mr-2 text-accent" /> tDCS Anódica left DLPFC
              </Badge>
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Zap className="w-4 h-4 mr-2 text-accent" /> tACS Beta (20-30Hz)
              </Badge>
              <Badge variant="secondary" className="w-full justify-start text-sm py-1.5">
                <Brain className="w-4 h-4 mr-2 text-accent" /> Neurofeedback Beta
              </Badge>
            </div>
            <a
              href="https://www.nature.com/articles/nrn.2016.162"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-accent mt-4 inline-block underline"
            >
              Ref: tACS Cortical Rhythms (Nature)
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

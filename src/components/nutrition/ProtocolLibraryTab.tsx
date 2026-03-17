import { useState } from 'react'
import { Search, Apple, Activity, Flame, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const NUTRITION_PROTOCOLS = [
  {
    id: 'p1',
    name: 'Modulação Intestinal para Ansiedade',
    category: 'Ansiedade',
    strategy: 'Gut Modulation',
    objective: 'Reduzir inflamação sistêmica e melhorar eixo intestino-cérebro.',
    mechanism:
      'Aumento da produção de GABA via microbiota, redução de citocinas inflamatórias no nervo vago.',
    interventions: [
      'Dieta Low-FODMAP adaptada',
      'Probióticos cepas específicas (L. rhamnosus, B. longum)',
      'Ômega-3 2g/dia',
    ],
    biomarkers: ['PCR-us', 'Zonulina fecal'],
    time: '8-12 semanas',
  },
  {
    id: 'p2',
    name: 'Suporte Mitocondrial para Fadiga Mental',
    category: 'Fadiga Mental',
    strategy: 'Mitochondrial Support',
    objective: 'Aumentar a eficiência da produção de ATP neuronal.',
    mechanism: 'Estímulo da biogênese mitocondrial e proteção antioxidante no córtex pré-frontal.',
    interventions: ['CoQ10 100mg a 200mg', 'PQQ 10mg', 'Dieta cetogênica cíclica ou Low-Carb'],
    biomarkers: ['Ácido úrico', 'Homocisteína', 'Insulina de jejum'],
    time: '4-8 semanas',
  },
  {
    id: 'p3',
    name: 'Anti-Neuroinflamação para Depressão',
    category: 'Depressão',
    strategy: 'Anti-inflammatory',
    objective: 'Diminuir via da quinurenina e otimizar triptofano para serotonina.',
    mechanism: 'Redução de ativação microglial e bloqueio da IDO/TDO por fitoquímicos.',
    interventions: ['Cúrcuma 500mg com Piperina', 'Resveratrol', 'Dieta Mediterrânea estrita'],
    biomarkers: ['PCR-us', 'Ferritina', 'Vitamina D'],
    time: '12 semanas',
  },
]

export function ProtocolLibraryTab() {
  const [search, setSearch] = useState('')

  const filtered = NUTRITION_PROTOCOLS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar protocolos nutricionais por condição ou estratégia..."
          className="pl-9 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <Card key={p.id} className="shadow-sm hover:border-green-400 transition-colors">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge
                      variant="outline"
                      className="mb-2 bg-green-50 text-green-700 border-green-200"
                    >
                      {p.category}
                    </Badge>
                    <CardTitle className="text-lg text-primary">{p.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">{p.strategy}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4 text-sm">
                <div>
                  <strong className="text-muted-foreground block text-xs uppercase mb-1">
                    Objetivo
                  </strong>
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" /> {p.objective}
                  </span>
                </div>
                <div>
                  <strong className="text-muted-foreground block text-xs uppercase mb-1">
                    Mecanismo Neurofuncional
                  </strong>
                  <span className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-green-500" /> {p.mechanism}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-muted/20 p-3 rounded-lg border">
                  <div>
                    <strong className="text-muted-foreground block text-xs uppercase mb-1">
                      Intervenções
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      {p.interventions.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-muted-foreground block text-xs uppercase mb-1">
                      Alvos (Biomarcadores)
                    </strong>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      {p.biomarkers.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground font-medium">
                  Tempo estimado de resposta: {p.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

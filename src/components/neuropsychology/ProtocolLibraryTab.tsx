import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Zap, Brain, HeartPulse, Activity } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const PROTOCOLS = [
  {
    category: 'Neuromodulação',
    title: 'tDCS Anódica F3-F4',
    desc: 'Protocolo de estimulação frontal para déficit executivo e controle inibitório.',
    icon: Zap,
  },
  {
    category: 'Neuromodulação',
    title: 'tACS Parietal Alpha',
    desc: 'Modulação de frequência para estabilização de hiperativação da DMN.',
    icon: Zap,
  },
  {
    category: 'Reabilitação Cognitiva',
    title: 'Treino de N-Back Dinâmico',
    desc: 'Expansão de memória operacional e flexibilidade cognitiva.',
    icon: Brain,
  },
  {
    category: 'Reabilitação Cognitiva',
    title: 'Torre de Londres Adaptada',
    desc: 'Planejamento e resolução de problemas executivos.',
    icon: Brain,
  },
  {
    category: 'HRV Training',
    title: 'Coerência Cardíaca 0.1Hz',
    desc: 'Estabilização do tônus vagal e regulação autonômica do estresse.',
    icon: HeartPulse,
  },
  {
    category: 'Biofeedback Training',
    title: 'Treino SMR (Sensorimotor)',
    desc: 'Neurofeedback para hiperatividade motora e atenção seletiva.',
    icon: Activity,
  },
  {
    category: 'Biofeedback Training',
    title: 'Alpha-Theta Crossover',
    desc: 'Redução de ruminação ansiosa e indução a estados de relaxamento profundo.',
    icon: Activity,
  },
]

export function ProtocolLibraryTab() {
  const [filter, setFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const categories = Array.from(new Set(PROTOCOLS.map((p) => p.category)))

  const filtered = PROTOCOLS.filter((p) => {
    const matchCat = filter ? p.category === filter : true
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar protocolos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === null ? 'default' : 'outline'}
            onClick={() => setFilter(null)}
            size="sm"
          >
            Todos
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              onClick={() => setFilter(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => {
            const Icon = p.icon
            return (
              <Card
                key={i}
                className="hover:shadow-md transition-shadow group border-t-4"
                style={{
                  borderTopColor:
                    p.category === 'Neuromodulação'
                      ? '#3b82f6'
                      : p.category === 'Reabilitação Cognitiva'
                        ? '#8b5cf6'
                        : p.category === 'HRV Training'
                          ? '#ef4444'
                          : '#10b981',
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-slate-50">
                      {p.category}
                    </Badge>
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <Button
                    variant="ghost"
                    className="w-full mt-4 justify-start text-primary hover:bg-primary/10"
                  >
                    Ver Instruções Clínicas
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center p-12 bg-white border border-dashed rounded-xl text-muted-foreground">
            Nenhum protocolo encontrado.
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

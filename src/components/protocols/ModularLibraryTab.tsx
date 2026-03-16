import { useState } from 'react'
import { Search, Info, Plus, ChevronRight, Layers } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const MODULES = [
  {
    id: 'm1',
    category: 'Neuromodulação (tDCS/tACS)',
    title: 'Protocolo de Regulação Frontal',
    target: 'Córtex Pré-Frontal Dorsolateral (F3/F4)',
    indication: 'Déficit Executivo, Desregulação Emocional',
    level: 'Avançado',
    duration: '20 min / 2mA',
  },
  {
    id: 'm2',
    category: 'Neuromodulação (tDCS/tACS)',
    title: 'Supressão de Hiperativação Límbica',
    target: 'Córtex Orbitofrontal / Temporal',
    indication: 'Ansiedade Generalizada, Ruminacão',
    level: 'Intermediário',
    duration: '15 min / 1.5mA',
  },
  {
    id: 'm3',
    category: 'Neurofeedback',
    title: 'Treinamento SMR (Ritmo Sensoriomotor)',
    target: 'Córtex Sensoriomotor (C3/C4)',
    indication: 'TDAH, Impulsividade Motora',
    level: 'Básico',
    duration: '30 min',
  },
  {
    id: 'm4',
    category: 'Reabilitação Cognitiva',
    title: 'Treino de Memória de Trabalho (N-Back)',
    target: 'Rede Executiva Central',
    indication: 'Declínio Cognitivo Leve',
    level: 'Básico',
    duration: '45 min',
  },
]

export function ModularLibraryTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(MODULES.map((m) => m.category)))

  const filtered = MODULES.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.indication.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? m.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por protocolo, indicação ou alvo neural..."
            className="pl-9 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            Categorias Clínicas
          </h3>
          <div className="flex flex-col gap-1">
            <Button
              variant={selectedCategory === null ? 'secondary' : 'ghost'}
              className="justify-start"
              onClick={() => setSelectedCategory(null)}
            >
              Todas as Categorias
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                className="justify-start"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid gap-4">
              {filtered.map((mod) => (
                <Card
                  key={mod.id}
                  className="shadow-sm hover:border-primary/40 transition-all group"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="outline" className="mb-2">
                          {mod.category}
                        </Badge>
                        <CardTitle className="text-lg text-primary">{mod.title}</CardTitle>
                      </div>
                      <Badge
                        className={cn(
                          'font-normal',
                          mod.level === 'Avançado'
                            ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200'
                            : mod.level === 'Intermediário'
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200',
                        )}
                      >
                        {mod.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase font-semibold mb-1">
                          Alvo Neural
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Layers className="w-3.5 h-3.5 text-accent" /> {mod.target}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase font-semibold mb-1">
                          Indicação Principal
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 text-blue-500" /> {mod.indication}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-muted/50 mt-2">
                      <span className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded">
                        Duração: {mod.duration}
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Ver Detalhes <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filtered.length === 0 && (
                <div className="text-center p-12 bg-white rounded-xl border border-dashed text-muted-foreground">
                  Nenhum protocolo encontrado para os filtros selecionados.
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

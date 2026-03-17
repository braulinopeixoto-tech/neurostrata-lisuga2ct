import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen } from 'lucide-react'

const INSTRUMENTS = [
  {
    name: 'WAIS-IV',
    area: 'Inteligência / Global',
    desc: 'Escala Wechsler de Inteligência para Adultos.',
  },
  {
    name: 'WISC-IV',
    area: 'Inteligência / Infantil',
    desc: 'Escala Wechsler de Inteligência para Crianças.',
  },
  {
    name: 'BPA',
    area: 'Atenção',
    desc: 'Bateria Psicológica para Avaliação da Atenção (Sustentada, Alternada, Dividida).',
  },
  { name: 'RAVLT', area: 'Memória', desc: 'Teste de Aprendizagem Auditivo-Verbal de Rey.' },
  {
    name: 'FAS / Fluência Verbal',
    area: 'Linguagem / Executiva',
    desc: 'Avaliação de fluência fonêmica e semântica.',
  },
  {
    name: 'Wisconsin (WCST)',
    area: 'Funções Executivas',
    desc: 'Teste de Classificação de Cartas (Flexibilidade Cognitiva).',
  },
  {
    name: 'Stroop Test',
    area: 'Controle Inibitório',
    desc: 'Avaliação de controle inibitório e atenção seletiva.',
  },
  { name: 'DASS-21', area: 'Triagem / Humor', desc: 'Escala de Depressão, Ansiedade e Estresse.' },
]

export function PsychometricLibraryTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6 bg-muted/40 p-4 rounded-xl border">
        <BookOpen className="w-6 h-6 text-primary" />
        <div>
          <h3 className="font-bold text-foreground">Repositório Psicométrico</h3>
          <p className="text-sm text-muted-foreground">
            Catálogo de instrumentos validados e disponíveis para aplicação estruturada.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {INSTRUMENTS.map((inst, i) => (
          <Card key={i} className="hover:border-primary/40 transition-colors shadow-sm">
            <CardHeader className="pb-2">
              <Badge variant="outline" className="w-max mb-2 bg-slate-50">
                {inst.area}
              </Badge>
              <CardTitle className="text-base text-primary">{inst.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed">{inst.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

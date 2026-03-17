import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ClipboardCheck, Save, Paperclip } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

const DOMAINS = [
  'Leitura (Fluência e Compreensão)',
  'Escrita (Ortografia e Produção Textual)',
  'Matemática (Lógica e Cálculo)',
  'Atenção e Memória',
  'Funções Executivas (Planejamento e Flexibilidade)',
]

export function AssessmentTab() {
  const [results, setResults] = useState<Record<string, { status: string; notes: string }>>({})

  const handleSave = () => {
    toast({
      title: 'Avaliação Salva',
      description: 'Registros da biblioteca psicopedagógica atualizados.',
    })
  }

  const handleSelect = (domain: string, status: string) => {
    setResults((prev) => ({ ...prev, [domain]: { ...prev[domain], status } }))
  }

  const handleNotes = (domain: string, notes: string) => {
    setResults((prev) => ({ ...prev, [domain]: { ...prev[domain], notes } }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-indigo-600" /> Biblioteca de Avaliação
            </CardTitle>
            <CardDescription>
              Registre os resultados das avaliações estruturadas para cada domínio de aprendizagem.
            </CardDescription>
          </div>
          <Button variant="outline" className="shrink-0 bg-white">
            <Paperclip className="w-4 h-4 mr-2" /> Anexar Provas/Exames
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {DOMAINS.map((domain) => (
              <div key={domain} className="p-4 border rounded-lg bg-slate-50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-medium text-sm text-slate-800">{domain}</span>
                  <Select
                    value={results[domain]?.status || ''}
                    onValueChange={(v) => handleSelect(domain, v)}
                  >
                    <SelectTrigger className="w-full sm:w-[220px] bg-white h-9 text-xs">
                      <SelectValue placeholder="Classificação do Desempenho..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preservado">Preservado / Adequado</SelectItem>
                      <SelectItem value="leve">Dificuldade Leve</SelectItem>
                      <SelectItem value="moderada">Dificuldade Moderada</SelectItem>
                      <SelectItem value="severa">Dificuldade Severa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Observações descritivas e checklists aplicados..."
                  className="h-20 text-xs bg-white resize-none"
                  value={results[domain]?.notes || ''}
                  onChange={(e) => handleNotes(domain, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="w-4 h-4 mr-2" /> Salvar Avaliação Completa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

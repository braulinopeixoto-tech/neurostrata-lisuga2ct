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
import { ClipboardCheck, Save } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

const ASSESSMENT_AREAS = [
  'Linguagem Expressiva',
  'Linguagem Receptiva',
  'Fluência Verbal',
  'Nomeação',
  'Compreensão Auditiva',
  'Leitura e Escrita',
  'Processamento Auditivo Central',
]

export function AssessmentTab() {
  const [results, setResults] = useState<Record<string, string>>({})

  const handleSave = () => {
    toast({ title: 'Avaliação Salva', description: 'Protocolos de avaliação registrados.' })
  }

  const handleSelect = (area: string, value: string) => {
    setResults((prev) => ({ ...prev, [area]: value }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600" /> Biblioteca de Avaliação
          </CardTitle>
          <CardDescription>
            Registre os resultados das baterias de testes padronizados para cada domínio
            comunicativo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {ASSESSMENT_AREAS.map((area) => (
              <div
                key={area}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-slate-50 gap-3"
              >
                <span className="font-medium text-sm text-slate-800">{area}</span>
                <Select value={results[area] || ''} onValueChange={(v) => handleSelect(area, v)}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white h-8 text-xs">
                    <SelectValue placeholder="Selecione o nível..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adequado">Adequado / Preservado</SelectItem>
                    <SelectItem value="leve">Alteração Leve</SelectItem>
                    <SelectItem value="moderado">Alteração Moderada</SelectItem>
                    <SelectItem value="grave">Alteração Grave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Salvar Resultados da Bateria
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

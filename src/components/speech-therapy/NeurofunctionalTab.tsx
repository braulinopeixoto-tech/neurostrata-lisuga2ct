import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BrainCircuit, Link as LinkIcon } from 'lucide-react'

export function NeurofunctionalTab() {
  const [qeeg, setQeeg] = useState('')
  const [p300, setP300] = useState('')
  const [n400, setN400] = useState('')

  const getCorrelation = () => {
    const correlations = []
    if (n400 === 'alterado') {
      correlations.push(
        'Atraso/Redução no N400: Alteração compatível com dificuldade de processamento linguístico e integração semântica.',
      )
    }
    if (p300 === 'alterado') {
      correlations.push(
        'Atraso no P300: Alteração de latência/amplitude sugere déficit atencional ou de processamento de informações auditivas.',
      )
    }
    if (qeeg === 'fronto-temporal') {
      correlations.push(
        'qEEG (Fronto-Temporal): Hipoativação e lentificação nesta região associada a possíveis quadros de afasia não fluente (Broca).',
      )
    } else if (qeeg === 'assimetria') {
      correlations.push(
        'qEEG (Assimetria): Diferença inter-hemisférica pode impactar prosódia e compreensão pragmática.',
      )
    }

    return correlations
  }

  const correlations = getCorrelation()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-blue-600" /> Integração com qEEG e Potenciais
            Evocados
          </CardTitle>
          <CardDescription>
            Insira os achados neurofuncionais para obter a lógica correlacional automatizada com a
            linguagem.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Padrão qEEG Predominante</label>
              <Select value={qeeg} onValueChange={setQeeg}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Padrão Normativo</SelectItem>
                  <SelectItem value="fronto-temporal">
                    Lentificação Fronto-Temporal (Broca)
                  </SelectItem>
                  <SelectItem value="assimetria">Assimetria Hemisférica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Potencial Evocado: P300 (Atenção)</label>
              <Select value={p300} onValueChange={setP300}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Latência/Amplitude Normais</SelectItem>
                  <SelectItem value="alterado">Atraso de Latência / Baixa Amplitude</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Potencial Evocado: N400 (Linguagem/Semântica)
              </label>
              <Select value={n400} onValueChange={setN400}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Padrão Típico de Reconhecimento</SelectItem>
                  <SelectItem value="alterado">Ausência ou Atraso Severo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-4 border-b border-blue-200 pb-2">
              <LinkIcon className="w-4 h-4" /> Lógica Correlacional (Motor IA)
            </h3>
            {correlations.length > 0 ? (
              <ul className="space-y-3">
                {correlations.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-blue-800 bg-white p-3 rounded shadow-sm border border-blue-100"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-blue-700 italic">
                Insira os marcadores ao lado para visualizar a interpretação neurofuncional
                integrada para a fonoaudiologia.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

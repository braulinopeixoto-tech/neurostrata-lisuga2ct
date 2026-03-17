import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { School, Send, History } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

const ADAPTATIONS = [
  'Tempo Estendido de Prova',
  'Adaptação Curricular',
  'Estratégias de Ensino Diferenciadas',
  'Tutor / Mediador Escolar',
  'Redução de Carga de Leitura',
]

export function SchoolInterfaceTab() {
  const [logMsg, setLogMsg] = useState('')
  const [logs, setLogs] = useState([
    {
      date: '10/09/2023',
      msg: 'Reunião de alinhamento com a coordenação sobre estratégias de leitura.',
    },
  ])

  const handleSend = () => {
    if (!logMsg.trim()) return
    setLogs((prev) => [{ date: new Date().toLocaleDateString('pt-BR'), msg: logMsg }, ...prev])
    setLogMsg('')
    toast({
      title: 'Comunicação Registrada',
      description: 'O log foi salvo no histórico escolar do paciente.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-600" /> Interface Escola-NeuroStrata
          </CardTitle>
          <CardDescription>
            Defina adaptações pedagógicas necessárias e mantenha um canal de comunicação com a
            coordenação escolar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground border-b pb-2">
              Adaptações Pedagógicas Recomendadas
            </h3>
            <div className="bg-slate-50 border rounded-lg p-4 space-y-3">
              {ADAPTATIONS.map((adapt, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Checkbox id={`adapt-${i}`} className="mt-1" />
                  <label
                    htmlFor={`adapt-${i}`}
                    className="text-sm font-medium cursor-pointer leading-tight text-slate-700"
                  >
                    {adapt}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground border-b pb-2">
              Comunicação com a Coordenação Escolar
            </h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Registre reuniões, orientações ou relatórios enviados para a escola..."
                className="min-h-[100px] text-sm bg-white"
                value={logMsg}
                onChange={(e) => setLogMsg(e.target.value)}
              />
              <Button onClick={handleSend} className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Send className="w-4 h-4 mr-2" /> Registrar Log de Comunicação
              </Button>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-3">
                <History className="w-3.5 h-3.5" /> Histórico de Contatos
              </h4>
              <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
                {logs.map((l, i) => (
                  <div key={i} className="bg-white border rounded p-3 text-sm shadow-sm">
                    <span className="text-xs text-indigo-600 font-bold block mb-1">{l.date}</span>
                    <p className="text-slate-600">{l.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

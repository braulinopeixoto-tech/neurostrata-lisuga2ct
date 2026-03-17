import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, FileText } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'
import useAppStore from '@/stores/useAppStore'
import { useEffect } from 'react'

export function TabIdentification() {
  const { data, updateData } = useReportStore()
  const { patients } = useAppStore()

  // Auto-fill basic data if empty, just for demo UX
  useEffect(() => {
    if (!data.patientName && patients.length > 0) {
      updateData({
        patientName: patients[0].name,
        dob: patients[0].dob,
        sex: patients[0].sex,
        education: patients[0].education,
      })
    }
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5 text-primary" /> Dados Pessoais
          </CardTitle>
          <CardDescription>
            Identificação civil e demográfica obrigatória para validação legal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome Completo do Paciente</Label>
            <Input
              value={data.patientName || ''}
              onChange={(e) => updateData({ patientName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Data de Nascimento</Label>
            <Input
              type="date"
              value={data.dob || ''}
              onChange={(e) => updateData({ dob: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Gênero</Label>
            <Input value={data.sex || ''} onChange={(e) => updateData({ sex: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Escolaridade / Profissão</Label>
            <Input
              value={data.education || ''}
              onChange={(e) => updateData({ education: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-primary" /> Histórico Clínico e Motivo
          </CardTitle>
          <CardDescription>
            Fundamentação da necessidade da avaliação neurofuncional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Motivo do Encaminhamento / Queixa Principal</Label>
            <Textarea
              placeholder="Descreva brevemente por que o paciente está sendo avaliado..."
              className="h-24"
              value={data.reason || ''}
              onChange={(e) => updateData({ reason: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Anamnese e Histórico Pregresso</Label>
            <Textarea
              placeholder="Doenças associadas, histórico psiquiátrico familiar, medicações em uso..."
              className="h-32"
              value={data.history || ''}
              onChange={(e) => updateData({ history: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Observação Comportamental</Label>
            <Textarea
              placeholder="Atitude durante a sessão, afeto, cooperação, nível de consciência..."
              className="h-24"
              value={data.behavior || ''}
              onChange={(e) => updateData({ behavior: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

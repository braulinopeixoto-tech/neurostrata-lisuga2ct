import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useReportStore from '@/stores/useReportStore'

export function TabIdentification() {
  const { data, updateData } = useReportStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 1: Identificação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <Label>Paciente</Label>
            <Input
              value={data.patientName}
              onChange={(e) => updateData({ patientName: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Data de Nascimento</Label>
            <Input value={data.dob} onChange={(e) => updateData({ dob: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Idade</Label>
            <Input value={data.age} onChange={(e) => updateData({ age: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Sexo</Label>
            <Input value={data.sex} onChange={(e) => updateData({ sex: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Escolaridade</Label>
            <Input
              value={data.education}
              onChange={(e) => updateData({ education: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Responsável Legal</Label>
            <Input
              value={data.guardian}
              onChange={(e) => updateData({ guardian: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Profissional</Label>
            <Input
              value={data.professional}
              onChange={(e) => updateData({ professional: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Instituição</Label>
            <Input
              value={data.institution}
              onChange={(e) => updateData({ institution: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label>Data da Avaliação</Label>
            <Input
              value={data.evalDate}
              onChange={(e) => updateData({ evalDate: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 2: Motivo da Avaliação</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[80px]"
            value={data.reason}
            onChange={(e) => updateData({ reason: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 3: Histórico Clínico</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.history}
            onChange={(e) => updateData({ history: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 4: Perfil Comportamental</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.behavior}
            onChange={(e) => updateData({ behavior: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}

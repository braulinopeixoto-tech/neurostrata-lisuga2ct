import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Users, FileSignature, CheckCircle2, MessageSquare } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import { toast } from '@/components/ui/use-toast'

export function CollaborationTab() {
  const { patients } = useAppStore()
  const { formulas, updateFormulaStatus, addFormulaNote } = usePharmacyStore()

  const [patientId, setPatientId] = useState('')
  const [role, setRole] = useState('Médico')
  const [note, setNote] = useState('')
  const [activeFormulaId, setActiveFormulaId] = useState('')

  const patientFormulas = formulas.filter((f) => f.patientId === patientId)

  const handleValidate = (id: string) => {
    updateFormulaStatus(id, 'Validada')
    toast({
      title: 'Fórmula Validada',
      description: 'Assinatura médica registrada na conduta.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  const handleAddNote = () => {
    if (!activeFormulaId || !note) return
    addFormulaNote(activeFormulaId, { role, content: note, date: new Date().toISOString() })
    setNote('')
    setActiveFormulaId('')
    toast({
      title: 'Colaboração Registrada',
      description: 'Sua nota foi anexada ao planejamento da fórmula.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm bg-muted/20 border-dashed">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full space-y-2">
            <Label>Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 w-full space-y-2">
            <Label>Simular Visão Profissional</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione seu perfil..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Médico">Médico (Responsável Técnico)</SelectItem>
                <SelectItem value="Neuropsicólogo">Neuropsicólogo</SelectItem>
                <SelectItem value="Nutricionista">Nutricionista</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {patientId && patientFormulas.length === 0 && (
        <div className="text-center p-12 bg-white rounded-xl border text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Nenhuma fórmula pendente ou ativa para este paciente.</p>
        </div>
      )}

      {patientId &&
        patientFormulas.map((formula) => (
          <Card key={formula.id} className="shadow-sm border-l-4 border-l-primary overflow-hidden">
            <CardHeader className="bg-slate-50 border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Fórmula Magistral Personalizada</CardTitle>
                  <CardDescription className="mt-1">Objetivo: {formula.objective}</CardDescription>
                </div>
                <Badge
                  className={
                    formula.status === 'Validada'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }
                >
                  {formula.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-xs uppercase text-muted-foreground mb-1 block">
                    Composição Proposta
                  </Label>
                  <pre className="text-sm font-mono bg-muted/30 p-3 rounded border text-slate-700">
                    {formula.output}
                  </pre>
                </div>

                {role === 'Médico' && formula.status === 'Pendente' && (
                  <Button
                    onClick={() => handleValidate(formula.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    <FileSignature className="w-4 h-4 mr-2" /> Validar e Prescrever
                  </Button>
                )}
              </div>

              <div className="bg-white border rounded-lg flex flex-col h-full">
                <div className="p-3 border-b bg-muted/10 font-semibold text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Notas Interprofissionais
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[150px]">
                  {formula.notes.length === 0 && (
                    <p className="text-xs text-muted-foreground italic text-center">
                      Nenhuma anotação registrada.
                    </p>
                  )}
                  {formula.notes.map((n, i) => (
                    <div key={i} className="bg-slate-50 p-2.5 rounded border text-sm">
                      <span className="text-[10px] font-bold uppercase text-primary mb-1 block">
                        {n.role}
                      </span>
                      <p className="text-slate-700">{n.content}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t bg-muted/10 space-y-2">
                  <Textarea
                    placeholder={`Adicionar observação como ${role}...`}
                    className="h-16 text-sm bg-white"
                    value={activeFormulaId === formula.id ? note : ''}
                    onChange={(e) => {
                      setNote(e.target.value)
                      setActiveFormulaId(formula.id)
                    }}
                  />
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                    onClick={handleAddNote}
                    disabled={!note || activeFormulaId !== formula.id}
                  >
                    Adicionar Nota
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

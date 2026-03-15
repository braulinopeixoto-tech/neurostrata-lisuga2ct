import { useState } from 'react'
import { Printer, FileText, Activity } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'

export function PrescriptionModal({ open, onOpenChange, protocol }: any) {
  const { currentUser, patients } = useAppStore()
  const [patientId, setPatientId] = useState<string>('')
  const [duration, setDuration] = useState('03 meses')
  const [notes, setNotes] = useState(
    'Fórmula magistral livre de corantes e conservantes artificiais.',
  )

  if (!protocol) return null

  const selectedPatient = patients.find((p) => p.id === patientId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white sm:rounded-lg max-h-[90vh] flex flex-col print:overflow-visible">
        <style>{`
          @media print {
            #root { display: none !important; }
            [data-radix-portal] > div:first-child { display: none !important; }
            [role="dialog"] {
              position: static !important;
              transform: none !important;
              width: 100% !important;
              max-width: none !important;
              box-shadow: none !important;
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            @page { size: auto; margin: 15mm; }
          }
        `}</style>

        {/* Formulário de Configuração (Não imprimível) */}
        <div className="p-4 sm:p-6 bg-muted/10 border-b print:hidden flex-shrink-0">
          <DialogHeader className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <DialogTitle className="text-xl text-primary flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" /> Emissão de Receituário
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1 font-normal">
                  Configure os dados do paciente para a prescrição do protocolo.
                </p>
              </div>
              <Button onClick={() => window.print()} className="gap-2 shadow-sm w-full sm:w-auto">
                <Printer className="w-4 h-4" />{' '}
                <span className="hidden sm:inline">Imprimir / PDF</span>
                <span className="sm:hidden">Imprimir</span>
              </Button>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Paciente Alvo</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione um paciente..." />
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
            <div className="space-y-2">
              <Label>Duração do Tratamento</Label>
              <Input
                className="bg-white"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Observações Clínicas (Opcional)</Label>
              <Input
                className="bg-white"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Documento de Receita (Área Imprimível) */}
        <div className="p-8 md:p-12 overflow-y-auto bg-white flex-grow print:p-0 text-black print:text-black">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Cabeçalho */}
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                  <Activity className="w-6 h-6" /> NeuroStrata Clinic
                </h2>
                <div className="mt-2 text-sm leading-relaxed">
                  <p className="font-bold">{currentUser.fullName}</p>
                  <p>
                    {currentUser.role} • {currentUser.registrationId}
                  </p>
                </div>
              </div>
            </div>

            {/* Identificação do Paciente */}
            <div className="pt-2">
              <p className="text-lg font-medium">
                Para:{' '}
                <span className="font-bold border-b border-black/20 pb-0.5">
                  {selectedPatient?.name || '_______________________________________'}
                </span>
              </p>
              <p className="text-sm mt-2 text-gray-600">
                Data de Emissão: {new Date().toLocaleDateString('pt-BR')}
              </p>
            </div>

            {/* Corpo da Receita */}
            <div className="min-h-[300px] space-y-6 pt-6">
              <p className="text-xl font-bold text-center uppercase tracking-widest border-y border-gray-200 py-2">
                Uso Interno
              </p>

              <div className="space-y-4 pl-4 border-l-4 border-gray-300 py-2">
                <h3 className="font-bold text-lg leading-tight text-gray-900">
                  Atenção Farmacêutica: Protocolo {protocol.title}
                </h3>

                <div className="bg-gray-50 p-4 rounded-sm border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                    Composição Magistral
                  </p>
                  <pre className="font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-900 m-0 p-0">
                    {protocol.content}
                  </pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4">
                  <p>
                    <strong className="text-gray-900">Forma Farmacêutica:</strong> <br />
                    {protocol.form}
                  </p>
                  <p>
                    <strong className="text-gray-900">Posologia:</strong> <br />
                    {protocol.posology}
                  </p>
                  {duration && (
                    <p className="sm:col-span-2">
                      <strong className="text-gray-900">Duração:</strong> {duration}
                    </p>
                  )}
                </div>
              </div>

              {notes && (
                <div className="mt-8 pt-4">
                  <p className="text-sm">
                    <strong className="text-gray-900">Observações Clínicas:</strong>
                    <br />
                    {notes}
                  </p>
                </div>
              )}
            </div>

            {/* Rodapé e Assinatura */}
            <div className="pt-24 pb-10 flex flex-col items-center justify-center border-t border-gray-200 mt-12 text-center">
              <div className="w-72 border-b border-black mb-2"></div>
              <p className="font-bold text-gray-900">{currentUser.fullName}</p>
              <p className="text-sm text-gray-600">
                {currentUser.role} - {currentUser.registrationId}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

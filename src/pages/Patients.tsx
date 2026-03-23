import { Link } from 'react-router-dom'
import { Search, Plus, BrainCircuit, ActivitySquare, ShieldCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { AddPatientModal } from '@/components/AddPatientModal'
import { PortalAccessModal } from '@/components/patient/PortalAccessModal'

export default function Patients() {
  const { patients } = useAppStore()

  return (
    <div className="space-y-6 animate-fade-in-up mt-4 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Pacientes e Modelos</h1>
          <p className="text-muted-foreground mt-1 text-base">
            Gestão da base clínica. Selecione um paciente para iniciar a{' '}
            <strong className="text-slate-700">Jornada Diagnóstica</strong>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <PortalAccessModal />
          <AddPatientModal>
            <Button className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Novo Paciente
            </Button>
          </AddPatientModal>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou CPF..."
              className="pl-10 h-10 bg-slate-50 border-slate-200"
            />
          </div>
          <Button variant="outline" className="border-slate-200 text-slate-600">
            Filtros Avançados
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">Identificação</TableHead>
              <TableHead className="font-bold text-slate-700">Última Avaliação</TableHead>
              <TableHead className="font-bold text-slate-700">Status Diagnóstico</TableHead>
              <TableHead className="font-bold text-slate-700">Trust Layer</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Ação Principal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.id}
                className="group cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <TableCell>
                  <div className="font-bold text-slate-900 text-base">{patient.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {patient.sex} • Nasc: {new Date(patient.dob).toLocaleDateString('pt-BR')}
                  </div>
                </TableCell>
                <TableCell className="text-slate-600 font-medium">
                  {new Date(patient.lastAssessment).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={patient.status === 'Ativo' ? 'default' : 'secondary'}
                    className={
                      patient.status === 'Ativo'
                        ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100 font-bold'
                        : 'font-medium'
                    }
                  >
                    {patient.status === 'Ativo' ? 'Em Avaliação' : patient.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 w-max px-2 py-1 rounded border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5" /> Auditado
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      <Link to="/clinical-journey">
                        <ActivitySquare className="w-4 h-4 mr-1.5" /> Jornada
                      </Link>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm font-bold"
                    >
                      <Link to="/diagnostic-core">
                        <BrainCircuit className="w-4 h-4 mr-1.5" /> Núcleo
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

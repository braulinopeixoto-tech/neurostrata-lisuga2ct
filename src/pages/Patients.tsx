import { Link } from 'react-router-dom'
import { Search, Plus, ArrowRight } from 'lucide-react'
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Pacientes</h1>
          <p className="text-muted-foreground mt-1">Gerenciamento de base clínica e históricos.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <PortalAccessModal />
          <AddPatientModal>
            <Button className="flex-1 sm:flex-none">
              <Plus className="w-4 h-4 mr-2" /> Novo Paciente
            </Button>
          </AddPatientModal>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nome ou CPF..." className="pl-9" />
          </div>
          <Button variant="outline">Filtros Avançados</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Nascimento</TableHead>
              <TableHead>Sexo</TableHead>
              <TableHead>Última Avaliação</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} className="group cursor-pointer">
                <TableCell className="font-medium text-primary">{patient.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(patient.dob).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(patient.lastAssessment).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={patient.status === 'Ativo' ? 'default' : 'secondary'}
                    className="font-normal"
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Link to={`/patients/${patient.id}`}>
                      Ver Prontuário <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

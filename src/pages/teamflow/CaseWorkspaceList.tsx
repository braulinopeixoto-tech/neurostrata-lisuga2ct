import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Layers, Plus, ArrowRight, ArrowLeft } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { useState } from 'react'
import { NewNeuroModelModal } from '@/components/neuromodel/NewNeuroModelModal'

export default function CaseWorkspaceList() {
  const { caseWorkspaces } = useTeamFlowStore()
  const { patients } = useAppStore()
  const [newModelOpen, setNewModelOpen] = useState(false)

  const getPatientName = (id: string) => patients.find((p) => p.id === id)?.name || id

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-primary"
        >
          <Link to="/teamflow">
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Command Center
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-500" /> Repositório de NeuroModels
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gestão de todos os modelos dimensionais instanciados.
          </p>
        </div>
        <Button onClick={() => setNewModelOpen(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Novo NeuroModel
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Modelos Ativos e Arquivados</CardTitle>
          <CardDescription>
            Fluxo de trabalho (Pipeline) de todos os pacientes em análise estruturada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Título Investigativo</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Status BIM</TableHead>
                  <TableHead>Integridade</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseWorkspaces.map((cw) => (
                  <TableRow key={cw.id} className="hover:bg-slate-50 cursor-pointer">
                    <TableCell className="font-medium text-indigo-900">{cw.title}</TableCell>
                    <TableCell>{getPatientName(cw.patient_id)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {cw.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-emerald-600 font-semibold">
                        {cw.consistency_score}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Link to={`/teamflow/cases/${cw.id}`}>
                          Acessar Modelo <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <NewNeuroModelModal open={newModelOpen} onOpenChange={setNewModelOpen} />
    </div>
  )
}

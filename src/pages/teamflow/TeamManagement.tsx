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
import { Users, UserPlus, ShieldAlert, ArrowLeft } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { Link } from 'react-router-dom'

export default function TeamManagement() {
  const { teamMembers } = useTeamFlowStore()

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Medical Leader':
        return (
          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-none">
            Líder Médico
          </Badge>
        )
      case 'Clinical Coordinator':
        return <Badge className="bg-blue-100 text-blue-800 border-none">Coordenador</Badge>
      case 'Specialist':
        return <Badge className="bg-emerald-100 text-emerald-800 border-none">Especialista</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

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
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-500" /> Gestão de Equipe
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Controle os perfis de acesso e distribua responsabilidades clínicas no workspace.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="w-4 h-4 mr-2" /> Convidar Membro
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Membros Ativos</CardTitle>
          <CardDescription>
            Visualização da hierarquia e especialidades cadastradas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Papel Funcional</TableHead>
                  <TableHead>Especialidade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell className="text-slate-600">{member.specialty || '--'}</TableCell>
                    <TableCell className="text-right">
                      {member.role !== 'Medical Leader' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        >
                          Remover
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                          <ShieldAlert className="w-3 h-3" /> Intransferível
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

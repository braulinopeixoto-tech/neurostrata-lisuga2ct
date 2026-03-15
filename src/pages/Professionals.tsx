import { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Stethoscope, ShieldAlert } from 'lucide-react'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { ProfessionalModal } from '@/components/ProfessionalModal'

export default function Professionals() {
  const { professionals, deleteProfessional } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProfessional, setEditingProfessional] = useState<any>(null)
  const [professionalToDelete, setProfessionalToDelete] = useState<string | null>(null)

  const filtered = professionals.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = () => {
    if (professionalToDelete) {
      deleteProfessional(professionalToDelete)
      setProfessionalToDelete(null)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-accent" /> Profissionais
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão da equipe clínica e rastreabilidade de autoria do EHR.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Novo Profissional
        </Button>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, registro ou ID..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Sistema</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((prof) => (
              <TableRow key={prof.id} className="group">
                <TableCell className="font-mono text-xs text-muted-foreground">{prof.id}</TableCell>
                <TableCell className="font-medium text-primary">{prof.fullName}</TableCell>
                <TableCell>{prof.registrationId}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {prof.specialty}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="flex flex-col">
                    <span>{prof.email}</span>
                    <span className="text-muted-foreground text-xs">{prof.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingProfessional(prof)}
                    >
                      <Edit2 className="w-4 h-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setProfessionalToDelete(prof.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum profissional encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <ProfessionalModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <ProfessionalModal
        open={!!editingProfessional}
        onOpenChange={(open) => !open && setEditingProfessional(null)}
        professional={editingProfessional}
      />

      <AlertDialog
        open={!!professionalToDelete}
        onOpenChange={(open) => !open && setProfessionalToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" /> Excluir Profissional
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este registro? A ação não afetará os laudos já
              assinados devido à política de retenção do EHR, mas o profissional não poderá realizar
              novas avaliações.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

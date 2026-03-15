import { useState } from 'react'
import { FlaskConical, Plus, Search, Edit2, Trash2, ShieldAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import useAppStore from '@/stores/useAppStore'
import { FormulaModal } from '@/components/FormulaModal'
import { NEURO_AXES } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function Pharmacopeia() {
  const { formulas, professionals, deleteFormula } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFormula, setEditingFormula] = useState<any>(null)
  const [formulaToDelete, setFormulaToDelete] = useState<string | null>(null)

  const filteredFormulas = formulas.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAxis = selectedAxis ? f.axis === selectedAxis : true
    return matchesSearch && matchesAxis
  })

  const handleDelete = () => {
    if (formulaToDelete) {
      deleteFormula(formulaToDelete)
      setFormulaToDelete(null)
    }
  }

  const getProfessionalName = (id: string) => {
    const prof = professionals.find((p) => p.id === id)
    return prof ? prof.fullName : 'Desconhecido'
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-accent" /> Farmacopeia Neurofuncional
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de composições magistrais e intervenções nutricionais por eixos clínicos.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nova Fórmula
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar composição, ativo ou nome..."
            className="pl-9 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full flex-wrap">
          <Button
            variant={selectedAxis === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedAxis(null)}
            className="whitespace-nowrap"
          >
            Todos os Eixos
          </Button>
          {NEURO_AXES.map((axis) => (
            <Button
              key={axis}
              variant={selectedAxis === axis ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedAxis(axis)}
              className="whitespace-nowrap"
            >
              {axis.replace('Eixo ', '')}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFormulas.map((formula) => (
          <Card
            key={formula.id}
            className="group hover:shadow-elevation transition-all duration-300 flex flex-col bg-white border-t-4 border-t-accent"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="font-medium bg-muted/60 text-xs">
                  {formula.axis}
                </Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setEditingFormula(formula)}
                  >
                    <Edit2 className="w-3.5 h-3.5 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-destructive/10"
                    onClick={() => setFormulaToDelete(formula.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{formula.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="bg-muted/30 p-3 rounded-md border border-border/50 h-full">
                <pre className="font-mono text-xs whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {formula.content}
                </pre>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/5 py-3 px-6 text-xs text-muted-foreground flex justify-between items-center">
              <span>Autor: {getProfessionalName(formula.professionalId)}</span>
              <span>{new Date(formula.createdAt).toLocaleDateString('pt-BR')}</span>
            </CardFooter>
          </Card>
        ))}
        {filteredFormulas.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-white rounded-lg border border-dashed">
            <FlaskConical className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhuma fórmula magistral encontrada para os filtros selecionados.</p>
          </div>
        )}
      </div>

      <FormulaModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <FormulaModal
        open={!!editingFormula}
        onOpenChange={(open) => !open && setEditingFormula(null)}
        formula={editingFormula}
      />

      <AlertDialog
        open={!!formulaToDelete}
        onOpenChange={(open) => !open && setFormulaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" /> Excluir Fórmula Magistral
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir permanentemente esta composição da farmacopeia
              neurofuncional? Esta ação não pode ser desfeita.
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

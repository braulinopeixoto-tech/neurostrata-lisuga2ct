import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FlaskConical } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'
import { NEURO_AXES } from '@/lib/mock-data'

const formSchema = z.object({
  title: z.string().min(2, 'O título da fórmula é obrigatório.'),
  axis: z.string().min(1, 'Selecione um eixo neurológico.'),
  professionalId: z.string().min(1, 'Associe a fórmula a um profissional.'),
  content: z.string().min(5, 'A composição magistral é obrigatória.'),
})

type FormValues = z.infer<typeof formSchema>

export function FormulaModal({
  open,
  onOpenChange,
  formula,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  formula?: any
}) {
  const { addFormula, updateFormula, professionals } = useAppStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      axis: '',
      professionalId: '',
      content: '',
    },
  })

  useEffect(() => {
    if (open) {
      if (formula) {
        form.reset(formula)
      } else {
        form.reset({
          title: '',
          axis: '',
          professionalId: '',
          content: '',
        })
      }
    }
  }, [open, formula, form])

  const onSubmit = (data: FormValues) => {
    if (formula) {
      updateFormula(formula.id, data)
    } else {
      addFormula(data)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-accent" />
            {formula ? 'Editar Fórmula Magistral' : 'Nova Fórmula Magistral'}
          </DialogTitle>
          <DialogDescription>
            Defina os componentes e posologia para modulação neurofuncional.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Título da Fórmula</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Modulador Gabaérgico Avançado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="axis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Classificação (Eixo)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o eixo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {NEURO_AXES.map((axis) => (
                          <SelectItem key={axis} value={axis}>
                            {axis}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="professionalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissional Responsável</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o autor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professionals.map((prof) => (
                          <SelectItem key={prof.id} value={prof.id}>
                            {prof.fullName} ({prof.specialty})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Formatação de Fórmulas Magistrais</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ativo A ........... 100mg&#10;Ativo B ........... 50mg&#10;Excipiente q.s.p .. 1 dose"
                      className="font-mono text-sm leading-relaxed min-h-[220px] bg-muted/20 border-accent/20 focus-visible:ring-accent"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Utilize este espaço para formatar a composição exata, dosagens e posologia da
                    intervenção.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Fórmula</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

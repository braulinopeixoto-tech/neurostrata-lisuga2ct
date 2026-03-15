import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'

const formSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  registrationId: z.string().min(2, 'Registro profissional é obrigatório (ex: CRM, CRP)'),
  specialty: z.string().min(2, 'Especialidade é obrigatória'),
  cpf: z.string().min(11, 'CPF inválido'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
})

type FormValues = z.infer<typeof formSchema>

const SPECIALTIES = [
  'Neurologista',
  'Psiquiatra',
  'Psicólogo(a)',
  'Neuropsicólogo(a)',
  'Fonoaudiólogo(a)',
  'Terapeuta Ocupacional',
  'Fisioterapeuta',
  'Outro',
]

export function ProfessionalModal({
  open,
  onOpenChange,
  professional,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  professional?: any
}) {
  const { addProfessional, updateProfessional } = useAppStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      registrationId: '',
      specialty: '',
      cpf: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    if (open) {
      if (professional) {
        form.reset(professional)
      } else {
        form.reset({
          fullName: '',
          registrationId: '',
          specialty: '',
          cpf: '',
          email: '',
          phone: '',
        })
      }
    }
  }, [open, professional, form])

  const onSubmit = (data: FormValues) => {
    if (professional) {
      updateProfessional(professional.id, data)
    } else {
      addProfessional(data)
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{professional ? 'Editar Profissional' : 'Novo Profissional'}</DialogTitle>
          <DialogDescription>
            Insira as informações de identificação e contato clínico do profissional.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="registrationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registro (CRM/CRP)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: CRM 12345-SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SPECIALTIES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
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
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail Corporativo</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@clinica.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Profissional</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

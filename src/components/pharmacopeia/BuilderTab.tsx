import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Search,
  Plus,
  Trash2,
  AlertTriangle,
  FlaskConical,
  Beaker,
  CheckCircle2,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import { toast } from '@/components/ui/use-toast'

const ACTIVES_DB = [
  {
    id: '1',
    name: 'L-Teanina',
    desc: 'Aminoácido relaxante',
    mech: 'Aumenta GABA e Alpha',
    dose: '100-200mg',
    tags: ['ansiedade', 'foco', 'sono'],
  },
  {
    id: '2',
    name: 'Curcumina',
    desc: 'Extrato anti-inflamatório',
    mech: 'Inibe COX-2 / Modula BDNF',
    dose: '250-500mg',
    tags: ['inflamação', 'cognição'],
  },
  {
    id: '3',
    name: '5-HTP',
    desc: 'Precursor de serotonina',
    mech: 'Aumenta síntese de 5-HT',
    dose: '50-100mg',
    tags: ['ansiedade', 'sono'],
  },
  {
    id: '4',
    name: 'Ginkgo Biloba',
    desc: 'Extrato vasoativo',
    mech: 'Aumenta fluxo sanguíneo cerebral',
    dose: '80-120mg',
    tags: ['cognição', 'foco'],
  },
  {
    id: '5',
    name: 'Ashwagandha',
    desc: 'Adaptógeno ayurvédico',
    mech: 'Modula cortisol e receptores GABA',
    dose: '300-600mg',
    tags: ['ansiedade', 'sono'],
  },
  {
    id: '6',
    name: 'Magnésio L-Treonato',
    desc: 'Mineral neuroespecífico',
    mech: 'Aumenta densidade sináptica',
    dose: '300-500mg',
    tags: ['cognição', 'sono'],
  },
  {
    id: '7',
    name: 'Bacopa Monnieri',
    desc: 'Nootrópico natural',
    mech: 'Estimula arborização dendrítica',
    dose: '300mg',
    tags: ['cognição', 'foco'],
  },
]

export function BuilderTab() {
  const { patients } = useAppStore()
  const { addFormula } = usePharmacyStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const [builderPatientId, setBuilderPatientId] = useState('')
  const [selectedActives, setSelectedActives] = useState<
    Array<{ id: string; name: string; dose: string }>
  >([])
  const [objective, setObjective] = useState('')
  const [finalFormula, setFinalFormula] = useState('')

  const tags = Array.from(new Set(ACTIVES_DB.flatMap((a) => a.tags)))

  const filteredLibrary = ACTIVES_DB.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTag = selectedTag ? a.tags.includes(selectedTag) : true
    return matchSearch && matchTag
  })

  const handleAddActive = (active: any) => {
    if (!selectedActives.find((a) => a.id === active.id)) {
      setSelectedActives([
        ...selectedActives,
        { id: active.id, name: active.name, dose: active.dose },
      ])
    }
  }

  const handleRemoveActive = (id: string) => {
    setSelectedActives(selectedActives.filter((a) => a.id !== id))
  }

  const updateDose = (id: string, dose: string) => {
    setSelectedActives(selectedActives.map((a) => (a.id === id ? { ...a, dose } : a)))
  }

  const checkAlerts = () => {
    const ids = selectedActives.map((a) => a.id)
    if (ids.includes('3') && ids.includes('5'))
      return 'Aviso: Associação de 5-HTP e Ashwagandha pode potencializar efeito sedativo. Monitorar.'
    return null
  }

  const handleBuild = () => {
    if (!builderPatientId || selectedActives.length === 0 || !objective) {
      toast({
        title: 'Atenção',
        description: 'Preencha paciente, objetivo e selecione ativos.',
        variant: 'destructive',
      })
      return
    }
    const txt =
      selectedActives.map((a) => `${a.name.padEnd(20, '.')} ${a.dose}`).join('\n') +
      '\nExcipiente q.s.p ..... 1 dose'
    setFinalFormula(txt)

    addFormula({
      id: `NS-FORM-${Date.now()}`,
      patientId: builderPatientId,
      actives: selectedActives,
      objective,
      output: txt,
      status: 'Pendente',
      date: new Date().toISOString(),
      notes: [],
    })

    toast({
      title: 'Fórmula Salva',
      description: 'Disponível para revisão interprofissional.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  const currentAlert = checkAlerts()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" /> Farmacopeia Integrada
          </CardTitle>
          <CardDescription>Selecione os ativos para composição.</CardDescription>
          <div className="pt-2 flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-muted/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTag === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                Todos
              </Badge>
              {tags.map((t) => (
                <Badge
                  key={t}
                  variant={selectedTag === t ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(t)}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-3">
              {filteredLibrary.map((active) => (
                <div
                  key={active.id}
                  className="p-3 border rounded-lg hover:border-primary/50 transition-colors flex justify-between items-start gap-4"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{active.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {active.desc} • <span className="italic">{active.mech}</span>
                    </p>
                    <div className="flex gap-1 mt-2">
                      {active.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleAddActive(active)}
                    className="shrink-0 text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-t-4 border-t-accent flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Beaker className="w-5 h-5 text-accent" /> Masterful Formula Builder
          </CardTitle>
          <CardDescription>Ajuste doses, verifique interações e gere a prescrição.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          <div className="space-y-2">
            <Label>Paciente Alvo</Label>
            <Select value={builderPatientId} onValueChange={setBuilderPatientId}>
              <SelectTrigger>
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

          <div className="bg-muted/20 border rounded-lg p-4 flex-1 overflow-y-auto">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3">
              Ativos Selecionados
            </h4>
            {selectedActives.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                Nenhum ativo adicionado.
              </p>
            )}
            <div className="space-y-2">
              {selectedActives.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-2 bg-white p-2 border rounded shadow-sm"
                >
                  <span className="text-sm font-medium flex-1">{a.name}</span>
                  <Input
                    value={a.dose}
                    onChange={(e) => updateDose(a.id, e.target.value)}
                    className="w-24 h-8 text-xs"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveActive(a.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {currentAlert && (
            <Alert variant="destructive" className="bg-amber-50 border-amber-200 text-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-xs font-medium">{currentAlert}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Objetivo Clínico da Fórmula</Label>
            <Input
              placeholder="Ex: Suporte para neurogênese e foco sustentado..."
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>

          <Button onClick={handleBuild} className="w-full">
            Gerar Fórmula Manipulada
          </Button>

          {finalFormula && (
            <div className="mt-4 p-4 bg-slate-900 rounded-lg text-emerald-400 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
              {finalFormula}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

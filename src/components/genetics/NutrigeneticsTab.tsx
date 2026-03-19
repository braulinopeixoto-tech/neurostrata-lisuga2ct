import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Microscope, ShieldCheck, Plus, CheckCircle2, User, Sparkles } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'
import { SmartClinicalAlerts } from '@/components/medical/SmartClinicalAlerts'

export function NutrigeneticsTab() {
  const { caseWorkspaces, specialtyReports, saveSpecialtyReport } = useTeamFlowStore()
  const { currentUser } = useAppStore()
  const { addAuditLog } = useTrustStore()

  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseWorkspaces[0]?.id || '')
  const [biomarker, setBiomarker] = useState('')
  const [interaction, setInteraction] = useState('')
  const [impact, setImpact] = useState('')

  const selectedCase = caseWorkspaces.find((cw) => cw.id === selectedCaseId)

  const existingReport = useMemo(() => {
    return specialtyReports.find(
      (r) => r.case_id === selectedCaseId && r.specialty === 'Nutrigenética & Metabolômica',
    )
  }, [specialtyReports, selectedCaseId])

  const markers = useMemo(() => {
    if (!existingReport) return []
    return Object.keys(existingReport.structured_data.checklists)
      .filter((k) => existingReport.structured_data.checklists[k])
      .map((k) => {
        const authorMatch = k.match(/\(Ref: (.*?)\)$/)
        const author = authorMatch ? authorMatch[1] : 'Sistema'
        const desc = k.replace(/\(Ref: .*?\)$/, '').trim()
        return { raw: k, desc, author }
      })
  }, [existingReport])

  const handleSuggestInterpretation = () => {
    if (!biomarker) {
      toast({
        title: 'Atenção',
        description: 'Preencha o campo Biomarcador / Gene primeiro.',
        variant: 'destructive',
      })
      return
    }

    let suggestion = ''
    let intr = ''
    if (biomarker.toUpperCase().includes('MTHFR')) {
      intr = 'Redução na conversão de ácido fólico'
      suggestion = 'Suplementar L-Metilfolato ativo.'
    } else if (biomarker.toUpperCase().includes('COMT')) {
      intr = 'Degradação lenta de catecolaminas'
      suggestion = 'Otimizar suporte de magnésio.'
    } else {
      intr = 'Interação neutra'
      suggestion = 'Manter conduta padrão.'
    }

    setInteraction(intr)
    setImpact(suggestion)

    addAuditLog({
      evento: `Interpretação Gerada (${biomarker}) - Metodologia v2.4`,
      profissional: `${currentUser.fullName} (${currentUser.registrationId})`,
      data: new Date().toISOString(),
      origem: 'Biblioteca de Interpretação Metabólica',
      decisao_validada: false,
    })
  }

  const handleAddMarker = () => {
    if (!selectedCaseId || !biomarker || !interaction || !impact) {
      toast({
        title: 'Atenção',
        description: 'Preencha todos os campos do perfil.',
        variant: 'destructive',
      })
      return
    }

    const markerString = `[Marcador: ${biomarker}] ${interaction} -> ${impact} (Ref: ${currentUser.fullName} - ${currentUser.registrationId})`

    const currentChecklists = existingReport ? { ...existingReport.structured_data.checklists } : {}
    currentChecklists[markerString] = true

    saveSpecialtyReport(
      {
        id: existingReport?.id || `SR-NGx-${Date.now()}`,
        case_id: selectedCaseId,
        specialty: 'Nutrigenética & Metabolômica',
        author_id: currentUser.id,
        status: 'Submitted',
        updated_at: new Date().toISOString(),
        structured_data: {
          checklists: currentChecklists,
          scales: existingReport?.structured_data.scales || {},
          evidence_links: existingReport?.structured_data.evidence_links || [],
        },
      },
      currentUser.fullName,
    )

    addAuditLog({
      evento: `Aceite e Inclusão de Perfil Nutrigenético/Metabolômico (${biomarker}) - Metodologia v2.4`,
      profissional: `${currentUser.fullName} (${currentUser.registrationId})`,
      data: new Date().toISOString(),
      origem: 'Módulo de Nutrigenética',
      decisao_validada: true,
    })

    setBiomarker('')
    setInteraction('')
    setImpact('')

    toast({
      title: 'Perfil Metabólico Registrado',
      description: 'Sincronizado com a Trust Layer™ e Painel de Convergência.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-teal-600">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Microscope className="w-5 h-5 text-teal-600" /> Nutrigenética & Metabolômica
          </CardTitle>
          <CardDescription>
            Estruture evidências sobre interações nutriente-gene e perfis de metabólitos sistêmicos
            para otimização do eixo intestino-cérebro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-2">
            <Label>Vincular ao Caso Clínico (Workspace)</Label>
            <Select value={selectedCaseId} onValueChange={setSelectedCaseId}>
              <SelectTrigger className="bg-slate-50">
                <SelectValue placeholder="Selecione o caso..." />
              </SelectTrigger>
              <SelectContent>
                {caseWorkspaces.map((cw) => (
                  <SelectItem key={cw.id} value={cw.id}>
                    {cw.title} (ID: {cw.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCase?.patient_id && <SmartClinicalAlerts patientId={selectedCase.patient_id} />}

          {selectedCaseId && (
            <>
              <div className="bg-muted/30 p-5 rounded-lg border space-y-4">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                  <Plus className="w-4 h-4" /> Nova Evidência Metabólica
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Biomarcador / Gene (ex: MTHFR)</Label>
                    <Input
                      value={biomarker}
                      onChange={(e) => setBiomarker(e.target.value)}
                      className="bg-white"
                      placeholder="Ex: Polimorfismo MTHFR C677T"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Interação Nutricional</Label>
                    <Input
                      value={interaction}
                      onChange={(e) => setInteraction(e.target.value)}
                      className="bg-white"
                      placeholder="Ex: Baixa conversão de ácido fólico"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Sugestão / Conduta</Label>
                    <Input
                      value={impact}
                      onChange={(e) => setImpact(e.target.value)}
                      className="bg-white"
                      placeholder="Ex: Suplementar L-Metilfolato"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-end pt-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={handleSuggestInterpretation}
                    className="text-teal-700 border-teal-200 bg-teal-50 hover:bg-teal-100"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Sugerir Interpretação
                  </Button>
                  <Button
                    onClick={handleAddMarker}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" /> Aceitar e Selar
                  </Button>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Evidência Estruturada</TableHead>
                      <TableHead>Registrado por (Auditoria)</TableHead>
                      <TableHead className="text-right">Status (Trust Layer)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {markers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          Nenhum perfil nutrigenético ou metabolômico registrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      markers.map((m, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium text-slate-800 text-sm">
                            {m.desc}
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="w-3.5 h-3.5" /> {m.author}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              <ShieldCheck className="w-3 h-3 mr-1" /> Validado
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

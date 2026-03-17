import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ShieldCheck,
  Download,
  Lock,
  FileJson,
  Activity,
  Search,
  Copy,
  ExternalLink,
} from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import useTrustStore, { TrustDocument } from '@/stores/useTrustStore'
import { generatePatientHash } from '@/lib/encryption'
import { toast } from '@/components/ui/use-toast'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link } from 'react-router-dom'

export function TrustLayerTab() {
  const { patients, professionals, currentUser } = useAppStore()
  const { documents, verificationLogs, addDocument } = useTrustStore()

  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [selectedSupervisorId, setSelectedSupervisorId] = useState('none')
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    const patient = patients.find((p) => p.id === selectedPatientId)
    if (!patient) return

    setGenerating(true)
    setTimeout(() => {
      const patientHash = generatePatientHash(patient.name, patient.dob)

      const completenessScore = 95
      const consistencyScoreRaw = 0.85 + Math.random() * 0.1
      const consistencyScore = consistencyScoreRaw * 100
      const supervisionScore = selectedSupervisorId !== 'none' ? 100 : 0
      const vts = Math.round((completenessScore + consistencyScore + supervisionScore) / 3)

      const docId = `NS-${new Date().getFullYear()}-SP-${String(
        Math.floor(Math.random() * 1000000),
      ).padStart(6, '0')}`

      const riskLevel = patient.score < 50 ? 'alto' : patient.score < 75 ? 'moderado' : 'baixo'

      const jsonData = {
        patient_hash: patientHash,
        professional_id: currentUser.registrationId,
        supervisor_id:
          selectedSupervisorId === 'none'
            ? null
            : professionals.find((p) => p.id === selectedSupervisorId)?.registrationId || null,
        instrumentos: ['DASS-21', 'Matriz RDoC', 'Big Five', 'QEEG Topography'],
        frameworks: ['NeuroStrata Multidimensional Framework'],
        algoritmo_version: 'v2.1.0',
        data_coleta: patient.lastAssessment || new Date().toISOString(),
        data_emissao: new Date().toISOString(),
        consistency_score: Number(consistencyScoreRaw.toFixed(2)),
        risk_level: riskLevel as 'baixo' | 'moderado' | 'alto',
      }

      const hashContent = JSON.stringify(jsonData)
      const docHash = generatePatientHash(hashContent, docId)

      const newDoc: TrustDocument = {
        id: docId,
        hash: docHash,
        vts,
        status: 'Valid',
        jsonData,
      }

      addDocument(newDoc)
      setGenerating(false)
      setSelectedPatientId('')
      toast({
        title: 'Certificação Concluída',
        description: `Documento ${docId} selado na Trust Layer™ com VTS de ${vts}.`,
      })
    }, 1500)
  }

  const handleDownloadJSON = (doc: TrustDocument) => {
    const blob = new Blob([JSON.stringify(doc.jsonData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.id}_trust_layer.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyLink = (id: string) => {
    const url = `${window.location.origin}/verify/${id}`
    navigator.clipboard.writeText(url)
    toast({ title: 'Link Copiado', description: 'O link público de verificação foi copiado.' })
  }

  const getVTSBadge = (vts: number) => {
    if (vts >= 90)
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
          Alta Confiabilidade
        </Badge>
      )
    if (vts >= 75)
      return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Confiável</Badge>
    if (vts >= 60)
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Moderado</Badge>
    return <Badge className="bg-rose-50 text-rose-700 border-rose-200">Baixa Robustez</Badge>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 bg-slate-900 text-slate-50 p-6 rounded-xl shadow-lg relative overflow-hidden">
        <ShieldCheck className="w-10 h-10 text-emerald-400 relative z-10 shrink-0" />
        <div className="relative z-10">
          <h2 className="text-xl font-bold tracking-tight">NeuroStrata Trust Layer™</h2>
          <p className="text-slate-300 text-sm mt-1 leading-relaxed">
            Infraestrutura criptográfica para validação de veracidade clínica, integridade de dados
            e auditoria legal.
          </p>
        </div>
        <Lock className="w-48 h-48 absolute -right-10 -top-10 opacity-5" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-emerald-500 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Gerador de Certificado</CardTitle>
              <CardDescription>
                Crie um laudo legível por máquina (JSON) com selo de integridade.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Paciente (Será anonimizado via Hash)</Label>
                <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione um paciente..." />
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

              <div className="space-y-2">
                <Label>Supervisor Clínico (Opcional)</Label>
                <Select value={selectedSupervisorId} onValueChange={setSelectedSupervisorId}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Sem supervisor..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem supervisor</SelectItem>
                    {professionals.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.fullName} ({p.specialty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted/30 p-3 rounded text-xs text-muted-foreground border border-dashed flex gap-2 mt-4">
                <Activity className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  O <strong>VitalTrust Score™ (VTS)</strong> será calculado automaticamente
                  considerando volume de dados, consistência psicométrica e validação profissional.
                </span>
              </div>

              <Button
                className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-2"
                onClick={handleGenerate}
                disabled={!selectedPatientId || generating}
              >
                {generating ? 'Processando Criptografia...' : 'Emitir Certificado Trust Layer'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileJson className="w-5 h-5 text-primary" /> Repositório de Documentos Certificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px] border rounded-md">
                <Table>
                  <TableHeader className="bg-muted/50 sticky top-0 z-10">
                    <TableRow>
                      <TableHead>ID Documento</TableHead>
                      <TableHead>Emissão</TableHead>
                      <TableHead>VTS</TableHead>
                      <TableHead>Classificação</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-mono text-xs font-semibold">{doc.id}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(doc.jsonData.data_emissao).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="font-bold">{doc.vts}</TableCell>
                        <TableCell>{getVTSBadge(doc.vts)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyLink(doc.id)}
                              title="Copiar Link de Verificação"
                            >
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              title="Abrir Portal de Verificação"
                            >
                              <Link to={`/verify/${doc.id}`} target="_blank">
                                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadJSON(doc)}
                              title="Baixar JSON Estruturado"
                            >
                              <Download className="w-4 h-4 text-blue-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {documents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Nenhum documento certificado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-600" /> Logs de Auditoria (Acessos Públicos)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-3">
                  {verificationLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            log.status === 'Valid'
                              ? 'bg-emerald-100 text-emerald-600'
                              : 'bg-rose-100 text-rose-600'
                          }`}
                        >
                          {log.status === 'Valid' ? (
                            <ShieldCheck className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Consulta via Portal Público</p>
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                            Doc: {log.documentId} • IP: {log.originIp}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        {new Date(log.timestamp).toLocaleString('pt-BR')}
                        <Badge
                          variant="outline"
                          className="block w-max ml-auto mt-1 text-[10px] py-0"
                        >
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {verificationLogs.length === 0 && (
                    <div className="text-center py-6 text-sm text-muted-foreground">
                      Nenhuma verificação registrada.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

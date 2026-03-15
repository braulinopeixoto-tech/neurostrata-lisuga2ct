import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FileText, Upload, BrainCircuit, Loader2, FileCheck } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function DigitizationTab({ patientId }: { patientId: string }) {
  const { documents, addDocument, updateDocument, patientEvidence, setPatientEvidence } =
    useAppStore()
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const patientDocs = documents.filter((d) => d.patientId === patientId)
  const evidence = patientEvidence[patientId]

  const handleUpload = () => {
    if (!file || !category) {
      toast({
        title: 'Atenção',
        description: 'Selecione um arquivo e uma categoria.',
        variant: 'destructive',
      })
      return
    }

    const docId = Date.now().toString()
    addDocument({
      id: docId,
      patientId,
      name: file.name,
      category,
      date: new Date().toISOString(),
      status: 'processing',
    })

    setFile(null)
    setCategory('')
    setIsUploading(true)

    // Simulate AI processing
    setTimeout(() => {
      updateDocument(docId, { status: 'completed' })
      setIsUploading(false)

      setPatientEvidence(patientId, {
        rdoc: ['Valência Negativa (Ameaça Aguda)', 'Sistemas Cognitivos (Atenção Sustentada)'],
        bigFive: ['Neuroticismo Elevado', 'Conscienciosidade Reduzida'],
        dsm: ['F41.1 Transtorno de Ansiedade Generalizada (DSM-5-TR)'],
        icd: ['6B00 Transtorno de Ansiedade Generalizada (CID-11)'],
        psychicFunctions: ['Atenção (Lábil)', 'Regulação Emocional (Prejudicada)'],
        neuralNetworks: [
          'Rede de Modo Padrão (DMN) Hiperativa',
          'Rede Executiva Central Hipoativa',
        ],
      })

      toast({
        title: 'Processamento Concluído',
        description: 'Agente de IA extraiu evidências clínicas com sucesso.',
      })
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="w-5 h-5" /> Upload e Digitalização
          </CardTitle>
          <CardDescription>
            Envie documentos médicos para extração automática via Agente IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Documento</label>
              <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Receita">Receita</SelectItem>
                  <SelectItem value="Exame Laboratorial">Exame Laboratorial</SelectItem>
                  <SelectItem value="Exame de Imagem">Exame de Imagem</SelectItem>
                  <SelectItem value="EEG">EEG</SelectItem>
                  <SelectItem value="qEEG">qEEG</SelectItem>
                  <SelectItem value="Relatório">Relatório Clínico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !file || !category}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <BrainCircuit className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Processando IA...' : 'Processar Documento'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" /> Documentos Processados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {patientDocs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum documento digitalizado.</p>
            ) : (
              patientDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{doc.name}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] py-0">
                        {doc.category}
                      </Badge>
                      {new Date(doc.date).toLocaleDateString()}
                    </span>
                  </div>
                  {doc.status === 'processing' ? (
                    <Badge variant="secondary" className="animate-pulse flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> IA Analisando
                    </Badge>
                  ) : (
                    <Badge
                      variant="default"
                      className="bg-success text-success-foreground flex items-center gap-1"
                    >
                      <FileCheck className="w-3 h-3" /> Mapeado
                    </Badge>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <BrainCircuit className="w-5 h-5" /> Quadro de Evidências (IA)
            </CardTitle>
            <CardDescription>
              Mapeamento estruturado das entidades clínicas detectadas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!evidence ? (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-center">
                <BrainCircuit className="w-10 h-10 mb-3 opacity-20" />
                <p className="text-sm">
                  Envie um documento para gerar o mapeamento clínico cruzado.
                </p>
              </div>
            ) : (
              <div className="space-y-5 animate-fade-in-up">
                <EvidenceGroup
                  title="Domínios RDoC"
                  items={evidence.rdoc}
                  color="bg-blue-50 text-blue-700 border-blue-200"
                />
                <EvidenceGroup
                  title="Perfil Big Five"
                  items={evidence.bigFive}
                  color="bg-purple-50 text-purple-700 border-purple-200"
                />
                <EvidenceGroup
                  title="Classificação DSM-5-TR"
                  items={evidence.dsm}
                  color="bg-rose-50 text-rose-700 border-rose-200"
                />
                <EvidenceGroup
                  title="Classificação CID-11"
                  items={evidence.icd}
                  color="bg-orange-50 text-orange-700 border-orange-200"
                />
                <EvidenceGroup
                  title="18 Funções Psíquicas"
                  items={evidence.psychicFunctions}
                  color="bg-green-50 text-green-700 border-green-200"
                />
                <EvidenceGroup
                  title="Redes Neuronais"
                  items={evidence.neuralNetworks}
                  color="bg-slate-100 text-slate-700 border-slate-300"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EvidenceGroup({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <Badge key={idx} variant="outline" className={`font-normal ${color}`}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  )
}

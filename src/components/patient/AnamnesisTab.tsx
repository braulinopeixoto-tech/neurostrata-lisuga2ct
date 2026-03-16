import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Save, AlertCircle } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function AnamnesisTab({ patient }: { patient: any }) {
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    toast({
      title: 'Anamnese salva',
      description: 'As anotações foram registradas com sucesso.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Anamnese e Histórico Clínico</CardTitle>
          <CardDescription>
            Registre as queixas principais, histórico familiar e evolução do quadro atual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Digite as observações da consulta aqui..."
              className="min-h-[300px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" /> As informações são confidenciais e protegidas.
              </div>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" /> Salvar Alterações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

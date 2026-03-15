import { BookOpen, Zap, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MOCK_PROTOCOLS } from '@/lib/mock-data'

export default function Protocols() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-accent" /> Biblioteca de Protocolos
        </h1>
        <p className="text-muted-foreground mt-1">
          Evidências científicas e parâmetros para intervenção neuromodulatória.
        </p>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar protocolo por nome, área do cérebro..."
          className="max-w-md bg-white shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROTOCOLS.map((protocol) => (
          <Card
            key={protocol.id}
            className="group hover:shadow-elevation transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
          >
            <div className="h-2 w-full bg-gradient-to-r from-accent to-violet-500" />
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-muted text-xs font-normal">
                  {protocol.category}
                </Badge>
                <Zap className="w-4 h-4 text-accent" />
              </div>
              <CardTitle className="text-lg leading-tight">{protocol.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase font-semibold">Alvo</span>
                <span className="font-medium">{protocol.target}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase font-semibold">
                  Parâmetros Padrão
                </span>
                <span className="font-mono bg-muted/50 p-1 rounded mt-1">{protocol.params}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs uppercase font-semibold">
                  Nível de Evidência
                </span>
                <span className="text-success font-medium">{protocol.evidence}</span>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/10 p-4">
              <Button
                variant="ghost"
                className="w-full justify-between group-hover:text-accent transition-colors"
              >
                Ver Detalhes Clínicos <ExternalLink className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

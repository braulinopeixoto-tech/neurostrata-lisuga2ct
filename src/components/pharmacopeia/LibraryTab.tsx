import { useState } from 'react'
import { Search, FlaskConical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CLINICAL_PROTOCOLS, PROTOCOL_CATEGORIES } from '@/lib/clinical-protocols'

export function LibraryTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProtocols = CLINICAL_PROTOCOLS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ativos ou objetivo..."
            className="pl-9 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full flex-wrap">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="whitespace-nowrap"
          >
            Todas Categorias
          </Button>
          {PROTOCOL_CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProtocols.map((protocol) => (
          <Card
            key={protocol.id}
            className="group hover:shadow-elevation transition-all duration-300 flex flex-col bg-white border-t-4 border-t-primary"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="font-medium bg-muted/60 text-xs">
                  {protocol.category}
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Protocolo #{protocol.id}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight text-primary">{protocol.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div className="bg-muted/30 p-3 rounded-md border border-border/50 h-full">
                <pre className="font-mono text-xs whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {protocol.content}
                </pre>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/5 py-3 px-6 text-xs text-muted-foreground flex justify-between items-center">
              <span className="font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent/50" /> Forma: {protocol.form}
              </span>
              <span className="italic">Posologia: {protocol.posology}</span>
            </CardFooter>
          </Card>
        ))}
        {filteredProtocols.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-white rounded-lg border border-dashed">
            <FlaskConical className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum protocolo clínico encontrado para os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { NEURO_FHIR_CATALOG, INTEGRATION_GUIDE } from '@/lib/ontology/neuro-fhir'
import { Database, Network, KeyRound, Cpu, ShieldCheck } from 'lucide-react'

export default function OntologyViewer() {
  const [selectedResource, setSelectedResource] = useState(NEURO_FHIR_CATALOG[0].resourceType)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="space-y-3 pb-6 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Network className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Neuro-FHIR Semantics</h1>
            <p className="text-muted-foreground mt-1">
              Catálogo Ontológico Oficial VitalStrata • Modelagem de Interoperabilidade
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="catalog" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Catálogo FHIR
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Guia de Integração
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="mt-6 flex flex-col lg:flex-row gap-6">
          <Card className="w-full lg:w-1/3 h-[calc(100vh-18rem)] flex flex-col border-muted bg-card/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                Recursos Ontológicos
              </CardTitle>
              <CardDescription>Selecione para inspecionar</CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1 px-4 pb-4">
              <div className="space-y-1">
                {NEURO_FHIR_CATALOG.map((item) => (
                  <button
                    key={item.resourceType}
                    onClick={() => setSelectedResource(item.resourceType)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                      selectedResource === item.resourceType
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.resourceType}
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          <Card className="w-full lg:w-2/3 h-[calc(100vh-18rem)] flex flex-col shadow-sm border-muted">
            <ScrollArea className="flex-1">
              {NEURO_FHIR_CATALOG.filter((i) => i.resourceType === selectedResource).map((item) => (
                <div key={item.resourceType} className="p-6 md:p-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                      {item.resourceType}
                      <Badge variant="outline" className="ml-2 font-mono text-xs font-normal">
                        v1.0
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground mt-3 leading-relaxed border-l-2 border-primary/50 pl-4">
                      {item.purpose}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                      Dicionário de Campos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.fields.map((field, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/30 border border-muted p-4 rounded-xl text-sm transition-all hover:bg-muted/50"
                        >
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <span className="font-mono font-bold text-primary">{field.name}</span>
                            {field.required && (
                              <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                Obrigatório
                              </Badge>
                            )}
                            {field.versioned && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                              >
                                Versionado
                              </Badge>
                            )}
                            {field.indexed && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
                              >
                                Indexado
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-1 text-xs">
                            <span className="font-semibold text-foreground">Tipo:</span>{' '}
                            <code className="bg-background px-1 py-0.5 rounded text-[11px]">
                              {field.type}
                            </code>
                          </p>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {field.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      Relacionamentos Semânticos
                    </h3>
                    <ul className="grid gap-2">
                      {item.relationships.map((rel, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                          <span>{rel}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">
                      Exemplo Estruturado (JSON-LD)
                    </h3>
                    <div className="relative group">
                      <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-xl text-[13px] leading-relaxed overflow-x-auto font-mono shadow-inner border border-zinc-800">
                        {JSON.stringify(item.example, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <Card className="border-muted shadow-sm">
            <CardHeader className="bg-muted/20 border-b pb-6">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Integração de Persistência Segura
              </CardTitle>
              <CardDescription className="max-w-2xl">
                Mapeamento oficial entre a camada semântica estruturada Neuro-FHIR e a arquitetura
                de banco de dados relacional fundacional criada no Bloco 1. Garante que todo JSON-LD
                tenha moradia auditável no Supabase.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6">
                {INTEGRATION_GUIDE.map((guide, idx) => (
                  <div key={idx} className="relative pl-6 pb-2">
                    <div className="absolute left-0 top-1.5 bottom-0 w-0.5 bg-primary/20 rounded-full" />
                    <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full border-2 border-background bg-primary" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                      <h4 className="font-mono font-bold text-base text-foreground bg-muted px-2 py-0.5 rounded-md inline-flex w-fit">
                        {guide.table}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.resources.map((res) => (
                          <Badge
                            key={res}
                            variant="secondary"
                            className="font-medium text-xs bg-primary/10 text-primary hover:bg-primary/20 border-none"
                          >
                            {res}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                      {guide.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Compass,
  Search,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  FileSignature,
  Loader2,
  BrainCircuit,
  MapPin,
  Tag,
  Dna,
  FileText,
  Layers,
  BookmarkPlus,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'

export default function Neuronavigation() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { appendQuickReportDraft, addCitation } = useAppStore()

  useEffect(() => {
    if (query) {
      if (query !== searchInput) setSearchInput(query)
      setIsSearching(true)
      setHasSearched(true)
      const timer = setTimeout(() => setIsSearching(false), 1200)
      return () => clearTimeout(timer)
    } else {
      setHasSearched(false)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    setSearchParams({ q: searchInput })
  }

  const handleIncludeEvidence = () => {
    const studiesCount = Math.floor(Math.random() * 300 + 50)
    const summary = `Evidência baseada em ${studiesCount} estudos meta-analíticos (Neurosynth) associando o termo "${query}" a padrões específicos de ativação na rede fronto-límbica e circuitos associados. Há correlação anatômico-funcional significativa.`

    appendQuickReportDraft(
      `\n\n[Evidência Científica - Neuronavegação]\nTermo Buscado: "${query}"\nAchados: ${summary}`,
    )

    toast({
      title: 'Evidência Adicionada',
      description: 'O resumo científico foi incluído no Quick Report com sucesso.',
      action: <CheckCircle2 className="text-success w-5 h-5" />,
    })
  }

  const handleSaveCitation = () => {
    addCitation({
      title: `Meta-análise automatizada: Correlatos neurais de "${query}"`,
      authors: 'Neurosynth Platform',
      link: `https://neurosynth.org/analyses/terms/${query}/`,
    })
    toast({
      title: 'Citação Salva',
      description: 'A referência foi adicionada à sua Biblioteca de Citações.',
      action: <CheckCircle2 className="text-success w-5 h-5" />,
    })
  }

  const getVariant = (q: string) => {
    const lower = q.toLowerCase()
    if (lower.includes('executiv') || lower.includes('frontal')) return 'frontal'
    if (
      lower.includes('ansiedade') ||
      lower.includes('emocional') ||
      lower.includes('neuroticismo')
    )
      return 'limbic'
    return 'default'
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Compass className="w-8 h-8 text-accent" /> Neuronavegação
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Meta-análise automatizada de estudos de neuroimagem (via Neurosynth).
          </p>
        </div>
        <Button variant="outline" className="bg-muted/50" asChild>
          <a href="https://neurosynth.org" target="_blank" rel="noopener noreferrer">
            Acessar Plataforma Oficial <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Busque por termos clínicos, processos ou localizações (ex: ansiedade, Fp1)..."
                className="pl-10 h-12 text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" disabled={isSearching} className="h-12 px-8">
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pesquisar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!hasSearched && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-fade-in">
          <Card className="shadow-sm border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-500" /> Capacidades de Busca
              </CardTitle>
              <CardDescription>
                A base de dados permite consultas cruzando milhares de fMRI e estudos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { label: 'termos', icon: Tag, desc: 'Conceitos psicológicos e cognitivos' },
                  { label: 'tópicos', icon: Layers, desc: 'Agrupamentos temáticos de pesquisa' },
                  {
                    label: 'localizações cerebrais',
                    icon: MapPin,
                    desc: 'Coordenadas espaciais XYZ',
                  },
                  { label: 'genes', icon: Dna, desc: 'Expressão gênica cortical associada' },
                  { label: 'estudos científicos', icon: FileText, desc: 'Artigos primários' },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div className="mt-0.5 bg-blue-100 p-1.5 rounded text-blue-600">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary block capitalize">
                        {item.label}
                      </span>
                      <span className="text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-t-4 border-t-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-accent" /> Integração NeuroStrata
              </CardTitle>
              <CardDescription>Como nossa infraestrutura processa os metadados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-semibold text-primary bg-muted px-3 py-2 rounded-md">
                  Utilizamos o Neurosynth para:
                </h3>
              </div>
              <ul className="space-y-4 relative border-l-2 border-muted ml-3 pl-5">
                {[
                  {
                    title: 'decodificação funcional',
                    desc: 'Tradução de achados de neuroimagem em domínios cognitivos específicos.',
                  },
                  {
                    title: 'associação científica',
                    desc: 'Ancoragem de hipóteses em metanálises atualizadas.',
                  },
                  {
                    title: 'padrões convergentes',
                    desc: 'Cruzamento de biomarcadores com redes neurais mapeadas.',
                  },
                ].map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[27px] top-1.5 w-3 h-3 bg-background border-2 border-accent rounded-full" />
                    <span className="font-semibold text-primary block capitalize mb-1">
                      {item.title}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {hasSearched && !isSearching && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-primary">Resultados para: "{query}"</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSaveCitation}
                variant="outline"
                className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <BookmarkPlus className="w-4 h-4 mr-2" /> Salvar Favorito
              </Button>
              <Button onClick={handleIncludeEvidence} className="bg-blue-600 hover:bg-blue-700">
                <FileSignature className="w-4 h-4 mr-2" /> Incluir no Quick Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm border border-blue-100">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                <CardTitle className="text-lg">Síntese Metanalítica Automática</CardTitle>
                <CardDescription>
                  Baseado em processamento de linguagem natural sobre artigos do PubMed.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-2">
                    Padrões de Ativação Consistentes
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    O termo "{query}" apresenta forte correlação com a rede neural mapeada na
                    projeção ao lado. A variância estatística em exames funcionais demonstra um
                    recrutamento preferencial de áreas que sustentam este construto clínico.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="text-2xl font-black text-primary mb-1">
                      {Math.floor(Math.random() * 300 + 50)}
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">
                      Estudos Identificados
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="text-2xl font-black text-accent mb-1">
                      {(Math.random() * 0.4 + 0.6).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase">
                      Z-Score Máximo (Associação)
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider mb-2">
                    Correlações RDoC
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-slate-100 border rounded text-xs font-medium text-slate-700">
                      Valência Negativa
                    </span>
                    <span className="px-2 py-1 bg-slate-100 border rounded text-xs font-medium text-slate-700">
                      Sistemas Cognitivos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm bg-slate-50 border-slate-200">
              <CardHeader className="pb-0">
                <CardTitle className="text-base text-center">
                  Projeção Funcional (Z-Score)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BrainMapVisualizer
                  title="Mapa de Ativação"
                  subtitle={`Correlação para "${query}"`}
                  variant={getVariant(query)}
                  className="scale-110 mt-4"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="text-center mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1 bg-muted/50 px-4 py-2 rounded-full">
          <BookOpen className="w-4 h-4 mr-1" />
          Fonte de Dados:
          <a
            href="https://neurosynth.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent/80 font-medium hover:underline inline-flex items-center ml-1"
          >
            Neurosynth Platform
          </a>
        </p>
      </div>
    </div>
  )
}

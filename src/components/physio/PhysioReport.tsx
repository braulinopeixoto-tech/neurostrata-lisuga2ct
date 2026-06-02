import { Patient } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileSignature, Download, Printer } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function PhysioReport({ patient }: { patient: Patient }) {
  const currentDate = new Date().toLocaleDateString('pt-BR')

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row justify-between items-center py-4">
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <FileSignature className="w-5 h-5 text-indigo-600" />
          Laudo Pericial Funcional Automatizado
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-white">
            <Printer className="w-4 h-4 mr-2" /> Imprimir
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="w-4 h-4 mr-2" /> PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px] w-full bg-[#f8fafc] p-8">
          <div className="max-w-[210mm] mx-auto bg-white p-12 shadow-sm border border-slate-200 min-h-full">
            {/* Cabecalho Laudo */}
            <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center">
              <h1 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-widest">
                BioStrata Clininal OS
              </h1>
              <p className="text-sm font-serif text-slate-500 mt-2">
                DEPARTAMENTO DE PERÍCIA CINESIOLÓGICO-FUNCIONAL
              </p>
            </div>

            <div className="space-y-6 font-serif text-slate-800 leading-relaxed">
              <h2 className="text-lg font-bold text-center underline mb-6">
                LAUDO PERICIAL FISIOTERAPÊUTICO
              </h2>

              <section>
                <h3 className="font-bold text-sm uppercase mb-2">1. Identificação</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Paciente:</strong> {patient.name}
                  </p>
                  <p>
                    <strong>Prontuário:</strong> {patient.id}
                  </p>
                  <p>
                    <strong>Data da Avaliação:</strong> {currentDate}
                  </p>
                  <p>
                    <strong>ID Avaliação:</strong> #F-8893-X
                  </p>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-sm uppercase mb-2 mt-6">
                  2. Objeto e Exigência Laboral
                </h3>
                <p className="text-sm text-justify">
                  Avaliação da capacidade funcional com vistas à determinação de (in)capacidade para
                  o trabalho habitual. A exigência laboral relatada e analisada envolve trabalho de
                  média/alta intensidade com necessidade de permanência em ortostatismo prolongado e
                  manuseio de cargas ocasionais de até 15kg.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-sm uppercase mb-2 mt-6">
                  3. Métricas e Índices (BioStrata Functional Score)
                </h3>
                <table className="w-full text-sm border-collapse mb-4 mt-2">
                  <thead>
                    <tr className="bg-slate-100 border-y border-slate-300">
                      <th className="py-2 px-4 text-left">Instrumento / Métrica</th>
                      <th className="py-2 px-4 text-center">Tipo</th>
                      <th className="py-2 px-4 text-center">Score Obtido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-4">WHODAS 2.0 (Relato de Incapacidade)</td>
                      <td className="py-2 px-4 text-center">PROM</td>
                      <td className="py-2 px-4 text-center font-mono">45 / 100</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-4">Timed Up and Go (TUG)</td>
                      <td className="py-2 px-4 text-center">OBS</td>
                      <td className="py-2 px-4 text-center font-mono">82 / 100</td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-4">Dinamometria Lombar/Preensão</td>
                      <td className="py-2 px-4 text-center">OBS</td>
                      <td className="py-2 px-4 text-center font-mono">78 / 100</td>
                    </tr>
                    <tr className="bg-indigo-50 border-b-2 border-indigo-200 font-bold">
                      <td className="py-2 px-4">BFS-P (BioStrata Functional Score)</td>
                      <td className="py-2 px-4 text-center">Composto</td>
                      <td className="py-2 px-4 text-center font-mono text-indigo-700">68 / 100</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h3 className="font-bold text-sm uppercase mb-2 mt-6">
                  4. Análise de Consistência
                </h3>
                <div className="p-4 border border-slate-300 bg-slate-50 text-sm italic text-justify">
                  O algoritmo de verificação cruzada BioStrata detectou uma divergência clínica
                  moderada a alta (+37pts) entre a severidade dos sintomas relatados subjetivamente
                  pelo periciado e a preservação do desempenho motor global auferido em testes
                  observacionais padronizados. Tal achado sugere possível amplificação de sintomas,
                  reduzindo parcialmente a confiabilidade do autorrelato isolado.
                </div>
              </section>

              <section>
                <h3 className="font-bold text-sm uppercase mb-2 mt-6">
                  5. Conclusão Ocupacional-Funcional
                </h3>
                <p className="text-sm text-justify font-bold uppercase">
                  PARECER: INAPTO TEMPORÁRIO PARA A FUNÇÃO ESPECÍFICA.
                </p>
                <p className="text-sm text-justify mt-2">
                  Apesar da preservação do desempenho motor em atividades de curta duração, as
                  demandas específicas de carga e permanência revelam risco ergonômico elevado e
                  limitação residual. Sugere-se reabilitação por 60 dias antes de nova reavaliação.
                  Capaz para funções de natureza puramente administrativa ou sedentária (capacidade
                  residual preservada).
                </p>
              </section>

              <div className="pt-16 pb-8 text-center w-full">
                <div className="w-64 border-t border-slate-800 mx-auto mt-12 mb-2"></div>
                <p className="text-sm font-bold uppercase">Perito Fisioterapeuta Responsável</p>
                <p className="text-xs text-slate-500 mt-1">
                  Gerado eletronicamente e assinado via Trust Layer™
                </p>
                <p className="text-xs text-slate-400 font-mono mt-1">Hash: a8f9e...c42</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

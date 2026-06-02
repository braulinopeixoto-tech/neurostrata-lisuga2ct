import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShieldCheck, Database, Link as LinkIcon } from 'lucide-react'

export default function VitalStrataInspector() {
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const tables = [
        'vs_subjects',
        'vs_encounters',
        'vs_clinical_events',
        'vs_raw_observations',
        'vs_derived_observations',
        'vs_provenance_logs',
      ]
      const results: any = {}
      for (const table of tables) {
        // Ignorando erro de tipagem pois as tabelas recem criadas nao constam no arquivo auto-gerado types.ts
        const { data: rows } = await (supabase as any)
          .from(table)
          .select('*')
          .limit(3)
          .order('created_at', { ascending: false })
        results[table] = rows || []
      }
      setData(results)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-8 bg-slate-900 text-white p-6 rounded-xl shadow-lg">
        <ShieldCheck className="w-10 h-10 text-emerald-400" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VitalStrata™ Trust Layer Inspector</h1>
          <p className="text-slate-400 mt-1">
            Visão técnica do Ledger Imutável e Encadeamento de Hashes em Backend.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(data).map(([tableName, rows]: [string, any]) => (
            <Card
              key={tableName}
              className="border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              <CardHeader className="bg-slate-50 py-3 border-b">
                <CardTitle className="text-sm font-mono flex items-center gap-2 text-slate-700">
                  <Database className="w-4 h-4 text-slate-400" /> {tableName}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 bg-white flex-1">
                <ScrollArea className="h-[280px] p-4">
                  {rows.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">
                      Nenhum registro encontrado nesta tabela.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {rows.map((row: any) => (
                        <div
                          key={row.id}
                          className="text-xs font-mono bg-slate-50 p-3 rounded-md border border-slate-100 shadow-sm"
                        >
                          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-2 bg-emerald-50 px-2 py-1 rounded inline-flex">
                            <LinkIcon className="w-3 h-3" /> Hash:{' '}
                            {row.current_hash?.substring(0, 16)}...
                          </div>
                          <pre className="whitespace-pre-wrap break-all text-slate-600 leading-relaxed overflow-x-auto">
                            {JSON.stringify(
                              {
                                id: row.id,
                                version: row.version_number,
                                created_at: row.created_at,
                                payload: row.payload,
                              },
                              null,
                              2,
                            )}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

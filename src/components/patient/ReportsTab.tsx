import { Link } from 'react-router-dom'
import { FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ReportsTab() {
  return (
    <div className="animate-fade-in space-y-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-4 bg-card border rounded-lg hover:border-accent transition-colors"
        >
          <div className="flex items-center gap-3">
            <FileText className="text-muted-foreground w-5 h-5" />
            <div>
              <h4 className="font-medium text-sm">Laudo Multidimensional Automatizado v{item}</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="w-3 h-3" /> 1{item}/10/2023 • Assinado digitalmente
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/report/r${item}`}>Visualizar / Exportar</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}

import { Brain, Activity, Droplets, Network } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CLINICAL_REFERENCE } from '@/lib/clinical-protocols'

export function ReferenceTab() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <Card className="shadow-sm border-t-4 border-t-accent">
        <CardHeader>
          <CardTitle className="text-xl">Centro de Educação Continuada</CardTitle>
          <CardDescription>
            Resumos clínicos sobre vias metabólicas, neuromodulação nutricional e eixos biológicos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="neuroinflammation" className="border rounded-lg px-4 bg-muted/10">
              <AccordionTrigger className="hover:no-underline font-semibold text-primary">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-destructive" /> Impacto da Neuroinflamação
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {CLINICAL_REFERENCE.neuroinflammation}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bdnf" className="border rounded-lg px-4 bg-muted/10">
              <AccordionTrigger className="hover:no-underline font-semibold text-primary">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-accent" /> BDNF (Fator Neurotrófico)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {CLINICAL_REFERENCE.bdnf}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gut-brain" className="border rounded-lg px-4 bg-muted/10">
              <AccordionTrigger className="hover:no-underline font-semibold text-primary">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-success" /> Eixo Intestino-Cérebro
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                {CLINICAL_REFERENCE.gutBrain}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" /> Relação Neurotransmissor vs. Suplemento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[200px] font-semibold text-primary">
                    Neurotransmissor Alvo
                  </TableHead>
                  <TableHead className="font-semibold text-primary">
                    Precursores / Moduladores Principais
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CLINICAL_REFERENCE.neurotransmitters.map((item, i) => (
                  <TableRow key={i} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{item.target}</TableCell>
                    <TableCell className="text-muted-foreground">{item.supplements}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

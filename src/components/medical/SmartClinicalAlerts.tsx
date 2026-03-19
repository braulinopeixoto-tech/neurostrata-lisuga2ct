import { useEffect, useRef } from 'react'
import { AlertTriangle, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import useAppStore from '@/stores/useAppStore'
import useTrustStore from '@/stores/useTrustStore'

export function SmartClinicalAlerts({ patientId }: { patientId: string }) {
  const { patients, currentUser } = useAppStore()
  const { addAuditLog } = useTrustStore()
  const patient = patients.find((p) => p.id === patientId)

  const loggedAlerts = useRef<Set<string>>(new Set())

  if (!patient || !patient.activePrescriptions || !patient.geneticMarkers) return null

  const alerts = []

  const hasCYP2C19Ultra = patient.geneticMarkers.some(
    (m) => m.gene === 'CYP2C19' && m.phenotype.includes('Ultrarrápido'),
  )
  const hasEscitalopram = patient.activePrescriptions.some((p) => p.medication === 'Escitalopram')

  if (hasCYP2C19Ultra && hasEscitalopram) {
    alerts.push({
      id: 'cyp2c19-escitalopram',
      type: 'Ajuste Sugerido de Dose',
      level: 'warning',
      message:
        'O paciente é metabolizador ultrarrápido para CYP2C19 e está em uso de Escitalopram. Há risco de falha terapêutica. Considere ajuste de dose ou mudança para alternativa (ex: Sertralina).',
    })
  }

  const hasHLAB = patient.geneticMarkers.some(
    (m) => m.gene === 'HLA-B*1502' && m.phenotype.includes('Positivo'),
  )
  const hasCarbamazepina = patient.activePrescriptions.some((p) => p.medication === 'Carbamazepina')

  if (hasHLAB && hasCarbamazepina) {
    alerts.push({
      id: 'hlab-carbamazepina',
      type: 'Risco de Reação Adversa',
      level: 'danger',
      message:
        'Marcador HLA-B*1502 positivo com uso de Carbamazepina. Alto risco de Síndrome de Stevens-Johnson. Descontinuação fortemente recomendada.',
    })
  }

  useEffect(() => {
    alerts.forEach((alert) => {
      const alertKey = `${patientId}-${alert.id}`
      if (!loggedAlerts.current.has(alertKey)) {
        loggedAlerts.current.add(alertKey)
        addAuditLog({
          evento: `Alerta Automático Exibido: ${alert.type} - Metodologia v2.4`,
          profissional: `${currentUser.fullName} (${currentUser.registrationId})`,
          data: new Date().toISOString(),
          origem: 'Motor de Recomendação Clínica',
          decisao_validada: false,
        })
      }
    })
  }, [alerts, patientId, currentUser, addAuditLog])

  if (alerts.length === 0) return null

  return (
    <div className="space-y-3 animate-fade-in-down mb-6">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.level === 'danger' ? 'destructive' : 'default'}
          className={
            alert.level === 'warning'
              ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
              : 'shadow-sm'
          }
        >
          {alert.level === 'danger' ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-600" />
          )}
          <AlertTitle className="font-bold flex items-center gap-2">
            Recomendação Clínica (IA): {alert.type}
          </AlertTitle>
          <AlertDescription className="mt-1 text-sm leading-relaxed">
            {alert.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

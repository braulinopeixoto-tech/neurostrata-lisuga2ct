import useAppStore from '@/stores/useAppStore'
import { DynamicBiograma } from './DynamicBiograma'

interface PatientBiogramChartProps {
  patientId?: string
  data?: any[]
}

export function PatientBiogramChart({ patientId, data }: PatientBiogramChartProps) {
  const { patientBiogram } = useAppStore()
  const biogramData = data || (patientId ? patientBiogram[patientId] || [] : [])

  return <DynamicBiograma data={biogramData} />
}

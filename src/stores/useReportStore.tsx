import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ReportData {
  isSigned: boolean
  signature?: any
  patientName?: string
  dob?: string
  age?: string
  sex?: string
  education?: string
  guardian?: string
  professional?: string
  institution?: string
  evalDate?: string
  reason?: string
  history?: string
  behavior?: string
  cognitive?: string
  rdoc?: string
  bigFive?: string
  psychicFunc?: string
  neurophysio?: string
  integration?: string
  hypotheses?: string
  intervention?: string
  idxIntegrity: number
  idxImpairment: number
  idxRisk: number
  idxDysfunction: number
  radarData?: any[]
  conclusion?: string
}

interface ReportStore {
  data: ReportData
  updateData: (partial: Partial<ReportData>) => void
}

const ReportStoreContext = createContext<ReportStore | undefined>(undefined)

export function ReportStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ReportData>({
    isSigned: false,
    idxIntegrity: 0,
    idxImpairment: 0,
    idxRisk: 0,
    idxDysfunction: 0,
  })

  const updateData = (partial: Partial<ReportData>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  return (
    <ReportStoreContext.Provider value={{ data, updateData }}>
      {children}
    </ReportStoreContext.Provider>
  )
}

export default function useReportStore() {
  const context = useContext(ReportStoreContext)
  if (!context) {
    throw new Error('useReportStore must be used within a ReportStoreProvider')
  }
  return context
}

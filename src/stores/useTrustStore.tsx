import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

export interface TrustDocumentJSON {
  patient_hash: string
  professional_id: string
  supervisor_id: string | null
  instrumentos: string[]
  frameworks: string[]
  algoritmo_version: string
  data_coleta: string
  data_emissao: string
  consistency_score: number
  risk_level: 'baixo' | 'moderado' | 'alto'
}

export interface TrustDocument {
  id: string
  hash: string
  vts: number
  status: 'Valid' | 'Revoked'
  jsonData: TrustDocumentJSON
}

export interface VerificationLog {
  id: string
  documentId: string
  timestamp: string
  originIp: string
  status: 'Valid' | 'Invalid'
}

interface TrustState {
  documents: TrustDocument[]
  verificationLogs: VerificationLog[]
  addDocument: (doc: TrustDocument) => void
  addLog: (log: Omit<VerificationLog, 'id'>) => void
}

const TrustStateContext = createContext<TrustState | undefined>(undefined)

export function TrustStoreProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<TrustDocument[]>([
    {
      id: 'NS-2026-SP-000142',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      vts: 92,
      status: 'Valid',
      jsonData: {
        patient_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
        professional_id: 'CRM 12345-SP',
        supervisor_id: 'CRP 06/54321',
        instrumentos: ['WAIS-IV', 'DASS-21', 'BPA'],
        frameworks: ['RDoC', 'Big Five'],
        algoritmo_version: 'v2.1.0',
        data_coleta: new Date(Date.now() - 86400000).toISOString(),
        data_emissao: new Date().toISOString(),
        consistency_score: 0.88,
        risk_level: 'baixo',
      },
    },
  ])

  const [verificationLogs, setVerificationLogs] = useState<VerificationLog[]>([
    {
      id: 'log-001',
      documentId: 'NS-2026-SP-000142',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      originIp: '187.45.22.11',
      status: 'Valid',
    },
  ])

  const addDocument = useCallback((doc: TrustDocument) => {
    setDocuments((prev) => [doc, ...prev])
  }, [])

  const addLog = useCallback((log: Omit<VerificationLog, 'id'>) => {
    setVerificationLogs((prev) => [{ ...log, id: `log-${Date.now()}` }, ...prev])
  }, [])

  return (
    <TrustStateContext.Provider value={{ documents, verificationLogs, addDocument, addLog }}>
      {children}
    </TrustStateContext.Provider>
  )
}

export default function useTrustStore() {
  const context = useContext(TrustStateContext)
  if (!context) throw new Error('useTrustStore must be used within TrustStoreProvider')
  return context
}

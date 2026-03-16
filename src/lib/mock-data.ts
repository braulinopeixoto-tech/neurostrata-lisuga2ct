export const MOCK_PATIENTS = [
  {
    id: 'NS-001',
    name: 'João Silva',
    dob: '1985-04-12',
    sex: 'Masculino',
    status: 'Ativo',
    lastAssessment: '2023-10-15',
    score: 65,
    education: 'Superior Completo',
    auditLogs: [],
  },
  {
    id: 'NS-002',
    name: 'Maria Oliveira',
    dob: '1992-08-23',
    sex: 'Feminino',
    status: 'Em Tratamento',
    lastAssessment: '2023-10-10',
    score: 72,
    education: 'Pós-Graduação',
    auditLogs: [],
  },
  {
    id: 'NS-003',
    name: 'Carlos Souza',
    dob: '1978-11-05',
    sex: 'Masculino',
    status: 'Atenção',
    lastAssessment: '2023-09-28',
    score: 45,
    education: 'Ensino Médio',
    auditLogs: [],
  },
]

export const MOCK_PROFESSIONALS = [
  {
    id: 'NS-P001',
    fullName: 'Dr. Renato Alves',
    registrationId: 'CRM 12345-SP',
    specialty: 'Neurologista',
    email: 'renato@neurostrata.app',
    phone: '(11) 99999-9999',
  },
]

export const MOCK_FORMULAS = [
  {
    id: 'NS-F001',
    name: 'Fórmula Base Nootrópica',
    createdAt: '2023-01-10',
  },
]

export const RDOC_DOMAINS = [
  { id: 'nv', name: 'Valência Negativa' },
  { id: 'pv', name: 'Valência Positiva' },
  { id: 'cs', name: 'Sistemas Cognitivos' },
  { id: 'sp', name: 'Processos Sociais' },
  { id: 'ar', name: 'Excitação/Regulação' },
]

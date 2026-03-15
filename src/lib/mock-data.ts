export const MOCK_PATIENTS = [
  {
    id: '1',
    name: 'Ana Silva Oliveira',
    dob: '1985-04-12',
    sex: 'F',
    education: 'Ensino Superior Completo',
    familyContext: 'Casada, 2 filhos',
    medicalHistory: 'Hipotireoidismo controlado',
    neuroHistory: 'Episódio depressivo prévio (2018)',
    lastAssessment: '2023-10-15',
    status: 'Ativo',
    score: 82,
    auditLogs: [
      {
        id: 'a1',
        date: '2023-10-15T14:30:00Z',
        action: 'Registro Inicial e Anamnese',
        user: 'Dr. Renato Alves',
      },
      {
        id: 'a2',
        date: '2023-10-15T15:45:00Z',
        action: 'Avaliação Multidimensional (NSI)',
        user: 'Motor NeuroStrata',
      },
    ],
  },
  {
    id: '2',
    name: 'Carlos Eduardo Santos',
    dob: '1972-11-03',
    sex: 'M',
    education: 'Pós-graduação',
    familyContext: 'Divorciado',
    medicalHistory: 'Hipertensão',
    neuroHistory: 'TDAH diagnosticado na infância',
    lastAssessment: '2023-10-10',
    status: 'Em Tratamento',
    score: 65,
    auditLogs: [
      {
        id: 'b1',
        date: '2023-10-10T09:15:00Z',
        action: 'Registro Inicial',
        user: 'Dra. Silva Marques',
      },
    ],
  },
  {
    id: '3',
    name: 'Mariana Costa',
    dob: '1990-08-25',
    sex: 'F',
    education: 'Ensino Médio',
    familyContext: 'Solteira',
    medicalHistory: 'Nenhum',
    neuroHistory: 'Ansiedade Generalizada',
    lastAssessment: '2023-09-28',
    status: 'Alta',
    score: 91,
    auditLogs: [],
  },
]

export const MOCK_PROTOCOLS = [
  {
    id: 'p1',
    title: 'Estimulação Transcraniana (tDCS)',
    category: 'Neuromodulação',
    evidence: 'Alta',
    target: 'Córtex Pré-Frontal',
    params: '2mA, 20min',
  },
  {
    id: 'p2',
    title: 'Neurofeedback Alpha/Theta',
    category: 'Condicionamento',
    evidence: 'Média',
    target: 'Lobo Parietal',
    params: '30 sessões',
  },
  {
    id: 'p3',
    title: 'Estimulação REAC',
    category: 'Neuromodulação',
    evidence: 'Alta',
    target: 'Sistêmico',
    params: 'Protocolo NPR',
  },
]

export const MOCK_PROFESSIONALS = [
  {
    id: 'NS-P001',
    fullName: 'Dr. Renato Alves',
    registrationId: 'CRM 12345-SP',
    specialty: 'Neurologista',
    cpf: '123.456.789-00',
    email: 'renato.alves@neurostrata.com',
    phone: '(11) 98765-4321',
  },
  {
    id: 'NS-P002',
    fullName: 'Dra. Silva Marques',
    registrationId: 'CRP 06/98765',
    specialty: 'Neuropsicólogo(a)',
    cpf: '987.654.321-00',
    email: 'silva.marques@neurostrata.com',
    phone: '(11) 91234-5678',
  },
  {
    id: 'NS-P003',
    fullName: 'Dr. Carlos Eduardo',
    registrationId: 'CRM 54321-RJ',
    specialty: 'Psiquiatra',
    cpf: '456.789.123-00',
    email: 'carlos.eduardo@neurostrata.com',
    phone: '(21) 99876-5432',
  },
]

export const PSYCHIC_FUNCTIONS_CATEGORIZED = [
  {
    category: 'Cognitivo',
    color: 'bg-blue-500',
    items: [
      'Atenção',
      'Memória',
      'Linguagem',
      'Pensamento',
      'Orientação Temporal',
      'Orientação Espacial',
    ],
  },
  {
    category: 'Afetivo',
    color: 'bg-rose-500',
    items: ['Regulação Emocional', 'Motivação', 'Expressividade Afetiva', 'Anedonia'],
  },
  {
    category: 'Social',
    color: 'bg-green-500',
    items: ['Empatia', 'Reciprocidade Social', 'Leitura Social', 'Adaptação Interpessoal'],
  },
  {
    category: 'Executivo',
    color: 'bg-purple-500',
    items: ['Planejamento', 'Flexibilidade Cognitiva', 'Inibição', 'Tomada de Decisão'],
  },
]

export const RDOC_DOMAINS = [
  {
    id: 'nv',
    name: 'Valência Negativa',
    desc: 'Sistemas que respondem primariamente a situações aversivas ou ameaças.',
  },
  {
    id: 'pv',
    name: 'Valência Positiva',
    desc: 'Sistemas que respondem a contextos motivacionais positivos.',
  },
  {
    id: 'cs',
    name: 'Sistemas Cognitivos',
    desc: 'Processos como atenção, percepção, memória de trabalho e controle.',
  },
  {
    id: 'sp',
    name: 'Processos Sociais',
    desc: 'Mediação de respostas interpessoais, comunicação, percepção de si.',
  },
  {
    id: 'ar',
    name: 'Excitação e Regulação',
    desc: 'Manutenção do nível de ativação cerebral e regulação de ritmos.',
  },
]

export const BIG_FIVE_DOMAINS = [
  {
    id: 'n',
    name: 'Neuroticismo',
    desc: 'Tendência a experienciar emoções negativas como ansiedade e vulnerabilidade.',
  },
  {
    id: 'e',
    name: 'Extroversão',
    desc: 'Nível de energia, sociabilidade e engajamento com o mundo externo.',
  },
  {
    id: 'o',
    name: 'Abertura à Experiência',
    desc: 'Curiosidade intelectual, imaginação e preferência por novidades.',
  },
  {
    id: 'a',
    name: 'Amabilidade',
    desc: 'Tendência à cooperação, empatia e confiança nas relações interpessoais.',
  },
  {
    id: 'c',
    name: 'Conscienciosidade',
    desc: 'Grau de organização, autodisciplina e orientação para objetivos.',
  },
]

export const POPULATION_CHART_DATA = [
  { subject: 'Cognitivo', patient: 85, population: 65 },
  { subject: 'Emocional', patient: 60, population: 70 },
  { subject: 'Regulação', patient: 75, population: 60 },
  { subject: 'Social', patient: 90, population: 68 },
  { subject: 'Excitação', patient: 70, population: 62 },
]

export const MENTAL_RADAR_DATA = [
  { subject: 'Cognição', value: 85 },
  { subject: 'Emoção', value: 42 },
  { subject: 'Social', value: 78 },
  { subject: 'Executivo', value: 65 },
]

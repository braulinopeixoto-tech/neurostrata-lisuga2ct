export const MOCK_PATIENTS = [
  {
    id: 'P001',
    name: 'Carlos Oliveira',
    dob: '1975-06-15',
    sex: 'Masculino',
    lastAssessment: '2023-08-10',
    status: 'Ativo',
    score: 85,
    education: 'Superior Completo',
  },
  {
    id: 'P002',
    name: 'Mariana Santos',
    dob: '1988-02-20',
    sex: 'Feminino',
    lastAssessment: '2023-08-05',
    status: 'Em observação',
    score: 72,
    education: 'Pós-graduação',
  },
  {
    id: 'P003',
    name: 'Roberto Fernandes',
    dob: '1962-11-08',
    sex: 'Masculino',
    lastAssessment: '2023-07-22',
    status: 'Alta programada',
    score: 91,
    education: 'Ensino Médio',
  },
]

export const MOCK_PROFESSIONALS = [
  {
    id: 'NS-P001',
    fullName: 'Dr. Renato Alves',
    registrationId: 'CRM 12345-SP',
    specialty: 'Neurologista',
    email: 'renato.alves@neurostrata.com',
    phone: '(11) 98765-4321',
  },
  {
    id: 'NS-P002',
    fullName: 'Dra. Camila Rocha',
    registrationId: 'CRM 54321-RJ',
    specialty: 'Psiquiatra',
    email: 'camila.rocha@neurostrata.com',
    phone: '(21) 99999-8888',
  },
]

export const MOCK_FORMULAS = [
  {
    id: 'F001',
    name: 'Otimização Cognitiva Alpha',
    createdAt: '2023-05-12',
  },
  {
    id: 'F002',
    name: 'Regulação Circadiana Beta',
    createdAt: '2023-06-20',
  },
]

export const PSYCHIC_FUNCTIONS_CATEGORIZED = [
  {
    category: 'Atenção e Foco',
    items: ['Atenção Sustentada', 'Atenção Alternada', 'Controle Inibitório'],
  },
  {
    category: 'Memória e Aprendizagem',
    items: ['Memória de Trabalho', 'Memória Episódica', 'Curva de Retenção'],
  },
  {
    category: 'Funções Executivas',
    items: ['Planejamento', 'Flexibilidade Cognitiva', 'Tomada de Decisão'],
  },
  {
    category: 'Regulação Emocional',
    items: ['Reatividade ao Estresse', 'Labilidade Afetiva', 'Controle de Impulsos'],
  },
]

export const BIG_FIVE_DOMAINS = [
  {
    id: 'openness',
    name: 'Abertura',
    description: 'Curiosidade, criatividade e preferência por novidades.',
    facets: ['Fantasia', 'Estética', 'Sentimentos', 'Ações', 'Ideias', 'Valores'],
  },
  {
    id: 'conscientiousness',
    name: 'Conscienciosidade',
    description: 'Organização, confiabilidade e disciplina.',
    facets: [
      'Competência',
      'Ordem',
      'Senso de Dever',
      'Busca por Realização',
      'Autodisciplina',
      'Deliberação',
    ],
  },
  {
    id: 'extraversion',
    name: 'Extroversão',
    description: 'Sociabilidade, assertividade e energia.',
    facets: [
      'Acolhimento',
      'Gregariedade',
      'Assertividade',
      'Nível de Atividade',
      'Busca por Excitação',
      'Emoções Positivas',
    ],
  },
  {
    id: 'agreeableness',
    name: 'Amabilidade',
    description: 'Compaixão, cooperação e confiança.',
    facets: ['Confiança', 'Franqueza', 'Altruísmo', 'Complacência', 'Modéstia', 'Sensibilidade'],
  },
  {
    id: 'neuroticism',
    name: 'Neuroticismo',
    description: 'Tendência a experimentar emoções negativas.',
    facets: [
      'Ansiedade',
      'Hostilidade',
      'Depressão',
      'Autoconsciência',
      'Impulsividade',
      'Vulnerabilidade',
    ],
  },
]

export const MENTAL_RADAR_DATA = [
  { subject: 'Atenção', A: 120, B: 110, fullMark: 150 },
  { subject: 'Memória', A: 98, B: 130, fullMark: 150 },
  { subject: 'Funções Executivas', A: 86, B: 130, fullMark: 150 },
  { subject: 'Linguagem', A: 99, B: 100, fullMark: 150 },
  { subject: 'Visuoespacial', A: 85, B: 90, fullMark: 150 },
  { subject: 'Regulação Emocional', A: 65, B: 85, fullMark: 150 },
]

export const POPULATION_CHART_DATA = [
  { name: 'Jan', value: 400, uv: 400, pv: 2400, amt: 2400 },
  { name: 'Fev', value: 300, uv: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', value: 200, uv: 200, pv: 9800, amt: 2290 },
  { name: 'Abr', value: 278, uv: 278, pv: 3908, amt: 2000 },
  { name: 'Mai', value: 189, uv: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', value: 239, uv: 239, pv: 3800, amt: 2500 },
  { name: 'Jul', value: 349, uv: 349, pv: 4300, amt: 2100 },
]

export const NEURO_AXES = [
  {
    id: 'dopaminergic',
    name: 'Eixo Dopaminérgico',
    description: 'Motivação, recompensa e funções executivas.',
    color: 'bg-blue-500',
  },
  {
    id: 'serotonergic',
    name: 'Eixo Serotoninérgico',
    description: 'Regulação do humor, sono e apetite.',
    color: 'bg-green-500',
  },
  {
    id: 'noradrenergic',
    name: 'Eixo Noradrenérgico',
    description: 'Alerta, vigilância e resposta ao estresse.',
    color: 'bg-red-500',
  },
  {
    id: 'gabaergic',
    name: 'Eixo GABAérgico',
    description: 'Inibição neural, relaxamento e controle da ansiedade.',
    color: 'bg-purple-500',
  },
  {
    id: 'cholinergic',
    name: 'Eixo Colinérgico',
    description: 'Atenção, aprendizagem e memória.',
    color: 'bg-yellow-500',
  },
]

export const MOCK_PROTOCOLS = [
  { id: '1', name: 'Neuromodulação Frontal', description: 'TDC anódico no DLPFC.' },
  { id: '2', name: 'Estabilização Límbica', description: 'Neurofeedback focado em Alpha/Theta.' },
]

export const MOCK_REPORTS = [
  { id: '1', patientId: 'P001', date: '2023-08-10', title: 'Relatório Evolutivo Fase 1' },
]

export const MOCK_CITATIONS = [
  {
    id: 'cit-1',
    title: 'Large-scale brain networks in cognition and disease',
    authors: 'Bressler, S. L., & Menon, V.',
    link: 'https://doi.org/10.1016/j.tics.2010.04.004',
    dateSaved: '2023-08-10T12:00:00Z',
  },
]

export const RDOC_DOMAINS = [
  {
    id: 'nv',
    name: 'Sistemas de Valência Negativa',
    description: 'Respostas a situações aversivas, como medo, ansiedade e perda.',
  },
  {
    id: 'pv',
    name: 'Sistemas de Valência Positiva',
    description: 'Respostas a situações de recompensa, como motivação, busca e aprendizado.',
  },
  {
    id: 'cs',
    name: 'Sistemas Cognitivos',
    description: 'Processos como atenção, percepção, memória de trabalho e controle cognitivo.',
  },
  {
    id: 'sp',
    name: 'Sistemas de Processamento Social',
    description: 'Processos mediando interações interpessoais, como apego e comunicação.',
  },
  {
    id: 'ar',
    name: 'Sistemas de Alerta e Regulação',
    description: 'Regulação de estados como sono, vigília e ritmos circadianos.',
  },
  {
    id: 'sm',
    name: 'Sistemas Sensório-Motores',
    description: 'Processos responsáveis por planejamento e execução motora.',
  },
]

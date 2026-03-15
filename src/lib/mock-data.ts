export const MOCK_PATIENTS = [
  {
    id: '1',
    name: 'Ana Silva Oliveira',
    dob: '1985-04-12',
    sex: 'F',
    lastAssessment: '2023-10-15',
    status: 'Ativo',
    score: 82,
  },
  {
    id: '2',
    name: 'Carlos Eduardo Santos',
    dob: '1972-11-03',
    sex: 'M',
    lastAssessment: '2023-10-10',
    status: 'Em Tratamento',
    score: 65,
  },
  {
    id: '3',
    name: 'Mariana Costa',
    dob: '1990-08-25',
    sex: 'F',
    lastAssessment: '2023-09-28',
    status: 'Alta',
    score: 91,
  },
  {
    id: '4',
    name: 'Roberto Almeida',
    dob: '1965-02-18',
    sex: 'M',
    lastAssessment: '2023-10-18',
    status: 'Ativo',
    score: 54,
  },
  {
    id: '5',
    name: 'Juliana Fernandes',
    dob: '1988-06-30',
    sex: 'F',
    lastAssessment: '2023-10-05',
    status: 'Ativo',
    score: 77,
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
  {
    id: 'p4',
    title: 'tACS Frequência Gama',
    category: 'Neuromodulação',
    evidence: 'Em estudo',
    target: 'Lobo Frontal',
    params: '1.5mA, 40Hz',
  },
]

export const PSYCHIC_FUNCTIONS = [
  'Atenção Concentrada',
  'Atenção Dividida',
  'Memória de Trabalho',
  'Memória Episódica',
  'Linguagem Expressiva',
  'Linguagem Receptiva',
  'Controle Inibitório',
  'Flexibilidade Cognitiva',
  'Velocidade de Processamento',
  'Regulação Emocional',
  'Percepção Social',
  'Teoria da Mente',
  'Processamento de Recompensa',
  'Aversão a Risco',
  'Motivação',
  'Nível de Alerta',
  'Ritmo Circadiano',
  'Sensopercepção',
]

export const RDOC_DOMAINS = [
  { id: 'nv', name: 'Valência Negativa', desc: 'Respostas a ameaças (medo, ansiedade)' },
  { id: 'pv', name: 'Valência Positiva', desc: 'Respostas a recompensas (motivação, hábito)' },
  { id: 'cs', name: 'Sistemas Cognitivos', desc: 'Atenção, percepção, memória, controle' },
  { id: 'sp', name: 'Processos Sociais', desc: 'Comunicação, percepção de si e do outro' },
  { id: 'ar', name: 'Excitação e Regulação', desc: 'Nível de ativação, ritmos circadianos' },
]

export const POPULATION_CHART_DATA = [
  { subject: 'Cognitivo', patient: 85, population: 65 },
  { subject: 'Emocional', patient: 60, population: 70 },
  { subject: 'Regulação', patient: 75, population: 60 },
  { subject: 'Social', patient: 90, population: 68 },
  { subject: 'Excitação', patient: 70, population: 62 },
]

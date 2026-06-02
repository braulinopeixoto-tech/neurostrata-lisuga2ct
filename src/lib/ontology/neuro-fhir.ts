export type ResourceType =
  | 'NeuroSubject'
  | 'NeuroObservation'
  | 'NeuroCoordinateMap'
  | 'FunctionalNetwork'
  | 'FunctionalAnnotation'
  | 'RDoCBinding'
  | 'TraitProfile'
  | 'FunctionalState'
  | 'NeuroEvidence'
  | 'ClinicalInference'
  | 'InterventionPlan'
  | 'Biogram'
  | 'VitalScoreAssessment'
  | 'ProvenanceRecord'
  | 'OntologyVersion'

export interface CatalogField {
  name: string
  type: string
  description: string
  required: boolean
  versioned?: boolean
  indexed?: boolean
}

export interface CatalogEntry {
  resourceType: ResourceType
  purpose: string
  fields: CatalogField[]
  relationships: string[]
  example: any
}

export const INTEGRATION_GUIDE = [
  {
    table: 'vs_subjects',
    resources: ['NeuroSubject', 'TraitProfile'],
    description: 'Armazena a identidade do paciente e traços basais estruturais.',
  },
  {
    table: 'vs_encounters',
    resources: ['Encounter (Contextual)'],
    description:
      'Agrupa conjuntos de observações e inferências feitas em um mesmo contexto temporal.',
  },
  {
    table: 'vs_clinical_events',
    resources: ['Event Logs'],
    description:
      'Tabela-mãe de rastreabilidade (Event Sourcing) que aponta para qualquer recurso criado ou modificado.',
  },
  {
    table: 'vs_raw_observations',
    resources: ['NeuroObservation'],
    description: 'Guarda os dados primários brutos, sem interpretação.',
  },
  {
    table: 'vs_derived_observations',
    resources: ['NeuroCoordinateMap', 'FunctionalNetwork', 'FunctionalAnnotation', 'RDoCBinding'],
    description:
      'Guarda métricas calculadas, mapas de coordenadas, anotações de rede e vinculações dimensionais estruturadas no payload.',
  },
  {
    table: 'vs_functional_states',
    resources: ['FunctionalState'],
    description: 'Síntese do estado neurofuncional por período.',
  },
  {
    table: 'vs_neuro_evidence',
    resources: ['NeuroEvidence'],
    description: 'Evidências multimodais pontuadas e qualificadas para sustentar inferências.',
  },
  {
    table: 'vs_clinical_inferences',
    resources: ['ClinicalInference'],
    description: 'Hipóteses e conclusões clínicas geradas a partir das evidências.',
  },
  {
    table: 'vs_intervention_plans',
    resources: ['InterventionPlan'],
    description: 'Protocolos e alvos terapêuticos propostos ou aplicados.',
  },
  {
    table: 'vs_vitalscore_assessments',
    resources: ['VitalScoreAssessment'],
    description: 'Cálculo consolidado do VitalScore e subscores no tempo.',
  },
  {
    table: 'vs_biograms',
    resources: ['Biogram'],
    description: 'Visão longitudinal imutável do sujeito, agregando trajetórias.',
  },
  {
    table: 'vs_provenance_logs',
    resources: ['ProvenanceRecord'],
    description:
      'Cadeia de proveniência rastreando quem, o que e por que um dado foi transformado.',
  },
  {
    table: 'vs_ontology_versions',
    resources: ['OntologyVersion'],
    description: 'Catálogo de versões da ontologia utilizada no momento da avaliação.',
  },
]

export const NEURO_FHIR_CATALOG: CatalogEntry[] = [
  {
    resourceType: 'NeuroSubject',
    purpose:
      'Identificação central do paciente neurofuncional. Vincula a biologia, a demografia e a trajetória basal do indivíduo.',
    fields: [
      {
        name: 'id',
        type: 'string',
        description: 'Identificador único (UUID).',
        required: true,
        indexed: true,
      },
      {
        name: 'identifier',
        type: 'Identifier[]',
        description: 'Códigos externos de identificação.',
        required: true,
        indexed: true,
      },
      { name: 'active', type: 'boolean', description: 'Status de acompanhamento.', required: true },
      {
        name: 'baselineTraitProfile',
        type: 'Reference',
        description: 'Referência ao TraitProfile basal (Big Five).',
        required: false,
        versioned: true,
      },
      {
        name: 'biogram',
        type: 'Reference',
        description: 'Referência ao Biograma consolidado atual.',
        required: false,
        versioned: true,
      },
    ],
    relationships: ['1:1 com TraitProfile', '1:1 com Biogram', '1:N com todas as observações'],
    example: {
      resourceType: 'NeuroSubject',
      id: 'sub-1234',
      identifier: [{ system: 'http://neurostrata.com/patients', value: 'P-9876' }],
      active: true,
      demographics: { gender: 'female', birthDate: '1985-06-15' },
      baselineTraitProfile: { reference: 'TraitProfile/tp-555' },
      biogram: { reference: 'Biogram/bg-1234' },
    },
  },
  {
    resourceType: 'NeuroObservation',
    purpose: 'Registro atômico de uma coleta de dados ou biossinal bruto sem inferência clínica.',
    fields: [
      {
        name: 'id',
        type: 'string',
        description: 'UUID da observação.',
        required: true,
        indexed: true,
      },
      {
        name: 'subject',
        type: 'Reference',
        description: 'Sujeito da observação.',
        required: true,
        indexed: true,
      },
      {
        name: 'status',
        type: 'string',
        description: 'registered | preliminary | final | amended',
        required: true,
      },
      {
        name: 'code',
        type: 'CodeableConcept',
        description: 'Tipo do dado (ex: EEG, HRV).',
        required: true,
        indexed: true,
      },
      {
        name: 'effectiveDateTime',
        type: 'string',
        description: 'Data/hora exata do registro.',
        required: true,
        indexed: true,
      },
      {
        name: 'valueQuantity',
        type: 'object',
        description: 'Valor mensurável.',
        required: false,
        versioned: false,
      },
    ],
    relationships: ['N:1 com NeuroSubject', 'Pode ser referenciado por NeuroEvidence'],
    example: {
      resourceType: 'NeuroObservation',
      id: 'obs-444',
      subject: { reference: 'NeuroSubject/sub-1234' },
      status: 'final',
      category: [
        { coding: [{ system: 'http://neurostrata.com/obs-cat', code: 'electrophysiology' }] },
      ],
      code: {
        coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Intravascular systolic' }],
      },
      effectiveDateTime: '2026-04-20T10:05:00Z',
      valueQuantity: { value: 120, unit: 'mmHg' },
    },
  },
  {
    resourceType: 'FunctionalState',
    purpose:
      'Classificação sintética do estado neurofuncional em um período. Requisito obrigatório para classificar energia, integração e organização.',
    fields: [
      { name: 'id', type: 'string', description: 'UUID do estado.', required: true, indexed: true },
      {
        name: 'subject',
        type: 'Reference',
        description: 'Paciente avaliado.',
        required: true,
        indexed: true,
      },
      {
        name: 'brainEnergy',
        type: 'string',
        description: 'hipoativo | hiperativo | instavel | regulado',
        required: true,
        versioned: true,
        indexed: true,
      },
      {
        name: 'networkIntegration',
        type: 'string',
        description: 'acoplado | desacoplado | parcialmente_acoplado',
        required: true,
        versioned: true,
        indexed: true,
      },
      {
        name: 'functionalOrganization',
        type: 'string',
        description: 'coerente | difusa | rigida | instavel',
        required: true,
        versioned: true,
        indexed: true,
      },
      {
        name: 'rdocBindings',
        type: 'Reference[]',
        description: 'Mapeamento dimensional RDoC associado.',
        required: false,
      },
    ],
    relationships: ['Faz ponte entre dados brutos e RDoCBindings', 'Sustenta ClinicalInferences'],
    example: {
      resourceType: 'FunctionalState',
      id: 'fs-001',
      subject: { reference: 'NeuroSubject/sub-1234' },
      effectivePeriod: { start: '2026-04-20T10:00:00Z' },
      brainEnergy: 'instavel',
      networkIntegration: 'parcialmente_acoplado',
      functionalOrganization: 'difusa',
      rdocBindings: [{ reference: 'RDoCBinding/rdoc-456' }],
    },
  },
  {
    resourceType: 'ClinicalInference',
    purpose:
      'Hipóteses diagnósticas ou conclusões firmadas sobre o paciente, estritamente amparadas por evidências mapeadas.',
    fields: [
      {
        name: 'id',
        type: 'string',
        description: 'UUID da inferência.',
        required: true,
        indexed: true,
      },
      {
        name: 'supportEvidence',
        type: 'Reference[]',
        description: 'Referências obrigatórias a NeuroEvidence que embasam a conclusão.',
        required: true,
        versioned: true,
      },
      {
        name: 'confidenceLevel',
        type: 'number',
        description: 'Nível de confiança da inferência (0-100).',
        required: true,
        versioned: true,
      },
      {
        name: 'ontologyVersion',
        type: 'string',
        description: 'Versão da linguagem neuro-FHIR utilizada.',
        required: true,
      },
      {
        name: 'inferenceModelVersion',
        type: 'string',
        description: 'Modelo ou critério utilizado para a conclusão.',
        required: true,
      },
      {
        name: 'dominantHypothesis',
        type: 'CodeableConcept',
        description: 'Hipótese central confirmada ou mais provável.',
        required: true,
        indexed: true,
      },
      {
        name: 'alternativeHypotheses',
        type: 'CodeableConcept[]',
        description: 'Hipóteses secundárias.',
        required: false,
      },
      {
        name: 'associatedRisks',
        type: 'CodeableConcept[]',
        description: 'Riscos inerentes à condição mapeada.',
        required: true,
      },
    ],
    relationships: [
      'Consome NeuroEvidence',
      'Alimenta InterventionPlan',
      'Baseia o VitalScoreAssessment',
    ],
    example: {
      resourceType: 'ClinicalInference',
      id: 'ci-999',
      subject: { reference: 'NeuroSubject/sub-1234' },
      date: '2026-04-21T14:30:00Z',
      supportEvidence: [{ reference: 'NeuroEvidence/ev-101' }],
      confidenceLevel: 85,
      ontologyVersion: '1.0.0',
      inferenceModelVersion: 'v2.1',
      dominantHypothesis: {
        coding: [
          {
            system: 'http://neurostrata.com/ontology',
            code: 'HYP-01',
            display: 'Desregulação Frontolímbica Primária',
          },
        ],
      },
      alternativeHypotheses: [
        {
          coding: [
            {
              system: 'http://neurostrata.com/ontology',
              code: 'HYP-02',
              display: 'Sobrecarga Alostática com Fadiga Executiva',
            },
          ],
        },
      ],
      associatedRisks: [
        {
          coding: [
            {
              system: 'http://neurostrata.com/ontology',
              code: 'RSK-05',
              display: 'Risco de Colapso Funcional a Curto Prazo',
            },
          ],
        },
      ],
    },
  },
  {
    resourceType: 'InterventionPlan',
    purpose:
      'Representa a terapia, modulação ou manejo proposto. Deve obrigatoriamente apontar os alvos funcionais ou estruturais.',
    fields: [
      {
        name: 'id',
        type: 'string',
        description: 'UUID da intervenção.',
        required: true,
        indexed: true,
      },
      {
        name: 'targets',
        type: 'object[]',
        description: 'Alvos: coordinate, region, network, ou rdocConstruct.',
        required: true,
        versioned: true,
      },
      {
        name: 'functionalObjective',
        type: 'string',
        description: 'Objetivo claro da aplicação funcional.',
        required: true,
      },
      {
        name: 'modality',
        type: 'CodeableConcept',
        description: 'Método (ex: tDCS, TCC, Suplementação).',
        required: true,
        indexed: true,
      },
      {
        name: 'intensity',
        type: 'string',
        description: 'Carga/Dose (ex: 2mA).',
        required: false,
        versioned: true,
      },
      { name: 'duration', type: 'string', description: 'Duração do protocolo.', required: true },
      {
        name: 'carePhase',
        type: 'string',
        description: 'Fase: base | integracao | especializacao.',
        required: true,
        versioned: true,
        indexed: true,
      },
    ],
    relationships: ['Responde a uma ClinicalInference', 'Impacta o Biogram'],
    example: {
      resourceType: 'InterventionPlan',
      id: 'ip-777',
      subject: { reference: 'NeuroSubject/sub-1234' },
      status: 'active',
      targets: [
        { network: { reference: 'FunctionalNetwork/fn-dmn' } },
        { rdocConstruct: { reference: 'RDoCBinding/rdoc-cog-control' } },
      ],
      functionalObjective:
        'Aumentar a estabilidade da rede de modo padrão e melhorar o controle inibitório.',
      modality: {
        coding: [
          {
            system: 'http://neurostrata.com/modality',
            code: 'MOD-NM',
            display: 'Neuromodulação (tDCS)',
          },
        ],
      },
      intensity: '2mA, 20min',
      duration: '15 sessões',
      carePhase: 'base',
    },
  },
  {
    resourceType: 'VitalScoreAssessment',
    purpose:
      'Cálculo consolidado do estado vital. Sintetiza a avaliação de risco e a saúde funcional sistêmica em um instante.',
    fields: [
      {
        name: 'globalScore',
        type: 'number',
        description: 'Pontuação final consolidada 0-100.',
        required: true,
        versioned: true,
        indexed: true,
      },
      {
        name: 'subscores',
        type: 'object',
        description: 'Eixos (neuro, cognitive, emotional, metabolic, contextual).',
        required: true,
        versioned: true,
      },
      {
        name: 'interpretation',
        type: 'string',
        description: 'Resumo interpretativo.',
        required: true,
      },
      {
        name: 'baseEvidences',
        type: 'Reference[]',
        description: 'Conjunto de evidências/estados que embasaram o score.',
        required: true,
      },
      {
        name: 'modelVersion',
        type: 'string',
        description: 'Algoritmo de cálculo.',
        required: true,
        indexed: true,
      },
      {
        name: 'temporalTrend',
        type: 'string',
        description: 'improving | stable | declining.',
        required: true,
        indexed: true,
      },
      {
        name: 'riskClassification',
        type: 'CodeableConcept',
        description: 'Faixa de risco funcional atual.',
        required: true,
        indexed: true,
      },
    ],
    relationships: [
      'Depende de NeuroEvidence e FunctionalState',
      'É o output final do ciclo de assessment',
    ],
    example: {
      resourceType: 'VitalScoreAssessment',
      id: 'vsa-555',
      subject: { reference: 'NeuroSubject/sub-1234' },
      date: '2026-04-21T15:00:00Z',
      globalScore: 68,
      subscores: {
        neuro: 70,
        cognitive: 65,
        emotional: 55,
        metabolic: 75,
        contextual: 60,
      },
      interpretation: 'Vulnerabilidade moderada com impacto predominante no eixo emocional.',
      baseEvidences: [
        { reference: 'NeuroEvidence/ev-101' },
        { reference: 'FunctionalState/fs-001' },
      ],
      modelVersion: '1.2.0',
      temporalTrend: 'declining',
      riskClassification: {
        coding: [{ system: 'http://neurostrata.com/risk', code: 'RSK-MOD', display: 'Moderado' }],
      },
    },
  },
  {
    resourceType: 'TraitProfile',
    purpose: 'Base estrutural de personalidade do paciente utilizando o modelo Big Five.',
    fields: [
      {
        name: 'framework',
        type: 'string',
        description: 'Sempre "BigFive" no cenário atual.',
        required: true,
      },
      {
        name: 'traits',
        type: 'object',
        description:
          'Valores de Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
        required: true,
        versioned: true,
      },
      {
        name: 'stabilityIndex',
        type: 'number',
        description: 'Índice de estabilidade do traço longitudinalmente.',
        required: true,
      },
    ],
    relationships: ['1:1 com NeuroSubject (Basal)'],
    example: {
      resourceType: 'TraitProfile',
      id: 'tp-555',
      subject: { reference: 'NeuroSubject/sub-1234' },
      framework: 'BigFive',
      traits: {
        openness: 75,
        conscientiousness: 82,
        extraversion: 50,
        agreeableness: 60,
        neuroticism: 40,
      },
      stabilityIndex: 88,
    },
  },
  {
    resourceType: 'RDoCBinding',
    purpose:
      'Mapeia observações e construtos para a dimensionalidade do Research Domain Criteria (NIMH).',
    fields: [
      {
        name: 'domain',
        type: 'string',
        description: 'Um dos 6 domínios RDoC oficiais.',
        required: true,
        indexed: true,
      },
      {
        name: 'construct',
        type: 'string',
        description: 'O construto específico (ex: Frustrative Nonreward).',
        required: true,
        indexed: true,
      },
      {
        name: 'weight',
        type: 'number',
        description: 'Força da vinculação com a observação subjacente.',
        required: true,
        versioned: true,
      },
      {
        name: 'evidence',
        type: 'Reference[]',
        description: 'Referência ao dado basal (Observation/Evidence).',
        required: false,
      },
    ],
    relationships: ['Anotação rica acoplada a DerivedObservations'],
    example: {
      resourceType: 'RDoCBinding',
      id: 'rdoc-456',
      domain: 'NegativeValence',
      construct: 'Acute Threat (Fear)',
      weight: 0.85,
      evidence: [{ reference: 'NeuroEvidence/ev-101' }],
    },
  },
  {
    resourceType: 'NeuroCoordinateMap',
    purpose: 'Mapeamento espacial de alvo ou achado neuroanatômico.',
    fields: [
      {
        name: 'space',
        type: 'string',
        description: 'Espaço de normalização (MNI152, Talairach, Native).',
        required: true,
      },
      {
        name: 'coordinates',
        type: 'object[]',
        description: 'Lista de X,Y,Z e anotações de Brodmann Area.',
        required: true,
      },
    ],
    relationships: ['Alvo para InterventionPlan', 'Origem de FunctionalAnnotation'],
    example: {
      resourceType: 'NeuroCoordinateMap',
      id: 'map-123',
      subject: { reference: 'NeuroSubject/sub-1234' },
      space: 'MNI152',
      coordinates: [{ x: -32, y: 24, z: 40, region: { text: 'BA9' } }],
    },
  },
  {
    resourceType: 'FunctionalNetwork',
    purpose: 'Representa conectomas ou redes funcionais em larga escala.',
    fields: [
      {
        name: 'networkType',
        type: 'CodeableConcept',
        description: 'Ex: Default Mode Network (DMN), Salience Network.',
        required: true,
        indexed: true,
      },
      {
        name: 'nodes',
        type: 'object[]',
        description: 'Regiões participantes e seus pesos de engajamento.',
        required: true,
      },
    ],
    relationships: ['Alvo para InterventionPlan', 'Referenciado por FunctionalState'],
    example: {
      resourceType: 'FunctionalNetwork',
      id: 'fn-dmn',
      networkType: { coding: [{ code: 'DMN', display: 'Default Mode Network' }] },
      nodes: [
        { region: { text: 'PCC' }, weight: 0.9 },
        { region: { text: 'mPFC' }, weight: 0.85 },
      ],
    },
  },
  {
    resourceType: 'FunctionalAnnotation',
    purpose: 'Avalia funções psíquicas/cognitivas mapeadas geograficamente ou por rede.',
    fields: [
      {
        name: 'function',
        type: 'CodeableConcept',
        description: 'Função executiva, memória de trabalho, inibição, etc.',
        required: true,
        indexed: true,
      },
      {
        name: 'level',
        type: 'string',
        description: 'hyper | hypo | normal | unstable',
        required: true,
        versioned: true,
      },
    ],
    relationships: ['Vinculado a FunctionalNetwork ou NeuroCoordinateMap'],
    example: {
      resourceType: 'FunctionalAnnotation',
      id: 'fa-777',
      targetNetwork: { reference: 'FunctionalNetwork/fn-dmn' },
      function: { coding: [{ code: 'self_referential', display: 'Pensamento Auto-referencial' }] },
      level: 'hyper',
    },
  },
  {
    resourceType: 'NeuroEvidence',
    purpose:
      'Sustenta uma inferência. Pesa a qualidade de dados brutos e derivados em prol de uma tese.',
    fields: [
      {
        name: 'observation',
        type: 'Reference[]',
        description: 'Lista de observações validadas.',
        required: true,
      },
      {
        name: 'qualityScore',
        type: 'number',
        description: 'Grau de pureza/validade do sinal ou dado (0-100).',
        required: true,
        versioned: true,
      },
      {
        name: 'evidenceType',
        type: 'CodeableConcept',
        description: 'Tipo da matriz de evidência (EEG, Biomarcador, Escala).',
        required: true,
        indexed: true,
      },
    ],
    relationships: ['Base para ClinicalInference', 'Base para VitalScoreAssessment'],
    example: {
      resourceType: 'NeuroEvidence',
      id: 'ev-101',
      subject: { reference: 'NeuroSubject/sub-1234' },
      observation: [{ reference: 'NeuroObservation/obs-444' }],
      qualityScore: 92,
      weight: 0.95,
      evidenceType: { coding: [{ code: 'electrophysiology', display: 'QEEG / Brain Mapping' }] },
    },
  },
  {
    resourceType: 'Biogram',
    purpose: 'A trajetória longitudinal completa do indivíduo.',
    fields: [
      {
        name: 'trajectory',
        type: 'object[]',
        description: 'Cadeia de tempo agrupando estados, scores e intervenções ao longo da vida.',
        required: true,
        versioned: true,
      },
    ],
    relationships: ['1:1 com NeuroSubject'],
    example: {
      resourceType: 'Biogram',
      id: 'bg-1234',
      subject: { reference: 'NeuroSubject/sub-1234' },
      period: { start: '2024-01-01T00:00:00Z' },
      trajectory: [
        {
          date: '2026-04-21T15:00:00Z',
          state: { reference: 'FunctionalState/fs-001' },
          vitalScore: { reference: 'VitalScoreAssessment/vsa-555' },
          interventions: [{ reference: 'InterventionPlan/ip-777' }],
        },
      ],
    },
  },
  {
    resourceType: 'ProvenanceRecord',
    purpose:
      'Registro formal e auditável de quem executou ou processou dados, essencial na Trust Layer.',
    fields: [
      {
        name: 'target',
        type: 'Reference[]',
        description: 'Os recursos que foram afetados.',
        required: true,
        indexed: true,
      },
      { name: 'recorded', type: 'string', description: 'Timestamp exato.', required: true },
      { name: 'activity', type: 'CodeableConcept', description: 'Ação efetuada.', required: true },
      {
        name: 'agent',
        type: 'object[]',
        description: 'Pessoa, sistema ou IA envolvida.',
        required: true,
      },
    ],
    relationships: ['Mapeia-se globalmente com todo o framework (Event Sourcing)'],
    example: {
      resourceType: 'ProvenanceRecord',
      id: 'prov-123',
      target: [{ reference: 'VitalScoreAssessment/vsa-555' }],
      recorded: '2026-04-21T15:01:00Z',
      activity: { coding: [{ code: 'COMPUTE', display: 'Computation of VitalScore' }] },
      agent: [{ role: { text: 'Algorithm' }, who: { reference: 'Device/scoring-engine-v2' } }],
    },
  },
  {
    resourceType: 'OntologyVersion',
    purpose:
      'Fixa semanticamente o catálogo no momento da avaliação, garantindo reprodutibilidade.',
    fields: [
      {
        name: 'versionCode',
        type: 'string',
        description: 'Versão Semântica.',
        required: true,
        indexed: true,
      },
      { name: 'status', type: 'string', description: 'draft | active | retired', required: true },
    ],
    relationships: ['Base para decodificação de payloads passados'],
    example: {
      resourceType: 'OntologyVersion',
      id: 'ov-100',
      versionCode: '1.0.0',
      status: 'active',
      releaseDate: '2026-01-01T00:00:00Z',
      description: 'Initial Neuro-FHIR release with RDoC bindings',
    },
  },
]

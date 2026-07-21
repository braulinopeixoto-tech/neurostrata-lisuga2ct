export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AiTrustEventRow = {
  id: string
  event_id: string
  resource_id: string
  event_type: string
  occurred_at: string
  actor_id: string
  artifact: Json
  integrity_policy: 'STRICT_HASH' | 'OBSERVATIONAL_HASH'
  status: 'VALID' | 'INVALID' | 'PENDING_HUMAN_REVIEW'
  decision: Json
  previous_event_hash: string | null
  event_hash: string
  metadata: Json
  sequence_number: number
  created_at: string
}

export type AiTrustEventInsert = Omit<
  AiTrustEventRow,
  'id' | 'sequence_number' | 'created_at'
> & {
  id?: string
  sequence_number?: number
  created_at?: string
}

export type AiTrustDecisionRow = {
  id: string
  decision_id: string
  resource_id: string
  event_id: string | null
  occurred_at: string
  actor_id: string
  decision: Json
  metadata: Json
  created_at: string
}

export type AiTrustDecisionInsert = Omit<AiTrustDecisionRow, 'id' | 'created_at'> & {
  id?: string
  created_at?: string
}

type GenericGovernedRow = {
  id: string
  resource_id: string
  metadata: Json
  created_at: string
}

type GenericGovernedInsert = {
  id?: string
  resource_id: string
  metadata?: Json
  created_at?: string
}

type ImmutableUpdate<Insert extends Record<string, unknown>> = {
  [Key in keyof Insert]?: never
}

export interface AiTrustDatabase {
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      ai_trust_events: {
        Row: AiTrustEventRow
        Insert: AiTrustEventInsert
        Update: ImmutableUpdate<AiTrustEventInsert>
        Relationships: []
      }
      ai_trust_decisions: {
        Row: AiTrustDecisionRow
        Insert: AiTrustDecisionInsert
        Update: ImmutableUpdate<AiTrustDecisionInsert>
        Relationships: []
      }
      ai_trust_artifacts: {
        Row: GenericGovernedRow
        Insert: GenericGovernedInsert
        Update: ImmutableUpdate<GenericGovernedInsert>
        Relationships: []
      }
      ai_trust_policies: {
        Row: GenericGovernedRow
        Insert: GenericGovernedInsert
        Update: ImmutableUpdate<GenericGovernedInsert>
        Relationships: []
      }
      ai_trust_reviews: {
        Row: GenericGovernedRow
        Insert: GenericGovernedInsert
        Update: ImmutableUpdate<GenericGovernedInsert>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

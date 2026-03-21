// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      assessment_instruments: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          instrument_type: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          instrument_type: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          instrument_type?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      assessment_responses: {
        Row: {
          answered_at: string | null
          answered_by: string | null
          assessment_session_id: string
          id: string
          instrument_item_id: string
          is_valid: boolean | null
          response_boolean: boolean | null
          response_json: Json | null
          response_numeric: number | null
          response_text: string | null
          source: string | null
        }
        Insert: {
          answered_at?: string | null
          answered_by?: string | null
          assessment_session_id: string
          id?: string
          instrument_item_id: string
          is_valid?: boolean | null
          response_boolean?: boolean | null
          response_json?: Json | null
          response_numeric?: number | null
          response_text?: string | null
          source?: string | null
        }
        Update: {
          answered_at?: string | null
          answered_by?: string | null
          assessment_session_id?: string
          id?: string
          instrument_item_id?: string
          is_valid?: boolean | null
          response_boolean?: boolean | null
          response_json?: Json | null
          response_numeric?: number | null
          response_text?: string | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'assessment_responses_answered_by_fkey'
            columns: ['answered_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_responses_assessment_session_id_fkey'
            columns: ['assessment_session_id']
            isOneToOne: false
            referencedRelation: 'assessment_sessions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_responses_instrument_item_id_fkey'
            columns: ['instrument_item_id']
            isOneToOne: false
            referencedRelation: 'instrument_items'
            referencedColumns: ['id']
          },
        ]
      }
      assessment_result_construct_scores: {
        Row: {
          assessment_result_id: string
          id: string
          interpretation: string | null
          normalized_score: number | null
          percentile: number | null
          raw_score: number | null
          risk_band: string | null
          taxonomy_construct_id: string
        }
        Insert: {
          assessment_result_id: string
          id?: string
          interpretation?: string | null
          normalized_score?: number | null
          percentile?: number | null
          raw_score?: number | null
          risk_band?: string | null
          taxonomy_construct_id: string
        }
        Update: {
          assessment_result_id?: string
          id?: string
          interpretation?: string | null
          normalized_score?: number | null
          percentile?: number | null
          raw_score?: number | null
          risk_band?: string | null
          taxonomy_construct_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'assessment_result_construct_scores_assessment_result_id_fkey'
            columns: ['assessment_result_id']
            isOneToOne: false
            referencedRelation: 'assessment_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_result_construct_scores_taxonomy_construct_id_fkey'
            columns: ['taxonomy_construct_id']
            isOneToOne: false
            referencedRelation: 'taxonomy_constructs'
            referencedColumns: ['id']
          },
        ]
      }
      assessment_results: {
        Row: {
          assessment_session_id: string
          generated_at: string | null
          generated_by: string | null
          id: string
          is_final: boolean | null
          result_checksum: string
          result_json: Json
          rule_set_id: string
          severity_label: string | null
          summary_text: string | null
        }
        Insert: {
          assessment_session_id: string
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          is_final?: boolean | null
          result_checksum: string
          result_json: Json
          rule_set_id: string
          severity_label?: string | null
          summary_text?: string | null
        }
        Update: {
          assessment_session_id?: string
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          is_final?: boolean | null
          result_checksum?: string
          result_json?: Json
          rule_set_id?: string
          severity_label?: string | null
          summary_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'assessment_results_assessment_session_id_fkey'
            columns: ['assessment_session_id']
            isOneToOne: true
            referencedRelation: 'assessment_sessions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_results_generated_by_fkey'
            columns: ['generated_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_results_rule_set_id_fkey'
            columns: ['rule_set_id']
            isOneToOne: false
            referencedRelation: 'scoring_rule_sets'
            referencedColumns: ['id']
          },
        ]
      }
      assessment_sessions: {
        Row: {
          applicator_id: string
          completed_at: string | null
          created_at: string | null
          id: string
          instrument_version_id: string
          organization_id: string
          organization_unit_id: string
          patient_case_id: string
          patient_id: string
          raw_payload_checksum: string | null
          session_status: string | null
          source_channel: string | null
          started_at: string | null
          supervisor_id: string | null
        }
        Insert: {
          applicator_id: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          instrument_version_id: string
          organization_id: string
          organization_unit_id: string
          patient_case_id: string
          patient_id: string
          raw_payload_checksum?: string | null
          session_status?: string | null
          source_channel?: string | null
          started_at?: string | null
          supervisor_id?: string | null
        }
        Update: {
          applicator_id?: string
          completed_at?: string | null
          created_at?: string | null
          id?: string
          instrument_version_id?: string
          organization_id?: string
          organization_unit_id?: string
          patient_case_id?: string
          patient_id?: string
          raw_payload_checksum?: string | null
          session_status?: string | null
          source_channel?: string | null
          started_at?: string | null
          supervisor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'assessment_sessions_applicator_id_fkey'
            columns: ['applicator_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_instrument_version_id_fkey'
            columns: ['instrument_version_id']
            isOneToOne: false
            referencedRelation: 'instrument_versions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_organization_unit_id_fkey'
            columns: ['organization_unit_id']
            isOneToOne: false
            referencedRelation: 'organization_units'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_patient_case_id_fkey'
            columns: ['patient_case_id']
            isOneToOne: false
            referencedRelation: 'patient_cases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'assessment_sessions_supervisor_id_fkey'
            columns: ['supervisor_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_profile_id: string | null
          id: number
          ip_address: unknown
          new_data: Json | null
          occurred_at: string | null
          old_data: Json | null
          reason: string | null
          record_id: string | null
          request_id: string | null
          table_name: string
        }
        Insert: {
          action: string
          actor_profile_id?: string | null
          id?: number
          ip_address?: unknown
          new_data?: Json | null
          occurred_at?: string | null
          old_data?: Json | null
          reason?: string | null
          record_id?: string | null
          request_id?: string | null
          table_name: string
        }
        Update: {
          action?: string
          actor_profile_id?: string | null
          id?: number
          ip_address?: unknown
          new_data?: Json | null
          occurred_at?: string | null
          old_data?: Json | null
          reason?: string | null
          record_id?: string | null
          request_id?: string | null
          table_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'audit_log_actor_profile_id_fkey'
            columns: ['actor_profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      case_team_assignments: {
        Row: {
          assignment_role: string
          ends_at: string | null
          id: string
          patient_case_id: string
          professional_id: string
          starts_at: string | null
        }
        Insert: {
          assignment_role: string
          ends_at?: string | null
          id?: string
          patient_case_id: string
          professional_id: string
          starts_at?: string | null
        }
        Update: {
          assignment_role?: string
          ends_at?: string | null
          id?: string
          patient_case_id?: string
          professional_id?: string
          starts_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'case_team_assignments_patient_case_id_fkey'
            columns: ['patient_case_id']
            isOneToOne: false
            referencedRelation: 'patient_cases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'case_team_assignments_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
        ]
      }
      clinical_events: {
        Row: {
          created_at: string | null
          event_at: string | null
          event_type: string
          id: string
          patient_case_id: string
          patient_id: string
          payload: Json | null
          performed_by: string | null
          source_record_id: string | null
          source_table: string | null
        }
        Insert: {
          created_at?: string | null
          event_at?: string | null
          event_type: string
          id?: string
          patient_case_id: string
          patient_id: string
          payload?: Json | null
          performed_by?: string | null
          source_record_id?: string | null
          source_table?: string | null
        }
        Update: {
          created_at?: string | null
          event_at?: string | null
          event_type?: string
          id?: string
          patient_case_id?: string
          patient_id?: string
          payload?: Json | null
          performed_by?: string | null
          source_record_id?: string | null
          source_table?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'clinical_events_patient_case_id_fkey'
            columns: ['patient_case_id']
            isOneToOne: false
            referencedRelation: 'patient_cases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'clinical_events_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'clinical_events_performed_by_fkey'
            columns: ['performed_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      clinical_report_artifacts: {
        Row: {
          artifact_type: string
          clinical_report_id: string
          created_at: string | null
          file_checksum: string | null
          file_url: string
          id: string
        }
        Insert: {
          artifact_type: string
          clinical_report_id: string
          created_at?: string | null
          file_checksum?: string | null
          file_url: string
          id?: string
        }
        Update: {
          artifact_type?: string
          clinical_report_id?: string
          created_at?: string | null
          file_checksum?: string | null
          file_url?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'clinical_report_artifacts_clinical_report_id_fkey'
            columns: ['clinical_report_id']
            isOneToOne: false
            referencedRelation: 'clinical_reports'
            referencedColumns: ['id']
          },
        ]
      }
      clinical_reports: {
        Row: {
          assessment_result_id: string | null
          atlas_version: string | null
          author_professional_id: string
          body_markdown: string
          created_at: string | null
          criteria_version: string
          id: string
          patient_case_id: string
          protocol_version: string
          report_type: string
          signed_at: string | null
          status: string | null
          supervisor_professional_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assessment_result_id?: string | null
          atlas_version?: string | null
          author_professional_id: string
          body_markdown: string
          created_at?: string | null
          criteria_version: string
          id?: string
          patient_case_id: string
          protocol_version: string
          report_type: string
          signed_at?: string | null
          status?: string | null
          supervisor_professional_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assessment_result_id?: string | null
          atlas_version?: string | null
          author_professional_id?: string
          body_markdown?: string
          created_at?: string | null
          criteria_version?: string
          id?: string
          patient_case_id?: string
          protocol_version?: string
          report_type?: string
          signed_at?: string | null
          status?: string | null
          supervisor_professional_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'clinical_reports_assessment_result_id_fkey'
            columns: ['assessment_result_id']
            isOneToOne: false
            referencedRelation: 'assessment_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'clinical_reports_author_professional_id_fkey'
            columns: ['author_professional_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'clinical_reports_patient_case_id_fkey'
            columns: ['patient_case_id']
            isOneToOne: false
            referencedRelation: 'patient_cases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'clinical_reports_supervisor_professional_id_fkey'
            columns: ['supervisor_professional_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
        ]
      }
      consents: {
        Row: {
          consent_type: string
          created_at: string | null
          document_version: string
          file_url: string | null
          guardian_id: string | null
          id: string
          patient_id: string
          signature_method: string | null
          signed_at: string
          signed_by_name: string
          status: string | null
        }
        Insert: {
          consent_type: string
          created_at?: string | null
          document_version: string
          file_url?: string | null
          guardian_id?: string | null
          id?: string
          patient_id: string
          signature_method?: string | null
          signed_at: string
          signed_by_name: string
          status?: string | null
        }
        Update: {
          consent_type?: string
          created_at?: string | null
          document_version?: string
          file_url?: string | null
          guardian_id?: string | null
          id?: string
          patient_id?: string
          signature_method?: string | null
          signed_at?: string
          signed_by_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'consents_guardian_id_fkey'
            columns: ['guardian_id']
            isOneToOne: false
            referencedRelation: 'patient_guardians'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'consents_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
        ]
      }
      instrument_item_construct_links: {
        Row: {
          created_at: string | null
          id: string
          instrument_item_id: string
          link_type: string
          taxonomy_construct_id: string
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          instrument_item_id: string
          link_type: string
          taxonomy_construct_id: string
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          instrument_item_id?: string
          link_type?: string
          taxonomy_construct_id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'instrument_item_construct_links_instrument_item_id_fkey'
            columns: ['instrument_item_id']
            isOneToOne: false
            referencedRelation: 'instrument_items'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'instrument_item_construct_links_taxonomy_construct_id_fkey'
            columns: ['taxonomy_construct_id']
            isOneToOne: false
            referencedRelation: 'taxonomy_constructs'
            referencedColumns: ['id']
          },
        ]
      }
      instrument_items: {
        Row: {
          created_at: string | null
          id: string
          instrument_version_id: string
          is_required: boolean | null
          item_code: string
          metadata: Json | null
          prompt_text: string
          response_type: string
          section_id: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          instrument_version_id: string
          is_required?: boolean | null
          item_code: string
          metadata?: Json | null
          prompt_text: string
          response_type: string
          section_id?: string | null
          sort_order: number
        }
        Update: {
          created_at?: string | null
          id?: string
          instrument_version_id?: string
          is_required?: boolean | null
          item_code?: string
          metadata?: Json | null
          prompt_text?: string
          response_type?: string
          section_id?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: 'instrument_items_instrument_version_id_fkey'
            columns: ['instrument_version_id']
            isOneToOne: false
            referencedRelation: 'instrument_versions'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'instrument_items_section_id_fkey'
            columns: ['section_id']
            isOneToOne: false
            referencedRelation: 'instrument_sections'
            referencedColumns: ['id']
          },
        ]
      }
      instrument_sections: {
        Row: {
          code: string
          created_at: string | null
          id: string
          instrument_version_id: string
          sort_order: number
          title: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          instrument_version_id: string
          sort_order: number
          title: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          instrument_version_id?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'instrument_sections_instrument_version_id_fkey'
            columns: ['instrument_version_id']
            isOneToOne: false
            referencedRelation: 'instrument_versions'
            referencedColumns: ['id']
          },
        ]
      }
      instrument_versions: {
        Row: {
          atlas_version: string | null
          created_at: string | null
          created_by: string
          criteria_version: string
          id: string
          instrument_id: string
          notes: string | null
          published_at: string | null
          scoring_engine_version: string
          status: string | null
          version_code: string
        }
        Insert: {
          atlas_version?: string | null
          created_at?: string | null
          created_by: string
          criteria_version: string
          id?: string
          instrument_id: string
          notes?: string | null
          published_at?: string | null
          scoring_engine_version: string
          status?: string | null
          version_code: string
        }
        Update: {
          atlas_version?: string | null
          created_at?: string | null
          created_by?: string
          criteria_version?: string
          id?: string
          instrument_id?: string
          notes?: string | null
          published_at?: string | null
          scoring_engine_version?: string
          status?: string | null
          version_code?: string
        }
        Relationships: [
          {
            foreignKeyName: 'instrument_versions_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'instrument_versions_instrument_id_fkey'
            columns: ['instrument_id']
            isOneToOne: false
            referencedRelation: 'assessment_instruments'
            referencedColumns: ['id']
          },
        ]
      }
      organization_units: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          organization_id: string
          state: string | null
          unit_type: string
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          organization_id: string
          state?: string | null
          unit_type: string
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          organization_id?: string
          state?: string | null
          unit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'organization_units_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          document_number: string | null
          id: string
          is_active: boolean | null
          legal_name: string
          organization_type: string
          trade_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_number?: string | null
          id?: string
          is_active?: boolean | null
          legal_name: string
          organization_type: string
          trade_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_number?: string | null
          id?: string
          is_active?: boolean | null
          legal_name?: string
          organization_type?: string
          trade_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      patient_cases: {
        Row: {
          care_line: string | null
          case_status: string | null
          closed_at: string | null
          created_at: string | null
          id: string
          initial_reason: string | null
          opened_by: string
          organization_unit_id: string
          patient_id: string
          primary_supervisor_id: string | null
          updated_at: string | null
        }
        Insert: {
          care_line?: string | null
          case_status?: string | null
          closed_at?: string | null
          created_at?: string | null
          id?: string
          initial_reason?: string | null
          opened_by: string
          organization_unit_id: string
          patient_id: string
          primary_supervisor_id?: string | null
          updated_at?: string | null
        }
        Update: {
          care_line?: string | null
          case_status?: string | null
          closed_at?: string | null
          created_at?: string | null
          id?: string
          initial_reason?: string | null
          opened_by?: string
          organization_unit_id?: string
          patient_id?: string
          primary_supervisor_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'patient_cases_opened_by_fkey'
            columns: ['opened_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'patient_cases_organization_unit_id_fkey'
            columns: ['organization_unit_id']
            isOneToOne: false
            referencedRelation: 'organization_units'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'patient_cases_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'patient_cases_primary_supervisor_id_fkey'
            columns: ['primary_supervisor_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
        ]
      }
      patient_guardians: {
        Row: {
          created_at: string | null
          document_number: string | null
          email: string | null
          full_name: string
          id: string
          is_primary: boolean | null
          patient_id: string
          phone: string | null
          relationship_type: string
        }
        Insert: {
          created_at?: string | null
          document_number?: string | null
          email?: string | null
          full_name: string
          id?: string
          is_primary?: boolean | null
          patient_id: string
          phone?: string | null
          relationship_type: string
        }
        Update: {
          created_at?: string | null
          document_number?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_primary?: boolean | null
          patient_id?: string
          phone?: string | null
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'patient_guardians_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
        ]
      }
      patients: {
        Row: {
          archived_at: string | null
          birth_date: string | null
          city: string | null
          created_at: string | null
          document_number: string | null
          email: string | null
          external_code: string | null
          full_name: string
          gender_identity: string | null
          id: string
          organization_id: string
          phone: string | null
          sex_at_birth: string | null
          state: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          document_number?: string | null
          email?: string | null
          external_code?: string | null
          full_name: string
          gender_identity?: string | null
          id?: string
          organization_id: string
          phone?: string | null
          sex_at_birth?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          birth_date?: string | null
          city?: string | null
          created_at?: string | null
          document_number?: string | null
          email?: string | null
          external_code?: string | null
          full_name?: string
          gender_identity?: string | null
          id?: string
          organization_id?: string
          phone?: string | null
          sex_at_birth?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'patients_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
        ]
      }
      professionals: {
        Row: {
          can_supervise: boolean | null
          created_at: string | null
          id: string
          license_number: string | null
          license_state: string | null
          license_type: string | null
          occupation_code: string | null
          profile_id: string
          signature_name: string | null
          updated_at: string | null
        }
        Insert: {
          can_supervise?: boolean | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          license_state?: string | null
          license_type?: string | null
          occupation_code?: string | null
          profile_id: string
          signature_name?: string | null
          updated_at?: string | null
        }
        Update: {
          can_supervise?: boolean | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          license_state?: string | null
          license_type?: string | null
          occupation_code?: string | null
          profile_id?: string
          signature_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'professionals_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: true
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profile_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          profile_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          profile_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          profile_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_roles_organization_id_fkey'
            columns: ['organization_id']
            isOneToOne: false
            referencedRelation: 'organizations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_roles_profile_id_fkey'
            columns: ['profile_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_roles_role_id_fkey'
            columns: ['role_id']
            isOneToOne: false
            referencedRelation: 'roles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      risk_strata_definitions: {
        Row: {
          created_at: string | null
          criteria_json: Json
          id: string
          name: string
          rule_set_id: string
          severity_level: number
          strata_code: string
        }
        Insert: {
          created_at?: string | null
          criteria_json: Json
          id?: string
          name: string
          rule_set_id: string
          severity_level: number
          strata_code: string
        }
        Update: {
          created_at?: string | null
          criteria_json?: Json
          id?: string
          name?: string
          rule_set_id?: string
          severity_level?: number
          strata_code?: string
        }
        Relationships: [
          {
            foreignKeyName: 'risk_strata_definitions_rule_set_id_fkey'
            columns: ['rule_set_id']
            isOneToOne: false
            referencedRelation: 'scoring_rule_sets'
            referencedColumns: ['id']
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      scoring_rule_sets: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          instrument_version_id: string
          logic_json: Json
          published_at: string | null
          rule_set_code: string
          status: string | null
          version_code: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          instrument_version_id: string
          logic_json: Json
          published_at?: string | null
          rule_set_code: string
          status?: string | null
          version_code: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          instrument_version_id?: string
          logic_json?: Json
          published_at?: string | null
          rule_set_code?: string
          status?: string | null
          version_code?: string
        }
        Relationships: [
          {
            foreignKeyName: 'scoring_rule_sets_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'scoring_rule_sets_instrument_version_id_fkey'
            columns: ['instrument_version_id']
            isOneToOne: false
            referencedRelation: 'instrument_versions'
            referencedColumns: ['id']
          },
        ]
      }
      taxonomy_constructs: {
        Row: {
          code: string
          construct_type: string
          created_at: string | null
          description: string | null
          id: string
          metadata: Json | null
          name: string
          parent_construct_id: string | null
          taxonomy_domain_id: string
        }
        Insert: {
          code: string
          construct_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name: string
          parent_construct_id?: string | null
          taxonomy_domain_id: string
        }
        Update: {
          code?: string
          construct_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          name?: string
          parent_construct_id?: string | null
          taxonomy_domain_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'taxonomy_constructs_parent_construct_id_fkey'
            columns: ['parent_construct_id']
            isOneToOne: false
            referencedRelation: 'taxonomy_constructs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'taxonomy_constructs_taxonomy_domain_id_fkey'
            columns: ['taxonomy_domain_id']
            isOneToOne: false
            referencedRelation: 'taxonomy_domains'
            referencedColumns: ['id']
          },
        ]
      }
      taxonomy_domains: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          domain_type: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          domain_type: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          domain_type?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      versioned_snapshots: {
        Row: {
          checksum: string
          created_at: string | null
          created_by: string | null
          entity_id: string
          entity_type: string
          id: string
          snapshot_json: Json
          version_number: number
        }
        Insert: {
          checksum: string
          created_at?: string | null
          created_by?: string | null
          entity_id: string
          entity_type: string
          id?: string
          snapshot_json: Json
          version_number: number
        }
        Update: {
          checksum?: string
          created_at?: string | null
          created_by?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          snapshot_json?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: 'versioned_snapshots_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      vital_scores: {
        Row: {
          assessment_result_id: string | null
          created_at: string | null
          id: string
          is_current: boolean | null
          patient_case_id: string
          patient_id: string
          score_band: string
          score_components_json: Json
          score_date: string
          score_version: string
          vital_score: number
        }
        Insert: {
          assessment_result_id?: string | null
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          patient_case_id: string
          patient_id: string
          score_band: string
          score_components_json: Json
          score_date: string
          score_version: string
          vital_score: number
        }
        Update: {
          assessment_result_id?: string | null
          created_at?: string | null
          id?: string
          is_current?: boolean | null
          patient_case_id?: string
          patient_id?: string
          score_band?: string
          score_components_json?: Json
          score_date?: string
          score_version?: string
          vital_score?: number
        }
        Relationships: [
          {
            foreignKeyName: 'vital_scores_assessment_result_id_fkey'
            columns: ['assessment_result_id']
            isOneToOne: false
            referencedRelation: 'assessment_results'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'vital_scores_patient_case_id_fkey'
            columns: ['patient_case_id']
            isOneToOne: false
            referencedRelation: 'patient_cases'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'vital_scores_patient_id_fkey'
            columns: ['patient_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: { Args: { role_code: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: assessment_instruments
//   id: uuid (not null, default: gen_random_uuid())
//   code: text (not null)
//   name: text (not null)
//   instrument_type: text (not null)
//   description: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: assessment_responses
//   id: uuid (not null, default: gen_random_uuid())
//   assessment_session_id: uuid (not null)
//   instrument_item_id: uuid (not null)
//   response_numeric: numeric (nullable)
//   response_text: text (nullable)
//   response_boolean: boolean (nullable)
//   response_json: jsonb (nullable)
//   answered_at: timestamp with time zone (nullable, default: now())
//   answered_by: uuid (nullable)
//   source: text (nullable)
//   is_valid: boolean (nullable, default: true)
// Table: assessment_result_construct_scores
//   id: uuid (not null, default: gen_random_uuid())
//   assessment_result_id: uuid (not null)
//   taxonomy_construct_id: uuid (not null)
//   raw_score: numeric (nullable)
//   normalized_score: numeric (nullable)
//   percentile: numeric (nullable)
//   risk_band: text (nullable)
//   interpretation: text (nullable)
// Table: assessment_results
//   id: uuid (not null, default: gen_random_uuid())
//   assessment_session_id: uuid (not null)
//   rule_set_id: uuid (not null)
//   generated_at: timestamp with time zone (nullable, default: now())
//   generated_by: uuid (nullable)
//   severity_label: text (nullable)
//   summary_text: text (nullable)
//   result_json: jsonb (not null)
//   result_checksum: text (not null)
//   is_final: boolean (nullable, default: false)
// Table: assessment_sessions
//   id: uuid (not null, default: gen_random_uuid())
//   patient_case_id: uuid (not null)
//   patient_id: uuid (not null)
//   organization_id: uuid (not null)
//   organization_unit_id: uuid (not null)
//   instrument_version_id: uuid (not null)
//   applicator_id: uuid (not null)
//   supervisor_id: uuid (nullable)
//   session_status: text (nullable, default: 'in_progress'::text)
//   started_at: timestamp with time zone (nullable, default: now())
//   completed_at: timestamp with time zone (nullable)
//   source_channel: text (nullable)
//   raw_payload_checksum: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: audit_log
//   id: bigint (not null, default: nextval('audit_log_id_seq'::regclass))
//   occurred_at: timestamp with time zone (nullable, default: now())
//   actor_profile_id: uuid (nullable)
//   table_name: text (not null)
//   record_id: uuid (nullable)
//   action: text (not null)
//   old_data: jsonb (nullable)
//   new_data: jsonb (nullable)
//   reason: text (nullable)
//   request_id: text (nullable)
//   ip_address: inet (nullable)
// Table: case_team_assignments
//   id: uuid (not null, default: gen_random_uuid())
//   patient_case_id: uuid (not null)
//   professional_id: uuid (not null)
//   assignment_role: text (not null)
//   starts_at: timestamp with time zone (nullable, default: now())
//   ends_at: timestamp with time zone (nullable)
// Table: clinical_events
//   id: uuid (not null, default: gen_random_uuid())
//   patient_case_id: uuid (not null)
//   patient_id: uuid (not null)
//   event_type: text (not null)
//   event_at: timestamp with time zone (nullable, default: now())
//   performed_by: uuid (nullable)
//   source_table: text (nullable)
//   source_record_id: uuid (nullable)
//   payload: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: clinical_report_artifacts
//   id: uuid (not null, default: gen_random_uuid())
//   clinical_report_id: uuid (not null)
//   artifact_type: text (not null)
//   file_url: text (not null)
//   file_checksum: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: clinical_reports
//   id: uuid (not null, default: gen_random_uuid())
//   patient_case_id: uuid (not null)
//   assessment_result_id: uuid (nullable)
//   report_type: text (not null)
//   title: text (not null)
//   body_markdown: text (not null)
//   criteria_version: text (not null)
//   protocol_version: text (not null)
//   atlas_version: text (nullable)
//   author_professional_id: uuid (not null)
//   supervisor_professional_id: uuid (nullable)
//   status: text (nullable, default: 'draft'::text)
//   signed_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: consents
//   id: uuid (not null, default: gen_random_uuid())
//   patient_id: uuid (not null)
//   guardian_id: uuid (nullable)
//   consent_type: text (not null)
//   document_version: text (not null)
//   signed_at: timestamp with time zone (not null)
//   signed_by_name: text (not null)
//   signature_method: text (nullable)
//   status: text (nullable, default: 'active'::text)
//   file_url: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: instrument_item_construct_links
//   id: uuid (not null, default: gen_random_uuid())
//   instrument_item_id: uuid (not null)
//   taxonomy_construct_id: uuid (not null)
//   weight: numeric (nullable, default: 1)
//   link_type: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: instrument_items
//   id: uuid (not null, default: gen_random_uuid())
//   instrument_version_id: uuid (not null)
//   section_id: uuid (nullable)
//   item_code: text (not null)
//   prompt_text: text (not null)
//   response_type: text (not null)
//   is_required: boolean (nullable, default: true)
//   sort_order: integer (not null)
//   metadata: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: instrument_sections
//   id: uuid (not null, default: gen_random_uuid())
//   instrument_version_id: uuid (not null)
//   code: text (not null)
//   title: text (not null)
//   sort_order: integer (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: instrument_versions
//   id: uuid (not null, default: gen_random_uuid())
//   instrument_id: uuid (not null)
//   version_code: text (not null)
//   status: text (nullable, default: 'draft'::text)
//   published_at: timestamp with time zone (nullable)
//   scoring_engine_version: text (not null)
//   criteria_version: text (not null)
//   atlas_version: text (nullable)
//   notes: text (nullable)
//   created_by: uuid (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: organization_units
//   id: uuid (not null, default: gen_random_uuid())
//   organization_id: uuid (not null)
//   name: text (not null)
//   unit_type: text (not null)
//   city: text (nullable)
//   state: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: organizations
//   id: uuid (not null, default: gen_random_uuid())
//   legal_name: text (not null)
//   trade_name: text (nullable)
//   organization_type: text (not null)
//   document_number: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: patient_cases
//   id: uuid (not null, default: gen_random_uuid())
//   patient_id: uuid (not null)
//   organization_unit_id: uuid (not null)
//   opened_by: uuid (not null)
//   primary_supervisor_id: uuid (nullable)
//   case_status: text (nullable, default: 'open'::text)
//   care_line: text (nullable)
//   initial_reason: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   closed_at: timestamp with time zone (nullable)
// Table: patient_guardians
//   id: uuid (not null, default: gen_random_uuid())
//   patient_id: uuid (not null)
//   full_name: text (not null)
//   relationship_type: text (not null)
//   document_number: text (nullable)
//   phone: text (nullable)
//   email: text (nullable)
//   is_primary: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: patients
//   id: uuid (not null, default: gen_random_uuid())
//   organization_id: uuid (not null)
//   external_code: text (nullable)
//   full_name: text (not null)
//   birth_date: date (nullable)
//   sex_at_birth: text (nullable)
//   gender_identity: text (nullable)
//   document_number: text (nullable)
//   phone: text (nullable)
//   email: text (nullable)
//   city: text (nullable)
//   state: text (nullable)
//   status: text (nullable, default: 'active'::text)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
//   archived_at: timestamp with time zone (nullable)
// Table: professionals
//   id: uuid (not null, default: gen_random_uuid())
//   profile_id: uuid (not null)
//   occupation_code: text (nullable)
//   license_type: text (nullable)
//   license_number: text (nullable)
//   license_state: text (nullable)
//   signature_name: text (nullable)
//   can_supervise: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: profile_roles
//   id: uuid (not null, default: gen_random_uuid())
//   profile_id: uuid (not null)
//   role_id: uuid (not null)
//   organization_id: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null)
//   full_name: text (not null)
//   email: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: risk_strata_definitions
//   id: uuid (not null, default: gen_random_uuid())
//   rule_set_id: uuid (not null)
//   strata_code: text (not null)
//   name: text (not null)
//   severity_level: integer (not null)
//   criteria_json: jsonb (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: roles
//   id: uuid (not null, default: gen_random_uuid())
//   code: text (not null)
//   name: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: scoring_rule_sets
//   id: uuid (not null, default: gen_random_uuid())
//   instrument_version_id: uuid (not null)
//   rule_set_code: text (not null)
//   version_code: text (not null)
//   status: text (nullable, default: 'draft'::text)
//   logic_json: jsonb (not null)
//   created_by: uuid (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   published_at: timestamp with time zone (nullable)
// Table: taxonomy_constructs
//   id: uuid (not null, default: gen_random_uuid())
//   taxonomy_domain_id: uuid (not null)
//   parent_construct_id: uuid (nullable)
//   code: text (not null)
//   name: text (not null)
//   construct_type: text (not null)
//   description: text (nullable)
//   metadata: jsonb (nullable, default: '{}'::jsonb)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: taxonomy_domains
//   id: uuid (not null, default: gen_random_uuid())
//   code: text (not null)
//   name: text (not null)
//   domain_type: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: versioned_snapshots
//   id: uuid (not null, default: gen_random_uuid())
//   entity_type: text (not null)
//   entity_id: uuid (not null)
//   version_number: integer (not null)
//   snapshot_json: jsonb (not null)
//   checksum: text (not null)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: vital_scores
//   id: uuid (not null, default: gen_random_uuid())
//   patient_case_id: uuid (not null)
//   patient_id: uuid (not null)
//   assessment_result_id: uuid (nullable)
//   score_date: date (not null)
//   vital_score: numeric (not null)
//   score_band: text (not null)
//   score_version: text (not null)
//   score_components_json: jsonb (not null)
//   is_current: boolean (nullable, default: false)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: assessment_instruments
//   UNIQUE assessment_instruments_code_key: UNIQUE (code)
//   PRIMARY KEY assessment_instruments_pkey: PRIMARY KEY (id)
// Table: assessment_responses
//   FOREIGN KEY assessment_responses_answered_by_fkey: FOREIGN KEY (answered_by) REFERENCES profiles(id) ON DELETE SET NULL
//   FOREIGN KEY assessment_responses_assessment_session_id_fkey: FOREIGN KEY (assessment_session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE
//   UNIQUE assessment_responses_assessment_session_id_instrument_item__key: UNIQUE (assessment_session_id, instrument_item_id)
//   FOREIGN KEY assessment_responses_instrument_item_id_fkey: FOREIGN KEY (instrument_item_id) REFERENCES instrument_items(id) ON DELETE RESTRICT
//   PRIMARY KEY assessment_responses_pkey: PRIMARY KEY (id)
// Table: assessment_result_construct_scores
//   UNIQUE assessment_result_construct_s_assessment_result_id_taxonomy_key: UNIQUE (assessment_result_id, taxonomy_construct_id)
//   FOREIGN KEY assessment_result_construct_scores_assessment_result_id_fkey: FOREIGN KEY (assessment_result_id) REFERENCES assessment_results(id) ON DELETE CASCADE
//   PRIMARY KEY assessment_result_construct_scores_pkey: PRIMARY KEY (id)
//   FOREIGN KEY assessment_result_construct_scores_taxonomy_construct_id_fkey: FOREIGN KEY (taxonomy_construct_id) REFERENCES taxonomy_constructs(id) ON DELETE CASCADE
// Table: assessment_results
//   FOREIGN KEY assessment_results_assessment_session_id_fkey: FOREIGN KEY (assessment_session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE
//   UNIQUE assessment_results_assessment_session_id_key: UNIQUE (assessment_session_id)
//   FOREIGN KEY assessment_results_generated_by_fkey: FOREIGN KEY (generated_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY assessment_results_pkey: PRIMARY KEY (id)
//   FOREIGN KEY assessment_results_rule_set_id_fkey: FOREIGN KEY (rule_set_id) REFERENCES scoring_rule_sets(id) ON DELETE RESTRICT
// Table: assessment_sessions
//   FOREIGN KEY assessment_sessions_applicator_id_fkey: FOREIGN KEY (applicator_id) REFERENCES professionals(id) ON DELETE RESTRICT
//   FOREIGN KEY assessment_sessions_instrument_version_id_fkey: FOREIGN KEY (instrument_version_id) REFERENCES instrument_versions(id) ON DELETE RESTRICT
//   FOREIGN KEY assessment_sessions_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
//   FOREIGN KEY assessment_sessions_organization_unit_id_fkey: FOREIGN KEY (organization_unit_id) REFERENCES organization_units(id) ON DELETE CASCADE
//   FOREIGN KEY assessment_sessions_patient_case_id_fkey: FOREIGN KEY (patient_case_id) REFERENCES patient_cases(id) ON DELETE CASCADE
//   FOREIGN KEY assessment_sessions_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   PRIMARY KEY assessment_sessions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY assessment_sessions_supervisor_id_fkey: FOREIGN KEY (supervisor_id) REFERENCES professionals(id) ON DELETE SET NULL
// Table: audit_log
//   FOREIGN KEY audit_log_actor_profile_id_fkey: FOREIGN KEY (actor_profile_id) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY audit_log_pkey: PRIMARY KEY (id)
// Table: case_team_assignments
//   FOREIGN KEY case_team_assignments_patient_case_id_fkey: FOREIGN KEY (patient_case_id) REFERENCES patient_cases(id) ON DELETE CASCADE
//   PRIMARY KEY case_team_assignments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY case_team_assignments_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
// Table: clinical_events
//   FOREIGN KEY clinical_events_patient_case_id_fkey: FOREIGN KEY (patient_case_id) REFERENCES patient_cases(id) ON DELETE CASCADE
//   FOREIGN KEY clinical_events_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   FOREIGN KEY clinical_events_performed_by_fkey: FOREIGN KEY (performed_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY clinical_events_pkey: PRIMARY KEY (id)
// Table: clinical_report_artifacts
//   FOREIGN KEY clinical_report_artifacts_clinical_report_id_fkey: FOREIGN KEY (clinical_report_id) REFERENCES clinical_reports(id) ON DELETE CASCADE
//   PRIMARY KEY clinical_report_artifacts_pkey: PRIMARY KEY (id)
// Table: clinical_reports
//   FOREIGN KEY clinical_reports_assessment_result_id_fkey: FOREIGN KEY (assessment_result_id) REFERENCES assessment_results(id) ON DELETE SET NULL
//   FOREIGN KEY clinical_reports_author_professional_id_fkey: FOREIGN KEY (author_professional_id) REFERENCES professionals(id) ON DELETE RESTRICT
//   FOREIGN KEY clinical_reports_patient_case_id_fkey: FOREIGN KEY (patient_case_id) REFERENCES patient_cases(id) ON DELETE CASCADE
//   PRIMARY KEY clinical_reports_pkey: PRIMARY KEY (id)
//   FOREIGN KEY clinical_reports_supervisor_professional_id_fkey: FOREIGN KEY (supervisor_professional_id) REFERENCES professionals(id) ON DELETE SET NULL
// Table: consents
//   FOREIGN KEY consents_guardian_id_fkey: FOREIGN KEY (guardian_id) REFERENCES patient_guardians(id) ON DELETE SET NULL
//   FOREIGN KEY consents_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   PRIMARY KEY consents_pkey: PRIMARY KEY (id)
// Table: instrument_item_construct_links
//   UNIQUE instrument_item_construct_lin_instrument_item_id_taxonomy_c_key: UNIQUE (instrument_item_id, taxonomy_construct_id, link_type)
//   FOREIGN KEY instrument_item_construct_links_instrument_item_id_fkey: FOREIGN KEY (instrument_item_id) REFERENCES instrument_items(id) ON DELETE CASCADE
//   PRIMARY KEY instrument_item_construct_links_pkey: PRIMARY KEY (id)
//   FOREIGN KEY instrument_item_construct_links_taxonomy_construct_id_fkey: FOREIGN KEY (taxonomy_construct_id) REFERENCES taxonomy_constructs(id) ON DELETE CASCADE
// Table: instrument_items
//   FOREIGN KEY instrument_items_instrument_version_id_fkey: FOREIGN KEY (instrument_version_id) REFERENCES instrument_versions(id) ON DELETE CASCADE
//   UNIQUE instrument_items_instrument_version_id_item_code_key: UNIQUE (instrument_version_id, item_code)
//   PRIMARY KEY instrument_items_pkey: PRIMARY KEY (id)
//   FOREIGN KEY instrument_items_section_id_fkey: FOREIGN KEY (section_id) REFERENCES instrument_sections(id) ON DELETE SET NULL
// Table: instrument_sections
//   UNIQUE instrument_sections_instrument_version_id_code_key: UNIQUE (instrument_version_id, code)
//   FOREIGN KEY instrument_sections_instrument_version_id_fkey: FOREIGN KEY (instrument_version_id) REFERENCES instrument_versions(id) ON DELETE CASCADE
//   PRIMARY KEY instrument_sections_pkey: PRIMARY KEY (id)
// Table: instrument_versions
//   FOREIGN KEY instrument_versions_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT
//   FOREIGN KEY instrument_versions_instrument_id_fkey: FOREIGN KEY (instrument_id) REFERENCES assessment_instruments(id) ON DELETE CASCADE
//   UNIQUE instrument_versions_instrument_id_version_code_key: UNIQUE (instrument_id, version_code)
//   PRIMARY KEY instrument_versions_pkey: PRIMARY KEY (id)
// Table: organization_units
//   FOREIGN KEY organization_units_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
//   UNIQUE organization_units_organization_id_name_key: UNIQUE (organization_id, name)
//   PRIMARY KEY organization_units_pkey: PRIMARY KEY (id)
// Table: organizations
//   PRIMARY KEY organizations_pkey: PRIMARY KEY (id)
// Table: patient_cases
//   FOREIGN KEY patient_cases_opened_by_fkey: FOREIGN KEY (opened_by) REFERENCES profiles(id) ON DELETE RESTRICT
//   FOREIGN KEY patient_cases_organization_unit_id_fkey: FOREIGN KEY (organization_unit_id) REFERENCES organization_units(id) ON DELETE CASCADE
//   FOREIGN KEY patient_cases_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   PRIMARY KEY patient_cases_pkey: PRIMARY KEY (id)
//   FOREIGN KEY patient_cases_primary_supervisor_id_fkey: FOREIGN KEY (primary_supervisor_id) REFERENCES professionals(id) ON DELETE SET NULL
// Table: patient_guardians
//   FOREIGN KEY patient_guardians_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   PRIMARY KEY patient_guardians_pkey: PRIMARY KEY (id)
// Table: patients
//   UNIQUE patients_organization_id_external_code_key: UNIQUE (organization_id, external_code)
//   FOREIGN KEY patients_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
//   PRIMARY KEY patients_pkey: PRIMARY KEY (id)
// Table: professionals
//   PRIMARY KEY professionals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY professionals_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
//   UNIQUE professionals_profile_id_key: UNIQUE (profile_id)
// Table: profile_roles
//   FOREIGN KEY profile_roles_organization_id_fkey: FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE
//   PRIMARY KEY profile_roles_pkey: PRIMARY KEY (id)
//   FOREIGN KEY profile_roles_profile_id_fkey: FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
//   UNIQUE profile_roles_profile_id_role_id_organization_id_key: UNIQUE (profile_id, role_id, organization_id)
//   FOREIGN KEY profile_roles_role_id_fkey: FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
// Table: profiles
//   FOREIGN KEY profiles_id_fkey: FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
// Table: risk_strata_definitions
//   PRIMARY KEY risk_strata_definitions_pkey: PRIMARY KEY (id)
//   FOREIGN KEY risk_strata_definitions_rule_set_id_fkey: FOREIGN KEY (rule_set_id) REFERENCES scoring_rule_sets(id) ON DELETE CASCADE
//   UNIQUE risk_strata_definitions_rule_set_id_strata_code_key: UNIQUE (rule_set_id, strata_code)
// Table: roles
//   UNIQUE roles_code_key: UNIQUE (code)
//   UNIQUE roles_name_key: UNIQUE (name)
//   PRIMARY KEY roles_pkey: PRIMARY KEY (id)
// Table: scoring_rule_sets
//   FOREIGN KEY scoring_rule_sets_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE RESTRICT
//   FOREIGN KEY scoring_rule_sets_instrument_version_id_fkey: FOREIGN KEY (instrument_version_id) REFERENCES instrument_versions(id) ON DELETE CASCADE
//   UNIQUE scoring_rule_sets_instrument_version_id_rule_set_code_versi_key: UNIQUE (instrument_version_id, rule_set_code, version_code)
//   PRIMARY KEY scoring_rule_sets_pkey: PRIMARY KEY (id)
// Table: taxonomy_constructs
//   FOREIGN KEY taxonomy_constructs_parent_construct_id_fkey: FOREIGN KEY (parent_construct_id) REFERENCES taxonomy_constructs(id) ON DELETE CASCADE
//   PRIMARY KEY taxonomy_constructs_pkey: PRIMARY KEY (id)
//   UNIQUE taxonomy_constructs_taxonomy_domain_id_code_key: UNIQUE (taxonomy_domain_id, code)
//   FOREIGN KEY taxonomy_constructs_taxonomy_domain_id_fkey: FOREIGN KEY (taxonomy_domain_id) REFERENCES taxonomy_domains(id) ON DELETE CASCADE
// Table: taxonomy_domains
//   UNIQUE taxonomy_domains_code_key: UNIQUE (code)
//   PRIMARY KEY taxonomy_domains_pkey: PRIMARY KEY (id)
// Table: versioned_snapshots
//   FOREIGN KEY versioned_snapshots_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   UNIQUE versioned_snapshots_entity_type_entity_id_version_number_key: UNIQUE (entity_type, entity_id, version_number)
//   PRIMARY KEY versioned_snapshots_pkey: PRIMARY KEY (id)
// Table: vital_scores
//   FOREIGN KEY vital_scores_assessment_result_id_fkey: FOREIGN KEY (assessment_result_id) REFERENCES assessment_results(id) ON DELETE SET NULL
//   FOREIGN KEY vital_scores_patient_case_id_fkey: FOREIGN KEY (patient_case_id) REFERENCES patient_cases(id) ON DELETE CASCADE
//   FOREIGN KEY vital_scores_patient_id_fkey: FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
//   PRIMARY KEY vital_scores_pkey: PRIMARY KEY (id)

// --- ROW LEVEL SECURITY POLICIES ---
// Table: assessment_instruments
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: assessment_responses
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: assessment_result_construct_scores
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: assessment_results
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: assessment_sessions
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: audit_log
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: case_team_assignments
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: clinical_events
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: clinical_report_artifacts
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: clinical_reports
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: consents
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: instrument_item_construct_links
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: instrument_items
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: instrument_sections
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: instrument_versions
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: organization_units
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: organizations
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: patient_cases
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: patient_guardians
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: patients
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: professionals
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: profile_roles
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: profiles
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: risk_strata_definitions
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: roles
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: scoring_rule_sets
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: taxonomy_constructs
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: taxonomy_domains
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: versioned_snapshots
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true
// Table: vital_scores
//   Policy "Enable delete access for authenticated users" (DELETE, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable insert access for authenticated users" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Enable read access for authenticated users" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Enable update access for authenticated users" (UPDATE, PERMISSIVE) roles={authenticated}
//     USING: true

// --- DATABASE FUNCTIONS ---
// FUNCTION has_role(text)
//   CREATE OR REPLACE FUNCTION public.has_role(role_code text)
//    RETURNS boolean
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   BEGIN
//     RETURN EXISTS (
//       SELECT 1 FROM public.profile_roles pr
//       JOIN public.roles r ON r.id = pr.role_id
//       WHERE pr.profile_id = auth.uid()
//       AND r.code = role_code
//     );
//   END;
//   $function$
//
// FUNCTION neurostrata_audit_trigger()
//   CREATE OR REPLACE FUNCTION public.neurostrata_audit_trigger()
//    RETURNS trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//   AS $function$
//   DECLARE
//     v_old_data JSONB;
//     v_new_data JSONB;
//     v_actor_id UUID;
//     v_record_id UUID;
//   BEGIN
//     v_actor_id := auth.uid();
//
//     IF (TG_OP = 'UPDATE') THEN
//       v_old_data := to_jsonb(OLD);
//       v_new_data := to_jsonb(NEW);
//       EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
//       INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data, new_data)
//       VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data, v_new_data);
//       RETURN NEW;
//     ELSIF (TG_OP = 'DELETE') THEN
//       v_old_data := to_jsonb(OLD);
//       EXECUTE 'SELECT $1.id' USING OLD INTO v_record_id;
//       INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data)
//       VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data);
//       RETURN OLD;
//     ELSIF (TG_OP = 'INSERT') THEN
//       v_new_data := to_jsonb(NEW);
//       EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
//       INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, new_data)
//       VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_new_data);
//       RETURN NEW;
//     END IF;
//     RETURN NULL;
//   EXCEPTION WHEN OTHERS THEN
//     -- Fallback if table doesn't have an 'id' column
//     IF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN RETURN NEW; END IF;
//     RETURN OLD;
//   END;
//   $function$
//
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//
// FUNCTION set_updated_at()
//   CREATE OR REPLACE FUNCTION public.set_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//     NEW.updated_at = NOW();
//     RETURN NEW;
//   END;
//   $function$
//

// --- TRIGGERS ---
// Table: assessment_results
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.assessment_results FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
// Table: assessment_sessions
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.assessment_sessions FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
// Table: clinical_reports
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.clinical_reports FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.clinical_reports FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: instrument_versions
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.instrument_versions FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
// Table: organizations
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: patient_cases
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.patient_cases FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.patient_cases FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: patients
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: professionals
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.professionals FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: profiles
//   set_updated_at_trigger: CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at()
// Table: scoring_rule_sets
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.scoring_rule_sets FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()
// Table: vital_scores
//   neurostrata_audit_trigger: CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR DELETE OR UPDATE ON public.vital_scores FOR EACH ROW EXECUTE FUNCTION neurostrata_audit_trigger()

// --- INDEXES ---
// Table: assessment_instruments
//   CREATE UNIQUE INDEX assessment_instruments_code_key ON public.assessment_instruments USING btree (code)
// Table: assessment_responses
//   CREATE UNIQUE INDEX assessment_responses_assessment_session_id_instrument_item__key ON public.assessment_responses USING btree (assessment_session_id, instrument_item_id)
//   CREATE INDEX idx_assessment_responses_session ON public.assessment_responses USING btree (assessment_session_id)
// Table: assessment_result_construct_scores
//   CREATE UNIQUE INDEX assessment_result_construct_s_assessment_result_id_taxonomy_key ON public.assessment_result_construct_scores USING btree (assessment_result_id, taxonomy_construct_id)
// Table: assessment_results
//   CREATE UNIQUE INDEX assessment_results_assessment_session_id_key ON public.assessment_results USING btree (assessment_session_id)
//   CREATE INDEX idx_assessment_results_session ON public.assessment_results USING btree (assessment_session_id)
// Table: assessment_sessions
//   CREATE INDEX idx_assessment_sessions_patient ON public.assessment_sessions USING btree (patient_id)
// Table: audit_log
//   CREATE INDEX idx_audit_log_table_record ON public.audit_log USING btree (table_name, record_id)
// Table: clinical_reports
//   CREATE INDEX idx_clinical_reports_patient_case ON public.clinical_reports USING btree (patient_case_id)
// Table: instrument_item_construct_links
//   CREATE UNIQUE INDEX instrument_item_construct_lin_instrument_item_id_taxonomy_c_key ON public.instrument_item_construct_links USING btree (instrument_item_id, taxonomy_construct_id, link_type)
// Table: instrument_items
//   CREATE UNIQUE INDEX instrument_items_instrument_version_id_item_code_key ON public.instrument_items USING btree (instrument_version_id, item_code)
// Table: instrument_sections
//   CREATE UNIQUE INDEX instrument_sections_instrument_version_id_code_key ON public.instrument_sections USING btree (instrument_version_id, code)
// Table: instrument_versions
//   CREATE UNIQUE INDEX instrument_versions_instrument_id_version_code_key ON public.instrument_versions USING btree (instrument_id, version_code)
// Table: organization_units
//   CREATE UNIQUE INDEX organization_units_organization_id_name_key ON public.organization_units USING btree (organization_id, name)
// Table: patient_cases
//   CREATE INDEX idx_patient_cases_patient ON public.patient_cases USING btree (patient_id)
// Table: patients
//   CREATE INDEX idx_patients_org ON public.patients USING btree (organization_id)
//   CREATE INDEX idx_patients_status ON public.patients USING btree (status)
//   CREATE UNIQUE INDEX patients_organization_id_external_code_key ON public.patients USING btree (organization_id, external_code)
// Table: professionals
//   CREATE UNIQUE INDEX professionals_profile_id_key ON public.professionals USING btree (profile_id)
// Table: profile_roles
//   CREATE UNIQUE INDEX profile_roles_profile_id_role_id_organization_id_key ON public.profile_roles USING btree (profile_id, role_id, organization_id)
// Table: risk_strata_definitions
//   CREATE UNIQUE INDEX risk_strata_definitions_rule_set_id_strata_code_key ON public.risk_strata_definitions USING btree (rule_set_id, strata_code)
// Table: roles
//   CREATE UNIQUE INDEX roles_code_key ON public.roles USING btree (code)
//   CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name)
// Table: scoring_rule_sets
//   CREATE UNIQUE INDEX scoring_rule_sets_instrument_version_id_rule_set_code_versi_key ON public.scoring_rule_sets USING btree (instrument_version_id, rule_set_code, version_code)
// Table: taxonomy_constructs
//   CREATE UNIQUE INDEX taxonomy_constructs_taxonomy_domain_id_code_key ON public.taxonomy_constructs USING btree (taxonomy_domain_id, code)
// Table: taxonomy_domains
//   CREATE UNIQUE INDEX taxonomy_domains_code_key ON public.taxonomy_domains USING btree (code)
// Table: versioned_snapshots
//   CREATE INDEX idx_versioned_snapshots_entity ON public.versioned_snapshots USING btree (entity_type, entity_id)
//   CREATE UNIQUE INDEX versioned_snapshots_entity_type_entity_id_version_number_key ON public.versioned_snapshots USING btree (entity_type, entity_id, version_number)
// Table: vital_scores
//   CREATE INDEX idx_vital_scores_patient ON public.vital_scores USING btree (patient_id)

export type TrustRepositoryErrorCode =
  | 'DUPLICATE_EVENT_ID'
  | 'DUPLICATE_EVENT_HASH'
  | 'DUPLICATE_DECISION_ID'
  | 'INVALID_APPEND_ORDER'
  | 'INVALID_EVENT_HASH'
  | 'ACCESS_DENIED'
  | 'INVALID_DATABASE_ROW'
  | 'PERSISTENCE_ERROR'

export class TrustRepositoryError extends Error {
  constructor(
    public readonly code: TrustRepositoryErrorCode,
    public readonly operation: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'TrustRepositoryError'
  }
}

export interface SupabaseErrorLike {
  code?: string
  message?: string
  details?: string
  hint?: string
}

export function normalizeSupabaseError(
  error: SupabaseErrorLike,
  operation: string,
): TrustRepositoryError {
  const searchable = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase()

  if (error.code === '23505') {
    if (searchable.includes('event_hash')) {
      return new TrustRepositoryError(
        'DUPLICATE_EVENT_HASH',
        operation,
        'An event with the same hash already exists.',
        { cause: error },
      )
    }
    if (searchable.includes('decision')) {
      return new TrustRepositoryError(
        'DUPLICATE_DECISION_ID',
        operation,
        'A decision with the same identifier already exists.',
        { cause: error },
      )
    }
    return new TrustRepositoryError(
      'DUPLICATE_EVENT_ID',
      operation,
      'An event with the same identifier already exists.',
      { cause: error },
    )
  }

  if (error.code === '42501') {
    return new TrustRepositoryError('ACCESS_DENIED', operation, 'Persistence access was denied.', {
      cause: error,
    })
  }

  if (error.code === 'P0001' && searchable.includes('append')) {
    return new TrustRepositoryError(
      'INVALID_APPEND_ORDER',
      operation,
      'The event does not extend the current resource chain.',
      { cause: error },
    )
  }

  return new TrustRepositoryError(
    'PERSISTENCE_ERROR',
    operation,
    'The persistence operation failed.',
    { cause: error },
  )
}

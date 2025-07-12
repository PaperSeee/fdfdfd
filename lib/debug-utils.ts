/**
 * Utilitaires de débogage pour les erreurs d'accès aux propriétés
 */

export function safeAccess<T>(obj: any, path: string): T | undefined {
  try {
    return path.split('.').reduce((current, key) => {
      if (current === null || current === undefined) {
        console.warn(`Safe access: ${key} is undefined in path ${path}`, obj)
        return undefined
      }
      return current[key]
    }, obj)
  } catch (error) {
    console.error(`Safe access error for path ${path}:`, error, obj)
    return undefined
  }
}

export function debugObject(obj: any, name: string = 'object') {
  if (process.env.NODE_ENV === 'development') {
    console.group(`Debug: ${name}`)
    console.log('Type:', typeof obj)
    console.log('Value:', obj)
    console.log('Keys:', obj ? Object.keys(obj) : 'N/A')
    console.groupEnd()
  }
}

export function withErrorBoundary<T>(
  fn: () => T,
  fallback: T,
  errorMessage?: string
): T {
  try {
    return fn()
  } catch (error) {
    console.warn(errorMessage || 'Function execution failed:', error)
    return fallback
  }
}

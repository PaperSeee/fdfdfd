import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Vérifications SSR et window
    if (typeof window === 'undefined') return

    const updateMobile = () => {
      try {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      } catch (error) {
        console.warn('Error updating mobile state:', error)
        setIsMobile(false)
      }
    }

    // Vérification de matchMedia
    if (typeof window.matchMedia === 'function') {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      const onChange = () => {
        updateMobile()
      }
      
      // Vérification de l'API addEventListener
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener("change", onChange)
        updateMobile()
        return () => mql.removeEventListener("change", onChange)
      } else if (typeof mql.addListener === 'function') {
        // Fallback pour anciens navigateurs
        mql.addListener(onChange)
        updateMobile()
        return () => mql.removeListener(onChange)
      }
    }

    // Fallback simple si matchMedia n'est pas supporté
    updateMobile()
    window.addEventListener('resize', updateMobile)
    return () => window.removeEventListener('resize', updateMobile)
  }, [])

  return !!isMobile
}

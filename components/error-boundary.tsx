"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorDetails?: string
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Analyser l'erreur pour identifier le pattern 'S'
    const errorMessage = error.message || ''
    let errorDetails = ''
    
    if (errorMessage.includes("Cannot read properties of undefined (reading 'S')")) {
      errorDetails = "Objet undefined avec propriété 'S' - probablement un problème de props ou state"
    } else if (errorMessage.includes("'S'")) {
      errorDetails = "Erreur liée à la propriété 'S'"
    }
    
    return { 
      hasError: true, 
      error,
      errorDetails 
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("🔴 ErrorBoundary - Analyse détaillée:", {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR'
    })
    
    // Identifier le composant fautif
    const componentMatch = errorInfo.componentStack?.match(/at (\w+)/g)
    if (componentMatch) {
      console.error("🎯 Composants dans la stack:", componentMatch)
    }
    
    // Appeler le callback d'erreur si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-[400px] w-full bg-gray-900 rounded-lg flex items-center justify-center border border-red-700">
          <div className="text-center p-6 max-w-md">
            <div className="text-red-400 text-lg font-semibold mb-3">🔴 Erreur React</div>
            <div className="text-sm text-gray-300 mb-2">
              {this.state.error?.message || "Une erreur s'est produite"}
            </div>
            {this.state.errorDetails && (
              <div className="text-xs text-yellow-400 mb-4 p-2 bg-yellow-900/20 rounded">
                💡 {this.state.errorDetails}
              </div>
            )}
            <div className="text-xs text-gray-500 mb-4">
              Vérifiez la console pour plus de détails
            </div>
            <button 
              onClick={() => {
                console.log("🔄 Tentative de récupération...")
                this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorDetails: undefined })
              }}
              className="text-sm text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

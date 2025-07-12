"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
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
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", {
      error,
      errorInfo,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
    
    // Appeler le callback d'erreur si fourni
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
    
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="h-[400px] w-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
          <div className="text-center p-6">
            <div className="text-red-400 text-sm mb-2">Erreur de rendu détectée</div>
            <div className="text-xs text-gray-500 mb-4">
              {this.state.error?.message || "Une erreur s'est produite"}
            </div>
            <button 
              onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
              className="text-xs text-gray-500 hover:text-gray-400 underline bg-gray-800 px-3 py-1 rounded"
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

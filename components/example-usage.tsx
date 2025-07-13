"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import dynamique avec SSR désactivé
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-gray-400 text-sm">Chargement 3D...</div>
      </div>
    </div>
  )
})

export default function ExampleUsage() {
  const [currentMode, setCurrentMode] = useState("vitrine")
  const [introComplete, setIntroComplete] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Simuler la fin de l'intro après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroComplete(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleModeChange = (newMode: string) => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentMode(newMode)
    
    // Simuler la fin de transition après 500ms
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Exemple d'utilisation ThreeScene
      </h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl mb-4">Mode actuel: {currentMode}</h2>
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => handleModeChange("vitrine")}
              className={`px-4 py-2 rounded ${
                currentMode === "vitrine" 
                  ? "bg-white text-black" 
                  : "bg-gray-800 text-white"
              }`}
            >
              Vitrine
            </button>
            <button
              onClick={() => handleModeChange("ecommerce")}
              className={`px-4 py-2 rounded ${
                currentMode === "ecommerce" 
                  ? "bg-green-500 text-white" 
                  : "bg-gray-800 text-white"
              }`}
            >
              E-commerce
            </button>
            <button
              onClick={() => handleModeChange("saas")}
              className={`px-4 py-2 rounded ${
                currentMode === "saas" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-800 text-white"
              }`}
            >
              SaaS
            </button>
          </div>
        </div>
        
        {/* Composant 3D */}
        <ThreeScene
          currentMode={currentMode || "vitrine"}
          height="h-96"
          introComplete={!!introComplete}
          isTransitioning={!!isTransitioning}
          onModeChange={handleModeChange}
        />
        
        <div className="mt-8 text-center text-gray-400">
          <p>Cliquez sur l'objet 3D pour changer de mode</p>
          <p className="text-sm mt-2">
            Intro terminée: {introComplete ? "✅" : "⏳"}
          </p>
        </div>
      </div>
    </div>
  )
}

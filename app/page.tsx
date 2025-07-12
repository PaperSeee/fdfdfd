"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { gsap } from "gsap"
import InteractiveObject from "@/components/interactive-object"
import ContentSection from "@/components/content-section"
import CustomCursor from "@/components/custom-cursor"
import IntroSequence from "@/components/intro-sequence"
import ContactForm from "@/components/contact-form"

export type ContentMode = "vitrine" | "ecommerce" | "saas"

export default function Home() {
  const [currentMode, setCurrentMode] = useState<ContentMode>("vitrine")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)

  const handleModeChange = (newMode: ContentMode) => {
    if (isTransitioning || newMode === currentMode) return

    setIsTransitioning(true)

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentMode(newMode)
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => setIsTransitioning(false),
            },
          )
        },
      })
    }
  }

  useEffect(() => {
    if (introComplete && contentRef.current && canvasRef.current) {
      gsap.fromTo(
        [contentRef.current, canvasRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        },
      )
    }
  }, [introComplete])

  const getModeTitle = () => {
    switch (currentMode) {
      case "vitrine":
        return "Site Vitrine"
      case "ecommerce":
        return "E-commerce"
      case "saas":
        return "Plateforme SaaS"
      default:
        return "Site Vitrine"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Effet de particules en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-white rounded-full opacity-25 animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full opacity-15 animate-pulse delay-3000" />
      </div>

      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}

      <div className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0"}`}>
        <CustomCursor />

        {/* Header */}
        <header className="relative z-30 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl lg:text-3xl font-light mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Solutions Digitales Premium
            </h1>
            <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto">
              Découvrez nos services en interagissant avec l'objet 3D ci-dessous
            </p>
          </div>
        </header>

        {/* Contenu principal - Layout côte à côte */}
        <main className="relative z-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[700px]">
              {/* Colonne gauche - Objet 3D */}
              <div className="relative order-2 lg:order-1">
                <div className="relative">
                  <div ref={canvasRef} className="h-[450px] lg:h-[550px] w-full">
                    <Canvas camera={{ position: [0, 0, 5], fov: 75 }} className="w-full h-full">
                      <Environment preset="studio" />
                      <InteractiveObject
                        currentMode={currentMode}
                        onModeChange={handleModeChange}
                        isTransitioning={isTransitioning}
                        introComplete={introComplete}
                      />
                      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                    </Canvas>
                  </div>

                  {/* Instructions superposées */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-2xl">
                      <div className="text-white text-base font-medium text-center mb-3">{getModeTitle()}</div>
                      <div className="flex justify-center space-x-3">
                        {(["vitrine", "ecommerce", "saas"] as ContentMode[]).map((mode) => (
                          <div
                            key={mode}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              currentMode === mode ? "bg-white shadow-lg" : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-2 text-center">
                        Cliquez pour changer de service
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Contenu */}
              <div ref={contentRef} className="space-y-8 order-1 lg:order-2">
                <ContentSection mode={currentMode} onContactClick={() => setShowContact(true)} />
              </div>
            </div>
          </div>
        </main>

        {/* Navigation en bas */}
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-black/80 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-8 text-sm uppercase tracking-wider">
              <button
                onClick={() => handleModeChange("vitrine")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  currentMode === "vitrine" ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                Vitrine
              </button>
              <button
                onClick={() => handleModeChange("ecommerce")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  currentMode === "ecommerce" ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                E-commerce
              </button>
              <button
                onClick={() => handleModeChange("saas")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  currentMode === "saas" ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                SaaS
              </button>
            </div>
          </div>
        </nav>

        {/* Formulaire de contact modal */}
        {showContact && <ContactForm onClose={() => setShowContact(false)} />}
      </div>
    </div>
  )
}

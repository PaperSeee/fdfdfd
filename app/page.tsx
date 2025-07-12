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
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}

      <div className={`transition-opacity duration-1000 ${introComplete ? "opacity-100" : "opacity-0"}`}>
        <CustomCursor />

        {/* Header */}
        <header className="relative z-30 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-xl lg:text-2xl font-light mb-1">Solutions Digitales Premium</h1>
            <p className="text-gray-400 text-sm">Cliquez sur l'objet 3D pour découvrir nos services</p>
          </div>
        </header>

        {/* Contenu principal - Layout côte à côte */}
        <main className="relative z-20 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
              {/* Colonne gauche - Objet 3D */}
              <div className="relative">
                <div ref={canvasRef} className="h-[400px] lg:h-[500px] w-full">
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
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="text-white text-sm font-medium text-center">{getModeTitle()}</div>
                    <div className="flex justify-center space-x-2 mt-2">
                      {(["vitrine", "ecommerce", "saas"] as ContentMode[]).map((mode) => (
                        <div
                          key={mode}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentMode === mode ? "bg-white" : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Contenu */}
              <div ref={contentRef} className="space-y-6">
                <ContentSection mode={currentMode} onContactClick={() => setShowContact(true)} />
              </div>
            </div>
          </div>
        </main>

        {/* Navigation en bas */}
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-6 text-xs uppercase tracking-wider">
              <button
                onClick={() => handleModeChange("vitrine")}
                className={`transition-colors hover:text-white ${
                  currentMode === "vitrine" ? "text-white" : "text-gray-400"
                }`}
              >
                Vitrine
              </button>
              <button
                onClick={() => handleModeChange("ecommerce")}
                className={`transition-colors hover:text-white ${
                  currentMode === "ecommerce" ? "text-white" : "text-gray-400"
                }`}
              >
                E-commerce
              </button>
              <button
                onClick={() => handleModeChange("saas")}
                className={`transition-colors hover:text-white ${
                  currentMode === "saas" ? "text-white" : "text-gray-400"
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

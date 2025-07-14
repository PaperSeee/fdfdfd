"use client"

import { useState, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import ContentSection from "@/components/content-section"
import CustomCursor from "@/components/custom-cursor"
import IntroSequence from "@/components/intro-sequence"
import ContactForm from "@/components/contact-form"
import type { ContentMode } from "@/types/content-mode"

// Charger le composant 3D COMPLÈTEMENT côté client
const ThreeScene = dynamic(() => import("@/components/three-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] lg:h-[400px] xl:h-[500px] w-full bg-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <div className="text-gray-400 text-sm">Chargement de l'expérience 3D...</div>
      </div>
    </div>
  )
})

export default function Home() {
  const [currentMode, setCurrentMode] = useState<ContentMode>("vitrine")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [introComplete, setIntroComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleModeChange = (newMode: ContentMode) => {
    if (isTransitioning || newMode === currentMode) return

    setIsTransitioning(true)

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        x: isMobile ? 0 : -30,
        y: isMobile ? -20 : 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setCurrentMode(newMode)
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 },
            {
              opacity: 1,
              x: 0,
              y: 0,
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

  // Ne pas rendre le contenu avant que le client soit prêt
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-gray-400">Chargement...</div>
      </div>
    )
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
        {!isMobile && <CustomCursor />}

        {/* Header */}
        <header className="relative z-30 p-4 sm:p-6 lg:p-4 xl:p-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-light mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Solutions Digitales Premium
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-sm xl:text-base max-w-2xl mx-auto px-4">
              {isMobile
                ? "Découvrez nos services ci-dessous"
                : "Découvrez nos services en interagissant avec l'objet 3D ci-dessous"}
            </p>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="relative z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="space-y-6 pb-32">
                {/* Objet 3D Mobile */}
                <div className="relative">
                  <div ref={canvasRef}>
                    <ThreeScene
                      currentMode={currentMode}
                      onModeChange={handleModeChange}
                      isTransitioning={isTransitioning}
                      introComplete={introComplete}
                      height="h-[280px]"
                    />
                  </div>

                  {/* Mobile Mode Indicator */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-2xl">
                      <div className="text-white text-sm font-medium text-center mb-2">{getModeTitle()}</div>
                      <div className="flex justify-center space-x-2">
                        {(["vitrine", "ecommerce", "saas"] as ContentMode[]).map((mode) => (
                          <div
                            key={mode}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentMode === mode ? "bg-white shadow-lg" : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Touch instruction */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 border border-white/20">
                      <div className="text-xs text-gray-400 text-center">Touchez pour changer</div>
                    </div>
                  </div>
                </div>

                {/* Contenu Mobile */}
                <div ref={contentRef} className="space-y-6">
                  <ContentSection mode={currentMode} onContactClick={() => setShowContact(true)} />
                </div>
              </div>
            ) : (
              /* Desktop Layout */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                {/* Colonne gauche - Objet 3D */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative">
                    <div ref={canvasRef}>
                      <ThreeScene
                        currentMode={currentMode}
                        onModeChange={handleModeChange}
                        isTransitioning={isTransitioning}
                        introComplete={introComplete}
                        height="h-[350px] lg:h-[400px] xl:h-[500px]"
                      />
                    </div>

                    {/* Instructions superposées */}
                    <div className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-white/20 shadow-2xl">
                        <div className="text-white text-sm lg:text-base font-medium text-center mb-2 lg:mb-3">{getModeTitle()}</div>
                        <div className="flex justify-center space-x-2 lg:space-x-3">
                          {(["vitrine", "ecommerce", "saas"] as ContentMode[]).map((mode) => (
                            <div
                              key={mode}
                              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                                currentMode === mode ? "bg-white shadow-lg" : "bg-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 text-center">Cliquez pour changer de service</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne droite - Contenu */}
                <div ref={contentRef} className="space-y-4 lg:space-y-6 order-1 lg:order-2">
                  <ContentSection mode={currentMode} onContactClick={() => setShowContact(true)} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Navigation adaptative */}
        <nav
          className={`fixed z-30 ${
            isMobile ? "bottom-4 left-4 right-4" : "bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2"
          }`}
        >
          <div
            className={`bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-2xl ${
              isMobile ? "px-4 py-3" : "px-6 lg:px-8 py-3 lg:py-4"
            }`}
          >
            <div
              className={`flex items-center justify-center text-xs sm:text-sm uppercase tracking-wider ${
                isMobile ? "space-x-4" : "space-x-6 lg:space-x-8"
              }`}
            >
              <button
                onClick={() => handleModeChange("vitrine")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  isMobile ? "py-2 px-3 rounded-full" : ""
                } ${currentMode === "vitrine" ? "text-white font-medium" : "text-gray-400"}`}
              >
                {isMobile ? "Vitrine" : "Vitrine"}
              </button>
              <button
                onClick={() => handleModeChange("ecommerce")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  isMobile ? "py-2 px-3 rounded-full" : ""
                } ${currentMode === "ecommerce" ? "text-white font-medium" : "text-gray-400"}`}
              >
                E-commerce
              </button>
              <button
                onClick={() => handleModeChange("saas")}
                className={`transition-all duration-300 hover:text-white hover:scale-105 ${
                  isMobile ? "py-2 px-3 rounded-full" : ""
                } ${currentMode === "saas" ? "text-white font-medium" : "text-gray-400"}`}
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
                      
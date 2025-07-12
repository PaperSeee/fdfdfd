"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface IntroSequenceProps {
  onComplete: () => void
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Délai avant de terminer l'intro
        setTimeout(() => {
          // Animation de sortie
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete,
          })
        }, 800)
      },
    })

    // Séquence d'animation
    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 0.5)
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1.2)
      .fromTo(
        dotsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        1.8,
      )
      .to(
        loaderRef.current,
        {
          width: "100%",
          duration: 2,
          ease: "power2.inOut",
        },
        2,
      )

    // Animation des points de chargement
    const dots = dotsRef.current?.children
    if (dots) {
      gsap.to(dots, {
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2,
      })
    }

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Titre principal */}
        <div ref={titleRef} className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-extralight tracking-tight">Expérience</h1>
          <h2 className="text-2xl lg:text-3xl font-light text-gray-300">Interactive</h2>
        </div>

        {/* Sous-titre */}
        <p ref={subtitleRef} className="text-sm text-gray-400 uppercase tracking-widest font-light">
          Chargement de l'univers 3D
        </p>

        {/* Barre de progression */}
        <div className="w-full h-px bg-gray-800 relative overflow-hidden">
          <div ref={loaderRef} className="h-full bg-white absolute left-0 top-0" style={{ width: "0%" }} />
        </div>

        {/* Points de chargement animés */}
        <div ref={dotsRef} className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full" />
          <div className="w-2 h-2 bg-white rounded-full" />
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Instruction subtile */}
        <div className="text-xs text-gray-600 uppercase tracking-wider font-light">Préparez-vous à explorer</div>
      </div>

      {/* Effet de particules subtil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-white rounded-full opacity-25 animate-pulse delay-2000" />
      </div>
    </div>
  )
}

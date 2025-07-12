"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import type { Mesh } from "three"
import { gsap } from "gsap"
import type { ContentMode } from "@/app/page"

interface InteractiveObjectProps {
  currentMode: ContentMode
  onModeChange: (mode: ContentMode) => void
  isTransitioning: boolean
  introComplete?: boolean
}

export default function InteractiveObject({
  currentMode,
  onModeChange,
  isTransitioning,
  introComplete = true,
}: InteractiveObjectProps) {
  const meshRef = useRef<Mesh>(null)
  const wireframeRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { viewport } = useThree()

  // Protection côté client
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Responsive sizing avec protection
  const getScale = () => {
    if (!isClient || !viewport?.width) return 1.5

    try {
      if (viewport.width < 4) return 1.2 // Mobile
      if (viewport.width < 8) return 1.5 // Tablet
      return 1.8 // Desktop
    } catch (error) {
      console.warn("Viewport scale error:", error)
      return 1.5
    }
  }

  // Animation continue de rotation
  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current || !introComplete || !isClient) return

    try {
      const time = state.clock?.elapsedTime || 0

      // Rotation continue avec vérifications
      if (meshRef.current.rotation && wireframeRef.current.rotation) {
        meshRef.current.rotation.y += 0.01
        wireframeRef.current.rotation.y += 0.01
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
        wireframeRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
      }

      // Effet de respiration avec vérifications
      if (meshRef.current.scale && wireframeRef.current.scale) {
        const scale = 1 + Math.sin(time * 0.8) * 0.05
        const finalScale = hovered ? scale * 1.2 : scale

        meshRef.current.scale.setScalar(finalScale)
        wireframeRef.current.scale.setScalar(finalScale * 1.02)
      }
    } catch (error) {
      console.warn("Animation frame error:", error)
    }
  })

  // Animation d'entrée
  useEffect(() => {
    if (!introComplete || !meshRef.current || !wireframeRef.current || !isClient) return

    try {
      const scale = getScale()
      if (meshRef.current.scale && wireframeRef.current.scale) {
        gsap.fromTo(
          [meshRef.current.scale, wireframeRef.current.scale],
          { x: 0, y: 0, z: 0 },
          {
            x: scale,
            y: scale,
            z: scale,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: 0.3,
          },
        )
      }
    } catch (error) {
      console.warn("Entry animation error:", error)
    }
  }, [introComplete, isClient])

  const handleClick = (event: any) => {
    event.stopPropagation()

    if (isTransitioning || !isClient) return

    // Déterminer le prochain mode
    const modes: ContentMode[] = ["vitrine", "ecommerce", "saas"]
    const currentIndex = modes.indexOf(currentMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]

    // Animation de l'objet lors du clic
    if (meshRef.current && wireframeRef.current) {
      try {
        if (meshRef.current.rotation && wireframeRef.current.rotation) {
          gsap.to([meshRef.current.rotation, wireframeRef.current.rotation], {
            y: "+=6.28",
            duration: 1,
            ease: "power2.inOut",
          })
        }

        if (meshRef.current.scale && wireframeRef.current.scale) {
          gsap.to([meshRef.current.scale, wireframeRef.current.scale], {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.15,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          })
        }
      } catch (error) {
        console.warn("Click animation error:", error)
      }
    }

    onModeChange(nextMode)
  }

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    if (isClient && typeof document !== 'undefined') {
      document.body.style.cursor = "pointer"
    }
  }

  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    if (isClient && typeof document !== 'undefined') {
      document.body.style.cursor = "auto"
    }
  }

  // Couleurs selon le mode
  const getModeColor = () => {
    switch (currentMode) {
      case "vitrine":
        return "#ffffff"
      case "ecommerce":
        return "#10b981"
      case "saas":
        return "#3b82f6"
      default:
        return "#ffffff"
    }
  }

  if (!isClient) {
    return null
  }

  const scale = getScale()

  return (
    <group position={[0, 0, 0]}>
      {/* Objet principal */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={[scale, scale, scale]}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={getModeColor()}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh
        ref={wireframeRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        scale={[scale, scale, scale]}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={getModeColor()}
          wireframe
          transparent
          opacity={hovered ? 0.6 : 0.3}
        />
      </mesh>

      {/* Lumières */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color={getModeColor()} />
      <pointLight position={[-2, -2, -2]} intensity={0.3} color="#ffffff" />
    </group>
  )
}

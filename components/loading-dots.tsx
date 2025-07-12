"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function LoadingDots() {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dots = dotsRef.current?.children
    if (dots) {
      gsap.to(dots, {
        y: -10,
        duration: 0.6,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    }
  }, [])

  return (
    <div ref={dotsRef} className="flex space-x-1">
      <div className="w-2 h-2 bg-white rounded-full" />
      <div className="w-2 h-2 bg-white rounded-full" />
      <div className="w-2 h-2 bg-white rounded-full" />
    </div>
  )
}

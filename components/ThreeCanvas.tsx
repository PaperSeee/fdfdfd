"use client"

import dynamic from "next/dynamic"

// Chargement client-only
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })),
  { ssr: false }
)
const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })),
  { ssr: false }
)

export default function ThreeCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <OrbitControls enableDamping />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      </Canvas>
    </div>
  )
}

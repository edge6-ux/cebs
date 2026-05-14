'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: string
  top: string
  size: number
  duration: number
  delay: number
  color: string
}

export default function FallingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 35 }, (_, i) => {
      const duration = 12 + Math.random() * 8
      const opacity = 0.12 + Math.random() * 0.28
      const color =
        Math.random() < 0.65
          ? `rgba(139,47,201,${opacity.toFixed(2)})`
          : `rgba(224,64,251,${(opacity * 0.75).toFixed(2)})`

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${-3 + Math.random() * 5}%`,
        size: 1.5 + Math.random() * 2.5,
        duration,
        delay: -(Math.random() * duration),
        color,
      }
    })
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            animation: `float-down ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

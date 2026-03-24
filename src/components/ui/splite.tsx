'use client'

import { Suspense, lazy, useRef, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Lazily cache the canvas after Spline loads
      if (!canvasRef.current && containerRef.current) {
        canvasRef.current = containerRef.current.querySelector('canvas')
      }
      const canvas = canvasRef.current
      if (!canvas) return

      // Remap full-screen mouse position proportionally into canvas coordinate space
      // so Three.js computes the same NDC as if the cursor were inside the canvas
      const rect = canvas.getBoundingClientRect()

      // Don't drive Spline when the canvas is off-screen (avoids weird pose on scroll-back)
      if (rect.bottom < 0 || rect.top > window.innerHeight) return

      const mappedX = rect.left + (e.clientX / window.innerWidth) * rect.width
      const mappedY = rect.top + (e.clientY / window.innerHeight) * rect.height

      // Three.js / Spline runtime uses PointerEvents
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          cancelable: true,
          clientX: mappedX,
          clientY: mappedY,
          screenX: e.screenX,
          screenY: e.screenY,
          movementX: e.movementX,
          movementY: e.movementY,
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
        })
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className="w-full h-full"
        />
      </Suspense>
    </div>
  )
}

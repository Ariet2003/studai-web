'use client'

import { useEffect, useRef } from 'react'

interface AIOrbProps {
  size?: number
  className?: string
}

export default function AIOrb({ size = 300, className = '' }: AIOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Очищаем контейнер перед созданием нового элемента
    containerRef.current.innerHTML = ''

    // Проверяем поддержку WebGL
    const testCanvas = document.createElement('canvas')
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
    
    if (!gl) {
      // Fallback для устройств без WebGL поддержки
      const fallbackDiv = document.createElement('div')
      fallbackDiv.style.width = `${size}px`
      fallbackDiv.style.height = `${size}px`
      fallbackDiv.style.borderRadius = '50%'
      fallbackDiv.style.background = 'linear-gradient(45deg, #6B46C1, #9333EA)'
      fallbackDiv.style.animation = 'pulse 2s infinite'
      fallbackDiv.innerHTML = `
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 0.8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        </style>
      `
      containerRef.current.appendChild(fallbackDiv)
      return
    }

    // Адаптируем размер для мобильных устройств
    const isMobile = window.innerWidth < 768
    const adaptedSize = isMobile ? Math.min(size, 150) : size
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2) // Ограничиваем pixelRatio для производительности

    // Создаем canvas
    const canvas = document.createElement('canvas')
    canvas.width = adaptedSize * pixelRatio
    canvas.height = adaptedSize * pixelRatio
    canvas.style.display = 'block'
    canvas.style.width = `${adaptedSize}px`
    canvas.style.height = `${adaptedSize}px`
    canvas.style.margin = '0'
    canvas.style.padding = '0'
    
    containerRef.current.appendChild(canvas)

    // Загружаем Three.js с таймаутом
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js'
    
    let timeoutId: NodeJS.Timeout
    let animationId: number

    script.onload = () => {
      try {
        const THREE = (window as any).THREE
        if (typeof THREE === 'undefined') return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
        camera.position.z = 3

        const renderer = new THREE.WebGLRenderer({ 
          canvas: canvas,
          antialias: !isMobile, // Отключаем антиалиасинг на мобильных для производительности
          alpha: true,
          powerPreference: 'low-power' // Используем энергоэффективный режим
        })
        renderer.setSize(adaptedSize, adaptedSize)
        renderer.setPixelRatio(pixelRatio)

        // Используем меньше полигонов для мобильных устройств
        const segments = isMobile ? 32 : 64
        const geometry = new THREE.SphereGeometry(1, segments, segments)
        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTime: { value: 0 },
            uScale: { value: 1 }
          },
          vertexShader: `
            uniform float uTime, uScale;
            varying vec3 vPos;
            void main() {
              vPos = position;
              float wave = sin(position.x*5. + uTime*3.)*0.02
                         + sin(position.y*6. + uTime*4.)*0.02
                         + sin(position.z*7. + uTime*2.5)*0.02;
              vec3 pos = position * (1.0 + wave * uScale);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            varying vec3 vPos;
            void main() {
              vec3 darkPurple = vec3(0.4, 0.1, 0.6);
              vec3 brightPurple = vec3(0.4, 0.3, 0.9);
              float t = sin(vPos.x*2. + uTime*2.) * 0.5 + 0.5;
              vec3 color = mix(darkPurple, brightPurple, t);
              gl_FragColor = vec4(color, 1.0);
            }
          `
        })

        const orb = new THREE.Mesh(geometry, material)
        orb.scale.set(0.8, 0.8, 0.8)
        scene.add(orb)

        const light = new THREE.PointLight(0xffffff, 1.0)
        light.position.set(0, 0, 2)
        scene.add(light)

        const clock = new THREE.Clock()
        
        function animate() {
          animationId = requestAnimationFrame(animate)
          const t = clock.getElapsedTime()
          
          const base = Math.sin(t*8) * 0.15 + 0.85
          const detail = Math.sin(t*16) * 0.05
          const activity = base + detail

          material.uniforms.uTime.value = t * 1.5
          material.uniforms.uScale.value = activity
          
          orb.rotation.y = t * 0.2
          orb.rotation.z = t * 0.1

          renderer.render(scene, camera)
        }
        
        animate()
      } catch (error) {
        console.error('Error initializing AIOrb:', error)
        // Fallback в случае ошибки
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="
              width: ${adaptedSize}px; 
              height: ${adaptedSize}px; 
              border-radius: 50%; 
              background: linear-gradient(45deg, #6B46C1, #9333EA);
              animation: pulse 2s infinite;
            "></div>
          `
        }
      }
    }

    // Таймаут для загрузки скрипта (особенно важно на мобильных)
    timeoutId = setTimeout(() => {
      if (containerRef.current && containerRef.current.children.length === 1) {
        // Если через 5 секунд Three.js не загрузился, показываем fallback
        const fallbackDiv = document.createElement('div')
        fallbackDiv.style.width = `${adaptedSize}px`
        fallbackDiv.style.height = `${adaptedSize}px`
        fallbackDiv.style.borderRadius = '50%'
        fallbackDiv.style.background = 'linear-gradient(45deg, #6B46C1, #9333EA)'
        fallbackDiv.style.animation = 'pulse 2s infinite'
        containerRef.current.innerHTML = ''
        containerRef.current.appendChild(fallbackDiv)
      }
    }, 5000)
    
    document.head.appendChild(script)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (animationId) cancelAnimationFrame(animationId)
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [size])

  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.8; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
        }
      `}</style>
      <div 
        ref={containerRef} 
        className={className}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          display: 'block',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
      />
    </>
  )
}


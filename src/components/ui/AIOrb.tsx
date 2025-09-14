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

    // Создаем canvas напрямую без iframe
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    canvas.style.display = 'block'
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    canvas.style.margin = '0'
    canvas.style.padding = '0'
    
    containerRef.current.appendChild(canvas)

    // Загружаем Three.js и создаем сцену
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js'
    script.onload = () => {
      const THREE = (window as any).THREE
      if (typeof THREE === 'undefined') return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.z = 3

      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true, 
        alpha: true 
      })
      renderer.setSize(size, size)
      renderer.setPixelRatio(window.devicePixelRatio || 1)

      const geometry = new THREE.SphereGeometry(1, 64, 64)
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
        requestAnimationFrame(animate)
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
    }
    
    document.head.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [size])

  return (
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
  )
}


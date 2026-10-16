import { useEffect, useRef } from 'react'

const DESKTOP_NODE_COUNT = 52
const TABLET_NODE_COUNT = 40
const MOBILE_NODE_COUNT = 24
const FRAME_INTERVAL = 1000 / 30
const MAX_DELTA_SECONDS = 0.05

function getNodeCount(width) {
  if (width >= 1100) return DESKTOP_NODE_COUNT
  if (width >= 700) return TABLET_NODE_COUNT
  return MOBILE_NODE_COUNT
}

function createNode(width, height) {
  const angle = Math.random() * Math.PI * 2
  const speed = 4 + Math.random() * 7
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1.2 + Math.random() * 0.9,
  }
}

export default function ConstellationBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointerQuery = window.matchMedia('(pointer: fine)')
    const pointer = { active: false, x: 0, y: 0 }
    let nodes = []
    let width = 0
    let height = 0
    let animationFrame = 0
    let resizeFrame = 0
    let previousTime = 0
    let isDark = document.documentElement.classList.contains('dark')

    const syncNodeCount = () => {
      const targetCount = getNodeCount(width)
      while (nodes.length < targetCount) nodes.push(createNode(width, height))
      if (nodes.length > targetCount) nodes = nodes.slice(0, targetCount)
      nodes.forEach(node => {
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      })
    }

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      syncNodeCount()
      drawFrame()
    }

    const moveNodes = delta => {
      nodes.forEach(node => {
        node.x += node.vx * delta
        node.y += node.vy * delta

        if (node.x <= 0 || node.x >= width) {
          node.x = Math.max(0, Math.min(width, node.x))
          node.vx *= -1
        }
        if (node.y <= 0 || node.y >= height) {
          node.y = Math.max(0, Math.min(height, node.y))
          node.vy *= -1
        }
      })
    }

    function drawFrame() {
      context.clearRect(0, 0, width, height)
      const threshold = Math.min(width, height) * 0.3
      const constellationColor = isDark ? '251, 146, 60' : '194, 65, 12'
      const lineAlpha = isDark ? 0.34 : 0.24
      const nodeAlpha = isDark ? 0.88 : 0.72
      const pointerNode = finePointerQuery.matches && pointer.active
        ? { x: pointer.x, y: pointer.y, radius: 1.8, pointer: true }
        : null
      const drawableCount = nodes.length + (pointerNode ? 1 : 0)
      const getDrawableNode = index => index < nodes.length ? nodes[index] : pointerNode

      context.lineWidth = 1
      for (let first = 0; first < drawableCount; first += 1) {
        for (let second = first + 1; second < drawableCount; second += 1) {
          const a = getDrawableNode(first)
          const b = getDrawableNode(second)
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance >= threshold) continue

          const opacity = lineAlpha * (1 - distance / threshold)
          context.strokeStyle = `rgba(${constellationColor}, ${opacity})`
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      nodes.forEach(node => {
        context.fillStyle = `rgba(${constellationColor}, ${nodeAlpha})`
        context.beginPath()
        context.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        context.fill()
      })

      if (pointerNode) {
        context.fillStyle = `rgba(${constellationColor}, ${nodeAlpha * 0.9})`
        context.beginPath()
        context.arc(pointerNode.x, pointerNode.y, pointerNode.radius, 0, Math.PI * 2)
        context.fill()
      }
    }

    const animate = timestamp => {
      if (document.hidden || reduceMotionQuery.matches) {
        animationFrame = 0
        return
      }

      if (!previousTime) previousTime = timestamp
      const elapsed = timestamp - previousTime
      if (elapsed >= FRAME_INTERVAL) {
        const delta = Math.min(elapsed / 1000, MAX_DELTA_SECONDS)
        previousTime = timestamp
        moveNodes(delta)
        drawFrame()
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      cancelAnimationFrame(animationFrame)
      previousTime = 0
      if (reduceMotionQuery.matches || document.hidden) {
        animationFrame = 0
        drawFrame()
        return
      }
      animationFrame = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(resizeCanvas)
    }

    const handlePointerMove = event => {
      if (!finePointerQuery.matches || reduceMotionQuery.matches) return
      pointer.active = true
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const handlePointerLeave = event => {
      if (event.relatedTarget) return
      pointer.active = false
    }

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame)
        animationFrame = 0
      } else {
        startAnimation()
      }
    }

    const handleMotionPreference = () => {
      pointer.active = false
      startAnimation()
    }

    const handlePointerPreference = () => {
      pointer.active = false
      drawFrame()
    }

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
      if (reduceMotionQuery.matches) drawFrame()
    })

    resizeCanvas()
    startAnimation()
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerout', handlePointerLeave, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    reduceMotionQuery.addEventListener('change', handleMotionPreference)
    finePointerQuery.addEventListener('change', handlePointerPreference)

    return () => {
      cancelAnimationFrame(animationFrame)
      cancelAnimationFrame(resizeFrame)
      themeObserver.disconnect()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      reduceMotionQuery.removeEventListener('change', handleMotionPreference)
      finePointerQuery.removeEventListener('change', handlePointerPreference)
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation-canvas" aria-hidden="true" />
}

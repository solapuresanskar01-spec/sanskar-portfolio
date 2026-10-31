import { useEffect, useRef } from 'react'
import './Aquarium.css'

const SCHOOL_SIZE = 6
const AMBIENT_SIZE = 7
const FISH_COLORS = ['#00e5ff', '#36d9e8', '#42b7dc', '#64e6da', '#35a7c7']
const FISH_ACCENTS = ['#ff6b00', '#f9a14a', '#8cf7ed']

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createFish(kind, width, height, index = 0) {
  const size = kind === 'jumper' ? randomBetween(15, 19) : randomBetween(9, 15)
  const x = randomBetween(size, Math.max(size + 1, width - size))
  const y = randomBetween(75, Math.max(76, height - 55))

  return {
    kind,
    x,
    y,
    vx: randomBetween(-12, 12),
    vy: randomBetween(-8, 8),
    size,
    speed: kind === 'school' ? randomBetween(54, 91) : randomBetween(18, 42),
    color: FISH_COLORS[Math.floor(Math.random() * FISH_COLORS.length)],
    accent: FISH_ACCENTS[Math.floor(Math.random() * FISH_ACCENTS.length)],
    phase: randomBetween(0, Math.PI * 2),
    index,
    nextTurn: randomBetween(0, 3),
    pauseUntil: 0,
    destinationX: x,
    destinationY: y,
    jumpAt: randomBetween(12, 25),
    jumpStart: null,
    jumpDuration: 1.4,
    jumpHeight: randomBetween(42, 64),
  }
}

function drawFish(context, fish, elapsed, jumping) {
  const speed = Math.hypot(fish.vx, fish.vy)
  if (speed > 1) fish.angle = Math.atan2(fish.vy, fish.vx)

  const length = fish.size * 2.2
  const tailWag = Math.sin(elapsed * (fish.kind === 'school' ? 8 : 5) + fish.phase)
  const jumpProgress = jumping
    ? Math.min(1, (elapsed - fish.jumpStart) / fish.jumpDuration)
    : 0
  const arc = jumping ? Math.sin(jumpProgress * Math.PI) * fish.jumpHeight : 0
  const y = fish.y - arc

  context.save()
  context.translate(fish.x, y)
  context.rotate(fish.angle || 0)
  context.globalAlpha = fish.kind === 'school' ? 0.82 : 0.66
  context.shadowColor = fish.color
  context.shadowBlur = fish.size * 0.8

  context.beginPath()
  context.moveTo(-length * 0.43, 0)
  context.quadraticCurveTo(-length * 0.18, -fish.size * 0.66, length * 0.33, -fish.size * 0.1)
  context.quadraticCurveTo(length * 0.52, 0, length * 0.33, fish.size * 0.1)
  context.quadraticCurveTo(-length * 0.18, fish.size * 0.66, -length * 0.43, 0)
  const bodyGradient = context.createLinearGradient(-length * 0.4, 0, length * 0.45, 0)
  bodyGradient.addColorStop(0, fish.color)
  bodyGradient.addColorStop(1, '#b8fff6')
  context.fillStyle = bodyGradient
  context.fill()

  context.shadowBlur = 0
  context.beginPath()
  context.moveTo(-length * 0.4, 0)
  context.lineTo(-length * 0.75, -fish.size * (0.36 + tailWag * 0.14))
  context.lineTo(-length * 0.68, 0)
  context.lineTo(-length * 0.75, fish.size * (0.36 - tailWag * 0.14))
  context.closePath()
  context.fillStyle = fish.accent
  context.globalAlpha *= 0.85
  context.fill()

  context.beginPath()
  context.moveTo(-fish.size * 0.12, -fish.size * 0.35)
  context.quadraticCurveTo(fish.size * 0.12, -fish.size * 0.78, fish.size * 0.4, -fish.size * 0.35)
  context.fillStyle = fish.accent
  context.globalAlpha *= 0.65
  context.fill()

  context.beginPath()
  context.arc(length * 0.28, -fish.size * 0.13, Math.max(0.8, fish.size * 0.065), 0, Math.PI * 2)
  context.fillStyle = '#04212b'
  context.globalAlpha = 0.9
  context.fill()
  context.restore()

  return { x: fish.x, y, size: fish.size }
}

function Aquarium() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) {
      console.error('Aquarium canvas could not be initialized.')
      return undefined
    }

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchPreference = window.matchMedia('(hover: none), (pointer: coarse)')
    const lowPerformance = (navigator.hardwareConcurrency || 8) < 4
      || (navigator.deviceMemory && navigator.deviceMemory <= 4)
    let width = window.innerWidth
    let height = window.innerHeight
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    let elapsed = 0
    let previousTime = 0
    let animationFrame = null
    let pointer = { x: width / 2, y: height / 2, active: false }
    let fish = []
    let bubbles = []
    let splashes = []

    function targetFishCount() {
      if (touchPreference.matches || width < 720) return { school: 0, ambient: 5, jumper: 0 }
      if (lowPerformance) return { school: 4, ambient: 4, jumper: 0 }
      return { school: SCHOOL_SIZE, ambient: AMBIENT_SIZE, jumper: 1 }
    }

    function resizeCanvas() {
      const oldWidth = width
      const oldHeight = height
      width = window.innerWidth
      height = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const scaleX = oldWidth ? width / oldWidth : 1
      const scaleY = oldHeight ? height / oldHeight : 1
      for (const swimmer of fish) {
        swimmer.x *= scaleX
        swimmer.y *= scaleY
        swimmer.destinationX *= scaleX
        swimmer.destinationY *= scaleY
        swimmer.x = Math.min(width - swimmer.size, Math.max(swimmer.size, swimmer.x))
        swimmer.y = Math.min(height - swimmer.size, Math.max(70, swimmer.y))
      }

      const counts = targetFishCount()
      fish = fish.filter((swimmer) => (
        swimmer.kind === 'school' ? swimmer.index < counts.school
          : swimmer.kind === 'jumper' ? counts.jumper > 0
            : swimmer.index < counts.ambient
      ))
      while (fish.filter((swimmer) => swimmer.kind === 'school').length < counts.school) {
        const index = fish.filter((swimmer) => swimmer.kind === 'school').length
        fish.push(createFish('school', width, height, index))
      }
      while (fish.filter((swimmer) => swimmer.kind === 'ambient').length < counts.ambient) {
        const index = fish.filter((swimmer) => swimmer.kind === 'ambient').length
        fish.push(createFish('ambient', width, height, index))
      }
      if (counts.jumper && !fish.some((swimmer) => swimmer.kind === 'jumper')) {
        fish.push(createFish('jumper', width, height))
      }
      bubbles = Array.from({ length: touchPreference.matches ? 10 : 18 }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        radius: randomBetween(0.7, 1.8),
        phase: randomBetween(0, Math.PI * 2),
        drift: randomBetween(2, 8),
      }))
      draw()
    }

    function chooseDestination(swimmer) {
      swimmer.destinationX = randomBetween(35, Math.max(36, width - 35))
      swimmer.destinationY = randomBetween(82, Math.max(83, height - 55))
      swimmer.nextTurn = elapsed + randomBetween(6, 12)
      if (Math.random() < 0.23) swimmer.pauseUntil = elapsed + randomBetween(0.7, 1.7)
    }

    function draw() {
      context.clearRect(0, 0, width, height)
      for (const bubble of bubbles) {
        const y = (bubble.y - elapsed * bubble.drift) % (height + 12)
        const bubbleY = y < 0 ? y + height + 12 : y
        context.beginPath()
        context.arc(bubble.x + Math.sin(elapsed * 0.4 + bubble.phase) * 4, bubbleY, bubble.radius, 0, Math.PI * 2)
        context.fillStyle = 'rgba(126, 238, 241, 0.16)'
        context.fill()
      }

      for (const swimmer of fish) {
        const jumping = swimmer.kind === 'jumper' && swimmer.jumpStart !== null
          && elapsed - swimmer.jumpStart < swimmer.jumpDuration
        drawFish(context, swimmer, elapsed, jumping)
      }

      splashes = splashes.filter((splash) => elapsed - splash.start < 1)
      for (const splash of splashes) {
        const progress = elapsed - splash.start
        context.save()
        context.globalAlpha = (1 - progress) * 0.35
        context.strokeStyle = '#75f8ef'
        context.lineWidth = 1
        context.beginPath()
        context.ellipse(splash.x, splash.y, 3 + progress * 18, 1 + progress * 5, 0, 0, Math.PI * 2)
        context.stroke()
        for (let index = 0; index < 3; index += 1) {
          const bubbleProgress = Math.max(0, progress - index * 0.08)
          context.beginPath()
          context.arc(splash.x + (index - 1) * 5, splash.y - bubbleProgress * 24, 1.2, 0, Math.PI * 2)
          context.fillStyle = '#8ff9ed'
          context.fill()
        }
        context.restore()
      }
    }

    function update(delta) {
      elapsed += delta
      for (const swimmer of fish) {
        const isSchool = swimmer.kind === 'school'
        if (isSchool) {
          if (pointer.active) {
            const angle = swimmer.index * 2.28 + elapsed * 0.28
            const distance = 27 + swimmer.index * 13
            swimmer.destinationX = pointer.x + Math.cos(angle) * distance
            swimmer.destinationY = pointer.y + Math.sin(angle) * distance * 0.7
          } else if (elapsed > swimmer.nextTurn) {
            chooseDestination(swimmer)
          }
        } else if (swimmer.kind === 'jumper') {
          if (swimmer.jumpStart === null && elapsed >= swimmer.jumpAt) {
            swimmer.jumpStart = elapsed
            swimmer.destinationX = Math.min(width - 30, Math.max(30, swimmer.x + randomBetween(-120, 120)))
            swimmer.destinationY = swimmer.y
          } else if (swimmer.jumpStart !== null && elapsed - swimmer.jumpStart >= swimmer.jumpDuration) {
            splashes.push({ x: swimmer.x, y: swimmer.y, start: elapsed })
            swimmer.jumpStart = null
            swimmer.jumpAt = elapsed + randomBetween(28, 44)
            chooseDestination(swimmer)
          } else if (
            swimmer.jumpStart === null
            && elapsed > swimmer.nextTurn
            && Math.hypot(swimmer.destinationX - swimmer.x, swimmer.destinationY - swimmer.y) < 14
          ) {
            chooseDestination(swimmer)
          }
        } else if (elapsed > swimmer.nextTurn) {
          chooseDestination(swimmer)
        }

        const dx = swimmer.destinationX - swimmer.x
        const dy = swimmer.destinationY - swimmer.y
        const distance = Math.hypot(dx, dy)
        const speed = isSchool ? swimmer.speed : swimmer.speed * 0.66
        let targetVx = distance > 1 ? (dx / distance) * Math.min(speed, distance * 1.8) : 0
        let targetVy = distance > 1 ? (dy / distance) * Math.min(speed, distance * 1.8) : 0

        if (!isSchool && swimmer.kind !== 'jumper') {
          for (const other of fish) {
            if (other === swimmer) continue
            const awayX = swimmer.x - other.x
            const awayY = swimmer.y - other.y
            const separation = Math.hypot(awayX, awayY)
            const safeDistance = swimmer.size * 2.5 + other.size * 1.4
            if (separation > 0 && separation < safeDistance) {
              const strength = (1 - separation / safeDistance) * 18
              targetVx += (awayX / separation) * strength
              targetVy += (awayY / separation) * strength
            }
          }

          if (pointer.active) {
            const awayX = swimmer.x - pointer.x
            const awayY = swimmer.y - pointer.y
            const distanceFromPointer = Math.hypot(awayX, awayY)
            const reactionDistance = swimmer.size * (4 + (swimmer.index % 3))
            if (distanceFromPointer > 0 && distanceFromPointer < reactionDistance) {
              const response = 1 - distanceFromPointer / reactionDistance
              const strength = (swimmer.index % 2 ? 24 : 12) * response
              targetVx += (awayX / distanceFromPointer) * strength
              targetVy += (awayY / distanceFromPointer) * strength
            }
          }
        }

        if (elapsed < swimmer.pauseUntil) {
          targetVx *= 0.12
          targetVy *= 0.12
        }
        const smoothing = 1 - Math.exp(-delta * (isSchool ? 2.4 : 1.4))
        swimmer.vx += (targetVx - swimmer.vx) * smoothing
        swimmer.vy += (targetVy - swimmer.vy) * smoothing
        swimmer.x += swimmer.vx * delta
        swimmer.y += swimmer.vy * delta
        swimmer.x = Math.min(width - swimmer.size, Math.max(swimmer.size, swimmer.x))
        swimmer.y = Math.min(height - swimmer.size, Math.max(70, swimmer.y))
      }
    }

    function frame(time) {
      animationFrame = null
      if (document.hidden) return
      if (!motionPreference.matches) {
        const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0
        previousTime = time
        update(delta)
        draw()
        animationFrame = window.requestAnimationFrame(frame)
      } else {
        previousTime = 0
        draw()
      }
    }

    function startAnimation() {
      if (!document.hidden && animationFrame === null) {
        animationFrame = window.requestAnimationFrame(frame)
      }
    }

    function onPointerMove(event) {
      if (touchPreference.matches) return
      pointer = { x: event.clientX, y: event.clientY, active: true }
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
        animationFrame = null
      } else {
        previousTime = 0
        startAnimation()
      }
    }

    function onMotionChange() {
      previousTime = 0
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      animationFrame = null
      draw()
      if (!motionPreference.matches) startAnimation()
    }

    function onInputModeChange() {
      pointer.active = false
      resizeCanvas()
    }

    resizeCanvas()
    startAnimation()
    window.addEventListener('resize', resizeCanvas, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionPreference.addEventListener('change', onMotionChange)
    touchPreference.addEventListener('change', onInputModeChange)

    return () => {
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionPreference.removeEventListener('change', onMotionChange)
      touchPreference.removeEventListener('change', onInputModeChange)
    }
  }, [])

  return (
    <div className="aquarium-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="aquarium-canvas" />
    </div>
  )
}

export default Aquarium

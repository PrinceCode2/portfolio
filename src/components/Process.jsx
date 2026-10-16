import { useLayoutEffect, useRef, useState } from 'react'
import { CheckCircle2, Hammer, Map, RefreshCw, Search, ShieldCheck } from 'lucide-react'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import ChapterIntro from './ChapterIntro'
import { gsap, useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(MotionPathPlugin)

const steps = [
  { icon: Search, title: 'Understand', text: 'Clarify the real problem, the people affected, and what a useful outcome should look like.' },
  { icon: Map, title: 'Plan', text: 'Map the content, workflow, data, integrations, and practical constraints before building.' },
  { icon: Hammer, title: 'Build', text: 'Create the website, automation, or digital system in focused, testable pieces.' },
  { icon: CheckCircle2, title: 'Test', text: 'Check the main user paths, edge cases, responsiveness, accessibility, and reliability.' },
  { icon: RefreshCw, title: 'Refine', text: 'Improve the experience using feedback and what the working system reveals.' },
  { icon: ShieldCheck, title: 'Maintain', text: 'Document the setup and support updates so the solution remains useful over time.' },
]

const round = value => Math.round(value * 10) / 10

function curvedPath(start, end, direction) {
  if (direction === 'horizontal') {
    const middleX = round((start.x + end.x) / 2)
    return `M${start.x} ${start.y} C${middleX} ${start.y} ${middleX} ${end.y} ${end.x} ${end.y}`
  }

  const middleY = round((start.y + end.y) / 2)
  return `M${start.x} ${start.y} C${start.x} ${middleY} ${end.x} ${middleY} ${end.x} ${end.y}`
}

export default function Process() {
  const sectionRef = useRef(null)
  const processRef = useRef(null)
  const nodeRefs = useRef([])
  const connectorRefs = useRef([])
  const dotRefs = useRef([])
  const [connectorLayout, setConnectorLayout] = useState({ width: 1, height: 1, paths: [] })
  useScrollReveal(sectionRef)

  useLayoutEffect(() => {
    const canvas = processRef.current
    if (!canvas) return undefined

    let resizeFrame = 0

    const updateConnectors = () => {
      const canvasBounds = canvas.getBoundingClientRect()
      const renderedNodes = nodeRefs.current.filter(Boolean)
      if (renderedNodes.length !== steps.length) return

      const nodes = renderedNodes.map(node => {
        const bounds = node.getBoundingClientRect()
        return {
          left: round(bounds.left - canvasBounds.left),
          right: round(bounds.right - canvasBounds.left),
          top: round(bounds.top - canvasBounds.top),
          bottom: round(bounds.bottom - canvasBounds.top),
          centerX: round(bounds.left - canvasBounds.left + bounds.width / 2),
          centerY: round(bounds.top - canvasBounds.top + bounds.height / 2),
        }
      })

      const desktopLayout = window.matchMedia('(min-width: 900px)').matches
      let paths

      if (desktopLayout) {
        paths = [
          curvedPath({ x: nodes[0].right, y: nodes[0].centerY }, { x: nodes[1].left, y: nodes[1].centerY }, 'horizontal'),
          curvedPath({ x: nodes[1].right, y: nodes[1].centerY }, { x: nodes[2].left, y: nodes[2].centerY }, 'horizontal'),
          curvedPath({ x: nodes[2].centerX, y: nodes[2].bottom }, { x: nodes[3].centerX, y: nodes[3].top }, 'vertical'),
          curvedPath({ x: nodes[3].left, y: nodes[3].centerY }, { x: nodes[4].right, y: nodes[4].centerY }, 'horizontal'),
          curvedPath({ x: nodes[4].left, y: nodes[4].centerY }, { x: nodes[5].right, y: nodes[5].centerY }, 'horizontal'),
          curvedPath({ x: nodes[5].centerX, y: nodes[5].top }, { x: nodes[0].centerX, y: nodes[0].bottom }, 'vertical'),
        ]
      } else {
        paths = nodes.map((node, index) => {
          const nextNode = nodes[(index + 1) % nodes.length]
          if (index < nodes.length - 1) {
            return curvedPath(
              { x: node.centerX, y: node.bottom },
              { x: nextNode.centerX, y: nextNode.top },
              'vertical',
            )
          }

          const gutterX = round(Math.max(8, Math.min(node.left, nextNode.left) - 14))
          return `M${node.left} ${node.centerY} C${gutterX} ${node.centerY} ${gutterX} ${node.centerY - 20} ${gutterX} ${node.centerY - 34} L${gutterX} ${nextNode.centerY + 34} C${gutterX} ${nextNode.centerY + 20} ${gutterX} ${nextNode.centerY} ${nextNode.left} ${nextNode.centerY}`
        })
      }

      const nextLayout = {
        width: Math.max(1, round(canvasBounds.width)),
        height: Math.max(1, round(canvasBounds.height)),
        paths,
      }

      setConnectorLayout(previous => {
        const unchanged = previous.width === nextLayout.width
          && previous.height === nextLayout.height
          && previous.paths.join('|') === nextLayout.paths.join('|')
        return unchanged ? previous : nextLayout
      })
    }

    const scheduleUpdate = () => {
      cancelAnimationFrame(resizeFrame)
      resizeFrame = requestAnimationFrame(updateConnectors)
    }

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(canvas)
    nodeRefs.current.forEach(node => resizeObserver.observe(node))
    updateConnectors()

    return () => {
      cancelAnimationFrame(resizeFrame)
      resizeObserver.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    if (connectorLayout.paths.length !== steps.length) return undefined

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          const connectors = connectorRefs.current.filter(Boolean)
          const dots = dotRefs.current.filter(Boolean)
          const stages = gsap.utils.toArray('.process-stage', processRef.current)
          const cycleDuration = 12
          const segmentDuration = cycleDuration / steps.length
          const travelDuration = 1.45
          let sectionIsVisible = false

          const setActiveStage = activeIndex => {
            stages.forEach((stage, index) => stage.classList.toggle('is-active', index === activeIndex))
          }

          const setActiveConnector = activeIndex => {
            connectors.forEach((connector, index) => connector.classList.toggle('is-active', index === activeIndex))
          }

          gsap.set(dots, { opacity: 0 })
          setActiveStage(0)
          setActiveConnector(0)

          const timeline = gsap.timeline({
            repeat: -1,
            paused: true,
            onRepeat: () => {
              setActiveStage(0)
              setActiveConnector(0)
            },
          })

          timeline.to({}, { duration: cycleDuration }, 0)

          connectors.forEach((connector, index) => {
            const startTime = index * segmentDuration
            const dot = dots[index]

            timeline.call(() => {
              setActiveConnector(index)
              gsap.set(dot, { opacity: 1 })
            }, [], startTime)
            timeline.to(dot, {
              duration: travelDuration,
              ease: 'power1.inOut',
              motionPath: {
                path: connector,
                align: connector,
                alignOrigin: [0.5, 0.5],
                autoRotate: false,
              },
            }, startTime)
            timeline.to(dot, { opacity: 0, duration: 0.18, ease: 'power1.out' }, startTime + travelDuration - 0.08)
            timeline.call(() => setActiveStage((index + 1) % steps.length), [], startTime + travelDuration)
          })

          const syncPlayback = () => {
            if (sectionIsVisible && !document.hidden) timeline.resume()
            else timeline.pause()
          }

          const visibilityObserver = new IntersectionObserver(
            entries => {
              sectionIsVisible = entries.some(entry => entry.isIntersecting)
              syncPlayback()
            },
            { rootMargin: '120px 0px', threshold: 0.05 },
          )

          const handleDocumentVisibility = () => syncPlayback()

          visibilityObserver.observe(processRef.current)
          document.addEventListener('visibilitychange', handleDocumentVisibility)

          return () => {
            visibilityObserver.disconnect()
            document.removeEventListener('visibilitychange', handleDocumentVisibility)
            timeline.kill()
            connectors.forEach(connector => connector.classList.remove('is-active'))
            stages.forEach(stage => stage.classList.remove('is-active'))
            gsap.set(dots, { clearProps: 'opacity,transform' })
          }
        },
      )

      media.add('(prefers-reduced-motion: reduce)', () => {
        const connectors = connectorRefs.current.filter(Boolean)
        const dots = dotRefs.current.filter(Boolean)
        const stages = gsap.utils.toArray('.process-stage', processRef.current)

        gsap.set(dots, { opacity: 0 })
        connectors.forEach(connector => connector.classList.add('is-complete'))
        stages.forEach(stage => stage.classList.add('is-complete'))

        return () => {
          connectors.forEach(connector => connector.classList.remove('is-complete'))
          stages.forEach(stage => stage.classList.remove('is-complete'))
          gsap.set(dots, { clearProps: 'opacity' })
        }
      })
    }, sectionRef)

    return () => {
      media.revert()
      context.revert()
    }
  }, [connectorLayout.paths])

  return (
    <section id="process" ref={sectionRef} className="story-section relative bg-white dark:bg-black transition-colors overflow-hidden">
      <div className="story-shell">
        <ChapterIntro
          chapter="06"
          label="How I work"
          title="A clear path from problem to"
          highlight="working solution."
          description="The process stays understandable: define what matters, build deliberately, test the real experience, and leave the work ready to improve."
        />

        <div ref={processRef} className="process-workflow-canvas relative overflow-hidden rounded-xl border-2 border-orange-500/25 p-4 shadow-hard-sm sm:p-6 lg:p-8">
          <p className="sr-only">Workflow sequence: Understand, Plan, Build, Test, Refine, then Maintain.</p>

          <div className="process-workflow-caption">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400">Process workflow</p>
              <p className="mt-1 text-sm font-semibold text-white">A connected path from discovery to ongoing support.</p>
            </div>
            <span className="process-workflow-mode">
              <span aria-hidden="true" /> Autonomous sequence
            </span>
          </div>

          <svg
            aria-hidden="true"
            className="process-workflow-connections"
            viewBox={`0 0 ${connectorLayout.width} ${connectorLayout.height}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <marker id="workflow-arrowhead" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 Z" className="workflow-arrowhead" />
              </marker>
            </defs>
            {connectorLayout.paths.map((path, index) => (
              <g key={steps[index].title}>
                <path
                  ref={element => { connectorRefs.current[index] = element }}
                  d={path}
                  className="workflow-connector"
                  markerEnd="url(#workflow-arrowhead)"
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  ref={element => { dotRefs.current[index] = element }}
                  r="5"
                  className="workflow-data-dot"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          <ol className="workflow-node-layout" data-stagger-group>
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} data-stagger-item className={`workflow-node-slot workflow-node-slot-${index + 1}`}>
                <article
                  ref={element => { nodeRefs.current[index] = element }}
                  className="process-stage"
                >
                  <div className="process-stage-header">
                    <div className="process-stage-icon">
                      <Icon size={21} aria-hidden="true" />
                    </div>
                    <span className="process-stage-number">Step {String(index + 1).padStart(2, '0')}</span>
                    <span className="workflow-node-status" aria-hidden="true">
                      <span className="workflow-node-status-ring" />
                      <span className="workflow-node-status-dot" />
                    </span>
                  </div>
                  <h3 className="process-stage-title">{title}</h3>
                  <p className="process-stage-copy">{text}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

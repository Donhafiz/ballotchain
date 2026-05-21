'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const ringRef    = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top  = my + 'px'
      }
    }

    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top  = ry + 'px'
      }
      raf = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animateRing)

    const hoverEls = 'a, button, [data-hover]'
    const addHover = () => setHovered(true)
    const rmHover  = () => setHovered(false)

    const attachListeners = () => {
      document.querySelectorAll<HTMLElement>(hoverEls).forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }
    attachListeners()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovered ? 'hovered' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? 'hovered' : ''}`}
      />
    </>
  )
}
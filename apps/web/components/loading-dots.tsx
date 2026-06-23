"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function LoadingDots() {
  const container = useRef(null)

  useGSAP(
    () => {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(".dot", {
          y: 1.5,
          ease: "power1.inOut",
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        })
        .to(".dot", {
          y: 0,
          ease: "power1.inOut",
          duration: 0.6,
          stagger: {
            amount: 0.3,
            from: "start",
          },
        })
    },
    { scope: container }
  )

  return (
    <div ref={container} className="flex h-4 items-center justify-center gap-2">
      <div className="dot h-0.75 w-0.75 rounded-full bg-foreground"></div>
      <div className="dot h-0.75 w-0.75 rounded-full bg-foreground"></div>
      <div className="dot h-0.75 w-0.75 rounded-full bg-foreground"></div>
    </div>
  )
}

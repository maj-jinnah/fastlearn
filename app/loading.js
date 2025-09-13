"use client"

import { useEffect, useState } from "react"

// interface LoadingScreenProps {
//   message?: string
//   onComplete?: () => void
//   duration?: number
//   variant?: "spinner" | "dots" | "pulse" | "elegant"
// }

export default function LoadingScreen({
  message = "Loading, please wait...",
//   onComplete,
  duration = 3000,
  variant = "elegant",
}) {
  const [isVisible, setIsVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

//   useEffect(() => {
//     if (duration > 0) {
//       const timer = setTimeout(() => {
//         setFadeOut(true)
//         setTimeout(() => {
//           setIsVisible(false)
//         //   onComplete?.()
//         }, 500) // Fade out duration
//       }, duration)

//       return () => clearTimeout(timer)
//     }
//   }, [duration])

  if (!isVisible) return null

  const renderSpinner = () => {
    switch (variant) {

    //   case "spinner":
    //     return (
    //       <div className="relative">
    //         <div className="w-16 h-16 border-4 border-muted rounded-full border-t-primary animate-spin"></div>
    //       </div>
    //     )

    //   case "dots":
    //     return (
    //       <div className="flex space-x-2">
    //         {[0, 1, 2].map((i) => (
    //           <div
    //             key={i}
    //             className="w-3 h-3 bg-primary rounded-full animate-bounce"
    //             style={{
    //               animationDelay: `${i * 0.2}s`,
    //               animationDuration: "1.4s",
    //             }}
    //           ></div>
    //         ))}
    //       </div>
    //     )

    //   case "pulse":
    //     return (
    //       <div className="relative">
    //         <div className="w-16 h-16 bg-primary rounded-full animate-ping absolute"></div>
    //         <div className="w-16 h-16 bg-primary rounded-full animate-pulse"></div>
    //       </div>
    //     )

      case "elegant":
      default:
        return (
          <div className="relative flex items-center justify-center">
            {/* Outer rotating ring */}
            <div
              className="absolute w-20 h-20 border-2 border-muted rounded-full border-t-primary"
              style={{
                animation: "spin-slow 2s linear infinite",
              }}
            ></div>

            {/* Middle pulsing circle */}
            <div
              className="absolute w-12 h-12 bg-secondary/20 rounded-full"
              style={{
                animation: "pulse-scale 1.5s ease-in-out infinite",
              }}
            ></div>

            {/* Inner solid circle */}
            <div className="w-6 h-6 bg-primary rounded-full"></div>

            {/* Floating dots around the spinner */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-secondary rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 90}deg) translateY(-30px) translateX(-50%)`,
                  transformOrigin: "50% 30px",
                  animation: `dot-bounce 2s ease-in-out infinite ${i * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
        )
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        animation: fadeOut ? "none" : "fade-in-up 0.6s ease-out",
      }}
    >
      {/* Loading spinner */}
      <div className="mb-8">{renderSpinner()}</div>

      {/* Loading message */}
      <div
        className="text-center"
        style={{
          animation: "fade-in-up 0.8s ease-out 0.3s both",
        }}
      >
        <p className="text-lg font-medium text-foreground mb-2">{message}</p>
        <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
            style={{
              animation: "pulse-scale 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  )
}

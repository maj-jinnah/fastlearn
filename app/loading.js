"use client"

// import { useEffect, useState } from "react"

// export default function LoadingScreen({
//   message = "Loading, please wait...",
//   duration = 3000,
//   variant = "elegant",
// }) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [fadeOut, setFadeOut] = useState(false)

//   if (!isVisible) return null

//   const renderSpinner = () => {
//     switch (variant) {
//       case "elegant":
//       default:
//         return (
//           <div className="relative flex items-center justify-center">
//             {/* Outer rotating ring */}
//             <div
//               className="absolute w-20 h-20 border-2 border-muted rounded-full border-t-primary"
//               style={{
//                 animation: "spin-slow 2s linear infinite",
//               }}
//             ></div>

//             {/* Middle pulsing circle */}
//             <div
//               className="absolute w-12 h-12 bg-secondary/20 rounded-full"
//               style={{
//                 animation: "pulse-scale 1.5s ease-in-out infinite",
//               }}
//             ></div>

//             {/* Inner solid circle */}
//             <div className="w-6 h-6 bg-primary rounded-full"></div>

//             {/* Floating dots around the spinner */}
//             {[0, 1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="absolute w-2 h-2 bg-secondary rounded-full"
//                 style={{
//                   top: "50%",
//                   left: "50%",
//                   transform: `rotate(${i * 90}deg) translateY(-30px) translateX(-50%)`,
//                   transformOrigin: "50% 30px",
//                   animation: `dot-bounce 2s ease-in-out infinite ${i * 0.5}s`,
//                 }}
//               ></div>
//             ))}
//           </div>
//         )
//     }
//   }

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
//         fadeOut ? "opacity-0" : "opacity-100"
//       }`}
//       style={{
//         animation: fadeOut ? "none" : "fade-in-up 0.6s ease-out",
//       }}
//     >
//       {/* Loading spinner */}
//       <div className="mb-8">{renderSpinner()}</div>

//       {/* Loading message */}
//       <div
//         className="text-center"
//         style={{
//           animation: "fade-in-up 0.8s ease-out 0.3s both",
//         }}
//       >
//         <p className="text-lg font-medium text-foreground mb-2">{message}</p>
//         <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
//             style={{
//               animation: "pulse-scale 2s ease-in-out infinite",
//             }}
//           ></div>
//         </div>
//       </div>

//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-secondary rounded-full blur-2xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>
//     </div>
//   )
// }


// chatgpt 

// export default function Loading() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
//       <div className="flex flex-col items-center space-y-6">
//         {/* Spinner */}
//         <div className="relative w-20 h-20">
//           <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
//           <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
//         </div>

//         {/* Animated dots */}
//         <div className="flex space-x-2">
//           <span className="w-3 h-3 rounded-full bg-white animate-bounce"></span>
//           <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:200ms]"></span>
//           <span className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:400ms]"></span>
//         </div>

//         {/* Loading text */}
//         <p className="text-white text-xl font-semibold tracking-wide animate-pulse">
//           Loading, please wait...
//         </p>
//       </div>
//     </div>
//   );
// }


//chaude

// import React from 'react';

// const Loading = () => {
//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center z-50">
//       {/* Background animated particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 bg-blue-500 rounded-full opacity-10 animate-pulse -top-48 -left-48"></div>
//         <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse -bottom-48 -right-48 animation-delay-2000"></div>
//         <div className="absolute w-64 h-64 bg-pink-500 rounded-full opacity-10 animate-pulse top-1/4 right-1/4 animation-delay-4000"></div>
//       </div>

//       {/* Main loading container */}
//       <div className="relative flex flex-col items-center space-y-8 z-10">
        
//         {/* Spinning ring loader */}
//         <div className="relative">
//           {/* Outer ring */}
//           <div className="w-24 h-24 border-4 border-gray-200 border-opacity-30 rounded-full animate-spin">
//             <div className="absolute inset-0 border-4 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
//           </div>
          
//           {/* Inner pulsing dot */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
//           </div>
          
//           {/* Orbiting dots */}
//           <div className="absolute inset-0 animate-spin animation-duration-3000">
//             <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"></div>
//             <div className="absolute w-2 h-2 bg-purple-400 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1"></div>
//             <div className="absolute w-2 h-2 bg-pink-400 rounded-full right-0 top-1/2 transform translate-x-1 -translate-y-1/2"></div>
//             <div className="absolute w-2 h-2 bg-indigo-400 rounded-full left-0 top-1/2 transform -translate-x-1 -translate-y-1/2"></div>
//           </div>
//         </div>

//         {/* Loading text with typing animation */}
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-white mb-2 animate-pulse">
//             Loading
//           </h2>
//           <div className="flex space-x-1 justify-center">
//             <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
//             <div className="w-2 h-2 bg-purple-200 rounded-full animate-bounce animation-delay-200"></div>
//             <div className="w-2 h-2 bg-pink-200 rounded-full animate-bounce animation-delay-400"></div>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse transform origin-left"></div>
//         </div>

//         {/* Floating elements */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute w-6 h-6 bg-white opacity-20 rounded-full animate-ping top-1/4 left-1/3 animation-delay-1000"></div>
//           <div className="absolute w-4 h-4 bg-blue-200 opacity-30 rounded-full animate-ping bottom-1/3 right-1/4 animation-delay-2000"></div>
//           <div className="absolute w-8 h-8 bg-purple-200 opacity-20 rounded-full animate-ping top-1/2 left-1/4 animation-delay-3000"></div>
//         </div>

//       </div>

//       {/* Custom CSS for additional animations */}
//       <style jsx> {`
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         .animation-delay-200 {
//           animation-delay: 0.2s;
//         }
        
//         .animation-delay-400 {
//           animation-delay: 0.4s;
//         }
        
//         .animation-delay-1000 {
//           animation-delay: 1s;
//         }
        
//         .animation-delay-2000 {
//           animation-delay: 2s;
//         }
        
//         .animation-delay-3000 {
//           animation-delay: 3s;
//         }
        
//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
        
//         .animation-duration-3000 {
//           animation-duration: 3s;
//         }
        
//         /* Smooth entrance animation */
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Loading;

// deepseek

// export default function Loading() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
//       <div className="text-center">
//         {/* Animated circles */}
//         <div className="relative flex justify-center items-center mb-8">
//           <div className="absolute w-24 h-24 border-4 border-indigo-200 rounded-full animate-ping"></div>
//           <div className="absolute w-20 h-20 border-4 border-indigo-300 rounded-full animate-pulse"></div>
//           <div className="w-16 h-16 border-4 border-indigo-500 rounded-full animate-bounce"></div>
//         </div>
        
//         {/* Text with fade animation */}
//         <h2 className="text-2xl font-semibold text-indigo-800 mb-2 animate-pulse">
//           Loading
//           <span className="inline-block animate-bounce">.</span>
//           <span className="inline-block animate-bounce delay-150">.</span>
//           <span className="inline-block animate-bounce delay-300">.</span>
//         </h2>
        
//         <p className="text-indigo-600">Preparing something amazing for you</p>
        
//         {/* Animated progress bar */}
//         <div className="mt-8 w-64 h-2 bg-indigo-100 rounded-full mx-auto overflow-hidden">
//           <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-[progressBar_2s_ease-in-out_infinite]"></div>
//         </div>
        
//         {/* Custom animation style */}
//         <style jsx>{`
//           @keyframes progressBar {
//             0% { width: 0%; transform: translateX(-100%); }
//             50% { width: 70%; }
//             100% { width: 100%; transform: translateX(0%); }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-pink-400/20 to-yellow-400/20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400/10 to-cyan-400/10 animate-spin duration-[20s]"></div>
      </div>

      {/* Main loading container */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Primary spinner with nested rings */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
          
          {/* Middle animated ring */}
          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
          
          {/* Inner ring */}
          <div className="absolute inset-2 w-20 h-20 rounded-full border-4 border-transparent border-t-pink-500 border-l-yellow-500 animate-spin duration-700 direction-reverse"></div>
          
          {/* Core dot */}
          <div className="absolute inset-8 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          
          {/* Center highlight */}
          <div className="absolute inset-10 w-4 h-4 bg-white rounded-full animate-ping"></div>
        </div>

        {/* Bouncing dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full animate-bounce delay-200"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-bounce delay-300"></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Loading
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 animate-pulse delay-500">
            Preparing your experience...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-full animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/60 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-ping delay-3000"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-ping delay-4000"></div>
        </div>

        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-spin duration-[8s]">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2 -translate-y-20"></div>
        </div>
        <div className="absolute inset-0 animate-spin duration-[12s] direction-reverse">
          <div className="absolute bottom-0 right-1/2 w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full transform translate-x-1/2 translate-y-20"></div>
        </div>
      </div>

      {/* Custom keyframes and animations */}
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .direction-reverse {
          animation-direction: reverse;
        }
        
        .animate-[loading_2s_ease-in-out_infinite] {
          animation: loading 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
// 'use client'

// import Link from "next/link"
// import './globals.css'

// export default function NotFound() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full text-center space-y-8">
//         {/* 404 Number */}
//         <div className="space-y-4">
//           <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 select-none">
//             404
//           </div>
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
//         </div>

//         {/* Text Content */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
//           <p className="text-gray-600 leading-relaxed px-4">
//             The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, it happens to the best of us. Let&apos;s get
//             you back on track!
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="space-y-4 px-4">
//           <Link href="/">
//             <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                 />
//               </svg>
//               <span>Back to Home</span>
//             </button>
//           </Link>

//           <button
//             className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
//             onClick={() => window.history.back()}
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span>Go Back</span>
//           </button>
//         </div>

//         {/* Decorative Elements */}
//         <div className="flex justify-center space-x-2 pt-4">
//           <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
//           <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
//           <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//         </div>

//         {/* Help Text */}
//         <div className="pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-500">
//             Still lost?{" "}
//             <Link
//               href="/contact"
//               className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
//             >
//               Get help here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import './globals.css'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="space-y-4">
          <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 select-none">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Oops! Page Not Found</h1>
          <p className="text-gray-600 leading-relaxed px-4">
            The page you&apos;re looking for seems to have wandered off. Don&apos;t worry, it happens to the best of us. Let&apos;s get
            you back on track!
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4 px-4">
          <Link href="/">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Back to Home</span>
            </button>
          </Link>

          <button
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
            onClick={() => router.back()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-2 pt-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        {/* Help Text */}
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Still lost?{" "}
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
            >
              Get help here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

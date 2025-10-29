// app/assessment/success/page.tsx
"use client";
export default function AssessmentSuccess() {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-orange-400 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-orange-600 rounded-full opacity-20 animate-ping"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-orange-500/30 backdrop-blur-sm">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 via-orange-400/20 to-orange-600/20 blur-sm -z-10"></div>
        
        {/* Success icon */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 w-20 h-20 mx-auto border-2 border-orange-500 rounded-full animate-ping opacity-30"></div>
        </div>

        {/* Text content */}
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          Assessment Complete
        </h1>
        
        <div className="space-y-4 text-gray-300">
          <p className="text-lg font-medium">
            Mission accomplished! Your assessment has been successfully processed.
          </p>
          <p className="text-sm opacity-80">
            Your neural patterns have been analyzed and recorded in our quantum database.
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 space-y-3">
          <button onClick={() => window.location.href = '/'} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30">
            Return to Home
          </button>
          <button onClick={() => window.location.href = '/exam'} className="w-full bg-gray-700/50 hover:bg-gray-600/50 text-orange-400 font-medium py-2 px-6 rounded-lg border border-orange-500/30 transition-all duration-300">
            Close Session
          </button>
        </div>

        {/* Status indicators */}
        <div className="mt-6 pt-4 border-t border-gray-700/50">
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span>Encrypted</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30 animate-pulse" 
             style={{
               animation: 'scan 3s ease-in-out infinite',
               position: 'absolute',
               top: '50%'
             }}></div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-50vh); opacity: 0; }
          50% { transform: translateY(50vh); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
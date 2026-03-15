export function BrainMapVisualizer() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4">
      <div className="relative w-full aspect-square max-w-[200px] opacity-95">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Head outline */}
          <ellipse
            cx="50"
            cy="55"
            rx="42"
            ry="48"
            fill="hsl(var(--muted)/0.3)"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <path d="M 46 7 L 50 2 L 54 7" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
          <path
            d="M 8 45 C 2 50 2 60 8 65"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          <path
            d="M 92 45 C 98 50 98 60 92 65"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />

          {/* Heatmap spots to simulate qEEG */}
          <circle
            cx="35"
            cy="30"
            r="18"
            fill="url(#heat-red)"
            opacity="0.85"
            className="animate-pulse"
          />
          <circle cx="65" cy="30" r="15" fill="url(#heat-yellow)" opacity="0.7" />
          <circle cx="50" cy="75" r="24" fill="url(#heat-blue)" opacity="0.6" />

          <defs>
            <radialGradient id="heat-red">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-yellow">
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="50%" stopColor="#eab308" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-blue">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="mt-4 text-center space-y-1">
        <h4 className="text-sm font-semibold">Topografia Fp1-Fp2</h4>
        <p className="text-xs text-muted-foreground font-mono">Assimetria de Theta detectada</p>
      </div>
    </div>
  )
}

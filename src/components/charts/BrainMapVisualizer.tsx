import { cn } from '@/lib/utils'

interface BrainMapVisualizerProps {
  title?: string
  subtitle?: string
  variant?: 'default' | 'frontal' | 'limbic'
  className?: string
}

export function BrainMapVisualizer({
  title,
  subtitle,
  variant = 'default',
  className,
}: BrainMapVisualizerProps) {
  // SVG points for a simplified brain top view
  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <div className="relative w-48 h-56">
        {/* Basic Brain Outline */}
        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-md">
          {/* Left Hemisphere */}
          <path
            d="M 100 20 C 60 20 20 60 20 120 C 20 180 60 220 100 220"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          {/* Right Hemisphere */}
          <path
            d="M 100 20 C 140 20 180 60 180 120 C 180 180 140 220 100 220"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          {/* Center line */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="220"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Heatmap Nodes */}
          {/* Fp1 / Fp2 */}
          <circle
            cx="70"
            cy="50"
            r="15"
            fill={variant === 'frontal' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(59, 130, 246, 0.3)'}
            className="animate-pulse"
          />
          <circle
            cx="130"
            cy="50"
            r="15"
            fill={variant === 'frontal' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(59, 130, 246, 0.3)'}
          />

          {/* F3 / F4 */}
          <circle
            cx="50"
            cy="90"
            r="18"
            fill={variant === 'frontal' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(16, 185, 129, 0.4)'}
          />
          <circle cx="150" cy="90" r="18" fill="rgba(16, 185, 129, 0.4)" />

          {/* C3 / C4 */}
          <circle
            cx="45"
            cy="140"
            r="20"
            fill={variant === 'limbic' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(59, 130, 246, 0.4)'}
            className={variant === 'limbic' ? 'animate-pulse' : ''}
          />
          <circle
            cx="155"
            cy="140"
            r="20"
            fill={variant === 'limbic' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(59, 130, 246, 0.4)'}
          />

          {/* P3 / P4 */}
          <circle cx="60" cy="180" r="16" fill="rgba(139, 92, 246, 0.5)" />
          <circle cx="140" cy="180" r="16" fill="rgba(139, 92, 246, 0.5)" />

          {/* O1 / O2 */}
          <circle cx="85" cy="205" r="12" fill="rgba(16, 185, 129, 0.6)" />
          <circle cx="115" cy="205" r="12" fill="rgba(16, 185, 129, 0.6)" />

          {/* Cz / Pz (Midline) */}
          <circle
            cx="100"
            cy="115"
            r="14"
            fill={variant === 'limbic' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.4)'}
          />
          <circle cx="100" cy="160" r="14" fill="rgba(59, 130, 246, 0.5)" />
        </svg>
      </div>

      {(title || subtitle) && (
        <div className="text-center mt-4">
          {title && <h4 className="font-bold text-slate-800 text-sm">{title}</h4>}
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}

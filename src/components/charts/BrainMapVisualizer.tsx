import { cn } from '@/lib/utils'

interface BrainMapVisualizerProps {
  className?: string
  title?: string
  subtitle?: string
  variant?: 'default' | 'limbic' | 'frontal'
}

export function BrainMapVisualizer({
  className,
  title,
  subtitle,
  variant = 'default',
}: BrainMapVisualizerProps) {
  const getGradient = () => {
    if (variant === 'limbic')
      return (
        <radialGradient id="activation" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.8" />
          <stop offset="50%" stopColor="hsl(var(--destructive))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      )

    if (variant === 'frontal')
      return (
        <radialGradient id="activation" cx="50%" cy="50%" r="50%" fx="50%" fy="20%">
          <stop offset="0%" stopColor="hsl(var(--amber-500))" stopOpacity="0.9" />
          <stop offset="40%" stopColor="hsl(var(--amber-500))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      )

    return (
      <radialGradient id="activation" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="hsl(var(--emerald-500))" stopOpacity="0.7" />
        <stop offset="60%" stopColor="hsl(var(--emerald-500))" stopOpacity="0.2" />
        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
      </radialGradient>
    )
  }

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      {(title || subtitle) && (
        <div className="absolute top-0 left-0 w-full text-center -mt-6 z-10">
          {title && <h4 className="font-bold text-sm text-foreground">{title}</h4>}
          {subtitle && <p className="text-[10px] text-muted-foreground uppercase">{subtitle}</p>}
        </div>
      )}

      <svg viewBox="0 0 200 240" className="w-48 h-auto drop-shadow-xl" aria-label="Brain Map">
        <defs>{getGradient()}</defs>

        <path
          d="M100 10 C60 10 20 50 20 110 C20 170 50 220 100 230 C150 220 180 170 180 110 C180 50 140 10 100 10 Z"
          fill="hsl(var(--muted)/0.3)"
          stroke="hsl(var(--muted-foreground)/0.5)"
          strokeWidth="2"
          className="transition-all duration-500"
        />

        <path
          d="M100 10 C100 10 100 230 100 230"
          stroke="hsl(var(--muted-foreground)/0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M20 110 C20 110 180 110 180 110"
          stroke="hsl(var(--muted-foreground)/0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        <path
          d="M100 10 C60 10 20 50 20 110 C20 170 50 220 100 230 C150 220 180 170 180 110 C180 50 140 10 100 10 Z"
          fill="url(#activation)"
          className="transition-all duration-1000 animate-pulse-glow"
        />
      </svg>
    </div>
  )
}

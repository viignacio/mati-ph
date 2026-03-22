import { cn } from '@/lib/utils'

type LogisticsBlockProps = {
  data: any
  dictionary?: any
}

export function LogisticsBlockUI({ data }: LogisticsBlockProps) {
  return (
    <>
      <div className="text-center mb-16 max-w-2xl mx-auto">
        {data.tagline && (
          <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">
            {data.tagline}
          </span>
        )}
        <h2 className="text-4xl md:text-5xl font-serif text-on-surface mb-6">
          {data.heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {data.cards?.map((card: any, index: number) => {
          const isLandscape = card.orientation === 'landscape'
          const isDark = card.theme === 'dark'
          const hasBg = card.backgroundImage?.asset?.url

          return (
            <div
              key={card._key || index}
              className={cn(
                "relative rounded-[3rem] p-10 md:p-14 flex flex-col justify-between overflow-hidden shadow-2xl transition-all hover:scale-[1.01]",
                isLandscape ? "md:col-span-8" : "md:col-span-4",
                isDark ? "bg-on-background text-surface" : "bg-surface-container-low text-on-surface"
              )}
            >
              {/* Background Image for Dark Theme */}
              {isDark && hasBg && (
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-overlay -z-0"
                  style={{ backgroundImage: `url(${card.backgroundImage.asset.url})`, backgroundSize: 'cover' }}
                />
              )}

              <div className="relative z-10 space-y-8">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center",
                  isDark ? "bg-surface/10" : "bg-primary/10 text-primary"
                )}>
                  <span className="material-symbols-outlined scale-125">{card.icon || 'star'}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold">{card.title}</h3>
                  <p className={cn(
                    "text-lg leading-relaxed",
                    isDark ? "opacity-80" : "text-on-surface-variant"
                  )}>
                    {card.description}
                  </p>
                </div>
              </div>

              <div className={cn(
                "relative z-10 mt-12 pt-10 border-t",
                isDark ? "border-surface/10" : "border-on-surface/10"
              )}>
                <div className={cn(
                  "grid gap-6",
                  card.statLayout === 'grid' ? "grid-cols-2" : "grid-cols-1"
                )}>
                  {card.stats?.map((stat: any, sIdx: number) => (
                    <div key={stat._key || sIdx} className="space-y-1">
                      <span className={cn(
                        "uppercase tracking-widest text-[10px] font-bold",
                        isDark ? "opacity-50" : "text-on-surface-variant/60"
                      )}>
                        {stat.label}
                      </span>
                      <p className="text-xl font-bold font-serif">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

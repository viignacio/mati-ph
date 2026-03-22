import Image from 'next/image'
import { CtaButton } from '@/components/ui/cta-button'
import { colorVar } from '@/lib/color'

const LIGHT_TO_DARK: Record<string, string> = {
  primary: 'dark-teal',
  secondary: 'dark-blue',
  tertiary: 'dark-red',
  neutral: 'dark-neutral',
}
const DARK_TO_LIGHT: Record<string, string> = {
  'dark-teal': 'primary',
  'dark-blue': 'secondary',
  'dark-red': 'tertiary',
  'dark-neutral': 'neutral',
}

function cardAccentVar(accentToken: string | undefined, isDark: boolean): string {
  if (!accentToken) return isDark ? 'var(--color-primary-fixed)' : 'var(--color-primary)'
  if (isDark && DARK_TO_LIGHT[accentToken]) {
    return `var(--color-${DARK_TO_LIGHT[accentToken]})`
  }
  if (!isDark && LIGHT_TO_DARK[accentToken]) {
    return `var(--color-${LIGHT_TO_DARK[accentToken]})`
  }
  return `var(--color-${accentToken})`
}

type LogisticsBlockProps = {
  data: any
  dictionary?: any
}

export function LogisticsBlockUI({ data }: LogisticsBlockProps) {
  const accent = colorVar(data.design?.accentColorRef)
  const accentToken = data.design?.accentColorRef?.value?.current as string | undefined

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          {data.tagline && (
            <span
              className="font-bold tracking-widest uppercase text-sm mb-4 block"
              style={{ color: accent ?? 'var(--color-primary)' }}
            >
              {data.tagline}
            </span>
          )}
          {data.heading && (
            <h2 className="text-5xl font-serif text-on-surface">{data.heading}</h2>
          )}
          <div className="h-1 w-24 bg-tertiary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {data.cards?.map((card: any, index: number) => {
            const isLandscape = card.orientation === 'landscape'
            const isDark = card.theme === 'dark'
            const hasBg = card.backgroundImage?.asset?.url
            const overlayOpacity: Record<string, string> = {
              light: '0.25',
              dark: '0.50',
              darker: '0.80',
            }
            const overlayAlpha = overlayOpacity[card.overlayStrength ?? 'dark']

            if (isDark) {
              return (
                <div key={card._key || index} className="md:col-span-8 bg-on-background text-surface p-10 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
                  {/* Background Image & Overlay */}
                  {hasBg && (
                    <div className="absolute inset-0">
                      <Image 
                        src={card.backgroundImage.asset.url} 
                        alt="Background" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale" 
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,52,48,${overlayAlpha})` }}></div>
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-8">
                      <span className="material-symbols-outlined text-primary-fixed text-4xl">{card.icon || 'directions_car'}</span>
                    </div>
                    <h3 className="text-3xl font-serif mb-6">{card.title}</h3>
                    {card.description && (
                      <p className="text-surface-variant max-w-lg mb-12 leading-relaxed text-lg">
                        {card.description}
                      </p>
                    )}

                    <div className="mt-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {card.stats?.map((stat: any, sIdx: number) => (
                        <div key={stat._key || sIdx} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                          <span
                            className="block text-[10px] uppercase font-bold tracking-widest mb-1"
                            style={{ color: cardAccentVar(accentToken, true) }}
                          >
                            {stat.label}
                          </span>
                          <span className="text-sm font-bold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            // Light theme (Portrait default)
            return (
              <div key={card._key || index} className={`${isLandscape ? 'md:col-span-8' : 'md:col-span-4'} bg-surface-container-low p-10 rounded-[2.5rem] flex flex-col justify-between group border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow`}>
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                    <span
                      className="material-symbols-outlined text-4xl"
                      style={{ color: cardAccentVar(accentToken, false) }}
                    >{card.icon || 'directions_bus'}</span>
                  </div>
                  <h3 className="text-3xl font-serif mb-6">{card.title}</h3>
                  {card.description && (
                    <p className="text-on-surface-variant mb-10 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>

                <div className="space-y-4 pt-8 border-t border-outline-variant/20">
                  {card.stats?.map((stat: any, sIdx: number) => (
                    <div key={stat._key || sIdx} className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant font-medium">{stat.label}</span>
                      <span
                        className="font-bold"
                        style={{ color: cardAccentVar(accentToken, false) }}
                      >{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {data.cta?.text && data.cta?.link && (
          <div className="mt-16 flex justify-center">
            <CtaButton
              text={data.cta.text}
              href={data.cta.link}
              variant={data.cta.buttonVariant ?? 'filled'}
              color={data.cta.buttonColor}
              icon={data.cta.icon}
              defaultColor="primary"
            />
          </div>
        )}
      </div>
    </section>
  )
}

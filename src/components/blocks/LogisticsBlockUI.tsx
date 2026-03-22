import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogisticsBlockProps = {
  data: any
  dictionary?: any
}

export function LogisticsBlockUI({ data }: LogisticsBlockProps) {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          {data.tagline && (
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
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
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-on-background/95 via-on-background/80 to-on-background/40"></div>
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
                          <span className="block text-[10px] uppercase font-bold tracking-widest text-primary-fixed mb-1">
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
                    <span className="material-symbols-outlined text-primary text-4xl">{card.icon || 'directions_bus'}</span>
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
                      <span className="font-bold text-primary">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

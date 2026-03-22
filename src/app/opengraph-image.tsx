import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Mati City, Davao Oriental — Where Philippines Gets Wilder'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #40E0D0 0%, #0077BE 55%, #1a3a5c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Decorative gradient overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
            display: 'flex',
          }}
        />

        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #FF4500, #FF6B35, #FF4500)',
            display: 'flex',
          }}
        />

        {/* Location pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '9999px',
            padding: '8px 20px',
            marginBottom: '24px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '18px',
              fontFamily: 'sans-serif',
              fontWeight: 500,
              letterSpacing: '0.05em',
            }}
          >
            DAVAO ORIENTAL, PHILIPPINES
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '72px',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '820px',
            marginBottom: '20px',
          }}
        >
          Mati City
        </div>

        {/* Tagline */}
        <div
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '28px',
            fontFamily: 'sans-serif',
            fontWeight: 400,
            maxWidth: '700px',
          }}
        >
          Where Philippines Gets Wilder
        </div>
      </div>
    ),
    { ...size },
  )
}

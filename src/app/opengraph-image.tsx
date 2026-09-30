import { ImageResponse } from 'next/og'

export const alt = 'Dave Chroninger — engineer, learner, tinkerer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#0c0a0d',
          color: '#f6efe9',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -140,
            top: -140,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: '#ff5a45',
            opacity: 0.28,
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -160,
            bottom: -200,
            width: 520,
            height: 520,
            borderRadius: 520,
            background: '#33e1ff',
            opacity: 0.16,
            filter: 'blur(60px)',
          }}
        />
        <div style={{ fontSize: 28, color: '#ff5a45', display: 'flex' }}>
          dchroninger.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Dave Chroninger
          </div>
          <div style={{ fontSize: 40, color: '#cfc5bf', marginTop: 20 }}>
            Engineer. Learner. Tinkerer.
          </div>
        </div>
      </div>
    ),
    size,
  )
}

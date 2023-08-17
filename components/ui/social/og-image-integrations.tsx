import { ImageResponse } from 'next/server'

import { turboIntegrations } from '@/data/turbo-integrations'
import { env } from 'env.mjs'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const url = env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function IntegrationOgImage(integration: keyof typeof turboIntegrations) {
  const integrationData = turboIntegrations[integration]

  return async function Image() {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(to bottom right, #FFF 25%, #FFF0CA 75%)',
          }}>
          <img
            alt="TurboETH Logo"
            src={new URL(integrationData.imgDark, url).toString()}
            style={{ borderRadius: '9999px' }}
            tw="w-32 h-32 mb-2 opacity-95"
          />
          <h1
            style={{
              fontSize: '100px',
              fontFamily: 'SF Pro',
              fontWeight: 900,
              background: 'linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: '5rem',
              letterSpacing: '-0.02em',
            }}>
            {integrationData.name}
          </h1>
          <h3
            style={{
              marginTop: '2rem',
              fontSize: '22px',
              fontFamily: 'SF Pro',
              maxWidth: '800px',
              textAlign: 'center',
              background: 'linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}>
            {integrationData.description}
          </h3>
        </div>
      ),
      {
        fonts: [
          {
            name: 'SF Pro',
            data: await fetch(new URL('../../../assets/fonts/SF-Pro-Display-Medium.otf', import.meta.url)).then((res) => res.arrayBuffer()),
          },
        ],
      }
    )
  }
}

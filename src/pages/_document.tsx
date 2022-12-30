import { Head, Html, Main, NextScript } from 'next/document'

import { APP_CONFIG } from 'utils/config'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={APP_CONFIG.title} />
        <meta property="twitter:title" content={APP_CONFIG.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_CONFIG.canonical} />
        <meta property="twitter:url" content={APP_CONFIG.canonical} />
        <meta property="og:image" content={APP_CONFIG.previewImg} />
        <meta property="twitter:image" content={APP_CONFIG.previewImg} />
        {!!APP_CONFIG.description && (
          <>
            <meta property="og:description" content={APP_CONFIG.description} />
            <meta name="twitter:description" content={APP_CONFIG.description} />
            <meta name="description" content={APP_CONFIG.description} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="petpics" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

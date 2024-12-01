import { ThemeProvider } from '@/app/providers'
import { Container } from '@/components/Container'
import { Navigation } from '@/components/Navigation'
import ThemeSwitch from '@/components/ThemeSwitch'
import { WEBSITE_HOST_URL } from '@/lib/constants'
import type { Metadata } from 'next'
import Link from 'next/link'
import './global.css'
import { social } from '@/lib/data'

const meta = {
  title: 'callyberz - Blog',
  description: 'I am a front-end developer and ship products.',
  image: `${WEBSITE_HOST_URL}/og-preview.jpg`,
}

export const metadata: Metadata = {
  title: {
    default: meta.title,
    template: '%s | callyberz',
  },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: WEBSITE_HOST_URL,
    siteName: meta.title,
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: meta.image,
      },
    ],
  },
  twitter: {
    title: meta.title,
    description: meta.description,
    images: meta.image,
    card: 'summary_large_image',
  },
  alternates: {
    canonical: WEBSITE_HOST_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head suppressHydrationWarning>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d71eba42-88f0-4083-803c-59867e618b22"
        ></script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <header className="py-4">
            <Container>
              <div className="flex items-center justify-between py-6">
                <Navigation />
                <ThemeSwitch />
              </div>
            </Container>
          </header>
          <main>
            <Container>{children}</Container>
          </main>
          <footer className="py-16">
            <Container>
              <p>
                Check me out on{' '}
                {social.map(({ website, url }, key) => {
                  return (
                    <Link
                      className="link"
                      href={url}
                      key={key}
                      target="__blank"
                    >
                      {website}
                      {key < social.length - 1 ? ' | ' : null}
                    </Link>
                  )
                })}
              </p>
            </Container>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}

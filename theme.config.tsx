import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { Link, useConfig } from 'nextra-theme-docs'


const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/theflexwork'
  },
  docsRepositoryBase: 'https://github.com/theflexwork/flexwork-docs',
  logo: (
    <>
      <img src="/logo.png"/>
    </>
  ),
  head: function useHead() {
    const config = useConfig()
    const { route } = useRouter()
    const isDefault = route === '/' || !config.title
    const image =
      'https://nextra.site/' +
      (isDefault ? 'og.jpeg' : `api/og?title=${config.title}`)

    const description =
      config.frontMatter.description ||
      'Make beautiful websites with Next.js & MDX.'
    const title = config.title + (route === '/' ? '' : ' - Nextra')

    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="msapplication-TileColor" content="#fff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="theflexwork" />
        <meta name="twitter:url" content="https://theflexwork.io" />
        <meta name="apple-mobile-web-app-title" content="Flexwork" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </>
    )
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  gitTimestamp: null,
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  footer: {
    component: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="nextra-focus flex items-center gap-1 text-current"
            target="_blank"
            rel="noreferrer"
            title="theflexwork.io homepage"
            href="https://theflexwork.io?utm_source=nextra.site"
          >
            <span>Powered by Flexwork</span>
          </a>
        </div>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} The Flexwork Project.
        </p>
      </div>
    )
  }
}

export default config
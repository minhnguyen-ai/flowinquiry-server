export default {
    logo: <span>Flexwork Documentation</span>,
    project: {
      link: 'https://github.com/theflexwork'
    },
    
    head: (
      <>
        <link rel="icon" type="image/x-icon" href="favicon/favicon.ico"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Flexwork" />
        <meta property="og:description" content="The customizable customer service system" />
      </>
    ),
    logo: (
      <>
        <img src="/logo.png"/>
      </>
    ),
    editLink: {
      component: null
    },
    feedback: {
      content: null
    },
    gitTimestamp: null, 
    footer: {
      text: (
        <span>
          MIT {new Date().getFullYear()} ©{' '}
          <a href="https://theflexwork.io" target="_blank">
            TheFlexwork
          </a>
          .
        </span>
      )
    }
  }
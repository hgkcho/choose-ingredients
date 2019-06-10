import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import postSummary from './content/posts/json/_summary.json'
import ingredientSummary from './content/ingredients/json/_summary.json'
import pkg from './package'

const generateDynamicRoutes = callback => {
  const postRoutes = postSummary.map(summary => summary.href)
  const ingredientsRoutes = ingredientSummary.map(summary => summary.href)
  const routes = postRoutes.concat(ingredientsRoutes)
  callback(null, routes)
}

export default {
  mode: 'spa',
  srcDir: 'app',

  generate: {
    routes: generateDynamicRoutes
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#222222' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/style/app.styl',
    '~/assets/css/md-container.css',
    '~/assets/css/tomorrow-night-bright.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    '@nuxtjs/markdownit'
  ],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://choose-ingredients.netlify.com',
    exclude: ['/404'],
    routes: generateDynamicRoutes
  },

  markdownit: {
    preset: 'default',
    linkify: false,
    breaks: true,
    html: true,
    typegraphy: true,
    injected: true,
    xhtmlOut: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    use: [
      'markdown-it-meta',
      'markdown-it-footnote',
      'markdown-it-table-of-contents',
      'markdown-it-anchor',
      'markdown-it-abbr',
      'markdown-it-emoji',
      'markdown-it-container'
    ]
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && process.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

const md = require('markdown-it')()
const hljs = require('highlight.js')
const container = require('markdown-it-container')
const meta = require('markdown-it-meta')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const abbr = require('markdown-it-abbr')
const emoji = require('markdown-it-emoji')

md.set({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  langPrefix: 'hljs language-',
  highlight: function(code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
  .use(container, 'spoiler', {
    validate: function(params) {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },

    render: function(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n'
      } else {
        // closing tag
        return '</details>\n'
      }
    }
  })
  .use(container, 'info')
  .use(container, 'succsess')
  .use(container, 'warning')
  .use(container, 'danger')
  .use(emoji)
  .use(meta)
  .use(abbr)
  .use(toc, {
    slugify: anchor.defaults.slugify,
    includeLevel: [2, 3]
  })

// toc custom
md.renderer.rules.toc_open = () =>
  '<div class="table-of-contents"><div class="toc-title">- table -</div>'
md.renderer.rules.toc_close = () => '</div>'

// link custom
const defaultRender =
  md.renderer.rules.link_open ||
  function render(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const tokensLocal = tokens
  const hrefIndex = tokensLocal[idx].attrIndex('href')

  if (hrefIndex >= 0) {
    const link = tokensLocal[idx].attrs[hrefIndex]
    const href = link[1]
    const isExternal = /^https?:/.test(href) && !/\/\/isoppp.com\//.test(href)

    if (isExternal) {
      const aIndex = tokensLocal[idx].attrIndex('target')
      if (aIndex >= 0) {
        tokensLocal[idx].attrs[aIndex][1] = '_blank'
      } else {
        tokensLocal[idx].attrPush(['target', '_blank'])
      }
    }
  }

  // pass token to default renderer.
  return defaultRender(tokensLocal, idx, options, env, self)
}

module.exports = {
  md
}

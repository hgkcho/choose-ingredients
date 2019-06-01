const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync
const { md } = require('./markdown-it')
const { sourceFileNameToUrl, convertDateFormat } = require('./utils')

const createData = (mdFiles, exportDir, targetApp) => {
  const result = []

  mdFiles.forEach(mdPath => {
    const content = fs.readFileSync(mdPath, 'utf-8')
    const body = md.render(content)
    const meta = Object.assign({}, md.meta)
    meta.createdAt = meta.createdAt ? convertDateFormat(meta.created_at) : ''
    delete meta.created_at

    meta.href = sourceFileNameToUrl(
      mdPath.replace(process.cwd(), ''),
      targetApp
    )

    const parse = path.parse(mdPath)
    const jsonPath = path.resolve(exportDir, `${parse.name}.json`)
    result.push(Object.assign({}, meta, { body, mdPath, jsonPath }))
  })

  return result
}

const exportSingleArticle = articles => {
  articles.forEach(elem => {
    const exportData = {
      title: elem.title,
      tag: elem.tag,
      createdAt: elem.createdAt,
      name: elem.name,
      category: elem.category,
      calory: elem.calory,
      main_nutritions: elem.main_nutritions,
      body: elem.body,
      href: elem.href,
      ogimage: elem.ogimage,
      description: elem.description
    }
    fs.writeFileSync(elem.jsonPath, JSON.stringify(exportData, null, 2), 'utf8')
  })
}

const exportSummary = (articles, summaryFilePath) => {
  const summaryData = articles.map(elem => ({
    title: elem.title ? elem.title : '',
    tag: elem.tag ? elem.tag : '',
    name: elem.name ? elem.name : '',
    category: elem.category ? elem.category : '',
    calory: elem.calory ? elem.calory : '',
    main_nutritions: elem.main_nutritions ? elem.main_nutritions : '',
    createdAt: elem.createdAt ? elem.createdAt : '',
    href: elem.href
  }))

  fs.writeFileSync(summaryFilePath, JSON.stringify(summaryData))
}

const exportFileMap = (articles, fileMapFilePath) => {
  const fileMap = articles.map(elem => ({
    jsonPath: elem.jsonPath,
    mdPath: elem.mdPath,
    href: elem.href
  }))
  fs.writeFileSync(fileMapFilePath, JSON.stringify(fileMap))
}

const convertArticle = (
  mdFiles,
  exportDir,
  summaryFilePath,
  fileMapFilePath,
  targetApp
) => {
  const articles = createData(mdFiles, exportDir, targetApp)

  mkdirp(exportDir)

  exportSingleArticle(articles)
  exportSummary(articles, summaryFilePath)
  exportFileMap(articles, fileMapFilePath)
}

module.exports = {
  convertArticle
}

/**
 * Convert local path to link url
 * @param filePath /content/posts/markdown/2017-11-17-mac-global-env.md 形式のパス
 * @returns {string}
 */
const sourceFileNameToUrl = (filePath, targetApp) => {
  const deleteExt = filePath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('-')
  return `/${targetApp}/${splitArray.slice(0, 3).join('-')}/${splitArray
    .slice(3)
    .join('-')}`
}

/**
 * ingredientのmdファイルからURLを生成する
 *
 * @param {*} filePath
 * @param {*} targetApp
 * @param {*} targetCategory
 */
const extractHref = (filePath, targetApp, targetCategory) => {
  const deleteExt = filePath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  return `/${targetApp}/${targetCategory}/${fileName}`
}

/**
 * Convert string date format value to YYYY/MM/DD
 * @param dateString 2018-05-21T00:00:00.000Z
 * @returns {string}
 */
const convertDateFormat = dateString => {
  const date = new Date(dateString)
  const year = `0000${date.getFullYear()}`.slice(-4)
  const month = `00${date.getMonth() + 1}`.slice(-2)
  const day = `00${date.getDate()}`.slice(-2)

  return `${year}/${month}/${day}`
}

module.exports = {
  sourceFileNameToUrl,
  convertDateFormat,
  extractHref
}

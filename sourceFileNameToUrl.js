export function sourceFileNameToUrl(filepath) {
  const deleteExt = filepath.replace('.md', '')
  const fileName = deleteExt.split('/')[deleteExt.split('/').length - 1]
  const splitArray = fileName.split('-')
  return `/note/${splitArray.slice(0, 3).join('-')}/${splitArray
    .slice(3)
    .join('-')}`
}

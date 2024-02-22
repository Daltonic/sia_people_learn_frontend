export const truncateFileName = (
  fileName: string,
  maxLength: number = 20
): string => {
  const extension = fileName.split('.').pop() || ''
  const nameWithoutExtension = fileName.slice(0, -extension.length)
  const truncatedName = nameWithoutExtension.slice(0, maxLength)
  return truncatedName.length < nameWithoutExtension.length
    ? `${truncatedName}...${extension}`
    : fileName
}

export const formatFileSize = (size: number): string => {
  const units = ['Bytes', 'KB', 'MB', 'GB']
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

export const extractFileNameFromUrl = (url: string) => {
  const parsedUrl = new URL(url)
  const pathSegments = parsedUrl.pathname.split('/')
  const fileName = pathSegments[pathSegments.length - 1]
  return fileName
}

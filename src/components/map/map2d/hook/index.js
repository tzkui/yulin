/**
 * 文件路径
 * @param {*} fileName 
 * @returns 
 */
export const assetsUrl = (fileName) => {//assets 路径
  return new URL('../../../../assets' + fileName, import.meta.url).href
}
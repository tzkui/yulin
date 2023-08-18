export const markerImg = (imgeName) => {
    let path= "/src/assets/images/marker/"+imgeName+""
      const modules = import.meta.globEager("/src/assets/images/marker/*");
      return modules[path].default;
};
export const geoJson = (fileName) => {
    let path= "/src/assets/geojson/"+fileName+""
      const modules = import.meta.globEager("/src/assets/geojson/*");
      console.log(modules[path].default,modules)
      return modules[path].default;
};
export const assetsUrl = (fileName)=>{//assets 路径
    return new URL('/src/assets/'+fileName,import.meta.url).toString()
}
export const onlineOrlocal=(url)=>{//判断是否是本地或网络路径
  let isLocal=true
  if(url.indexOf('http')>-1){
      isLocal = false 
  }else{
      isLocal = true 
  }
  return isLocal
}
const moduleFiles = import.meta.glob('./dialog.config.modules/**.js', { eager: true });
const configs = Object.create(null)
for(const module of Object.values(moduleFiles)){
  Object.assign(configs,module.default)
}
export default configs

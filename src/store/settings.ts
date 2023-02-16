interface ISettings {
  title: string // Overrides the default title
  tagsView: boolean // Whether need tagsView
  fixedHeader: boolean // Whether fix the header
  errorLog: string | string[] //  Need show err logs component. The default is only used in the production env. If you want to also use it in dev, you can pass ['production', 'development']
}

// You can customize below settings :)
const defaultSettings: ISettings = {
  title: '星众后台管理',
  tagsView: true,
  fixedHeader: true,
  errorLog: 'production'
}

export { defaultSettings }

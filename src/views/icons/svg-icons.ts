const svgs = import.meta.glob('../../icons/svg/*.svg', { eager: true })

const svgIcons: string[] = []
Object.keys(svgs).forEach((key) => {
  let svgName = key.replace(/^(\.\.\/)+?icons\/svg\/(.+?)\.svg$/, '$2')
  svgIcons.push(svgName)
})

export default svgIcons

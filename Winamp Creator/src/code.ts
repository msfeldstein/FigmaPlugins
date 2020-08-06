
const main = async function() {
  const exportNames = [
    "VOLUME",
    "TITLEBAR",
    "TEXT",
    "MAIN",
    "SHUFREP",
    "POSBAR",
    "NUMBERS",
    "MONOSTER",
    "MAIN",
    "BALANCE",
    "CBUTTONS"
  ]
  const nodes = figma.root.findAll(node => node.type === "COMPONENT" && exportNames.indexOf(node.name) != -1) as readonly ComponentNode[]
  const pngs = []
  for (var i = 0; i < nodes.length; i++) {
    const png = await nodes[i].exportAsync()
    pngs.push({
      name: nodes[i].name,
      data: png
    })
  }
  // console.log(pngs)
  console.log("About to make zip")

  figma.showUI(__html__, { visible: false })
  figma.ui.postMessage({
    pngs
  })

  // console.log(FileSaver, 'fs')
  // FileSaver.saveAs(blob, 'skin.wsz')
}

main()
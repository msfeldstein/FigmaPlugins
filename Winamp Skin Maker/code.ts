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
  const nodes = figma.root.findAll(node => node.type === "COMPONENT" && exportNames.indexOf(node.name) != -1)
  const pngs = await Promise.all(nodes.map(n => n.exportAsync()))
  console.log(pngs)
}

main()
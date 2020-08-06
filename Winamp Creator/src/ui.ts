import JSZip from 'jszip'
import Jimp from 'jimp'
// import * as FileSaver from 'file-saver';

onmessage = async (e) => {
  console.log(e)
  if (!e.data.pluginMessage) return
  console.log(e.data.pluginMessage)
  const pngs = e.data.pluginMessage.pngs
  console.log("PNGS", pngs)
  var zip = new JSZip()
  console.log("Made zip")
  for (var i = 0; i < pngs.length; i++) {
    const png = pngs[i]
    const jimp = await Jimp.read(png.data.buffer)
    console.log(jimp)
    const buffer = await jimp.getBufferAsync("image/bmp")
    zip.file(`${png.name}.bmp`, buffer)
  }

  const blob = await zip.generateAsync({type: 'blob'})
  console.log("Blob", blob)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download =  "skin.wsz"
  a.target = "_blank"
  a.click()

}
import JSZip from 'jszip'
import Jimp from 'jimp'
import Webamp from 'webamp'
// import * as FileSaver from 'file-saver';
let url;
const webamp = new Webamp({
  initialTracks: [
    {
      url: "https://raw.githubusercontent.com/captbaritone/webamp-music/4b556fbf/Auto-Pilot_-_03_-_Seventeen.mp3",
      duration: 5.322286
    }
  ],
})
webamp.renderWhenReady(document.querySelector("#app"))
onmessage = async (e) => {
  if (!e.data.pluginMessage) return
  console.log(e.data.pluginMessage)
  const pngs = e.data.pluginMessage.pngs
  var zip = new JSZip()
  for (var i = 0; i < pngs.length; i++) {
    const png = pngs[i]
    const jimp = await Jimp.read(png.data.buffer)
    console.log(jimp)
    const buffer = await jimp.getBufferAsync("image/bmp")
    zip.file(`${png.name}.bmp`, buffer)
  }

  const blob = await zip.generateAsync({type: 'blob'})
  if (url) URL.revokeObjectURL(url)
  url = URL.createObjectURL(blob)
  debugger
  webamp.setSkinFromUrl(url)


}

document.querySelector("#refresh").addEventListener("click", () => {
  parent.postMessage({pluginMessage: "refresh"}, "*")
})

document.querySelector("#download").addEventListener("click", () => {
  const a = document.createElement('a')
  a.href = url
  a.download =  "skin.wsz"
  a.target = "_blank"
  a.click()
})
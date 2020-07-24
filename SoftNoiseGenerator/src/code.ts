async function main(): Promise<string | undefined> {
  if (figma.currentPage.selection.length !== 1) {
    return "There must be 1 and only one layer selected";
  }
  const layer = figma.currentPage.selection[0];
  if (layer.type !== "RECTANGLE") {
    return "The selected layer must be a rectangle";
  }

  figma.showUI(__html__, {
    height: 250,
    width: 280,
  });

  var lastWidth = 0;
  var lastHeight = 0;
  setInterval(() => {
    if (lastWidth === layer.width && lastHeight === layer.height) return;
    lastWidth = layer.width;
    lastHeight = layer.height;
    figma.ui.postMessage({
      type: "layer-size",
      width: layer.width,
      height: layer.height,
    });
  }, 200);
  await new Promise((resolve, reject) => {
    figma.ui.onmessage = (msg) => {
      const bytes = msg.bytes;
      const newPaint = {
        type: "IMAGE",
        scaleMode: "FIT",
        imageHash: null,
      };
      newPaint.imageHash = figma.createImage(bytes).hash;
      // @ts-ignore
      layer.fills = [newPaint];
    };
  });
}

main();

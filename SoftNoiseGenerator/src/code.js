var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (figma.currentPage.selection.length !== 1) {
            return "There must be 1 and only one layer selected";
        }
        const layer = figma.currentPage.selection[0];
        if (layer.type !== "RECTANGLE") {
            return "The selected layer must be a rectangle";
        }
        figma.showUI(__html__, {
            height: 600,
            width: 600,
        });
        console.log("SHOW UI");
        var lastWidth = 0;
        var lastHeight = 0;
        setInterval(() => {
            if (lastWidth === layer.width && lastHeight === layer.height)
                return;
            lastWidth = layer.width;
            lastHeight = layer.height;
            figma.ui.postMessage({
                type: "layer-size",
                width: layer.width,
                height: layer.height,
            });
        }, 200);
        yield new Promise((resolve, reject) => {
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
    });
}
main();

import "./ui.css";
import shader from "./noise.fs";
import * as codemirror from "codemirror";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import * as dat from "dat.gui";

const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl");
// @ts-ignore
const renderer = new interactiveShaderFormat.Renderer(gl);

const editor = codemirror(document.querySelector("#editor"), {
  lineNumbers: true,
  tabSize: 2,
  value: shader,

  mode: "x-shader/x-fragment",
  autoCloseBrackets: true,
});

const gui = new dat.GUI();
let folder = null;
const updateGUI = () => {
  const opts = {};
  if (folder) {
    gui.removeFolder(folder);
  }
  folder = gui.addFolder("Properties");
  folder.open();

  renderer.model.inputs.forEach((input) => {
    console.log(opts, input);
    let controller;
    switch (input.TYPE) {
      case "float":
        opts[input.NAME] = input.DEFAULT;
        controller = folder.add(opts, input.NAME, input.MIN, input.MAX);
        controller.onFinishChange(
          (function (name) {
            return function (value) {
              console.log("SEt ", name, value);
              renderer.setValue(name, value);
              run();
            };
          })(input.NAME)
        );
        break;
      case "color":
        const col = input.DEFAULT;
        opts[input.NAME] = [col[0] * 255, col[1] * 255, col[2] * 255, col[3]];
        controller = folder.addColor(opts, input.NAME);
        controller.onFinishChange(
          (function (name) {
            return function (value) {
              value = [
                value[0] / 255,
                value[1] / 255,
                value[2] / 255,
                value[3],
              ];
              console.log("SEt ", name, value);
              renderer.setValue(name, value);
              run();
            };
          })(input.NAME)
        );
        break;
    }
  });
};

editor.on("change", () => {
  renderer.loadSource(editor.getValue());
  run();
  updateGUI();
});

const run = async () => {
  try {
  } catch (e) {
    console.error(e);
  }
  renderer.draw(canvas);
  const bytes = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = () => reject(new Error("could not read from blob"));
      reader.readAsArrayBuffer(blob);
    });
  });
  window.parent.postMessage({ pluginMessage: { bytes } }, "*");
};

onmessage = async (e) => {
  const { width, height } = e.data.pluginMessage;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  run();
};

renderer.loadSource(editor.getValue());
updateGUI();

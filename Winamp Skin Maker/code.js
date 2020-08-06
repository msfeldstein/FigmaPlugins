var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const main = function () {
    return __awaiter(this, void 0, void 0, function* () {
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
        ];
        const nodes = figma.root.findAll(node => node.type === "COMPONENT" && exportNames.indexOf(node.name) != -1);
        const pngs = yield Promise.all(nodes.map(n => n.exportAsync()));
        console.log(pngs);
    });
};
main();

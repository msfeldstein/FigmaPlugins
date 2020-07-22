const selection = figma.currentPage.selection;

const text = selection.find((layer) => layer.type === "TEXT") as TextNode;
const curve = selection.find((layer) => layer.type === "VECTOR") as VectorNode;
console.log("Found", { text, curve });
if (!text || !curve) throw "Select a single text and a single curve";

figma.showUI(__html__, {
	visible: false,
});

figma.ui.onmessage = (msg) => {
	console.log(msg);
	const bytes = msg.bytes;
	const newPaint = {
		type: "IMAGE",
		scaleMode: "CROP",
		imageHash: null,
	};
	newPaint.imageHash = figma.createImage(bytes).hash;
	const layer = figma.createRectangle();

	layer.resize(curve.width, curve.height);
	layer.x = curve.x;
	layer.y = curve.y;

	// @ts-ignore
	layer.fills = [newPaint];
	figma.closePlugin();
};

figma.ui.postMessage({
	text: text.characters,
	font: text.fontName,
	fontSize: text.fontSize,
	curve: curve.vectorPaths[0].data,
});

// const lerp = (p1, p2, t) => {
// 	let x = p1.x + (p2.x - p1.x) * t;
// 	let y = p1.y + (p2.y - p1.y) * t;
// 	return { x, y };
// };

// const bezInterp = (p1, c1, c2, p2, t) => {
// 	const pInt1 = lerp(p1, c1, t);
// 	const pInt2 = lerp(c1, c2, t);
// 	const pInt3 = lerp(c2, p2, t);

// 	const pIntInt1 = lerp(pInt1, pInt2, t);
// 	const pIntInt2 = lerp(pInt2, pInt3, t);

// 	const p = lerp(pIntInt1, pIntInt2, t);
// 	return p;
// };

// const main = async () => {
// 	const selection = figma.currentPage.selection;

// 	const text = selection.find((layer) => layer.type === "TEXT") as TextNode;
// 	const curve = selection.find(
// 		(layer) => layer.type === "VECTOR"
// 	) as VectorNode;
// 	console.log("Found", { text, curve });
// 	if (!text || !curve) throw "Select a single text and a single curve";

// 	const characters = text.characters.split("");
// 	await figma.loadFontAsync(text.fontName as FontName);
// 	// await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
// 	var svg = curve.vectorPaths[0].data.split(" ").map((s) => parseFloat(s));
// 	const p1 = { x: svg[1], y: svg[2] };
// 	const c1 = { x: svg[4], y: svg[5] };
// 	const c2 = { x: svg[6], y: svg[7] };
// 	const p2 = { x: svg[8], y: svg[9] };

// 	const newTexts: TextNode[] = [];
// 	for (var i = 0; i < characters.length; i++) {
// 		const char = characters[i];
// 		const copy = text.clone();
// 		copy.characters = char;
// 		newTexts.push(copy);
// 	}

// 	const totalWidth = newTexts
// 		.map((t) => t.width)
// 		.reduce((accum, cur) => accum + cur);

// 	let currentX = 0;
// 	newTexts.forEach((text) => {
// 		const t = currentX / totalWidth;
// 		currentX += text.width;
// 		const p = bezInterp(p1, c1, c2, p2, t);
// 		const pMinus = bezInterp(p1, c1, c2, p2, t - 0.001);
// 		const pPlus = bezInterp(p1, c1, c2, p2, t + 0.001);
// 		const dx = pPlus.x - pMinus.x;
// 		const dy = pPlus.y - pMinus.y;

// 		const rotation = Math.atan2(dy, dx);
// 		text.rotation = -(rotation * 360) / (2 * Math.PI);
// 		text.x = p.x + curve.x; // + Math.sin(rotation) * text.width;
// 		text.y = p.y + curve.y; // - Math.cos(rotation) * text.height;
// 	});
// };
// main().catch((m) => {
// 	figma.closePlugin(m);
// });

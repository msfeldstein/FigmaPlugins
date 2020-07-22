onmessage = (event) => {
	const { text, font, fontSize, curve } = event.data.pluginMessage;
	const svg = document.querySelector("svg");
	svg.setAttribute("viewBox", "-100 -100 2000 2000");
	const path = document.querySelector("path");
	path.setAttribute("d", curve);
	const totalLength = path.getTotalLength();
	console.log(totalLength);
	const approxSizeNeeded = totalLength / text.length;
	console.log({ approxSizeNeeded });

	const textPath = document.querySelector("textPath");
	textPath.textContent = text;
	textPath.style.fontFamily = font.family;
	textPath.style.fontSize = approxSizeNeeded * 2 + "px";

	const canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	canvas.width = 1000;
	canvas.height = 600;
	const ctx = canvas.getContext("2d");
	// make it base64
	var xml = new XMLSerializer().serializeToString(svg);
	var svg64 = btoa(xml);
	var b64Start = "data:image/svg+xml;base64,";
	var image64 = b64Start + svg64;
	const img = new Image();
	img.onload = async () => {
		ctx.drawImage(img, 0, 0);
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
	img.src = image64;
};

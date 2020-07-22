figma.showUI(__html__);

const layer = figma.currentPage.selection[0];
const component = figma.createComponent();
component.appendChild(layer);

const clones = [];
for (var i = 0; i < 5; i++) {
	const clone = component.createInstance();

	clones.push(clone);
}
const group = figma.group(clones, figma.currentPage);
group.x = layer.x;
group.y = layer.y;

figma.ui.onmessage = (msg) => {
	console.log(msg);
	for (var i = 0; i < clones.length; i++) {
		const clone = clones[i];
		clone.x = clone.width * i * msg.relX;
		clone.y = clone.height * i * msg.relY;
	}
};

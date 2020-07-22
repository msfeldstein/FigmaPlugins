// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
	// One way of distinguishing between different types of messages sent from
	// your HTML page is to use an object with a "type" property like this.
	if (msg.type === "create-particle-system") {
		const selection = figma.currentPage.selection[0];

		const minX = parseInt(msg.props.minX);
		const maxX = parseInt(msg.props.maxX);
		const minY = parseInt(msg.props.minY);
		const maxY = parseInt(msg.props.maxY);

		const particles = [];
		for (var i = 0; i < msg.props.count; i++) {
			particles.push(selection.clone());
		}
		const group = figma.group(particles, selection.parent);
		group.name = "Particles";
		particles.forEach((p) => {
			p.x = minX + Math.random() * (maxX - minX);
			p.y = minY + Math.random() * (maxY - minY);
		});
	}

	// Make sure to close the plugin when you're done. Otherwise the plugin will
	// keep running, which shows the cancel button at the bottom of the screen.
	figma.closePlugin();
};

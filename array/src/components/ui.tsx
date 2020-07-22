import * as React from "react";
import RelativeOffset from "./relative-offset";

export default function ui(props) {
	const [count, setCount] = React.useState(5);
	const [arrayType, setArrayType] = React.useState("relative");
	const [relX, setRelX] = React.useState(0);
	const [relY, setRelY] = React.useState(0);

	parent.postMessage(
		{
			pluginMessage: {
				relX,
				relY,
				count,
			},
		},
		"*"
	);

	const relativeOffset = (
		<div>
			<div>
				<label>X</label>
				<input
					type="range"
					min="0"
					max="5"
					step=".001"
					value={relX}
					onChange={(e) => setRelX(parseFloat(e.target.value))}
				></input>
				{relX}
			</div>
			<div>
				<label>Y</label>
				<input
					type="range"
					min="0"
					max="5"
					step=".001"
					value={relY}
					onChange={(e) => setRelY(parseFloat(e.target.value))}
				></input>
			</div>
		</div>
	);

	const objectOffset = <div>Unimplemented</div>;

	const values = arrayType === "relative" ? relativeOffset : objectOffset;
	return (
		<div>
			<div>
				<label>Count</label>
				<input
					type="range"
					min="0"
					max="30"
					step="1"
					value={count}
					onChange={(e) => setCount(parseInt(e.target.value))}
				></input>
				{count}
			</div>
			<div>
				<label>Type</label>
				<select onChange={(e) => setArrayType(e.target.value)}>
					<option value="relative">Relative Offset</option>
					<option value="object">Object Offset</option>
				</select>
			</div>
			{values}
		</div>
	);
}

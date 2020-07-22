export default `
/*{
	"DESCRIPTION": "",
	"CREDIT": "",
	"ISFVSN": "2",
	"INPUTS": [
		{
			"NAME" : 		"blueAmount",
			"TYPE" : 		"float",
			"DEFAULT" : 	0.4,
			"MIN" : 		0.01,
			"MAX" : 		0.99
		}
	]
}*/

void main()	{
	vec2 uv = isf_FragNormCoord.xy;
	float r = uv.x;
	float g = uv.y;
	float b = blueAmount;
	gl_FragColor = vec4(r, g, b, 1.0);
}
`;

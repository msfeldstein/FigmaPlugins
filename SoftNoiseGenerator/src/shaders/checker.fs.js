export default `
/*{
	"DESCRIPTION": "",
	"CREDIT": "",
	"ISFVSN": "2",
	"CATEGORIES": [
		"XXX"
	],
	"INPUTS": [
		{
			"NAME": "scale",
			"TYPE": "float",
			"DEFAULT": 10.0,
			"MIN": 0.0,
			"MAX": 100.0
		},
		    {
        "NAME": "color1",
        "TYPE": "color",
        "DEFAULT": [0.0, 0.0, 0.0, 1.0]
    },
    {
        "NAME": "color2",
        "TYPE": "color",
        "DEFAULT": [1.0, 1.0, 1.0, 1.0]
    }
	]
}*/

void main()	{
	vec2 uv = isf_FragNormCoord.xy;
	uv.x *= RENDERSIZE.x / RENDERSIZE.y;
	float xV = step(fract(uv.x * scale), 0.5);
	float yV = step(fract(uv.y * scale), 0.5);
	float v = mod(xV + yV, 2.0);
	gl_FragColor = color1 * v + color2 * (1.0 - v);
}
`;

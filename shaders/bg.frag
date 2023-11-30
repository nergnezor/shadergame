#include <flutter/runtime_effect.glsl>

uniform vec2 iResolution;
uniform float iTime;
out vec4 fragColor;

void mainImage(out vec4 O, vec2 I)
{
    vec2 uv = I.xy / iResolution.xy;
    vec3 col = 0.5 + 0.5 * sin(iTime + uv.y + vec3(4, 3, 2));
    O = vec4(col, 1.0);
}
void main()
{
    mainImage(fragColor, FlutterFragCoord().xy);
}
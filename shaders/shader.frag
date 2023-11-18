#include <flutter/runtime_effect.glsl>

uniform vec2 resolution;
uniform float time;
uniform float radius;
uniform vec2 speed;
out vec4 fragColor;

const float BORDER = 10.0;

void main()
{
  fragColor = vec4(0);
  vec2 center = resolution.xy / 2;
  float center_distance = distance(FlutterFragCoord().xy, center);
  if (center_distance > radius)
  {
    const float velocity = length(speed);
    const float value = sqrt(velocity) / 4;
    if (center_distance < radius + value)
      fragColor = vec4(value / 2, value / 4, value / 8, 1);
    return;
  }
  float red = pow(7 * sin(time) / 8, 2);
  float green = pow(center_distance / radius, 3);
  float blue = 0.4 + pow(red, 4);
  fragColor = vec4(red, green, blue, 1);
}

#version 460 core
#include <flutter/runtime_effect.glsl>
precision mediump float;

uniform vec2 resolution;
uniform float time;
out vec4 fragColor;

const float PI = 3.1415926535897932384626433832795;

void draw_tunnel(float center_distance, float hole_radius, float time, out vec4 color)
{
    float red = pow(7 * sin(time) / 8, 2);
    float green = pow(center_distance / hole_radius, 3);
    float blue = 0.4 + pow(red, 4);
    color = vec4(red, green, blue, 0.8);
}

float drawLine(vec2 p1, vec2 p2, vec2 uv, float a)
{
    float r = 0.;
    float one_px = 1. / resolution.x; // not really one px

    // get dist between points
    float d = distance(p1, p2);

    // get dist between current pixel and p1
    float duv = distance(p1, uv);

    // if point is on line, according to dist, it should match current uv
    r = 1. - floor(1. - (a * one_px) + distance(mix(p1, p2, clamp(duv / d, 0., 1.)), uv));

    return r;
}

void main()
{
    float center_distance = distance(FlutterFragCoord().xy, resolution / 2);
    float hole_radius = 50.0;
    if (center_distance < hole_radius)
    {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    draw_tunnel(center_distance, hole_radius, time, fragColor);
    float lines = 0.0;
    const int num_lines = 10;
    for (float angle = 0; angle < 2 * PI; angle += 2 * PI / num_lines)
    {
        // Two points, from edge of hole to edge of screen
        vec2 p1 = vec2(0);   // vec2(cos(angle) * hole_radius, sin(angle) * hole_radius);
        vec2 p2 = vec2(200); // vec2(cos(angle) * (center_distance - hole_radius), sin(angle) * (center_distance - hole_radius));
        float line = drawLine(p1, p2, FlutterFragCoord().xy, 1.0);
        lines += line;
    }
    // float line = drawLine(vec2(0.0, 0.0), vec2(100.0, 100.0), FlutterFragCoord().xy, 1.0);
    if (lines > 0.0)
    {
        fragColor = vec4(0, 0, 0, 1.0);
        return;
    }
}

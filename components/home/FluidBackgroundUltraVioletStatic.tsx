'use client';

import { useEffect, useRef } from 'react';

const vert = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const frag = `
  precision highp float;
  uniform vec2 u_res;

  vec2 grad(vec2 i) {
    float n = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453);
    float a = n * 6.2832;
    return vec2(cos(a), sin(a));
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = dot(grad(i),             f);
    float b = dot(grad(i + vec2(1,0)), f - vec2(1,0));
    float c = dot(grad(i + vec2(0,1)), f - vec2(0,1));
    float d = dot(grad(i + vec2(1,1)), f - vec2(1,1));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
  }

  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);

  float fbm(vec2 p) {
    float f = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      f += a * gnoise(p);
      p = rot * p * 2.01;
      a *= 0.5;
    }
    return f;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float ar = u_res.x / u_res.y;
    vec2 p = (uv - 0.5) * vec2(ar, 1.0) * 3.0;

    float t = 22.0;

    vec2 q = vec2(
      fbm(p + vec2(0.0, 0.0) + t * 0.40),
      fbm(p + vec2(5.2, 1.3) + t * 0.30)
    );

    vec2 r = vec2(
      fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.15),
      fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.12)
    );

    float f = fbm(p + 4.0 * r + t * 0.08);

    float fPow = 1.6;
    f = pow(clamp(f * 1.3 - 0.1, 0.0, 1.0), fPow);

    vec3 col = mix(vec3(0.0),              vec3(0.06, 0.01, 0.14),  smoothstep(0.0,  0.20, f));
    col = mix(col, vec3(0.16, 0.03, 0.38),  smoothstep(0.20, 0.40, f));
    col = mix(col, vec3(0.34, 0.06, 0.70),  smoothstep(0.40, 0.58, f));
    col = mix(col, vec3(0.52, 0.12, 0.90),  smoothstep(0.58, 0.74, f));
    col = mix(col, vec3(0.68, 0.28, 1.00),  smoothstep(0.74, 0.88, f));
    col = mix(col, vec3(0.86, 0.68, 1.00),  smoothstep(0.88, 1.00, f));

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function FluidBackgroundUltraVioletStatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(s));
      }
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(prog, 'u_res');

    function draw() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl!.viewport(0, 0, canvas.width, canvas.height);
      gl!.uniform2f(resLoc, canvas.width, canvas.height);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    }

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

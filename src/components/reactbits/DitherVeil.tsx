"use client";

import { useEffect, useRef } from "react";

interface DitherVeilProps {
  imageSrc?: string;
  className?: string;
  pixelSize?: number;
  linger?: number;
  autoWander?: boolean;
}

export default function DitherVeil({
  imageSrc = "/images/chrome-bust.jpg",
  className = "",
  pixelSize = 2.4,
  linger = 1.6,
  autoWander = true,
}: DitherVeilProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    // ─── Shaders ─────────────────────────────────────────────────────────────
    const vertexShaderSrc = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = `
      precision highp float;
      uniform vec2 uResolution;
      uniform float uImageAspect;
      uniform float uTime;
      uniform sampler2D uTexture;
      uniform float uImageLoaded;
      uniform vec2 uTrail[16];
      uniform float uTrailAge[16];
      uniform vec2 uRippleCenter;
      uniform float uRippleTime;
      uniform float uPixelSize;

      // 4x4 Bayer Dither Matrix
      float bayer4(vec2 p) {
        int x = int(mod(p.x, 4.0));
        int y = int(mod(p.y, 4.0));
        int idx = x + y * 4;
        if (idx == 0) return 0.0 / 16.0;
        if (idx == 1) return 8.0 / 16.0;
        if (idx == 2) return 2.0 / 16.0;
        if (idx == 3) return 10.0 / 16.0;
        if (idx == 4) return 12.0 / 16.0;
        if (idx == 5) return 4.0 / 16.0;
        if (idx == 6) return 14.0 / 16.0;
        if (idx == 7) return 6.0 / 16.0;
        if (idx == 8) return 3.0 / 16.0;
        if (idx == 9) return 11.0 / 16.0;
        if (idx == 10) return 1.0 / 16.0;
        if (idx == 11) return 9.0 / 16.0;
        if (idx == 12) return 15.0 / 16.0;
        if (idx == 13) return 7.0 / 16.0;
        if (idx == 14) return 13.0 / 16.0;
        return 5.0 / 16.0;
      }

      vec2 getContainUv(vec2 uv, vec2 screenRes, float imgAspect) {
        float screenAspect = screenRes.x / screenRes.y;
        vec2 p = uv - 0.5;
        if (screenAspect > imgAspect) {
          p.x *= screenAspect / imgAspect;
        } else {
          p.y *= imgAspect / screenAspect;
        }
        // Scale to fit nicely with breathing room
        p /= 0.92;
        return p + 0.5;
      }

      void main() {
        vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize);
        vec2 screenUv = gl_FragCoord.xy / uResolution.xy;

        vec2 imgUv = getContainUv(screenUv, uResolution, uImageAspect);

        // Check if inside image bounds
        bool inBounds = (imgUv.x >= 0.0 && imgUv.x <= 1.0 && imgUv.y >= 0.0 && imgUv.y <= 1.0);

        vec3 baseCol = vec3(0.043, 0.043, 0.051); // Dark backdrop #0B0B0D
        float luma = 0.0;

        if (inBounds && uImageLoaded > 0.5) {
          vec4 tex = texture2D(uTexture, imgUv);
          baseCol = tex.rgb;

          // Subtle dynamic holographic sheen
          float sheen = sin(imgUv.y * 20.0 - uTime * 2.0) * 0.05;
          baseCol += vec3(0.474, 0.988, 0.196) * sheen * max(0.0, baseCol.g);

          luma = dot(baseCol, vec3(0.299, 0.587, 0.114));
        }

        // 1-Bit Ordered Bayer Dithering
        float threshold = bayer4(pixelCoord);
        vec3 ditherCol = vec3(0.043, 0.043, 0.051);

        if (luma > threshold && luma > 0.07) {
          // Specular highlights in pure white, body shading in electric neon green
          if (luma > 0.65) {
            ditherCol = vec3(0.95, 1.0, 0.95);
          } else {
            ditherCol = vec3(0.474, 0.988, 0.196); // #79FC32
          }
        }

        // Interactive Cursor Burn-Through Mask
        float reveal = 0.0;
        for (int i = 0; i < 16; i++) {
          if (uTrailAge[i] > 0.0) {
            float d = distance(screenUv, uTrail[i]);
            float radius = 0.22 * uTrailAge[i];
            float factor = smoothstep(radius, radius * 0.2, d) * uTrailAge[i];
            reveal = max(reveal, factor);
          }
        }

        // Click Ripple Wavefront Burst
        if (uRippleTime > 0.0 && uRippleTime < 1.6) {
          float dist = distance(screenUv, uRippleCenter);
          float ringDist = abs(dist - uRippleTime * 0.7);
          float ripple = smoothstep(0.1, 0.0, ringDist) * (1.0 - uRippleTime / 1.6);
          reveal = max(reveal, ripple);
        }

        reveal = clamp(reveal, 0.0, 1.0);

        // Electric Neon Glowing Rim along dissolving edge
        float rim = smoothstep(0.02, 0.16, reveal) * smoothstep(0.55, 0.16, reveal);
        vec3 rimCol = vec3(0.474, 0.988, 0.196) * 1.8;

        // Final Composite: Dither Veil -> Full Color Chrome Sculpture
        vec3 finalCol = mix(ditherCol, baseCol, smoothstep(0.06, 0.45, reveal));
        finalCol += rimCol * rim;

        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, src: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, src);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("Shader compile error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSrc);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry
    const positionLoc = gl.getAttribLocation(program, "aPosition");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uImageAspectLoc = gl.getUniformLocation(program, "uImageAspect");
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uPixelSizeLoc = gl.getUniformLocation(program, "uPixelSize");
    const uImageLoadedLoc = gl.getUniformLocation(program, "uImageLoaded");
    const uTextureLoc = gl.getUniformLocation(program, "uTexture");
    const uRippleCenterLoc = gl.getUniformLocation(program, "uRippleCenter");
    const uRippleTimeLoc = gl.getUniformLocation(program, "uRippleTime");

    const trailLocs = Array.from({ length: 16 }, (_, i) => ({
      pos: gl.getUniformLocation(program, `uTrail[${i}]`),
      age: gl.getUniformLocation(program, `uTrailAge[${i}]`),
    }));

    // Texture upload
    const texture = gl.createTexture();
    let imgLoaded = false;
    let imgAspect = 0.75; // Default 3:4 aspect

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      imgAspect = img.width / img.height;
      imgLoaded = true;
    };

    // State
    const trail = Array.from({ length: 16 }, () => ({ x: 0.5, y: 0.5, age: 0 }));
    let trailHead = 0;
    let rippleCenter = { x: 0.5, y: 0.5 };
    let rippleTime = 999;
    let lastTime = performance.now();
    let startTime = lastTime;
    let isHovered = false;
    let animId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Pointer events
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      isHovered = true;
      trail[trailHead] = { x, y, age: 1.0 };
      trailHead = (trailHead + 1) % 16;
    };

    const handlePointerLeave = () => {
      isHovered = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      rippleCenter = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
      rippleTime = 0.0;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    // Render loop
    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      const elapsed = (time - startTime) / 1000;

      // Auto-wander across the chrome bust when idle
      if (autoWander && !isHovered) {
        const wx = 0.5 + 0.22 * Math.sin(elapsed * 1.1) * Math.cos(elapsed * 0.5);
        const wy = 0.55 + 0.2 * Math.cos(elapsed * 0.9) * Math.sin(elapsed * 0.6);
        if (Math.random() < 0.4) {
          trail[trailHead] = { x: wx, y: wy, age: 0.95 };
          trailHead = (trailHead + 1) % 16;
        }
      }

      // Age trails
      for (let i = 0; i < 16; i++) {
        if (trail[i].age > 0) {
          trail[i].age -= dt / linger;
          if (trail[i].age < 0) trail[i].age = 0;
        }
      }

      // Age ripple
      if (rippleTime < 1.6) {
        rippleTime += dt * 0.95;
      }

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uImageAspectLoc, imgAspect);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uPixelSizeLoc, pixelSize * (window.devicePixelRatio || 1));
      gl.uniform1f(uImageLoadedLoc, imgLoaded ? 1.0 : 0.0);
      gl.uniform2f(uRippleCenterLoc, rippleCenter.x, rippleCenter.y);
      gl.uniform1f(uRippleTimeLoc, rippleTime);

      // Texture
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTextureLoc, 0);

      // Trails
      for (let i = 0; i < 16; i++) {
        gl.uniform2f(trailLocs[i].pos, trail[i].x, trail[i].y);
        gl.uniform1f(trailLocs[i].age, trail[i].age);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteBuffer(buffer);
    };
  }, [imageSrc, pixelSize, linger, autoWander]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden cursor-crosshair ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}

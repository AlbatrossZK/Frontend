import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import chroma from 'chroma-js';

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const conf = {
      // Significantly increased density for "smaller" (finer) waves
      nx: 120, 
      ny: 100,
      cscale: chroma.scale(['#fff1f5', '#f3e8ff', '#e0e7ff', '#dbeafe']).mode('lch'),
      darken: -1,
      angle: Math.PI / 3,
      timeCoef: 0.1
    };

    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let width: number;
    let height: number;
    const { randFloat: rnd } = THREE.MathUtils;

    const uTime = { value: 0 };
    const uTimeCoef = { value: conf.timeCoef };
    const polylines: any[] = [];
    let animationId: number;

    // Polyline Class
    const Polyline = (function () {
      const tmp = new THREE.Vector3();

      class Polyline {
        points: THREE.Vector3[];
        count: number;
        geometry!: THREE.BufferGeometry;
        position!: Float32Array;
        prev!: Float32Array;
        next!: Float32Array;

        constructor(params: { points: THREE.Vector3[] }) {
          const { points } = params;
          this.points = points;
          this.count = points.length;
          this.init();
          this.updateGeometry();
        }

        init() {
          this.geometry = new THREE.BufferGeometry();
          this.position = new Float32Array(this.count * 3 * 2);
          this.prev = new Float32Array(this.count * 3 * 2);
          this.next = new Float32Array(this.count * 3 * 2);
          const side = new Float32Array(this.count * 1 * 2);
          const uv = new Float32Array(this.count * 2 * 2);
          const index = new Uint16Array((this.count - 1) * 3 * 2);

          for (let i = 0; i < this.count; i++) {
            const i2 = i * 2;
            side.set([-1, 1], i2);
            const v = i / (this.count - 1);
            uv.set([0, v, 1, v], i * 4);

            if (i === this.count - 1) continue;
            index.set([i2 + 0, i2 + 1, i2 + 2], (i2 + 0) * 3);
            index.set([i2 + 2, i2 + 1, i2 + 3], (i2 + 1) * 3);
          }

          this.geometry.setAttribute('position', new THREE.BufferAttribute(this.position, 3));
          this.geometry.setAttribute('prev', new THREE.BufferAttribute(this.prev, 3));
          this.geometry.setAttribute('next', new THREE.BufferAttribute(this.next, 3));
          this.geometry.setAttribute('side', new THREE.BufferAttribute(side, 1));
          this.geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
          this.geometry.setIndex(new THREE.BufferAttribute(index, 1));
        }

        updateGeometry() {
          this.points.forEach((p, i) => {
            p.toArray(this.position, i * 3 * 2);
            p.toArray(this.position, i * 3 * 2 + 3);

            if (!i) {
              tmp.copy(p).sub(this.points[i + 1]).add(p);
              tmp.toArray(this.prev, i * 3 * 2);
              tmp.toArray(this.prev, i * 3 * 2 + 3);
            } else {
              p.toArray(this.next, (i - 1) * 3 * 2);
              p.toArray(this.next, (i - 1) * 3 * 2 + 3);
            }

            if (i === this.points.length - 1) {
              tmp.copy(p).sub(this.points[i - 1]).add(p);
              tmp.toArray(this.next, i * 3 * 2);
              tmp.toArray(this.next, i * 3 * 2 + 3);
            } else {
              p.toArray(this.prev, (i + 1) * 3 * 2);
              p.toArray(this.prev, (i + 1) * 3 * 2 + 3);
            }
          });

          this.geometry.attributes.position.needsUpdate = true;
          this.geometry.attributes.prev.needsUpdate = true;
          this.geometry.attributes.next.needsUpdate = true;
        }
      }

      return Polyline;
    })();

    function init() {
      try {
        renderer = new THREE.WebGLRenderer({ 
          canvas: canvasRef.current!, 
          antialias: true, 
          alpha: true,
          failIfMajorPerformanceCaveat: false
        });
        renderer.setClearColor(0xffffff, 1); 
        camera = new THREE.PerspectiveCamera();

        updateSize();
        window.addEventListener('resize', updateSize, false);

        initScene();
        animate(0);
      } catch (error) {
        console.warn('WebGL initialization failed, skipping 3D background:', error);
      }
    }

    function initScene() {
      scene = new THREE.Scene();
      const vertexShader = `
        uniform float uTime, uTimeCoef;
        uniform float uSize;
        uniform mat2 uMat2;
        uniform vec3 uRnd1;
        uniform vec3 uRnd2;
        uniform vec3 uRnd3;
        uniform vec3 uRnd4;
        uniform vec3 uRnd5;
        attribute vec3 next, prev; 
        attribute float side;
        varying vec2 vUv;

        vec2 dp(vec2 sv) {
          return (1.5 * sv * uMat2);
        }

        void main() {
          vUv = uv;

          vec2 pos = dp(position.xy);

          vec2 normal = dp(vec2(1, 0));
          normal *= uSize;

          float time = uTime * uTimeCoef;
          vec3 rnd1 = vec3(cos(time * uRnd1.x + uRnd3.x), cos(time * uRnd1.y + uRnd3.y), cos(time * uRnd1.z + uRnd3.z));
          vec3 rnd2 = vec3(cos(time * uRnd2.x + uRnd4.x), cos(time * uRnd2.y + uRnd4.y), cos(time * uRnd2.z + uRnd4.z));
          normal *= 1.0
            + uRnd5.x * (cos((position.y + rnd1.x) * 20.0 * rnd1.y) + 1.0)
            + uRnd5.y * (sin((position.y + rnd2.x) * 20.0 * rnd2.y) + 1.0)
            + uRnd5.z * (cos((position.y + rnd1.z) * 20.0 * rnd2.z) + 1.0);
          pos.xy -= normal * side;

          gl_Position = vec4(pos, 0.0, 1.0);
        }
      `;

      const fragmentShader = `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x), 1.0);
        }
      `;

      const dx = 2 / (conf.nx), dy = -2 / (conf.ny - 1);
      const ox = -1 + dx / 2, oy = 1;
      const mat2 = [Math.cos(conf.angle), -Math.sin(conf.angle), Math.sin(conf.angle), Math.cos(conf.angle)];
      
      for (let i = 0; i < conf.nx; i++) {
        const points = [];
        for (let j = 0; j < conf.ny; j++) {
          const x = ox + i * dx, y = oy + j * dy;
          points.push(new THREE.Vector3(x, y, 0));
        }
        const polyline = new Polyline({ points });
        polylines.push(polyline);

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uTime,
            uTimeCoef,
            uMat2: { value: mat2 },
            // Reduced size for finer lines
            uSize: { value: 0.8 / conf.nx }, 
            uRnd1: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
            uRnd2: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
            uRnd3: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
            uRnd4: { value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)) },
            uRnd5: { value: new THREE.Vector3(rnd(0.2, 0.5), rnd(0.3, 0.6), rnd(0.4, 0.7)) },
            uColor1: { value: new THREE.Color(conf.cscale(i / conf.nx).hex()) },
            uColor2: { value: new THREE.Color(conf.cscale(i / conf.nx).darken(conf.darken).hex()) }
          },
          vertexShader,
          fragmentShader
        });
        const mesh = new THREE.Mesh(polyline.geometry, material);
        scene.add(mesh);
      }
    }

    function animate(t: number) {
      uTime.value = t * 0.001;
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
      animationId = requestAnimationFrame(animate);
    }

    function updateSize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (renderer) renderer.setSize(width, height);
      
      // Update density based on width for ultra-wide screens
      // Base nx is 120 for standard width (~1440px). Scale it up.
      // We can't easily re-init the whole scene here without flickering, 
      // but we can ensure the canvas covers the full window.
      // The CSS 'fixed inset-0 w-full h-full' handles the canvas element size.
      // The renderer.setSize handles the internal resolution.
    }

    init();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      // Clean up scene
      if (scene) {
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                object.material.dispose();
            }
        });
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />;
}

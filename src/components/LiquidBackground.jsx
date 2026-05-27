import  { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LiquidBackground = () => {
  // This ref targets the DOM element where we will inject the WebGL canvas
  const mountRef = useRef(null);

  useEffect(() => {
    // ==========================================
    // 1. CORE SETUP: Scene, Camera, Renderer
    // ==========================================
    const scene = new THREE.Scene();
    
    // Using an Orthographic Camera because we are doing 2D screen-space distortion, not 3D perspective
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance optimization
    
    // Append the Three.js canvas to our React div
    mountRef.current.appendChild(renderer.domElement);

    // ==========================================
    // 2. THE GEOMETRY & MATERIAL (The Shader Setup)
    // ==========================================
    const geometry = new THREE.PlaneGeometry(2, 2); // Fills the Orthographic camera view

    // This is where your custom GLSL distortion logic will go
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        // u_displacementMap: { value: null } // You will pass your hidden 2D canvas here later
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        varying vec2 vUv;
        void main() {
          // Placeholder: a simple color gradient to prove the shader is working
          vec3 color = 0.5 + 0.5 * cos(u_time + vUv.xyx + vec3(0,2,4));
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ==========================================
    // 3. ANIMATION LOOP
    // ==========================================
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      // Update shader uniforms
      material.uniforms.u_time.value = clock.getElapsedTime();
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // ==========================================
    // 4. RESIZE HANDLER
    // ==========================================
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 5. CLEANUP (Critical for React)
    // ==========================================
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Clean up WebGL context to prevent memory leaks on unmount
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Return a fixed container that acts as the background layer
  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, // Keep it behind your standard React content
        pointerEvents: 'none' // Let mouse events pass through to your hidden tracking canvas later
      }} 
    />
  );
};

export default LiquidBackground;
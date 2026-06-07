import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const PhysicsTechStack = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    // 1. Destructure Matter.js modules
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    // 2. Create the Physics Engine
    const engine = Engine.create();
    
    // Set a container width based on standard max-widths, or use window.innerWidth
    const width = Math.min(window.innerWidth, 1200); 
    const height = 600;

    // 3. Create the Renderer (This draws the math onto the HTML Canvas)
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false, // CRITICAL: Set to false to see colors/images instead of neon outlines
        background: 'transparent',
        pixelRatio: window.devicePixelRatio // Keeps text/images sharp on Mac/Retina displays
      }
    });

    // 4. Create Static Boundaries (Floor and Walls)
    const wallOptions = { isStatic: true, render: { fillStyle: 'transparent' } };
    const ground = Bodies.rectangle(width / 2, height + 25, width + 100, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    // 5. Define Your Stack Items
    const myStack = [
      'React', 'Node.js', 'MongoDB', 'Express', 
      'Shopify OS 2.0', 'Liquid', 'Tailwind', 'C++'
    ];

    // 6. Generate the falling bodies
    const stackBodies = myStack.map((tech, index) => {
      // We use chamfer to round the corners of the rectangles
      return Bodies.rectangle(
        Math.random() * (width - 200) + 100, // Drop from random X coordinates
        -Math.random() * 800 - 200,          // Stagger the drop heights above the screen
        140, 140,                            // Width and Height of each block
        {
          restitution: 0.8, // Bounciness (0 is lead, 1 is a rubber band)
          friction: 0.5,
          density: 0.04,
          chamfer: { radius: 20 }, // Rounded corners
          render: {
            fillStyle: '#11111a', // Dark modern background for the blocks
            strokeStyle: '#333',
            lineWidth: 2,
            /* HOW TO ADD YOUR LOGOS:
              Uncomment the 'sprite' object below and point it to your public assets folder.
              Make sure your images are perfectly square (e.g., 200x200px pngs).
              
              sprite: {
                texture: `/assets/tech/${tech.toLowerCase()}.png`,
                xScale: 0.7,
                yScale: 0.7
              }
            */
          }
        }
      );
    });

    // 7. Add everything to the physics world
    Composite.add(engine.world, [ground, leftWall, rightWall, ...stackBodies]);

    // 8. Add Mouse Interaction (The fun part)
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // How tightly the mouse holds the object
        render: { visible: false } // Hides the visual "string" connecting mouse to object
      }
    });
    
    Composite.add(engine.world, mouseConstraint);
    
    // Keeps the mouse constraint accurate even if the user scrolls the page
    render.mouse = mouse;

    // 9. Run the Engine and Renderer
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 10. Cleanup function (Prevents memory leaks when navigating away from the page)
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  return (
    <section className="py-24 bg-white text-black flex flex-col items-center overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">The Stack</h2>
        <p className="text-gray-500 text-xl max-w-2xl">
          Interact with the tools I use to build robust digital experiences.
        </p>
      </div>
      
      {/* The physics engine will inject the canvas directly into this div */}
      <div 
        ref={sceneRef} 
        className="cursor-grab active:cursor-grabbing w-full max-w-6xl mx-auto rounded-3xl bg-gray-50 shadow-inner border border-gray-100 overflow-hidden" 
      />
    </section>
  );
};

export default PhysicsTechStack;
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Matter from 'matter-js';

const skills = [
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Node.js', color: '#339933' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Express', color: '#9B59B6' },
  { name: 'C/C++', color: '#00599C' },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPhysicsReady, setIsPhysicsReady] = useState(false);

  const cleanup = useCallback(() => {
    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
    }
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }
    if (engineRef.current) {
      Matter.Engine.clear(engineRef.current);
      Matter.Composite.clear(engineRef.current.world, false);
    }
    engineRef.current = null;
    renderRef.current = null;
    runnerRef.current = null;
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !isInView) return;

    // Cleanup previous instance
    cleanup();

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = 400;
    const pixelRatio = Math.min(window.devicePixelRatio, 2); // Limit pixel ratio for performance

    // Create engine with optimized settings
    const engine = Engine.create({
      gravity: { x: 0, y: 0.8 },
      enableSleeping: true, // Enable sleeping for performance
    });
    engineRef.current = engine;

    // Set canvas dimensions
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Create renderer with optimized settings
    const render = Render.create({
      element: container,
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio,
        hasBounds: true,
      },
    });
    renderRef.current = render;

    // Create walls
    const wallThickness = 60;
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.1,
    };

    const walls = [
      Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, wallOptions),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, wallOptions),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, wallOptions),
    ];

    // Create skill balls with optimized settings
    const ballRadius = width < 600 ? 32 : 42;
    const balls = skills.map((skill, index) => {
      const col = index % 5;
      const row = Math.floor(index / 5);
      const x = (width / 6) * (col + 1);
      const y = -60 - row * 80;

      return Bodies.circle(x, y, ballRadius, {
        restitution: 0.5,
        friction: 0.05,
        frictionAir: 0.02,
        density: 0.001,
        slop: 0.01,
        render: {
          fillStyle: skill.color,
          strokeStyle: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 2,
        },
        label: skill.name,
      });
    });

    Composite.add(engine.world, [...walls, ...balls]);

    // Add mouse control with optimized settings
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        damping: 0.1,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Fix for high DPI displays
    mouse.pixelRatio = pixelRatio;

    // Optimized text rendering
    let frameCount = 0;
    Events.on(render, 'afterRender', () => {
      frameCount++;
      // Only render text every 2 frames for performance
      if (frameCount % 2 !== 0) return;

      const ctx = render.context;
      const fontSize = Math.floor(ballRadius * 0.32);
      ctx.font = `600 ${fontSize}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      balls.forEach((ball) => {
        const { x, y } = ball.position;
        const fillStyle = ball.render.fillStyle as string;
        
        ctx.save();
        ctx.translate(x, y);
        
        // Determine text color based on background
        const isLightBg = fillStyle === '#F7DF1E' || fillStyle === '#FCC624' || fillStyle === '#61DAFB';
        ctx.fillStyle = isLightBg ? '#1a1a2e' : '#ffffff';
        
        // Add text shadow for better readability
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.fillText(ball.label || '', 0, 0);
        ctx.restore();
      });
    });

    // Create runner with fixed timestep
    const runner = Runner.create({
      isFixed: true,
      delta: 1000 / 60,
    });
    runnerRef.current = runner;

    Runner.run(runner, engine);
    Render.run(render);

    setIsPhysicsReady(true);

    // Handle resize with debounce
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = container.offsetWidth;
        
        canvas.width = newWidth * pixelRatio;
        canvas.style.width = `${newWidth}px`;
        render.options.width = newWidth;
        
        // Update wall positions
        Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: height + wallThickness / 2 });
        Matter.Body.setPosition(walls[2], { x: newWidth + wallThickness / 2, y: height / 2 });
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      cleanup();
    };
  }, [isInView, cleanup]);

  return (
    <section id="skills" className="py-24 bg-gradient-subtle" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-wider uppercase"
          >
            Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold mt-3 text-gradient"
          >
            Tech I Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-4"
          >
            Drag and play with the skill balls!
          </motion.p>
        </div>

        {/* Physics Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          ref={containerRef}
          className="relative w-full max-w-4xl mx-auto glass rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: 400 }}
        >
          <canvas ref={canvasRef} className="block" />
          
          {!isPhysicsReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>

        {/* Additional Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12"
        >
          {[
            { title: 'CS Fundamentals', items: ['DSA', 'OOP', 'Computer Networks', 'DBMS', 'System Design'] },
            { title: 'Tools & Platforms', items: ['Git', 'GitHub', 'Linux', 'Docker', 'Kubernetes'] },
            { title: 'Soft Skills', items: ['Leadership', 'Teamwork', 'Public Speaking', 'Communication'] },
          ].map((category) => (
            <div key={category.title} className="glass p-6 rounded-xl hover:shadow-hover transition-all duration-300">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

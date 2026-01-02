import { useEffect, useRef, useState } from 'react';
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
  { name: 'Git', color: '#F05032' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Linux', color: '#FCC624' },
  { name: 'Express', color: '#FFFFFF' },
  { name: 'HTML/CSS', color: '#E34F26' },
  { name: 'SQL', color: '#CC2927' },
  { name: 'C/C++', color: '#00599C' },
];

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPhysicsReady, setIsPhysicsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !isInView) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = 400;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 1 },
    });

    // Create renderer
    const render = Render.create({
      element: container,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Create walls
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const walls = [
      Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions), // floor
      Bodies.rectangle(-30, height / 2, 60, height, wallOptions), // left wall
      Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions), // right wall
    ];

    // Create skill balls
    const ballRadius = width < 600 ? 35 : 45;
    const balls = skills.map((skill, index) => {
      const x = Math.random() * (width - ballRadius * 2) + ballRadius;
      const y = -50 - index * 60;

      return Bodies.circle(x, y, ballRadius, {
        restitution: 0.6,
        friction: 0.1,
        frictionAir: 0.01,
        render: {
          fillStyle: skill.color,
          strokeStyle: 'rgba(255, 255, 255, 0.2)',
          lineWidth: 2,
        },
        label: skill.name,
      });
    });

    Composite.add(engine.world, [...walls, ...balls]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Draw skill names on balls
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      balls.forEach((ball) => {
        ctx.save();
        ctx.translate(ball.position.x, ball.position.y);
        ctx.rotate(ball.angle);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${ballRadius * 0.35}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = ball.render.fillStyle === '#F7DF1E' || ball.render.fillStyle === '#FCC624' ? '#000' : '#fff';
        ctx.fillText(ball.label || '', 0, 0);
        ctx.restore();
      });
    });

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    setIsPhysicsReady(true);

    // Handle resize
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      render.canvas.width = newWidth;
      render.options.width = newWidth;
      
      // Update wall positions
      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: height + 30 });
      Matter.Body.setPosition(walls[2], { x: newWidth + 30, y: height / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [isInView]);

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
          className="relative w-full max-w-4xl mx-auto glass rounded-2xl overflow-hidden"
          style={{ height: 400 }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
          
          {!isPhysicsReady && (
            <div className="absolute inset-0 flex items-center justify-center">
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
          ].map((category, index) => (
            <div key={category.title} className="glass p-6 rounded-xl">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 bg-secondary rounded-full text-muted-foreground"
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

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Zap, Globe, Brain, Dumbbell, Leaf } from 'lucide-react';

const projects = [
  {
    title: 'VoiceGym',
    subtitle: 'AI-Powered Real-Time Fitness Coach',
    description: 'Built real-time exercise detection and form analysis system processing video at 30 FPS with <100ms latency, supporting 8+ exercise types with automatic switching using MediaPipe pose estimation.',
    tech: ['Python', 'MediaPipe', 'PostgreSQL', 'OpenCV', 'Gemini AI', 'Threading'],
    icon: Dumbbell,
    highlights: ['30 FPS video processing', 'Intelligent rep counting', 'Multilingual AI coaching', '6+ language TTS'],
    github: 'https://github.com/Balasubramanyam-Chilukala/VoiceGym',
    featured: true,
  },
  {
    title: 'Eco Voice',
    subtitle: 'Carbon Footprint Calculator & Sustainability Guide',
    description: 'Comprehensive environmental impact assessment platform that helps users calculate their carbon footprint through daily activities, transportation, and consumption patterns. Features personalized reduction strategies and a curated marketplace of sustainable products for eco-conscious living.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'AI/ML', 'REST APIs'],
    icon: Leaf,
    highlights: ['Carbon footprint tracking', 'Sustainable product recommendations', 'Personalized eco-tips', 'Impact visualization'],
    github: 'https://github.com/Balasubramanyam-Chilukala/Eco-Voice',
    featured: true,
  },
  {
    title: 'VoiceBridge',
    subtitle: 'Real-Time Meeting Translator',
    description: 'Built a 4-thread async pipeline for bidirectional translation with 3-6 second latency, supporting 13+ languages including Indian regional languages.',
    tech: ['Python', 'Google STT', 'WebSockets', 'PyAudio'],
    icon: Zap,
    highlights: ['4-thread async pipeline', 'Echo prevention system', 'Auto-reconnection handling'],
    github: 'https://github.com/Balasubramanyam-Chilukala/VoiceBridge',
  },
  {
    title: 'Pocket Planner',
    subtitle: 'Financial Tracking Platform',
    description: 'Scalable backend with Node.js serving 100+ users, featuring expense tracking, subscription management, and an AI-powered FinBot handling 1000+ queries monthly.',
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Gemini AI'],
    icon: Globe,
    highlights: ['500+ expense logs managed', 'AI chatbot integration', 'Financial goal management'],
    github: 'https://github.com/Balasubramanyam-Chilukala/Pocket-Planner',
  },
  {
    title: 'Skill Craft',
    subtitle: 'Resume Analysis Platform',
    description: 'AI-driven resume analysis platform providing resume scores and personalized course recommendations from 50,000+ courses to improve career readiness.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Gemini AI'],
    icon: Brain,
    highlights: ['AI-powered analysis', '50K+ course database', 'Personalized recommendations'],
    github: 'https://github.com/Balasubramanyam-Chilukala/Skill-Craft',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-wider uppercase"
          >
            Projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold mt-3 text-gradient"
          >
            What I've Built
          </motion.h2>
        </div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15 }}
              className="group glass rounded-2xl p-8 hover:shadow-hover transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Featured Badge */}
                <div className="absolute -top-2 -right-2">
                  <span className="px-3 py-1 text-xs font-medium bg-gradient-primary text-primary-foreground rounded-full">
                    Featured
                  </span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                  <project.icon className="text-primary-foreground" size={28} />
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-display font-semibold text-foreground mb-2 group-hover:text-gradient-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-primary text-sm font-medium mb-4">{project.subtitle}</p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="text-xs px-3 py-1.5 bg-primary/10 rounded-full text-primary font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 border border-border rounded-full text-foreground bg-background/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm font-medium group/link"
                    >
                      <Github size={18} className="group-hover/link:scale-110 transition-transform" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group glass rounded-xl p-6 hover:shadow-hover transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <project.icon className="text-primary" size={24} />
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                {project.title}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">{project.subtitle}</p>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 border border-border rounded-full text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4 border-t border-border">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 text-sm"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

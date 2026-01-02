import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, GraduationCap, Trophy, Code2 } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: GraduationCap, value: '9.11', label: 'CGPA' },
    { icon: Trophy, value: '$500', label: 'Hackathon Win' },
    { icon: Code2, value: '1870', label: 'LeetCode Rating' },
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary text-sm font-medium tracking-wider uppercase"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-display font-bold mt-3 text-gradient"
            >
              Who I Am
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin size={16} />
                <span>Suryapet, Telangana, India</span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm <span className="text-foreground font-medium">Balasubramanyam Chilukala</span>, 
                a B.Tech student at Anurag University pursuing Electronics and Communication 
                Engineering. My passion lies in building software that solves real-world problems.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                With experience ranging from building lazy-loading survey platforms at 
                <span className="text-primary font-medium"> FMCG Gurus</span> to developing 
                hybrid intrusion detection models at <span className="text-primary font-medium">IIIT Naya Raipur</span>, 
                I thrive at the intersection of software development and machine learning.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                As the <span className="text-foreground font-medium">President of AIC Club</span>, 
                I mentor students in DSA, web development, and help them identify career-oriented tech stacks.
              </p>
            </motion.div>

            {/* Right: Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass p-6 rounded-xl flex items-center gap-4 group hover:shadow-hover transition-all duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'FMCG Gurus',
    role: 'Software Development Intern',
    location: 'Remote, UK',
    period: 'October 2025 - Present',
    description: [
      'Built lazy-loading survey visualization with HashMap indexing, reducing query time from O(n²) to O(n)',
      'Created client-side demographic segmentation engine with 95% server load reduction',
      'Built interactive dashboard with localStorage persistence for multi-industry market research',
    ],
  },
  {
    company: 'IIIT - Naya Raipur',
    role: 'Research Intern – ML & Cybersecurity',
    location: 'Raipur, India',
    period: 'May 2025 - July 2025',
    description: [
      'Developed hybrid intrusion detection model (TabNet-XGBoost) with 97% accuracy, 99% precision',
      'Built end-to-end ML pipeline for 2.8M+ network traffic samples',
      'Research paper in progress on AI-based network security and intelligent anomaly detection',
    ],
  },
  {
    company: 'Swecha-FSMI',
    role: 'Android Development Intern',
    location: 'Hyderabad, India',
    period: 'July 2024 - September 2024',
    description: [
      'Developed Duolingo-inspired Telugu language learning app with React and Java',
      'Implemented speech recognition and text-to-speech using Python',
      'Handled entire backend development including user authentication and scoring system',
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-gradient-subtle" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-primary text-sm font-medium tracking-wider uppercase"
          >
            Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-display font-bold mt-3 text-gradient"
          >
            Where I've Worked
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%] md:text-left'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-glow z-10" />

              {/* Card */}
              <div className="ml-8 md:ml-0 glass p-6 rounded-xl hover:shadow-hover transition-all duration-300">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Briefcase size={16} />
                  <span className="font-medium">{exp.company}</span>
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

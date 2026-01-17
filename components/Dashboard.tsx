
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronRight, Terminal, Cpu, Database, Layout } from 'lucide-react';
import VisualIdentity from './VisualIdentity';
import { PROJECTS, SKILLS, EXPECTATIONS, ACHIEVEMENTS } from '../constants';

const Dashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <div ref={containerRef} className="relative w-full bg-black min-h-screen selection:bg-red-600 selection:text-white">
      {/* Background Animated Gradient */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-900 blur-[180px] rounded-full" />
      </div>

      {/* Persistent Header */}
      <header className="fixed top-0 left-0 w-full px-8 py-10 z-50 flex justify-between items-start pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto"
        >
          <h1 className="text-red-600 font-black text-2xl tracking-tighter">NAVEEN</h1>
          <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] mt-1">
            Full Stack Engineer / System Architect
          </p>
        </motion.div>
        
        <div className="flex gap-4 pointer-events-auto pr-4">
          <SocialLink href="#" icon={<Github size={18} />} />
          <SocialLink href="#" icon={<Linkedin size={18} />} />
          <SocialLink href="#" icon={<Mail size={18} />} />
        </div>
      </header>

      <main className="relative pt-44 pb-20 px-8 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 space-y-32">
          
          {/* Hero Section */}
          <section id="hero" className="min-h-[40vh] flex flex-col justify-center">
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-12 tracking-tight"
            >
              I build <span className="text-red-600">systems</span>, not just projects. I care about <span className="italic text-zinc-300">scale</span>, performance, and <span className="text-zinc-500">measurable impact</span>.
            </motion.p>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6"
            >
              <button className="bg-red-600 hover:bg-red-700 text-white font-black py-4 px-10 rounded-sm transition-all flex items-center gap-2 group text-sm uppercase tracking-wider">
                Review My Work <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-zinc-700 hover:bg-zinc-800 text-white font-black py-4 px-10 rounded-sm transition-all text-sm uppercase tracking-wider">
                Download Resume
              </button>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" className="space-y-10">
            <SectionHeader title="01. THE BLUEPRINT" />
            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl font-medium">
              I am an engineering architect focused on developing high-performance, distributed infrastructures. My approach combines algorithmic rigor with modern product intuition. I don't just solve problems; I design resilient frameworks that prevent them from occurring in the first place.
            </p>
          </section>

          {/* Skills Section */}
          <section id="skills" className="space-y-12">
            <SectionHeader title="02. TECH STACK" />
            <div className="grid md:grid-cols-2 gap-8">
              {SKILLS.map((skill, i) => (
                <div key={i} className="group p-8 border border-zinc-800/50 hover:border-red-600/50 transition-all bg-zinc-900/10 rounded-xl backdrop-blur-sm">
                  <h4 className="text-red-500 font-black mb-6 flex items-center gap-3 uppercase tracking-[0.2em] text-[10px]">
                    {skill.category === "Backend" && <Database size={14} />}
                    {skill.category === "Frontend" && <Layout size={14} />}
                    {skill.category === "Systems & AI" && <Cpu size={14} />}
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span key={j} className="text-zinc-400 bg-zinc-900/40 px-3 py-1 text-xs rounded-sm border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expectations Section */}
          <section id="expectations" className="space-y-12">
            <SectionHeader title="03. EXPECTATIONS VS DELIVERY" />
            <div className="space-y-8">
              {EXPECTATIONS.map((exp, i) => (
                <motion.div 
                  key={i} 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-zinc-900 hover:border-red-600 transition-colors py-4 group"
                >
                  <h4 className="text-xl font-black text-white mb-2 group-hover:text-red-500 transition-colors">{exp.title}</h4>
                  <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{exp.description}</p>
                  <div className="bg-red-950/5 border-l-2 border-red-600 p-4 rounded-r-lg">
                    <p className="text-zinc-200 text-sm font-medium leading-relaxed">
                      <span className="text-red-500 font-black text-[10px] uppercase tracking-widest block mb-1">NAVEEN'S STRENGTH</span> 
                      {exp.strength}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-12">
            <SectionHeader title="04. RECENT BUILDS" />
            <div className="grid gap-12">
              {PROJECTS.map((project, i) => (
                <div key={i} className="group relative overflow-hidden bg-zinc-900/20 border border-zinc-800/50 p-10 rounded-2xl hover:bg-zinc-900/40 transition-all border-l-4 hover:border-l-red-600">
                  <div className="flex justify-between items-start mb-8">
                    <h3 className="text-3xl font-black text-white group-hover:text-red-600 transition-colors tracking-tight">{project.title}</h3>
                    <div className="flex gap-5">
                      <Terminal size={18} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
                      <Github size={18} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" />
                    </div>
                  </div>
                  <p className="text-zinc-400 mb-8 text-lg leading-relaxed">{project.description}</p>
                  <div className="bg-black/40 p-5 border-l-2 border-zinc-700 mb-8 rounded-r-lg italic text-zinc-300 text-sm">
                    "{project.impact}"
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-[10px] uppercase font-black tracking-widest text-zinc-500 border border-zinc-800 px-3 py-1 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements Footer */}
          <section className="pt-24 border-t border-zinc-900 space-y-16">
            <div className="grid md:grid-cols-2 gap-12">
              {ACHIEVEMENTS.map((ach, i) => (
                <div key={i} className="space-y-3">
                  <p className="text-red-600 font-black text-[10px] uppercase tracking-[0.3em]">{ach.title}</p>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed">{ach.detail}</p>
                </div>
              ))}
            </div>
            <div className="text-center py-24 bg-gradient-to-t from-red-950/10 to-transparent rounded-t-[100px]">
              <p className="text-zinc-600 font-black mb-6 uppercase tracking-[0.4em] text-[10px]">Let's build something elite.</p>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 hover:text-red-600 transition-colors cursor-pointer tracking-tighter">
                naveen.dev@engineer.com
              </h2>
            </div>
          </section>

        </div>

        {/* Right Side: Visual Identity (Sticky) - Removed Border/Background for smudging */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-32 h-[80vh] w-full overflow-hidden">
            <VisualIdentity />

            {/* System Status Box (Bottom Left) - Kept but simplified container slightly */}
            <div className="absolute bottom-10 left-10 z-10">
              <div className="border border-[#8ba9f9]/40 bg-black/60 backdrop-blur-md p-4 space-y-2 min-w-[220px] rounded-sm">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                  <span className="text-[10px] text-white uppercase font-black tracking-[0.2em]">System Status: Optimal</span>
                </div>
                <div className="h-[1px] w-full bg-zinc-800" />
                <p className="text-zinc-500 text-[9px] uppercase font-black tracking-[0.15em]">Location: Bengaluru, IN</p>
              </div>
            </div>

            {/* Animated Grid Overlay - Reduced opacity further for better smudging */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
        </div>

      </main>
    </div>
  );
};

// Helper Components
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <motion.div 
    initial={{ x: -20, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="flex flex-col gap-4 mb-12"
  >
    <div className="h-[1px] w-12 bg-red-600" />
    <h2 className="text-red-600 font-black text-[10px] uppercase tracking-[0.4em]">
      {title}
    </h2>
  </motion.div>
);

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <a href={href} className="text-zinc-500 hover:text-white transition-all hover:scale-110 transform duration-200 bg-zinc-900/50 p-2 rounded-sm border border-zinc-800/50 hover:border-zinc-600 pointer-events-auto">
    {icon}
  </a>
);

export default Dashboard;

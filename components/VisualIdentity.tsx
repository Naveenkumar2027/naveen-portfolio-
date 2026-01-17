
import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const VisualIdentity: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Spring animations for smooth parallax
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x: x + 0.5, y: y + 0.5 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.005;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // 1. Volumetric Light Rays (God Rays) from behind
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rayCount = 40;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.1;
        const length = 400 + Math.sin(time + i) * 50;
        const opacity = (0.05 + Math.sin(time * 2 + i) * 0.03);
        
        const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
        grad.addColorStop(0, `rgba(229, 9, 20, ${opacity})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 4;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * length, cy + Math.sin(angle) * length);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Dynamic Concentric Holographic Rings
      for (let i = 0; i < 22; i++) {
        ctx.beginPath();
        const baseRadius = 135 + (i * 4.5);
        const pulse = Math.sin(time * 1.2 + i * 0.2) * 10;
        const radius = baseRadius + pulse;
        
        const r = 229;
        const g = Math.floor(20 + mousePos.x * 30);
        const b = Math.floor(20 + mousePos.y * 30);
        
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.14 - (i * 0.006)})`;
        ctx.lineWidth = i % 5 === 0 ? 1.5 : 0.5;
        
        const ringOffsetX = (mousePos.x - 0.5) * (i * 2);
        const ringOffsetY = (mousePos.y - 0.5) * (i * 2);

        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const distortion = Math.sin(angle * 5 + time + i) * 6;
          const x = cx + ringOffsetX + (radius + distortion) * Math.cos(angle);
          const y = cy + ringOffsetY + (radius + distortion) * Math.sin(angle);
          
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // 3. Cinematic Scanning Line
      const scanY = (Math.sin(time * 0.5) * 0.5 + 0.5) * height;
      ctx.fillStyle = 'rgba(229, 9, 20, 0.05)';
      ctx.fillRect(0, scanY, width, 2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'red';
      ctx.fillRect(cx - 150, scanY, 300, 1);
      ctx.shadowBlur = 0;

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black perspective-1000"
    >
      {/* Background Deep Glow - Enhanced for better "smudging" */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(30,0,0,0.4)_0%,rgba(0,0,0,1)_75%)]" />
      
      {/* Dynamic Rim Light */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full"
      />

      {/* The Portrait Container with Parallax */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX, 
          y: translateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full h-full flex items-center justify-center z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[120%] h-[120%] flex items-center justify-center"
        >
          <img 
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/naveen-portrait.png" 
            alt="Naveen Portrait" 
            className="w-full h-full object-cover object-center"
            style={{
              // Aggressive mask to smudge into the background
              maskImage: 'radial-gradient(circle at 50% 45%, black 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.1) 60%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 20%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.1) 60%, transparent 80%)',
              filter: 'contrast(1.1) brightness(0.85) saturate(1.05)',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';
            }}
          />
          
          {/* Subtle Ambient Occlusion Overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(0,0,0,1)_95%)]" />
          
          {/* Moving Dynamic Specular Highlight */}
          <motion.div 
            style={{
              x: useTransform(mouseX, [-0.5, 0.5], [150, -150]),
              y: useTransform(mouseY, [-0.5, 0.5], [150, -150]),
            }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_50%)] mix-blend-overlay"
          />
        </motion.div>
      </motion.div>

      {/* The Animated Canvas Layers (Overlay) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 z-20"
      />

      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      
      {/* Heavy Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)] z-30" />
    </div>
  );
};

export default VisualIdentity;

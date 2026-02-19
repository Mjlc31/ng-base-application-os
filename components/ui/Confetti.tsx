import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// REFINED: Using the new Antique Gold (#C5A059) and standard variants
const colors = ['#C5A059', '#D4AF37', '#C0C0C0', '#FFFFFF'];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

/**
 * Componente de confetti animado
 * Otimizado para mobile com número reduzido de partículas
 */
export const Confetti: React.FC = React.memo(() => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Reduz partículas em mobile para melhor performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 60;

    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // vw
      y: -10 - Math.random() * 20, // vh start above screen
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotation, opacity: 1 }}
          animate={{
            y: '110vh',
            rotate: p.rotation + 360 + Math.random() * 180,
            x: `${p.x + (Math.random() - 0.5) * 10}vw` // Drifting
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
          style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            backgroundColor: p.color,
            scale: p.scale,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px', // Mix of circles and squares
          }}
        />
      ))}
    </div>
  );
});

Confetti.displayName = 'Confetti';
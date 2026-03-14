import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente de fundo com gradiente mesh animado
 * Memoizado para evitar re-renders desnecessários
 */
export const MeshBackground: React.FC = React.memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Subtle dark overlay with better transparency for mesh visibility */}
      <div className="absolute inset-0 bg-[#050505] z-10 opacity-70" />

      {/* Blob 1 - Gold/Yellow - Primary Light Source */}
      <motion.div
        animate={{
          x: [0, 100, -80, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-ng-gold-400/30 to-ng-gold-600/40 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Blob 2 - Darker Depth Shadow focusing on modern ambient contrast */}
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#0c0c16] rounded-full blur-[140px] mix-blend-overlay"
      />

      {/* Blob 3 - Accent Gold - Highlight */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 30, -30, 0],
          scale: [0.8, 1, 0.8],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-ngGold-400/5 rounded-full blur-[80px] mix-blend-screen"
      />

      {/* Noise Texture Overlay */}
      {/* Removido svg feTurbulence para enorme ganho de performance em devices móveis */}
    </div>
  );
});

MeshBackground.displayName = 'MeshBackground';
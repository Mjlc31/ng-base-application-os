import React from 'react';
import { motion } from 'framer-motion';
import { Confetti } from './ui/Confetti';
import { Check, Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { EXTERNAL_LINKS } from '../constants';

/**
 * Tela de sucesso premium após submissão do formulário
 * Exibe confirmação celebratória e call-to-action
 */
export const SuccessScreen: React.FC = React.memo(() => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[100dvh] p-6 text-center z-10 relative"
      role="main"
      aria-label="Aplicação enviada com sucesso"
    >
      <Confetti />

      {/* Animated success icon with pulse */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative w-24 h-24 bg-gradient-to-br from-ngGold-400 to-ngGold-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(212,175,55,0.6)]"
        role="img"
        aria-label="Ícone de sucesso"
      >
        <Check className="w-12 h-12 text-black" strokeWidth={3} />

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-ngGold-500"
          animate={{ scale: [1, 1.5, 1.5], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-ngGold-500"
          animate={{ scale: [1, 1.8, 1.8], opacity: [1, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      {/* Success message with gradient */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-[1.1]"
      >
        <span className="bg-gradient-to-br from-white via-white to-neutral-300 bg-clip-text text-transparent">
          Aplicação Recebida.
        </span>
        <br />
        <span className="bg-gradient-to-r from-ngGold-400 via-ngGold-500 to-ngGold-600 bg-clip-text text-transparent flex items-center justify-center gap-2 mt-2">
          Você está no radar. <Sparkles className="w-8 h-8 text-ngGold-500 animate-pulse" aria-hidden="true" />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-neutral-400 text-xl md:text-2xl max-w-2xl mb-14 leading-relaxed font-sans font-light"
      >
        Nossa curadoria analisará seu perfil. O <span className="text-ngGold-500 font-medium">NG.BASE</span> é um ambiente de elite e entraremos em contato via WhatsApp em breve.
      </motion.p>

      {/* CTA Button with enhanced effects */}
      <motion.a
        href={EXTERNAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-ngGold-500 to-ngGold-600 rounded-xl text-black hover:shadow-[0_10px_50px_rgba(197,160,89,0.5)] transition-all duration-300 overflow-hidden cursor-pointer font-sans font-bold text-lg"
        aria-label="Acompanhe a NG.HUB no Instagram (abre em nova aba)"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        <span className="relative z-10 flex items-center gap-2">
          <Instagram className="w-6 h-6" aria-hidden="true" />
          Acompanhe a NG.HUB
          <ExternalLink className="w-4 h-4 opacity-70" aria-hidden="true" />
        </span>
      </motion.a>

      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-neutral-600 text-sm font-mono"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-ngGold-500 animate-pulse"></div>
          <span>Aguarde nosso contato</span>
        </div>
      </motion.div>
    </div>
  );
});

SuccessScreen.displayName = 'SuccessScreen';
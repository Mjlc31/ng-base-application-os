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
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10 overflow-hidden">
      <Confetti />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-surface/40 backdrop-blur-2xl border border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden p-8 sm:p-12 text-center"
      >
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-10">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-ng-gold-400 to-ng-gold-600 rounded-full flex items-center justify-center relative"
          >
            <Check className="w-10 h-10 text-black" strokeWidth={3} />
            <motion.div
              className="absolute inset-0 rounded-full border border-ng-gold-500"
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
          Aplicação <span className="text-ng-gold-500">Recebida.</span>
        </h1>

        <p className="text-white/40 text-lg sm:text-xl font-light leading-relaxed mb-12 max-w-md mx-auto">
          Nossa curadoria analisará seu perfil. O <span className="text-white font-medium">NG.RITMO</span> é um ambiente de elite e entraremos em contato via WhatsApp em breve.
        </p>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6">
          <motion.a
            href={EXTERNAL_LINKS.INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all"
          >
            <Instagram className="w-5 h-5 text-black" />
            Acompanhe a NG.HUB
            <ExternalLink className="w-4 h-4 opacity-50" />
          </motion.a>

          <div className="flex items-center gap-3 py-3 px-5 rounded-full bg-white/[0.03] border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Aguarde nosso contato</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

SuccessScreen.displayName = 'SuccessScreen';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-3xl bg-[#080808]/70 backdrop-blur-[40px] border border-white/5 border-t-white/10 rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_40px_rgba(197,160,89,0.02)] relative overflow-hidden flex flex-col my-auto p-8 sm:p-12 md:p-16"
      >
        {/* Accent Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-ngGold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ngGold-400/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-8">
            <ShieldCheck className="w-4 h-4 text-ngGold-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-bold font-sans">Aplicação Exclusiva</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight mb-6">
            O próximo nível da sua empresa <span className="text-ngGold-500">começa aqui.</span>
          </h1>

          <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-12">
            Um ambiente de elite projetado exclusivamente para empresários de alto crescimento. 
            Conecte-se com mentes brilhantes, expanda sua visão de negócios e acelere seus resultados em um dia de imersão total.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
            <div className="flex flex-col items-center justify-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <Calendar className="w-6 h-6 text-ngGold-500 mb-3" />
              <span className="text-sm font-bold text-white mb-1">13 de Junho de 2026</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Data do Evento</span>
            </div>
            <div className="flex flex-col items-center justify-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <Clock className="w-6 h-6 text-ngGold-500 mb-3" />
              <span className="text-sm font-bold text-white mb-1">08:00 às 18:00</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Horário</span>
            </div>
            <div className="flex flex-col items-center justify-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <MapPin className="w-6 h-6 text-ngGold-500 mb-3" />
              <span className="text-sm font-bold text-white mb-1">Studio Meraki</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Local</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-ngGold-400 mb-10 bg-ngGold-500/10 px-6 py-3 rounded-full border border-ngGold-500/20">
            <Ticket className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Atenção: Ingresso ainda em preço de primeiro lote.</span>
          </div>

          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 sm:px-12 py-5 rounded-2xl bg-gradient-to-r from-ngGold-400 to-ngGold-600 text-black font-bold text-lg hover:brightness-110 transition-all shadow-[0_15px_40px_rgba(197,160,89,0.3)] hover:shadow-[0_20px_50px_rgba(197,160,89,0.5)] active:scale-[0.98] relative overflow-hidden group border border-ngGold-400/50"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              Quero me candidatar à vaga
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { Confetti } from './ui/Confetti';

/**
 * Tela de Sucesso NG.RITMO
 * Exibe a mensagem de análise e botão para contato via WhatsApp
 */
export const SuccessScreen: React.FC = React.memo(() => {
    const whatsappLink = "https://wa.me/558274009877";

    const handleWhatsAppClick = () => {
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10 overflow-hidden">
            <Confetti />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl bg-[#080808]/70 backdrop-blur-[40px] border border-white/5 border-t-white/10 rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden p-8 sm:p-12 md:p-16"
            >
                {/* Accent Background Glows */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-ngGold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-ngGold-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Content Section */}
                <div className="flex flex-col items-center text-center relative z-10">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                        className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 border border-emerald-500/20"
                    >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 mb-6">
                      <Sparkles className="w-4 h-4 text-ngGold-500" />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-bold font-sans">Aplicação Concluída</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6 tracking-tight">
                      Recebemos sua <span className="text-ngGold-500">candidatura.</span>
                    </h1>
                    
                    <div className="space-y-6 text-white/60 text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto mb-12">
                      <p>
                        A NG preza por um ecossistema de altíssimo nível. Por isso, filtramos rigorosamente todos os participantes para garantir o padrão de excelência do <span className="text-white font-medium">NG.RITMO</span>.
                      </p>
                      <p>
                        Nossa equipe de curadoria já está analisando o seu perfil. Caso sua aplicação seja aprovada, <strong className="text-white font-medium">você receberá uma mensagem exclusiva no seu WhatsApp</strong> com os próximos passos para ativação.
                      </p>
                    </div>

                    <button
                        onClick={handleWhatsAppClick}
                        className="w-full sm:w-auto px-8 py-5 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-2xl font-bold text-lg transition-all shadow-[0_15px_30px_rgba(37,211,102,0.2)] hover:shadow-[0_20px_40px_rgba(37,211,102,0.4)] active:scale-[0.98]"
                    >
                        <MessageCircle className="w-6 h-6" />
                        Falar com a Equipe no WhatsApp
                    </button>
                </div>
            </motion.div>
        </div>
    );
});

SuccessScreen.displayName = 'SuccessScreen';

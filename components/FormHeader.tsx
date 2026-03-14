/**
 * Componente de header do formulário
 * 
 * Exibe logo NG.RITMO e badge de segurança
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Header fixo com branding NG.RITMO
 */
export const FormHeader: React.FC = React.memo(() => {
    return (
        <header
            className="w-full flex justify-between items-center mb-10"
            role="banner"
        >
            <div className="flex items-center gap-3 select-none">
                <motion.div
                    className="flex items-center gap-2.5"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="px-2.5 py-1 bg-gradient-to-br from-ng-gold-400 to-ng-gold-600 rounded-lg flex items-center justify-center font-bold text-black font-serif text-base shadow-[0_0_20px_rgba(197,160,89,0.2)]">
                        NG
                    </div>
                    <span className="font-bold text-xl tracking-[0.1em] text-white font-serif">
                        RITMO
                    </span>
                </motion.div>
            </div>
            <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold hidden sm:block">Secure Portal</span>
            </div>
        </header>
    );
});

FormHeader.displayName = 'FormHeader';

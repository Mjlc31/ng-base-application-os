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
                    className="flex flex-col items-start gap-1"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center text-white font-serif tracking-tight leading-none">
                        <span className="text-[2.5rem] font-bold">NG</span>
                        <span className="text-[2.5rem] font-light text-white/90">.RITMO</span>
                    </div>
                    <span className="text-[7.5px] tracking-[0.25em] text-ng-gold-500 font-sans font-bold uppercase ml-0.5">
                        Community of Young Business.
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

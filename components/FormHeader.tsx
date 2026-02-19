/**
 * Componente de header do formulário
 * 
 * Exibe logo NG.BASE e badge de segurança
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Header fixo com branding NG.BASE
 */
export const FormHeader: React.FC = React.memo(() => {
    return (
        <header
            className="fixed top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none"
            role="banner"
        >
            <div className="flex flex-col items-start select-none pointer-events-auto">
                {/* NG.BASE Logo Type - Matches Bodoni Moda styling */}
                <motion.div
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-ngGold-400 to-ngGold-600 rounded-sm flex items-center justify-center font-bold text-black font-serif text-lg shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                        NG
                    </div>
                    <span className="font-bold text-lg tracking-wider text-white font-serif">
                        BASE
                    </span>
                </motion.div>
            </div>
            <div
                className="text-[10px] md:text-xs text-ngGold-500/80 hidden md:block mt-2 font-sans tracking-[0.2em] uppercase border border-ngGold-500/20 px-2 py-1 rounded-sm"
                aria-label="Aplicação segura"
            >
                Secure Application
            </div>
        </header>
    );
});

FormHeader.displayName = 'FormHeader';

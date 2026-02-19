/**
 * Componente de barra de progresso animada premium
 * 
 * Exibe o progresso do usuário através do formulário com efeitos visuais ricos
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_CONFIG } from '../constants';

export interface ProgressBarProps {
    /** Progresso atual (0-100) */
    progress: number;
    /** Classe CSS adicional */
    className?: string;
}

/**
 * Barra de progresso com animação suave e shimmer
 * 
 * @example
 * <ProgressBar progress={50} />
 */
export const ProgressBar: React.FC<ProgressBarProps> = React.memo(({ progress, className = '' }) => {
    return (
        <div
            className={`fixed top-0 left-0 h-1 bg-ngGold-500/10 w-full z-30 ${className}`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso do formulário"
        >
            <motion.div
                className="relative h-full bg-gradient-to-r from-ngGold-600 via-ngGold-500 to-ngGold-400 shadow-[0_0_20px_#C5A059]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                }}
            >
                {/* Glow effect at tip */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-ngGold-400 rounded-full blur-[6px] shadow-[0_0_10px_#fff]" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

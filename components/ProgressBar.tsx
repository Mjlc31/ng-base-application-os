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
            className={`h-0.5 bg-white/5 w-full rounded-full overflow-hidden relative ${className}`}
            role="progressbar"
            aria-valuenow={progress}
        >
            <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-ng-gold-600 via-ng-gold-500 to-ng-gold-400 shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </motion.div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

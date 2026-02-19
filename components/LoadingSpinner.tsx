/**
 * Componente de Loading Spinner customizado
 * 
 * Spinner premium com logo NG animado
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface LoadingSpinnerProps {
    /** Tamanho do spinner */
    size?: 'sm' | 'md' | 'lg';
    /** Texto de loading (opcional) */
    text?: string;
}

/**
 * Loading spinner com animação premium
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(({
    size = 'md',
    text
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
                {/* Outer ring */}
                <motion.div
                    className={`${sizeClasses[size]} rounded-full border-2 border-ngGold-500/20`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-ngGold-500 shadow-[0_0_10px_#C5A059]"></div>
                </motion.div>

                {/* Inner pulse */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-1/2 h-1/2 rounded-full bg-ngGold-500/30 blur-sm"></div>
                </motion.div>

                {/* NG text */}
                <div className="absolute inset-0 flex items-center justify-center font-serif font-bold text-ngGold-500 text-xs">
                    NG
                </div>
            </div>

            {text && (
                <motion.p
                    className="text-neutral-400 text-sm font-mono"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
});

LoadingSpinner.displayName = 'LoadingSpinner';

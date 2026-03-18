/**
 * Componente de mensagem de erro
 * 
 * Exibe erros de validação com animação e acessibilidade
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_CONFIG } from '../constants';

export interface ErrorMessageProps {
    /** Mensagem de erro a exibir */
    message: string | null;
    /** Classe CSS adicional */
    className?: string;
}

/**
 * Mensagem de erro animada com ARIA live region
 * 
 * @example
 * <ErrorMessage message={error} />
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(({ message, className = '' }) => {
    return (
        <AnimatePresence mode="wait">
            {message && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: ANIMATION_CONFIG.ERROR_ANIMATION_DURATION }}
                    className={`bg-[#1a0505]/60 border border-red-500/20 text-red-400/90 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 inline-flex items-center text-xs sm:text-sm font-light tracking-wide backdrop-blur-md shadow-[0_0_20px_rgba(255,0,0,0.05)] ${className}`}
                    role="alert"
                    aria-live="polite"
                >
                    <span className="mr-2" aria-hidden="true">⚠</span>
                    <span>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

ErrorMessage.displayName = 'ErrorMessage';

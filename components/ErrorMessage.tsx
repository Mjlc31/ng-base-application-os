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
                    className={`bg-red-500/10 border-l-2 border-red-500 text-red-200 px-4 py-3 rounded-r mb-8 inline-flex items-center text-sm ${className}`}
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

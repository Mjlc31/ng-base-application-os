/**
 * Componente de indicador de steps avançado
 * 
 * Mostra visualmente o progresso através dos steps do formulário
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface StepIndicatorProps {
    /** Step atual (0-indexed) */
    currentStep: number;
    /** Total de steps */
    totalSteps: number;
    /** Labels dos steps (opcional) */
    stepLabels?: string[];
}

/**
 * Indicador visual de steps com animações
 */
export const StepIndicator: React.FC<StepIndicatorProps> = React.memo(({
    currentStep,
    totalSteps
}) => {
    return (
        <div className="flex items-center justify-center gap-2.5">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div key={index} className="flex items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1,
                                backgroundColor: isCompleted || isCurrent ? 'var(--color-ng-gold-500)' : 'rgba(255,255,255,0.1)'
                            }}
                            className={`
                                h-1.5 rounded-full transition-all duration-500
                                ${isCurrent ? 'w-8 shadow-[0_0_10px_#C5A059]' : 'w-1.5'}
                            `}
                        >
                            {isCurrent && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-full"
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
});

StepIndicator.displayName = 'StepIndicator';

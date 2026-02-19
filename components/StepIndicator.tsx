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
    totalSteps,
    stepLabels
}) => {
    return (
        <div className="flex items-center justify-center gap-2 md:gap-3">
            {Array.from({ length: totalSteps }).map((_, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                    <div key={index} className="flex items-center gap-2">
                        <motion.div
                            className={`
                relative flex items-center justify-center rounded-full transition-all duration-300
                ${isCurrent ? 'w-10 h-10' : 'w-8 h-8'}
                ${isCompleted ? 'bg-ngGold-500' : isCurrent ? 'bg-ngGold-500/20 border-2 border-ngGold-500' : 'bg-white/5 border border-white/10'}
              `}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {isCompleted ? (
                                <motion.svg
                                    className="w-4 h-4 text-black"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </motion.svg>
                            ) : (
                                <span className={`text-xs font-mono ${isCurrent ? 'text-ngGold-500' : 'text-neutral-600'}`}>
                                    {index + 1}
                                </span>
                            )}

                            {/* Pulse animation for current step */}
                            {isCurrent && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-ngGold-500"
                                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </motion.div>

                        {/* Connector line */}
                        {index < totalSteps - 1 && (
                            <div className="w-8 md:w-12 h-px bg-white/10 relative overflow-hidden">
                                {isCompleted && (
                                    <motion.div
                                        className="absolute inset-0 bg-ngGold-500"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        style={{ transformOrigin: 'left' }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
});

StepIndicator.displayName = 'StepIndicator';

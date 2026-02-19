/**
 * Hook customizado para gerenciar estado e lógica do formulário multi-step
 * 
 * Centraliza toda a lógica de navegação, validação e submissão
 */

import { useState, useCallback } from 'react';
import { ApplicationForm, StepConfig } from '../types';
import { FIELD_VALIDATORS } from '../utils/validators';
import { submitApplication } from '../services/supabaseClient';
import { createError, ErrorType, logError, getUserFriendlyMessage } from '../utils/errorHandler';

export interface UseFormStepReturn {
    currentStepIndex: number;
    formData: ApplicationForm;
    error: string | null;
    isSubmitting: boolean;
    isSuccess: boolean;
    direction: number;
    handleInputChange: (field: keyof ApplicationForm, value: string | number) => void;
    handleNext: () => Promise<void>;
    handleBack: () => void;
    validateCurrentStep: (step: StepConfig) => string | null;
}

const INITIAL_DATA: ApplicationForm = {
    full_name: '',
    whatsapp: '',
    email: '',
    industry: '',
    revenue_range: '',
    headcount: '',
    pain_point: '',
    instagram_profile: '',
};

/**
 * Hook para gerenciar formulário multi-step
 * 
 * @param steps - Array de configuração dos steps
 * @returns Objeto com estado e handlers do formulário
 * 
 * @example
 * const form = useFormStep(FORM_STEPS);
 * <input value={form.formData.email} onChange={(e) => form.handleInputChange('email', e.target.value)} />
 */
export const useFormStep = (steps: StepConfig[]): UseFormStepReturn => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [formData, setFormData] = useState<ApplicationForm>(INITIAL_DATA);
    const [direction, setDirection] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    /**
     * Valida o step atual usando o validador apropriado
     */
    const validateCurrentStep = useCallback((step: StepConfig): string | null => {
        const validator = FIELD_VALIDATORS[step.field];
        if (!validator) return null;

        return validator(formData[step.field]);
    }, [formData]);

    /**
     * Atualiza valor de um campo do formulário
     */
    const handleInputChange = useCallback((field: keyof ApplicationForm, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpa erro ao digitar
        if (error) setError(null);
    }, [error]);

    /**
     * Avança para próximo step ou submete formulário
     */
    const handleNext = useCallback(async () => {
        const currentStep = steps[currentStepIndex];

        // Valida step atual
        const validationError = validateCurrentStep(currentStep);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Se não for o último step, avança
        if (currentStepIndex < steps.length - 1) {
            setDirection(1);
            setCurrentStepIndex(prev => prev + 1);
            setError(null);
            return;
        }

        // Se for o último step, submete
        setIsSubmitting(true);
        setError(null);

        try {
            await submitApplication(formData);
            setIsSuccess(true);
        } catch (err: any) {
            // Se o erro já for um AppError (vido do supabaseClient), usa ele
            const appError = err.type ? err : createError(
                ErrorType.SUBMISSION,
                'Erro ao submeter formulário',
                err instanceof Error ? err : undefined
            );

            logError(appError);
            setError(getUserFriendlyMessage(appError));
        } finally {
            setIsSubmitting(false);
        }
    }, [currentStepIndex, steps, formData, validateCurrentStep]);

    /**
     * Volta para step anterior
     */
    const handleBack = useCallback(() => {
        if (currentStepIndex > 0) {
            setDirection(-1);
            setCurrentStepIndex(prev => prev - 1);
            setError(null);
        }
    }, [currentStepIndex]);

    return {
        currentStepIndex,
        formData,
        error,
        isSubmitting,
        isSuccess,
        direction,
        handleInputChange,
        handleNext,
        handleBack,
        validateCurrentStep,
    };
};

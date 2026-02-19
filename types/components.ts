/**
 * Tipos de componentes e props
 * 
 * Definições de tipos para props de componentes reutilizáveis
 */

import { StepConfig } from './types';

/**
 * Props do componente FormStep
 */
export interface FormStepProps {
    step: StepConfig;
    value: string | number;
    error: string | null;
    onChange: (value: string) => void;
    onNext: () => void;
    isSubmitting: boolean;
}

/**
 * Props do componente ProgressBar
 */
export interface ProgressBarProps {
    progress: number;
    className?: string;
}

/**
 * Props do componente ErrorMessage
 */
export interface ErrorMessageProps {
    message: string | null;
    className?: string;
}

/**
 * Props do componente BorderBeamInput
 */
export interface BorderBeamInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    as?: 'input' | 'textarea';
    ariaLabel?: string;
}

/**
 * Estado do formulário
 */
export interface FormState {
    currentStepIndex: number;
    formData: Record<string, string | number>;
    error: string | null;
    isSubmitting: boolean;
    isSuccess: boolean;
    direction: number;
}

/**
 * Ações do formulário
 */
export interface FormActions {
    handleInputChange: (field: string, value: string | number) => void;
    handleNext: () => Promise<void>;
    handleBack: () => void;
    validateCurrentStep: (step: StepConfig) => string | null;
}

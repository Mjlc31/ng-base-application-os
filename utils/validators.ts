/**
 * Módulo de validação de formulários
 * 
 * Contém todas as funções de validação utilizadas no formulário,
 * com tipagem forte e mensagens de erro centralizadas.
 */

import { ERROR_MESSAGES } from '../constants';

/**
 * Resultado de uma validação
 */
export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

/**
 * Tipo de função de validação
 */
export type ValidationFunction = (value: string | number) => string | null;

/**
 * Valida se um campo obrigatório está preenchido
 */
export const validateRequired: ValidationFunction = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return ERROR_MESSAGES.REQUIRED;
    }
    return null;
};

/**
 * Valida formato de email
 * Aceita emails corporativos padrão
 */
export const validateEmail: ValidationFunction = (email) => {
    if (typeof email !== 'string') return ERROR_MESSAGES.INVALID_EMAIL;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : ERROR_MESSAGES.INVALID_EMAIL;
};

/**
 * Valida número de telefone brasileiro
 * Espera formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export const validatePhone: ValidationFunction = (phone) => {
    if (typeof phone !== 'string') return ERROR_MESSAGES.INVALID_PHONE;

    // Remove caracteres não numéricos para validar
    const digitsOnly = phone.replace(/\D/g, '');

    // Deve ter 10 ou 11 dígitos (DDD + número)
    if (digitsOnly.length < 10) {
        return ERROR_MESSAGES.INVALID_PHONE;
    }

    return null;
};

/**
 * Valida perfil do Instagram
 * Aceita @usuario ou link completo do Instagram
 */
export const validateInstagram: ValidationFunction = (value) => {
    if (typeof value !== 'string') return ERROR_MESSAGES.INVALID_INSTAGRAM;

    const trimmed = value.trim();

    // Deve ter pelo menos 2 caracteres (username mínimo)
    if (trimmed.length < 2) {
        return ERROR_MESSAGES.INVALID_INSTAGRAM;
    }

    // Aceita URLs do Instagram
    if (trimmed.includes('instagram.com/')) {
        const match = trimmed.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
        if (!match) {
            return ERROR_MESSAGES.INVALID_INSTAGRAM;
        }
        return null;
    }

    // Aceita @usuario (remove @ para validar)
    const username = trimmed.replace('@', '');

    // Username deve ter apenas letras, números, pontos e underscores
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
        return ERROR_MESSAGES.INVALID_INSTAGRAM;
    }

    return null;
};

/**
 * Valida campo de texto longo (textarea)
 * Requer mínimo de caracteres para resposta significativa
 */
export const validateLongText = (minLength: number = 10): ValidationFunction => {
    return (value) => {
        if (typeof value !== 'string') return ERROR_MESSAGES.MIN_LENGTH(minLength);

        const trimmed = value.trim();
        if (trimmed.length < minLength) {
            return ERROR_MESSAGES.MIN_LENGTH(minLength);
        }

        return null;
    };
};

/**
 * Valida número positivo
 */
export const validatePositiveNumber: ValidationFunction = (value) => {
    const num = typeof value === 'string' ? parseInt(value, 10) : value;

    if (isNaN(num) || num < 0) {
        return "Por favor, insira um número válido.";
    }

    return null;
};

/**
 * Combina múltiplas validações
 * Retorna o primeiro erro encontrado ou null se tudo estiver válido
 */
export const combineValidators = (
    ...validators: ValidationFunction[]
): ValidationFunction => {
    return (value) => {
        for (const validator of validators) {
            const error = validator(value);
            if (error) return error;
        }
        return null;
    };
};

/**
 * Mapa de validadores por campo do formulário
 * Facilita a aplicação de validações específicas
 */
export const FIELD_VALIDATORS = {
    full_name: validateRequired,
    whatsapp: combineValidators(validateRequired, validatePhone),
    email: combineValidators(validateRequired, validateEmail),
    industry: validateRequired,
    revenue_range: validateRequired,
    headcount: combineValidators(validateRequired, validatePositiveNumber),
    pain_point: combineValidators(validateRequired, validateLongText(10)),
    instagram_profile: combineValidators(validateRequired, validateInstagram),
} as const;

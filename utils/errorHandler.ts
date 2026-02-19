/**
 * Sistema centralizado de tratamento de erros
 * 
 * Gerencia logging, retry logic e mensagens user-friendly
 */

import { ERROR_MESSAGES } from '../constants';

/**
 * Tipos de erro da aplicação
 */
export enum ErrorType {
    VALIDATION = 'VALIDATION',
    NETWORK = 'NETWORK',
    SUBMISSION = 'SUBMISSION',
    UNKNOWN = 'UNKNOWN',
}

/**
 * Interface para erros estruturados
 */
export interface AppError {
    type: ErrorType;
    message: string;
    originalError?: Error;
    timestamp: Date;
}

/**
 * Cria um erro estruturado
 */
export const createError = (
    type: ErrorType,
    message: string,
    originalError?: Error
): AppError => ({
    type,
    message,
    originalError,
    timestamp: new Date(),
});

/**
 * Loga erro no console (em produção, enviaria para serviço de logging)
 */
export const logError = (error: AppError): void => {
    if (process.env.NODE_ENV === 'development') {
        console.error('[NG.BASE Error]', {
            type: error.type,
            message: error.message,
            timestamp: error.timestamp.toISOString(),
            originalError: error.originalError,
        });
    }

    // Em produção, enviaria para Sentry, LogRocket, etc
    // sendToErrorTracking(error);
};

/**
 * Converte erro técnico em mensagem user-friendly
 */
export const getUserFriendlyMessage = (error: AppError): string => {
    switch (error.type) {
        case ErrorType.VALIDATION:
            return error.message;

        case ErrorType.NETWORK:
            return error.message.includes('Erro ao salvar')
                ? `Erro de conexão com o servidor. Detalhe: ${error.message}`
                : 'Erro de conexão. Verifique sua internet e tente novamente.';

        case ErrorType.SUBMISSION:
            // Se mensagem técnica estiver disponível e não for "Erro ao submeter...", mostra ela
            if (error.message && error.message !== 'Erro ao submeter formulário') {
                return `Não foi possível enviar: ${error.message}`;
            }
            return 'Ocorreu um erro técnico ao processar sua inscrição. Tente novamente em instantes.';

        default:
            return 'Ocorreu um erro inesperado. Por favor, tente novamente.';
    }
};

/**
 * Retry logic com exponential backoff
 * 
 * @param fn - Função assíncrona a executar
 * @param maxRetries - Número máximo de tentativas
 * @param baseDelay - Delay base em ms
 * @returns Resultado da função ou erro
 */
export const retryWithBackoff = async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
): Promise<T> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            // Se for o último retry, lança o erro
            if (attempt === maxRetries - 1) {
                throw lastError;
            }

            // Calcula delay com exponential backoff
            const delay = baseDelay * Math.pow(2, attempt);

            // Aguarda antes de tentar novamente
            await new Promise(resolve => setTimeout(resolve, delay));

            logError(createError(
                ErrorType.NETWORK,
                `Retry attempt ${attempt + 1}/${maxRetries}`,
                lastError
            ));
        }
    }

    throw lastError;
};

/**
 * Wrapper para tratamento de erros em handlers
 */
export const withErrorHandling = <T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    errorType: ErrorType = ErrorType.UNKNOWN
) => {
    return async (...args: T): Promise<R> => {
        try {
            return await fn(...args);
        } catch (error) {
            const appError = createError(
                errorType,
                error instanceof Error ? error.message : 'Unknown error',
                error instanceof Error ? error : undefined
            );

            logError(appError);
            throw appError;
        }
    };
};

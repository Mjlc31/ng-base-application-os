export enum ErrorType {
    SUBMISSION = 'SUBMISSION',
    VALIDATION = 'VALIDATION',
    NETWORK = 'NETWORK'
}

export const createError = (type: ErrorType, message: string, originalError?: Error) => {
    return { type, message, originalError };
};

export const logError = (error: any) => {
    console.error('[Application Error]:', error);
};

export const getUserFriendlyMessage = (error: any) => {
    if (error?.message) return error.message;
    return 'Ocorreu um erro inesperado. Tente novamente.';
};

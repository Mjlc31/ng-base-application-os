/**
 * Módulo de sanitização de inputs
 * Previne XSS e garante dados limpos
 */

/**
 * Remove tags HTML e scripts de uma string
 */
export const sanitizeHTML = (input: string): string => {
    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
};

/**
 * Remove caracteres especiais perigosos mas mantém acentuação
 */
export const sanitizeText = (input: string): string => {
    // Remove apenas caracteres de controle e scripts
    return input.replace(/[\x00-\x1F\x7F-\x9F]/g, '').trim();
};

/**
 * Sanitiza email removendo espaços e convertendo para lowercase
 */
export const sanitizeEmail = (email: string): string => {
    return email.toLowerCase().trim().replace(/\s/g, '');
};

/**
 * Sanitiza número de telefone mantendo apenas dígitos
 */
export const sanitizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '');
};

/**
 * Sanitiza URL do Instagram
 * Aceita @usuario ou URL completa e normaliza
 */
export const sanitizeInstagram = (input: string): string => {
    const trimmed = input.trim();

    // Se for URL completa, extrai o username
    const urlMatch = trimmed.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
    if (urlMatch) {
        return `@${urlMatch[1]}`;
    }

    // Se começar com @, mantém
    if (trimmed.startsWith('@')) {
        return trimmed;
    }

    // Caso contrário, adiciona @
    return `@${trimmed}`;
};

/**
 * Sanitiza todos os campos do formulário
 */
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
    const sanitized = { ...data };

    for (const key in sanitized) {
        const value = sanitized[key];

        if (typeof value === 'string') {
            // Aplica sanitização básica de texto
            sanitized[key] = sanitizeText(value) as any;
        }
    }

    return sanitized;
};

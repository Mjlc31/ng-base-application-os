/**
 * Utilitários de formatação de dados
 * 
 * Funções para formatar inputs do usuário (máscaras, sanitização, etc)
 */

/**
 * Formata número de telefone brasileiro
 * Aplica máscara: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 * 
 * @param value - Valor do input
 * @returns String formatada
 */
export const formatPhoneNumber = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const digits = value.replace(/\D/g, '');

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limited = digits.substring(0, 11);

    // Aplica a máscara
    let formatted = limited;

    if (limited.length >= 2) {
        formatted = `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
    }

    if (limited.length >= 7) {
        const ddd = limited.substring(0, 2);
        const firstPart = limited.substring(2, limited.length - 4);
        const lastPart = limited.substring(limited.length - 4);
        formatted = `(${ddd}) ${firstPart}-${lastPart}`;
    }

    return formatted;
};

/**
 * Remove formatação de telefone, retornando apenas dígitos
 * 
 * @param value - Telefone formatado
 * @returns Apenas dígitos
 */
export const unformatPhoneNumber = (value: string): string => {
    return value.replace(/\D/g, '');
};

/**
 * Normaliza perfil do Instagram
 * Remove espaços e garante que comece com @
 * 
 * @param value - Perfil do Instagram
 * @returns Perfil normalizado
 */
export const normalizeInstagram = (value: string): string => {
    const trimmed = value.trim();

    // Se for URL completa, extrai o username
    if (trimmed.includes('instagram.com/')) {
        const match = trimmed.match(/instagram\.com\/([^/?]+)/);
        if (match) {
            return `@${match[1]}`;
        }
    }

    // Se não começar com @, adiciona
    if (!trimmed.startsWith('@')) {
        return `@${trimmed}`;
    }

    return trimmed;
};

/**
 * Sanitiza input de texto
 * Remove espaços extras e caracteres especiais perigosos
 * 
 * @param value - Texto a sanitizar
 * @returns Texto sanitizado
 */
export const sanitizeText = (value: string): string => {
    return value
        .trim()
        .replace(/\s+/g, ' ') // Múltiplos espaços -> um espaço
        .replace(/[<>]/g, ''); // Remove < e > para prevenir XSS básico
};

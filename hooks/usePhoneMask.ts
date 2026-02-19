/**
 * Hook customizado para gerenciar máscara de telefone
 * 
 * Encapsula a lógica de formatação de número de telefone brasileiro
 */

import { useState, useCallback } from 'react';
import { formatPhoneNumber } from '../utils/formatters';

export interface UsePhoneMaskReturn {
    value: string;
    onChange: (newValue: string) => void;
    formattedValue: string;
}

/**
 * Hook para aplicar máscara de telefone brasileiro
 * 
 * @param initialValue - Valor inicial do telefone
 * @returns Objeto com value, onChange e formattedValue
 * 
 * @example
 * const phone = usePhoneMask('');
 * <input value={phone.formattedValue} onChange={(e) => phone.onChange(e.target.value)} />
 */
export const usePhoneMask = (initialValue: string = ''): UsePhoneMaskReturn => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((newValue: string) => {
        const formatted = formatPhoneNumber(newValue);
        setValue(formatted);
    }, []);

    return {
        value,
        onChange,
        formattedValue: value,
    };
};

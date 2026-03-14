export const FIELD_VALIDATORS: Record<string, (val: any) => string | null> = {
    full_name: (val) => (!val || val.length < 3) ? 'Nome inválido.' : null,
    email: (val) => {
        if (!val) return 'Email é obrigatório.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Insira um email válido.';
        return null;
    },
    whatsapp: (val) => {
        if (!val) return 'WhatsApp é obrigatório.';
        if (val.replace(/\D/g, '').length < 10) return 'Insira um número válido (com DDD).';
        return null;
    },
    industry: (val) => !val ? 'Ramo de atuação é obrigatório.' : null,
    headcount: (val) => !val ? 'Tamanho do time é obrigatório.' : null,
    pain_point: (val) => (!val || val.length < 10) ? 'Descreva com mais detalhes (mín. 10 caracteres).' : null,
    instagram_profile: (val) => !val ? 'Instagram é obrigatório.' : null,
    revenue_range: (val) => !val ? 'Faturamento é obrigatório.' : null,
};

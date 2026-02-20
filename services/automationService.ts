
import { supabase } from './supabaseClient';
import { ApplicationForm } from '../types';

/**
 * Salva ou atualiza um rascunho de aplicação (Upsert Gratuito)
 * Tenta identificar o lead por email ou telefone e atualiza os dados parciais.
 */
export const saveDraft = async (data: Partial<ApplicationForm>) => {
    // Precisa de pelo menos um contato para salvar
    if (!data.email && !data.whatsapp) return;

    try {
        const cleanPhone = data.whatsapp ? data.whatsapp.replace(/\D/g, '') : '';
        const cleanEmail = data.email ? data.email.trim().toLowerCase() : '';

        // 1. Tenta buscar lead existente (por email OU telefone)
        let query = supabase.from('leads').select('id, stage').or(`email.eq.${cleanEmail},phone.eq.${cleanPhone}`).limit(1);

        // Se só tiver um dos dois, ajusta a query
        if (!cleanEmail) query = supabase.from('leads').select('id, stage').eq('phone', cleanPhone).limit(1);
        else if (!cleanPhone) query = supabase.from('leads').select('id, stage').eq('email', cleanEmail).limit(1);

        const { data: foundLeads, error: searchError } = await query;

        if (searchError) {
            console.warn('⚠️ [Draft] Erro ao buscar lead:', searchError);
            return;
        }

        const existingLead = foundLeads && foundLeads.length > 0 ? foundLeads[0] : null;

        // Se o lead já existe e já foi GANHO ou FINALIZADO, não mexe no rascunho
        if (existingLead && ['Venda Fechada', 'Qualificado', 'Em Negociação'].includes(existingLead.stage)) {
            return;
        }

        // 2. Prepara o payload
        const payload: any = {
            name: data.full_name,
            email: cleanEmail || undefined,
            phone: cleanPhone || undefined,
            sector: data.industry,
            revenue_text: data.revenue_range,
            headcount: data.headcount ? String(data.headcount) : null,
            pain_point: data.pain_point,
            instagram: data.instagram_profile,
            last_contact: new Date().toISOString(),
            origin: 'Site NG.BASE (Rascunho)'
        };

        // Se não existe, define status inicial de Rascunho
        if (!existingLead) {
            payload.stage = 'Rascunho Em Andamento';
            payload.created_at = new Date().toISOString();
        }

        // Limpa undefined
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

        // 3. Executa Upsert
        if (existingLead) {
            await supabase.from('leads').update(payload).eq('id', existingLead.id);
            if (import.meta.env.DEV) console.log('📝 Rascunho atualizado:', existingLead.id);
        } else {
            await supabase.from('leads').insert([payload]);
            if (import.meta.env.DEV) console.log('📝 Novo rascunho criado');
        }

    } catch (error) {
        // Falha silenciosa total para nunca travar a UI do usuário
        console.warn('⚠️ [Draft] Falha silenciosa:', error);
    }
};

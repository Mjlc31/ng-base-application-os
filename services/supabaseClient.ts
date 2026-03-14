import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Submits the application data to the Supabase CRM (leads table)
 */
export const submitApplication = async (formData: any) => {
    const { data, error } = await supabase
        .from('leads')
        .insert([{
            name: formData.full_name,
            phone: formData.whatsapp,
            email: formData.email,
            sector: formData.industry,
            revenue_text: formData.revenue_range,
            headcount: formData.headcount,
            pain_point: formData.pain_point,
            instagram: formData.instagram_profile,
            origin: 'Site NG.RITMO'
        }]);
    
    if (error) {
        console.error('Erro ao enviar lead para o Supabase:', error);
        throw error;
    }
    
    return data;
};

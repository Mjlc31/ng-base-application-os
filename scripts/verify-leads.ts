
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function verifyLeadsIntegration() {
    console.log('🚀 Iniciando verificação de integração com CRM (Tabela leads)...');

    const testLead = {
        name: 'Teste Integração CRM',
        email: `teste.crm.${Date.now()}@exemplo.com`, // Email único
        phone: `1198888${Math.floor(Math.random() * 1000)}`,
        sector: 'Tecnologia',
        revenue_text: 'R$ 50k - R$ 200k',
        headcount: '11-50',
        pain_point: 'Teste de verificação de campos migrados.',
        instagram: '@teste.crm',
        stage: 'Novo Lead',
        origin: 'Site NG.BASE (Teste)',
        created_at: new Date().toISOString(),
        last_contact: new Date().toISOString()
    };

    console.log('📝 Tentando inserir lead de teste...');

    const { data, error } = await supabase
        .from('leads')
        .insert([testLead])
        .select();

    if (error) {
        console.error('❌ ERRO NA INTEGRAÇÃO:', error);
        if (error.code === '42703') {
            console.error('   -> Falha: Colunas novas não encontradas. O script de migração não rodou corretamente?');
        } else if (error.code === '42501') {
            console.error('   -> Falha: Permissão negada (RLS). A política pública não foi aplicada corretamente.');
        }
    } else {
        console.log('✅ SUCESSO! Lead inserido na tabela correta do CRM.');
        console.log('   Dados gravados:', data);
        console.log('   \n👉 Verifique se este lead aparece no painel do NGHUB OS!');
    }
}

verifyLeadsIntegration();

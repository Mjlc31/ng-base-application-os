
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Carrega variáveis de ambiente do .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Credenciais do Supabase não encontradas no .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySupabaseSetup() {
    console.log('🔍 Iniciando verificação do Supabase...');
    console.log(`📡 URL: ${supabaseUrl}`);

    try {
        // 1. Teste de Conexão Simples
        const { data, error } = await supabase.from('ng_applications').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Falha na conexão ou tabela não encontrada:', error.message);
            console.log('💡 DICA: Verifique se você rodou o script SQL no Supabase SQL Editor.');
            return;
        }

        console.log('✅ Conexão estabelecida com sucesso!');
        console.log(`📊 Tabela 'ng_applications' encontrada. Total de registros: ${data?.length ?? 'N/A'}`);

        // 2. Teste de Inserção (Dados Fictícios)
        const testData = {
            full_name: 'Teste Automatizado',
            whatsapp: `1199999${Math.floor(Math.random() * 10000)}`, // Aleatório para evitar duplicata
            email: `teste.auto.${Date.now()}@exemplo.com`,
            industry: 'Tecnologia',
            monthly_revenue: 'R$ 50k - R$ 200k',
            headcount: '11-50',
            pain_point: 'Teste de verificação de integração do sistema.',
            instagram: '@teste.robot'
        };

        console.log('📝 Tentando inserir registro de teste...');
        const { data: insertData, error: insertError } = await supabase
            .from('ng_applications')
            .insert([testData])
            .select();

        if (insertError) {
            console.error('❌ Erro ao inserir dados:', insertError.message);
            if (insertError.code === '42703') {
                console.error('   -> Provável causa: Colunas incorretas. Verifique monthly_revenue vs revenue_range.');
            }
        } else {
            console.log('✅ Registro de teste inserido com sucesso!');
            console.log('   Dados:', insertData);

            // Limpeza opcional (se a política permitir delete, o que geralmente não permite para 'anon')
            // await supabase.from('ng_applications').delete().eq('id', insertData[0].id);
        }

    } catch (err) {
        console.error('❌ Erro inesperado:', err);
    }
}

verifySupabaseSetup();

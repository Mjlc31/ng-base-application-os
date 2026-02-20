
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração de ambiente
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

console.log('--- INICIANDO DIAGNÓSTICO DE CONEXÃO SUPABASE ---');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERRO CRÍTICO: Variáveis de ambiente faltando!');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? 'DEFINIDA' : 'NÃO DEFINIDA');
    process.exit(1);
}

console.log('✅ Variáveis de ambiente carregadas.');
console.log(`   URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDiagnostics() {
    // 1. TESTE DE LEITURA BÁSICA
    console.log('\n--- 1. TESTE DE CONEXÃO (LEITURA) ---');
    const { data: countData, error: countError } = await supabase
        .from('leads')
        .select('count', { count: 'exact', head: true });

    if (countError) {
        console.error('❌ FALHA NA LEITURA:', countError);
        console.error('   Causa provável: Tabela não existe ou RLS bloqueando SELECT.');
    } else {
        console.log('✅ Leitura efetuada com sucesso.');
        console.log(`   Total de registros na tabela 'leads': ${countData}`);
    }

    // 2. TESTE DE INSERÇÃO (SIMULAÇÃO COMPLETA)
    console.log('\n--- 2. TESTE DE INSERÇÃO (PAYLOAD REAIS) ---');

    const testPayload = {
        name: 'Diagnóstico Robot',
        email: `diagnostico.${Date.now()}@teste.com`,
        phone: '11999999999',
        sector: 'Tecnologia',
        revenue_text: 'R$ 50k - R$ 200k',
        headcount: '11-50',
        pain_point: 'Teste de diagnóstico automático do sistema.',
        instagram: '@robot.diagnostico',
        origin: 'Script Diagnostico',
        created_at: new Date().toISOString()
    };

    console.log('   Payload a ser enviado:', testPayload);

    const { data: insertData, error: insertError } = await supabase
        .from('leads')
        .insert([testPayload])
        .select();

    if (insertError) {
        console.error('❌ FALHA NA INSERÇÃO:', insertError);
        console.log('\n--- ANÁLISE DO ERRO ---');
        if (insertError.code === '42P01') {
            console.error('   CRÍTICO: A tabela "leads" NÃO EXISTE no banco de dados.');
        } else if (insertError.code === '42703') {
            console.error('   CRÍTICO: Coluna inexistente. O banco de dados está desatualizado em relação ao código.');
            console.error('   Verifique a mensagem "hint" acima para saber qual coluna falta.');
        } else if (insertError.code === '42501') {
            console.error('   CRÍTICO: ERRO DE PERMISSÃO (RLS). O usuário público (anon) não pode escrever nesta tabela.');
        } else {
            console.error('   Erro desconhecido. Verifique a mensagem completa.');
        }
    } else {
        console.log('✅ INSERÇÃO BEM SUCEDIDA!');
        console.log('   Registro criado:', insertData);
    }
}

runDiagnostics();

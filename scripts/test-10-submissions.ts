
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração de ambiente para Node.js
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Setup do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL; // Fallback
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERRO: Variáveis de ambiente não encontradas.');
    console.error('   Procurando em:', path.resolve(__dirname, '../.env.local'));
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Gerador de dados aleatórios simples
const sectors = ['Tecnologia', 'Varejo', 'Saúde', 'Educação', 'Finanças'];
const revenues = ['Até R$ 50k', 'R$ 50k - R$ 200k', 'R$ 200k - R$ 500k', 'R$ 500k - R$ 1M', 'Acima de R$ 1M'];
const headcounts = ['1-10', '11-50', '51-200', '201+'];

const generateLead = (index: number) => ({
    name: `Teste Automatizado ${index}`,
    email: `teste.auto.${Date.now()}.${index}@exemplo.com`,
    phone: `119${10000000 + Math.floor(Math.random() * 90000000)}`, // Aleatório mais robusto
    sector: sectors[Math.floor(Math.random() * sectors.length)],
    revenue_text: revenues[Math.floor(Math.random() * revenues.length)],
    headcount: headcounts[Math.floor(Math.random() * headcounts.length)],
    pain_point: `Teste de carga automatizado #${index} - Verificando estabilidade do banco.`,
    instagram: `@teste.auto.${index}`,
    origin: 'Stress Test Script',
    created_at: new Date().toISOString()
});

async function runStressTest() {
    console.log('🚀 INICIANDO TESTE DE CARGA: 10 SUBMISSÕES');
    console.log(`📡 URL: ${supabaseUrl}`);
    console.log('===========================================');

    let successCount = 0;
    let errors = [];

    for (let i = 1; i <= 10; i++) {
        const lead = generateLead(i);
        process.stdout.write(`\n[${i}/10] Enviando: ${lead.email}... `);

        // Simulate network latency slightly
        await new Promise(r => setTimeout(r, 100));

        const { data, error } = await supabase
            .from('leads')
            .insert([lead])
            .select();

        if (error) {
            console.log('❌ FALHA');
            console.error(`   Erro: ${error.message} (${error.code})`);
            errors.push({ index: i, error });
        } else {
            console.log('✅ SUCESSO');
            successCount++;
        }
    }

    console.log('\n===========================================');
    console.log(`📊 RESULTADO FINAL:`);
    console.log(`✅ Sucessos: ${successCount}/10`);

    if (errors.length === 0) {
        console.log('\n✨ O sistema passou no teste de robustez!');
        process.exit(0);
    } else {
        console.log(`\n⚠️ ${errors.length} falhas detectadas.`);
        process.exit(1);
    }
}

runStressTest().catch(console.error);

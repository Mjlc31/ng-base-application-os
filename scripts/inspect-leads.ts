
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function inspectLeadsStructure() {
    console.log('🔍 Investigando colunas da tabela "leads"...');

    // Adiciona um lead fake para ver o retorno com todas as colunas (se permitido) ou tenta pegar metadata
    // Como não temos acesso direto ao schema, vamos tentar um insert falho propositalmente para ver erros de coluna
    // OU tentar um select * limit 1 se tiver dados.

    const { data, error } = await supabase.from('leads').select('*').limit(1);

    if (data && data.length > 0) {
        console.log('✅ Estrutura encontrada via SELECT:');
        console.log(Object.keys(data[0]));
    } else if (error) {
        console.error('❌ Erro no SELECT:', error.message);
    } else {
        console.log('⚠️ Tabela "leads" existe mas está vazia. Tentando descobrir colunas via Insert de teste...');

        // Tenta inserir apenas um campo comum para ver se retorna erro ou sucesso com colunas padrão
        const { error: insertError } = await supabase.from('leads').insert([{ name: 'Teste Schema' }]);

        if (insertError) {
            console.log('   Erro proposital de insert:', insertError.message);
            if (insertError.message.includes('column')) {
                console.log('   Dica do erro sobre colunas:', insertError.message);
            }
        }
    }
}

inspectLeadsStructure();


import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) { console.error('Credenciais ausentes'); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectTables() {
    console.log('🔍 Investigando tabelas no banco de dados do NGHUB OS...');

    // Tenta listar tabelas comuns de CRM para descobrir onde os leads do NGHUB OS ficam
    const possibleTables = ['leads', 'crm_leads', 'opportunities', 'contacts', 'ng_leads', 'customers'];

    for (const table of possibleTables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);

        if (!error) {
            console.log(`✅ ENCONTRADA TABELA: "${table}"`);
            console.log('   Exemplo de dados:', data);
            console.log('   ---');
        } else {
            // Silencioso se não encontrar, para não poluir
            if (error.code !== '42P01') { // 42P01 = undefined_table
                console.log(`⚠️ Erro ao acessar "${table}": ${error.message}`);
            }
        }
    }

    // Verifica se a tabela que criamos (ng_applications) tem os dados
    const { data: appData, error: appError } = await supabase.from('ng_applications').select('*').limit(5);
    if (!appError) {
        console.log(`📊 Tabela ATUAL do Formulário (ng_applications): ${appData.length} registros.`);
        console.log('   Colunas:', Object.keys(appData[0] || {}));
    }
}

inspectTables();

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Credentials missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Querying table leads...');
    const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (leadsError) console.error(leadsError);
    else console.log('Leads:', JSON.stringify(leads, null, 2));

    console.log('\nQuerying table ng_applications...');
    const { data: apps, error: appsError } = await supabase
        .from('ng_applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (appsError) console.error(appsError);
    else console.log('ng_applications:', JSON.stringify(apps, null, 2));
}

main();

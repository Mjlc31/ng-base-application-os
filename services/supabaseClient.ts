/**
 * Cliente Supabase configurado
 * 
 * Gerencia conexão e operações com o banco de dados Supabase
 */

import { createClient } from '@supabase/supabase-js';
import { ApplicationForm } from '../types';
import { retryWithBackoff, createError, ErrorType, logError } from '../utils/errorHandler';
import { sanitizeFormData, sanitizeEmail, sanitizePhone, sanitizeInstagram } from '../utils/sanitize';

// Configuração Robusta do Supabase (Vite + Vercel)
// Tenta ler variáveis de ambiente de múltiplas fontes para garantir compatibilidade
const getEnvVar = (key: string): string | undefined => {
  // 1. Tenta import.meta.env (Vite Default)
  if (import.meta.env[key]) return import.meta.env[key];

  // 2. Tenta variantes com prefixo VITE_ se a chave for NEXT_PUBLIC_
  if (key.startsWith('NEXT_PUBLIC_')) {
    const viteKey = key.replace('NEXT_PUBLIC_', 'VITE_');
    if (import.meta.env[viteKey]) return import.meta.env[viteKey];
  }

  // 3. Fallback para process.env (compatibilidade Node/alguns bundlers)
  try {
    // @ts-ignore
    if (process?.env?.[key]) return process.env[key];
  } catch (e) {
    // process não definido no browser
  }

  return undefined;
};

// Busca as chaves
const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnvVar('VITE_SUPABASE_ANON_KEY');

// Log de Diagnóstico (Seguro - não expõe chaves completas)
console.log('🔌 [Supabase] Inicializando...', {
  url: supabaseUrl ? '✅ Definida' : '❌ Faltando',
  key: supabaseAnonKey ? '✅ Definida' : '❌ Faltando',
  env_mode: import.meta.env.MODE,
  base_url: supabaseUrl
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ [Supabase] ERRO CRÍTICO: Variáveis de ambiente não encontradas.');
  console.error('   Verifique se NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY estão definidas no Vercel.');
}

// Cria cliente Supabase
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', // Evita crash imediato, falha na conexão depois
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true, // Alterado para true para persistir login se necessário
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

/**
 * Valida dados do formulário antes de submeter
 */
const validateFormData = (data: ApplicationForm): boolean => {
  // Validações básicas
  if (!data.full_name || data.full_name.trim().length < 3) {
    throw createError(ErrorType.VALIDATION, 'Nome completo inválido');
  }

  if (!data.email || !data.email.includes('@')) {
    throw createError(ErrorType.VALIDATION, 'Email inválido');
  }

  if (!data.whatsapp || data.whatsapp.length < 10) {
    throw createError(ErrorType.VALIDATION, 'WhatsApp inválido');
  }

  if (!data.industry) {
    throw createError(ErrorType.VALIDATION, 'Indústria não selecionada');
  }

  if (!data.revenue_range) {
    throw createError(ErrorType.VALIDATION, 'Faturamento não selecionado');
  }

  if (!data.headcount) {
    throw createError(ErrorType.VALIDATION, 'Headcount não selecionado');
  }

  if (!data.pain_point || data.pain_point.trim().length < 10) {
    throw createError(ErrorType.VALIDATION, 'Pain point muito curto (mínimo 10 caracteres)');
  }

  return true;
};

/**
 * Submete aplicação para o Supabase
 * 
 * @param data - Dados do formulário
 * @returns Promise que resolve quando a submissão é bem-sucedida
 * @throws Error se a submissão falhar após tentativas de retry
 */
export const submitApplication = async (data: ApplicationForm): Promise<void> => {
  try {
    // Valida dados antes de enviar
    validateFormData(data);

    // Sanitiza dados antes de processar
    const sanitizedData = sanitizeFormData(data);

    // Prepara dados para inserção na tabela 'leads' do CRM
    // Mapeamento: Form -> Tabela Leads
    const leadData = {
      name: sanitizedData.full_name.trim(),              // full_name -> name
      email: sanitizeEmail(sanitizedData.email),         // email -> email
      phone: sanitizePhone(sanitizedData.whatsapp),      // whatsapp -> phone
      sector: sanitizedData.industry,                    // industry -> sector

      // Campos Novos (Adicionados via Migration)
      revenue_text: sanitizedData.revenue_range,         // revenue_range -> revenue_text
      headcount: sanitizedData.headcount ? String(sanitizedData.headcount) : null,
      pain_point: sanitizedData.pain_point.trim(),
      instagram: sanitizedData.instagram_profile ? sanitizeInstagram(sanitizedData.instagram_profile) : null,

      // Campos Padrão do CRM
      stage: 'Novo Lead',                                // Status inicial
      origin: 'Site NG.BASE',                            // Origem
      created_at: new Date().toISOString(),
      last_contact: new Date().toISOString(),            // Data do último contato (agora)

      // Campos Opcionais/Nulos
      company: null, // O form não pede nome da empresa separado, talvez industry sirva ou deixe null
      value: 0       // Valor numérico (revenue é texto), deixamos 0 por enquanto
    };

    console.log('📤 Enviando lead para CRM (Tabela leads)...', {
      email: leadData.email,
      sector: leadData.sector
    });

    // Submete com retry logic
    await retryWithBackoff(async () => {
      const { data: result, error } = await supabase
        .from('leads') // <--- MUDANÇA IMPORTANTE: Agora aponta para 'leads'
        .insert([leadData])
        .select();

      if (error) {
        console.error('❌ Erro detalhado do Supabase (Leads):', error);

        // Verifica erro de duplicata
        if (error.code === '23505') {
          throw createError(
            ErrorType.VALIDATION,
            'Este email ou telefone já está cadastrado no sistema.'
          );
        }

        // Erro de coluna inexistente (caso não tenha rodado migration)
        if (error.code === '42703') {
          throw createError(
            ErrorType.SUBMISSION,
            'Erro de configuração: Colunas novas (revenue_text, etc) não encontradas. Rode o script de migração.'
          );
        }

        throw createError(
          ErrorType.NETWORK,
          `Erro ao salvar lead: ${error.message}`
        );
      }

      console.log('✅ Lead cadastrado no CRM com sucesso!', result);
    }, 3, 1000);

  } catch (error: any) {
    console.error('❌ Erro capturado em submitApplication:', error);
    if (error.type) throw error;

    const wrappedError = createError(
      ErrorType.UNKNOWN,
      `Falha na submissão: ${error.message}`,
      error
    );
    logError(wrappedError);
    throw wrappedError;
  }
};

/**
 * Testa conexão com o Supabase
 * 
 * @returns Promise<boolean> true se conectado
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('ng_applications')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Erro de conexão:', error);
      return false;
    }

    console.log('✅ Conexão com Supabase OK');
    return true;
  } catch (error) {
    console.error('❌ Falha ao testar conexão:', error);
    return false;
  }
};

/**
 * Verifica se email já existe
 */
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('leads') // <--- Corrigido para 'leads'
      .select('email')
      .eq('email', email.toLowerCase().trim())
      .limit(1);

    if (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Erro ao verificar email:', error);
    return false;
  }
};

/**
 * Verifica se WhatsApp já existe
 */
export const checkWhatsAppExists = async (whatsapp: string): Promise<boolean> => {
  try {
    const cleanWhatsApp = whatsapp.replace(/\D/g, '');

    const { data, error } = await supabase
      .from('leads') // <--- Corrigido para 'leads'
      // Nota: na tabela leads o campo é 'phone', mas vamos checar query
      // No schema inspectado anteriormente, era 'phone'.
      // Mas o supabaseClient mapeia whatsapp -> phone no insert.
      // Então aqui devemos buscar por 'phone'.
      .select('phone')
      .eq('phone', cleanWhatsApp)
      .limit(1);

    if (error) {
      // Se der erro de coluna (ex: phone vs whatsapp), falha silenciosamente
      console.error('Erro ao verificar WhatsApp:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Erro ao verificar WhatsApp:', error);
    return false;
  }
};
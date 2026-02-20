-- ============================================================================
-- SCRIPT DE CORREÇÃO TOTAL - NG.BASE CRM
-- Execute este script no SQL Editor do Supabase para garantir que TUDO esteja correto.
-- ============================================================================

-- 1. GARANTIR ESTRUTURA DA TABELA 'leads'
-- Adiciona colunas se não existirem (Safe Migration)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS revenue_text TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS headcount TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS pain_point TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS instagram TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS origin TEXT DEFAULT 'Site NG.BASE';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS sector TEXT;
-- Garante que email e phone existam (campos base)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS name TEXT;

-- 2. LIMPAR DADOS SUJOS DE TESTES ANTERIORES (OPCIONAL - ABORTADO POR SEGURANÇA)
-- DELETE FROM public.leads WHERE email LIKE '%teste%';

-- 3. RESET TOTAL DE PERMISSÕES (RLS)
-- Primeiro, desabilitamos para limpar a casa
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- Removemos TODAS as políticas antigas para evitar conflitos
DROP POLICY IF EXISTS "Permitir Inserção Pública Leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir Inserção Pública Leads - Final" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Public Insert Leads" ON public.leads;
DROP POLICY IF EXISTS "Public Insert Leads Master" ON public.leads;
DROP POLICY IF EXISTS "Allow public insert" ON public.leads;
DROP POLICY IF EXISTS "Allow anon insert" ON public.leads;

-- 4. RECONFIGURAR SEGURANÇA CORRETA
-- Reabilitamos RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Criamos UMA ÚNICA política permissiva para INSERÇÃO
CREATE POLICY "Public Insert Policy For NgBase"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- Criamos política para SELECT (Opcional, útil para debug, mas restrito em prod geralmente)
-- Vamos permitir select por enquanto para seus testes de verificação
CREATE POLICY "Public Select Policy For NgBase"
ON public.leads
FOR SELECT
TO public
USING (true);

-- 5. GRANTS EXPLÍCITOS (CRUCIAL PARA O USUÁRIO 'ANON')
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 6. INDEXAÇÃO PARA PERFORMANCE (PREVENÇÃO DE DUPLICATAS)
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);

-- CONFIRMAÇÃO
COMMENT ON TABLE public.leads IS 'Tabela de Leads NG.BASE - Configurada para Acesso Público (Insert)';

-- ============================================================================
-- MIGRATION SCRIPT - NGHUB OS CRM INTEGRATION
-- Execute no SQL Editor do Supabase para preparar a tabela 'leads'
-- ============================================================================

-- 1. Adicionar colunas faltantes na tabela 'leads' para capturar todos os dados
-- Usamos "IF NOT EXISTS" para evitar erros se você rodar mais de uma vez.

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS revenue_text TEXT; -- Para "R$ 50k - R$ 200k"
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS headcount TEXT;    -- Para tamanho do time
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS pain_point TEXT;   -- Para o "Gargalo"
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS instagram TEXT;    -- Para o perfil do Instagram
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS origin TEXT DEFAULT 'Site NG.BASE'; -- Para saber de onde veio

-- 2. Configurar Segurança (RLS) para a tabela LEADS
-- Precisamos permitir que o formulário (anon) insira dados aqui também.

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Remove política antiga se houver (para evitar conflitos)
DROP POLICY IF EXISTS "Permitir Inserção Pública Leads" ON public.leads;

-- Cria a política correta
CREATE POLICY "Permitir Inserção Pública Leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 3. Garantir permissões de uso
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;

-- Confirmação
COMMENT ON COLUMN public.leads.revenue_text IS 'Faixa de faturamento (Formulário NG.BASE)';
COMMENT ON COLUMN public.leads.pain_point IS 'Dor/Gargalo principal (Formulário NG.BASE)';

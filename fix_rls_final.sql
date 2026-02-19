-- ============================================================================
-- CORREÇÃO DEFINITIVA DE PERMISSÕES (RLS + GRANTS) - LEADS
-- ============================================================================

-- 1. Garante que o RLS está ativo (Segurança)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 2. Limpa políticas antigas ou conflitantes
DROP POLICY IF EXISTS "Permitir Inserção Pública Leads" ON public.leads;
DROP POLICY IF EXISTS "Permitir Inserção Pública Leads - Final" ON public.leads;
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON public.leads;
DROP POLICY IF EXISTS "Public Insert Leads" ON public.leads;

-- 3. Cria a política "Mestra" (Permite INSERT para TODOS: anon, authenticated, service_role)
-- Usamos "TO public" para cobrir qualquer role que o Supabase use
CREATE POLICY "Public Insert Leads Master"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- 4. O GRANDE SEGREDO: GRANT explícito de INSERT
-- Muitas vezes o RLS permite, mas o usuário sem login (anon) não tem permissão na tabela
GRANT INSERT ON TABLE public.leads TO anon;
GRANT INSERT ON TABLE public.leads TO authenticated;
GRANT INSERT ON TABLE public.leads TO service_role;

-- 5. Libera sequências (IDs automáticos) se houver
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Confirmação
COMMENT ON TABLE public.leads IS 'Tabela de Leads (Acesso Público Configurado)';

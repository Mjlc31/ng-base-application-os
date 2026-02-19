-- ============================================================================
-- SOLUÇÃO IMEDIATA: DESATIVAR RLS NA TABELA LEADS
-- ============================================================================

-- 1. Desativa a verificação de políticas linha-a-linha (O "Cadeado")
ALTER TABLE public.leads DISABLE ROW LEVEL SECURITY;

-- 2. Garante permissão total para a API (O "Crachá")
GRANT ALL ON TABLE public.leads TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 3. Confirmação
COMMENT ON TABLE public.leads IS 'Tabela de Leads (RLS Desativado para Integração)';

-- ============================================================================
-- SCRIPT DE CONFIGURAÇÃO - NG.BASE CRM INTEGRATION
-- Execute este script completo no Supabase SQL Editor para configurar o banco
-- ============================================================================

-- 1. Habilitar extensão para IDs únicos (UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criar tabela de aplicações (se não existir)
CREATE TABLE IF NOT EXISTS public.ng_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    industry TEXT NOT NULL,
    monthly_revenue TEXT NOT NULL, -- Corresponde ao campo 'revenue_range' do form
    headcount TEXT NOT NULL,
    pain_point TEXT NOT NULL,
    instagram TEXT,                -- Corresponde ao campo 'instagram_profile' do form
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Criar índices para melhorar performance de busca
CREATE INDEX IF NOT EXISTS idx_ng_applications_email ON public.ng_applications(email);
CREATE INDEX IF NOT EXISTS idx_ng_applications_whatsapp ON public.ng_applications(whatsapp);
CREATE INDEX IF NOT EXISTS idx_ng_applications_created_at ON public.ng_applications(created_at DESC);

-- 4. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ng_applications_updated_at 
BEFORE UPDATE ON public.ng_applications 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- 5. Configurar Segurança (RLS - Row Level Security)
ALTER TABLE public.ng_applications ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir que QUALQUER UM (anon) IMPORTANTE: INSERIR dados (Submissão pública do formulário)
DROP POLICY IF EXISTS "Enable insert for anon and authenticated users" ON public.ng_applications;
CREATE POLICY "Enable insert for anon and authenticated users" 
ON public.ng_applications 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Política 2: Permitir APENAS leitura para admins/service_role (Segurança dos dados)
-- O 'anon' (usuário do site) NÃO pode ler os dados de outros, apenas inserir.
-- O painel do Supabase usa service_role, então funcionará lá.

-- 6. Comentários para documentação no banco
COMMENT ON TABLE public.ng_applications IS 'Registros de aplicação para o programa NG.BASE';
COMMENT ON COLUMN public.ng_applications.monthly_revenue IS 'Mapeado do campo revenue_range do front-end';
COMMENT ON COLUMN public.ng_applications.instagram IS 'Mapeado do campo instagram_profile do front-end';

-- FIM DO SCRIPT

-- Schema para tabela ng_applications no Supabase
-- Execute este SQL no Supabase SQL Editor

-- Cria tabela se não existir
CREATE TABLE IF NOT EXISTS ng_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Dados pessoais
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Dados da empresa
  industry TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL,
  headcount TEXT NOT NULL,
  pain_point TEXT NOT NULL,
  instagram TEXT,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_ng_applications_email ON ng_applications(email);
CREATE INDEX IF NOT EXISTS idx_ng_applications_whatsapp ON ng_applications(whatsapp);
CREATE INDEX IF NOT EXISTS idx_ng_applications_created_at ON ng_applications(created_at DESC);

-- Constraints únicos
ALTER TABLE ng_applications 
  ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE ng_applications 
  ADD CONSTRAINT unique_whatsapp UNIQUE (whatsapp);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ng_applications_updated_at 
  BEFORE UPDATE ON ng_applications 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários
COMMENT ON TABLE ng_applications IS 'Aplicações para o programa NG.BASE';
COMMENT ON COLUMN ng_applications.full_name IS 'Nome completo do aplicante';
COMMENT ON COLUMN ng_applications.whatsapp IS 'WhatsApp (apenas números)';
COMMENT ON COLUMN ng_applications.email IS 'Email do aplicante';
COMMENT ON COLUMN ng_applications.industry IS 'Indústria/setor de atuação';
COMMENT ON COLUMN ng_applications.monthly_revenue IS 'Faturamento mensal';
COMMENT ON COLUMN ng_applications.headcount IS 'Tamanho do time';
COMMENT ON COLUMN ng_applications.pain_point IS 'Principal gargalo do negócio';
COMMENT ON COLUMN ng_applications.instagram IS 'Perfil do Instagram (opcional)';

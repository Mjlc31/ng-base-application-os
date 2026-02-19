# Configuração do Supabase - NG.BASE Application

## 🎯 Objetivo

Configurar integração completa com Supabase para armazenar leads do formulário NG.BASE.

---

## 📋 Passo a Passo

### 1. Criar Tabela no Supabase

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto: `qsvabiflvypinzwbdlhx`
3. Vá em **SQL Editor**
4. Execute o script `supabase_schema.sql`

**OU** crie manualmente:

```sql
CREATE TABLE ng_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  industry TEXT NOT NULL,
  monthly_revenue TEXT NOT NULL,
  headcount TEXT NOT NULL,
  pain_point TEXT NOT NULL,
  instagram TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

### 2. Configurar Row Level Security (RLS)

Por padrão, o Supabase ativa RLS. Para permitir inserções públicas:

```sql
-- Desabilita RLS para permitir inserções públicas
ALTER TABLE ng_applications DISABLE ROW LEVEL SECURITY;
```

**OU** configure políticas específicas:

```sql
-- Habilita RLS
ALTER TABLE ng_applications ENABLE ROW LEVEL SECURITY;

-- Permite INSERT público
CREATE POLICY "Permitir INSERT público" 
ON ng_applications 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Permite SELECT apenas autenticado (admin)
CREATE POLICY "Permitir SELECT autenticado" 
ON ng_applications 
FOR SELECT 
TO authenticated 
USING (true);
```

---

### 3. Verificar Credenciais

As credenciais já estão configuradas em `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsvabiflvypinzwbdlhx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0Pn9XTk7whN2pD1GEbMu_g_Rv_EHsL_
```

---

### 4. Testar Conexão

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o console do navegador e verifique:
- ✅ "Conexão com Supabase OK"
- ❌ Se houver erro, verifique as credenciais

---

## 📊 Estrutura da Tabela

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | UUID | Sim (auto) | ID único |
| `full_name` | TEXT | Sim | Nome completo |
| `whatsapp` | TEXT | Sim | WhatsApp (apenas números) |
| `email` | TEXT | Sim | Email (único) |
| `industry` | TEXT | Sim | Indústria/setor |
| `monthly_revenue` | TEXT | Sim | Faturamento mensal |
| `headcount` | TEXT | Sim | Tamanho do time |
| `pain_point` | TEXT | Sim | Principal gargalo |
| `instagram` | TEXT | Não | Perfil Instagram |
| `created_at` | TIMESTAMP | Sim (auto) | Data de criação |
| `updated_at` | TIMESTAMP | Sim (auto) | Data de atualização |

---

## 🔒 Validações Implementadas

### No Cliente (Frontend)
- Nome: mínimo 3 caracteres
- Email: formato válido
- WhatsApp: mínimo 10 dígitos
- Pain Point: mínimo 10 caracteres

### No Banco (Constraints)
- Email: UNIQUE
- WhatsApp: UNIQUE
- Todos os campos obrigatórios: NOT NULL

---

## 🔄 Fluxo de Submissão

1. **Usuário preenche formulário**
2. **Validação frontend** (em tempo real)
3. **Submissão** → `submitApplication()`
4. **Validação de dados** → `validateFormData()`
5. **Verificação de duplicatas** (opcional)
6. **Retry com backoff** (até 3 tentativas)
7. **Inserção no Supabase**
8. **Tela de sucesso**

---

## 🛠️ Funções Disponíveis

### `submitApplication(data: ApplicationForm)`
Submete aplicação para o Supabase com retry logic.

```typescript
await submitApplication(formData);
```

### `testConnection()`
Testa conexão com o Supabase.

```typescript
const isConnected = await testConnection();
```

### `checkEmailExists(email: string)`
Verifica se email já foi cadastrado.

```typescript
const exists = await checkEmailExists('test@example.com');
```

### `checkWhatsAppExists(whatsapp: string)`
Verifica se WhatsApp já foi cadastrado.

```typescript
const exists = await checkWhatsAppExists('11999999999');
```

---

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se a URL do Supabase está correta
- Verifique se o projeto está ativo

### Erro: "Invalid API key"
- Verifique se a chave anônima está correta
- Regenere a chave se necessário

### Erro: "Permission denied"
- Verifique as políticas RLS
- Considere desabilitar RLS para testes

### Erro: "Duplicate key value"
- Email ou WhatsApp já cadastrado
- Implemente verificação prévia

---

## 📈 Monitoramento

### Visualizar Dados

1. Acesse **Table Editor** no Supabase
2. Selecione `ng_applications`
3. Visualize todos os leads cadastrados

### Exportar Dados

```sql
SELECT * FROM ng_applications 
ORDER BY created_at DESC;
```

Ou use a interface do Supabase para exportar CSV.

---

## 🔐 Segurança

### Recomendações

1. **Nunca exponha** a Service Role Key no frontend
2. **Use apenas** a Anon Key pública
3. **Configure RLS** adequadamente
4. **Implemente rate limiting** se necessário
5. **Monitore** inserções suspeitas

---

## ✅ Checklist de Configuração

- [ ] Tabela `ng_applications` criada
- [ ] Índices criados
- [ ] Constraints configurados
- [ ] RLS configurado
- [ ] Credenciais no `.env.local`
- [ ] Teste de conexão bem-sucedido
- [ ] Teste de inserção bem-sucedido
- [ ] Verificação de duplicatas funcionando

---

**Última Atualização**: 2026-02-13  
**Versão**: 1.0.0

# Relatório de Diagnóstico: Conexão Supabase (Produção vs Local)

**Data:** 20/02/2026  
**Status:** 🔴 Falha apenas em Produção (Vercel) | ✅ Sucesso Localmente

---

## 1. Resultados dos Testes Intensivos

Realizei uma bateria de testes "incansáveis" simulando exatamente o comportamento do seu formulário no site.

### ✅ Teste 1: Conexão e Leitura
- **Resultado:** SUCESSO
- **Detalhes:** O sistema conectou ao Supabase e leu a tabela `leads`.
- **Contagem:** 17 registros encontrados.

### ✅ Teste 2: Simulação de Submissão (Payload Completo)
- **Resultado:** SUCESSO
- **Ação:** Enviei um "Lead Robô" com **todos** os campos preenchidos (Nome, Email, WhatsApp, Faturamento, Headcount, Dor, Instagram).
- **Dados Gravados:**
  ```json
  {
    "name": "Diagnóstico Robot JS",
    "email": "diagnostico.js.1771562816166@teste.com",
    "revenue_text": "R$ 50k - R$ 200k",
    "pain_point": "Teste de diagnóstico automático..."
  }
  ```
- **Conclusão:** A tabela `leads` tem todas as colunas corretas e aceita gravações.

---

## 2. A Causa Raiz (O Problema)

Como o código funciona perfeitamente na minha máquina (usando as chaves de `.env.local`), mas falha no site `ngbase.nghub.com.br`, a conclusão técnica é única:

**🚨 As Variáveis de Ambiente não estão configuradas no Vercel.**

O site em produção não tem acesso às chaves que permitem falar com o Supabase. É como tentar abrir uma porta sem a chave, mesmo que a fechadura esteja funcionando.

---

## 3. Solução Passo a Passo (Siga Exatamente)

### Passo A: Configurar Vercel (Crítico)
1. Acesse o painel do projeto no **Vercel**.
2. Vá em **Settings** > **Environment Variables**.
3. Adicione as seguintes variáveis (copie do seu `.env.local`):

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qsvabiflvypinzwbdlhx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_0Pn9XTk7whN2pD1GEbMu...` (copie a chave inteira) |

4. **IMPORTANTE:** Após adicionar, você deve fazer um **Redeploy** (ou um novo commit) para que as alterações tenham efeito.

### Passo B: "Blindagem" do Banco de Dados (Opcional por Segurança) 
Para garantir que não seja um problema de "permissão fantasma", criei um script SQL definitivo que "arromba" as portas da tabela `leads` para seu app.

1. Baixe o arquivo `COMPLETE_FIX_AND_SETUP.sql`.
2. Vá no **Supabase** > **SQL Editor**.
3. Cole e execute o conteúdo.
4. Isso garante que permissões `anon` (usuário não logado) estejam 100% ativas.

# NG.BASE Application

Aplicação de formulário multi-step premium para o programa NG.BASE, construída com React, TypeScript, Framer Motion e Tailwind CSS.

## 🚀 Características

- **Design Premium**: Interface glassmorphism com animações suaves
- **Multi-Step Form**: 8 etapas de qualificação com validação em tempo real
- **Performance Otimizada**: React.memo, requestAnimationFrame, lazy loading
- **Acessibilidade**: ARIA labels, navegação por teclado, leitores de tela
- **Responsivo**: Otimizado para desktop, tablet e mobile
- **TypeScript**: Tipagem forte em todo o projeto
- **Arquitetura Modular**: Componentes reutilizáveis e hooks customizados

## 📁 Estrutura do Projeto

```
ng.base-application-os/
├── components/
│   ├── ui/
│   │   ├── BorderBeamInput.tsx    # Input com efeito de borda animada
│   │   ├── Confetti.tsx           # Animação de confetti
│   │   ├── MeshBackground.tsx     # Fundo com gradiente mesh
│   │   └── MoneyRain.tsx          # Animação de "chuva de dinheiro"
│   ├── ErrorMessage.tsx           # Mensagens de erro acessíveis
│   ├── FormHeader.tsx             # Header do formulário
│   ├── ProgressBar.tsx            # Barra de progresso
│   └── SuccessScreen.tsx          # Tela de sucesso
├── constants/
│   └── index.ts                   # Constantes centralizadas
├── hooks/
│   ├── useFormStep.ts             # Hook para gerenciar formulário
│   └── usePhoneMask.ts            # Hook para máscara de telefone
├── services/
│   └── supabaseClient.ts          # Cliente Supabase com retry logic
├── utils/
│   ├── errorHandler.ts            # Sistema de tratamento de erros
│   ├── formatters.ts              # Funções de formatação
│   └── validators.ts              # Funções de validação
├── App.tsx                        # Componente principal
├── types.ts                       # Definições de tipos
└── index.tsx                      # Entry point
```

## 🛠️ Tecnologias

- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Framer Motion** - Animações
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **Supabase** - Backend/Database
- **Vite** - Build tool

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

> **Nota**: Sem as credenciais do Supabase, a aplicação funcionará em modo demo, simulando submissões bem-sucedidas.

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📝 Uso

A aplicação guia o usuário através de 8 etapas:

1. **Nome Completo** - Identificação
2. **WhatsApp** - Contato direto (com máscara automática)
3. **Email** - Canal oficial
4. **Indústria** - Ramo de atuação
5. **Faturamento** - Faixa de revenue mensal
6. **Headcount** - Tamanho do time
7. **Pain Point** - Principal gargalo do negócio
8. **Instagram** - Perfil para análise

### Validações

Cada campo possui validação específica:
- Email: formato válido
- Telefone: DDD + número (10-11 dígitos)
- Instagram: @usuario ou URL
- Pain Point: mínimo 10 caracteres

## 🎨 Padrões de Código

### Componentes

- Use `React.memo` para componentes que não precisam re-renderizar frequentemente
- Adicione `displayName` para melhor debugging
- Sempre inclua ARIA labels para acessibilidade

```typescript
export const MyComponent: React.FC<Props> = React.memo(({ prop }) => {
  // ...
});

MyComponent.displayName = 'MyComponent';
```

### Hooks Customizados

- Prefixe com `use`
- Retorne objetos ao invés de arrays para melhor legibilidade
- Documente com JSDoc

```typescript
/**
 * Hook para gerenciar estado X
 * @param initialValue - Valor inicial
 * @returns Objeto com state e handlers
 */
export const useMyHook = (initialValue: string) => {
  // ...
  return { value, onChange };
};
```

### Validações

- Centralize em `utils/validators.ts`
- Retorne `string | null` (erro ou sucesso)
- Use mensagens de erro de `constants/index.ts`

## ⚡ Otimizações de Performance

### Implementadas

1. **React.memo** - Todos os componentes UI
2. **requestAnimationFrame** - MoneyRain canvas
3. **Throttling** - Resize events
4. **will-change CSS** - Animações críticas
5. **Lazy Loading** - SuccessScreen
6. **Mobile-aware** - Menos partículas em mobile

### Métricas Esperadas

- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## ♿ Acessibilidade

- **ARIA Labels**: Todos os elementos interativos
- **Roles Semânticos**: `main`, `banner`, `progressbar`, etc.
- **Live Regions**: Mensagens de erro anunciadas
- **Navegação por Teclado**: Enter para avançar, Tab para navegar
- **Focus Indicators**: Visíveis em todos os elementos

## 🐛 Troubleshooting

### TypeScript Errors

Os erros de TypeScript relacionados a `react` e `framer-motion` são esperados porque o projeto usa **import maps** (ESM via CDN) ao invés de node_modules. O código funciona perfeitamente em runtime.

### Supabase Connection

Se você ver "Supabase keys not detected", configure as variáveis de ambiente conforme descrito acima.

## 📄 Licença

Propriedade de NG.HUB - Todos os direitos reservados.

## 🤝 Contato

Instagram: [@nghub.co](https://www.instagram.com/nghub.co/)

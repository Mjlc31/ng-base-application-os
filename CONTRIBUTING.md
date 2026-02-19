# Guia de Contribuição

Obrigado por considerar contribuir para o projeto NG.BASE Application! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

- Seja respeitoso e profissional
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## 🚀 Como Contribuir

### Reportando Bugs

Antes de criar um issue:
1. Verifique se o bug já não foi reportado
2. Verifique se está usando a versão mais recente
3. Colete informações sobre o ambiente (browser, OS, etc.)

Ao reportar um bug, inclua:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Informações do ambiente

### Sugerindo Melhorias

Para sugerir uma melhoria:
1. Verifique se já não existe uma sugestão similar
2. Descreva claramente o problema que a melhoria resolve
3. Explique por que essa melhoria seria útil
4. Forneça exemplos de uso, se possível

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature (`git checkout -b feature/MinhaFeature`)
4. **Commit** suas mudanças seguindo os padrões abaixo
5. **Push** para sua branch (`git push origin feature/MinhaFeature`)
6. Abra um **Pull Request**

## 📝 Padrões de Código

### TypeScript

- Use tipagem forte, evite `any`
- Prefira `interface` para objetos públicos
- Use `type` para unions e intersections
- Sempre adicione JSDoc em funções públicas

```typescript
/**
 * Valida email corporativo
 * @param email - Email a validar
 * @returns Mensagem de erro ou null
 */
export const validateEmail = (email: string): string | null => {
  // ...
};
```

### React

- Use componentes funcionais
- Adicione `React.memo` quando apropriado
- Sempre defina `displayName` para debugging
- Use hooks customizados para lógica complexa

```typescript
export const MyComponent: React.FC<Props> = React.memo(({ prop }) => {
  // ...
});

MyComponent.displayName = 'MyComponent';
```

### Nomenclatura

- **Componentes**: PascalCase (`BorderBeamInput`)
- **Hooks**: camelCase com prefixo `use` (`useFormStep`)
- **Funções**: camelCase (`validateEmail`)
- **Constantes**: UPPER_SNAKE_CASE (`ERROR_MESSAGES`)
- **Tipos/Interfaces**: PascalCase (`ApplicationForm`)

### Estrutura de Arquivos

```
src/
├── components/        # Componentes React
│   ├── ui/           # Componentes UI reutilizáveis
│   └── ...           # Componentes de página
├── hooks/            # Hooks customizados
├── utils/            # Funções utilitárias
├── constants/        # Constantes
├── services/         # Serviços (API, etc.)
├── types/            # Definições de tipos
└── ...
```

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
tipo(escopo): descrição curta

Descrição mais detalhada (opcional)

Refs: #123
```

**Tipos**:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração
- `perf`: Melhoria de performance
- `test`: Testes
- `chore`: Tarefas de manutenção

**Exemplos**:
```
feat(validation): adiciona validação de CPF

fix(form): corrige máscara de telefone em iOS

docs(readme): atualiza instruções de instalação

perf(canvas): otimiza MoneyRain com requestAnimationFrame
```

## 🧪 Testes

- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes acima de 80%
- Use nomes descritivos para testes

```typescript
describe('validateEmail', () => {
  it('should return null for valid email', () => {
    expect(validateEmail('test@example.com')).toBeNull();
  });

  it('should return error for invalid email', () => {
    expect(validateEmail('invalid')).toBe('Email inválido');
  });
});
```

## ♿ Acessibilidade

Sempre considere acessibilidade:
- Use ARIA labels apropriados
- Teste com leitores de tela
- Garanta navegação por teclado
- Suporte `prefers-reduced-motion`
- Mantenha contraste adequado (WCAG AA)

## 🎨 Design

- Siga o design system existente
- Use cores da paleta definida
- Mantenha consistência visual
- Teste em diferentes tamanhos de tela

## 📚 Documentação

- Documente código complexo
- Atualize README quando necessário
- Adicione exemplos de uso
- Mantenha CHANGELOG atualizado

## ❓ Dúvidas

Se tiver dúvidas:
1. Verifique a documentação existente
2. Procure em issues fechados
3. Abra uma issue com a tag `question`

## 🙏 Obrigado!

Sua contribuição é muito apreciada! 🎉

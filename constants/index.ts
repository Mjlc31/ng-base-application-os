/**
 * Constantes centralizadas do projeto NG.BASE Application
 * 
 * Este arquivo contém todas as configurações, opções e constantes
 * utilizadas em toda a aplicação para facilitar manutenção.
 */

import { StepConfig } from '../types';

/**
 * Opções de faixa de faturamento disponíveis no formulário
 */
export const REVENUE_OPTIONS = [
    "Pre-Revenue",
    "R$ 0 - R$ 50k",
    "R$ 50k - R$ 200k",
    "R$ 200k - R$ 1M",
    "R$ 1M - R$ 5M",
    "R$ 5M+",
] as const;

/**
 * Mensagens de erro padronizadas para validações
 */
export const ERROR_MESSAGES = {
    REQUIRED: "Este campo é obrigatório.",
    INVALID_EMAIL: "Por favor, insira um email corporativo válido.",
    INVALID_PHONE: "Insira um número completo com DDD.",
    INVALID_INSTAGRAM: "Por favor, insira seu @usuário ou link do perfil.",
    MIN_LENGTH: (min: number) => `Este campo deve ter no mínimo ${min} caracteres.`,
    SUBMISSION_ERROR: "Ocorreu um erro ao enviar. Tente novamente.",
} as const;

/**
 * Configuração das etapas do formulário
 * Importa validadores do módulo dedicado
 */
export const FORM_STEPS: StepConfig[] = [
    {
        id: 1,
        field: 'full_name',
        question: "Identificação.",
        subtext: "Qual seu nome completo para o credenciamento?",
        type: 'text',
        placeholder: "Nome Sobrenome",
        ariaLabel: "Digite seu nome completo",
    },
    {
        id: 2,
        field: 'whatsapp',
        question: "Contato Direto.",
        subtext: "Qual seu WhatsApp principal? Entraremos em contato por aqui.",
        type: 'tel',
        placeholder: "(11) 99999-9999",
        ariaLabel: "Digite seu número de WhatsApp com DDD",
    },
    {
        id: 3,
        field: 'email',
        question: "Canal Oficial.",
        subtext: "Seu melhor e-mail corporativo para convites.",
        type: 'email',
        placeholder: "nome@empresa.com",
        ariaLabel: "Digite seu email corporativo",
    },
    {
        id: 4,
        field: 'industry',
        question: "Mercado.",
        subtext: "Em qual nicho ou ramo de atuação você opera?",
        type: 'text',
        placeholder: "Ex: SaaS, Varejo, Fintech, Agência...",
        ariaLabel: "Digite seu ramo de atuação",
    },
    {
        id: 5,
        field: 'revenue_range',
        question: "Scale Stage.",
        subtext: "Qual sua faixa de faturamento mensal atual?",
        type: 'select',
        options: REVENUE_OPTIONS,
        ariaLabel: "Selecione sua faixa de faturamento mensal",
    },
    {
        id: 6,
        field: 'headcount',
        question: "Estrutura.",
        subtext: "Qual o tamanho atual do seu time?",
        type: 'number',
        placeholder: "0",
        ariaLabel: "Digite o número de pessoas no seu time",
    },
    {
        id: 7,
        field: 'pain_point',
        question: "O Gargalo.",
        subtext: "O que impede seu negócio de escalar hoje? Seja específico.",
        type: 'textarea',
        placeholder: "Ex: Contratação de lideranças, previsibilidade de vendas...",
        ariaLabel: "Descreva o principal gargalo do seu negócio",
    },
    {
        id: 8,
        field: 'instagram_profile',
        question: "Social Intelligence.",
        subtext: "Compartilhe seu perfil do Instagram para análise.",
        type: 'text',
        placeholder: "@seu.perfil",
        ariaLabel: "Digite seu perfil do Instagram",
    },
];

/**
 * Configurações de animação
 */
export const ANIMATION_CONFIG = {
    STEP_TRANSITION_DURATION: 0.5,
    PROGRESS_BAR_DURATION: 0.5,
    ERROR_ANIMATION_DURATION: 0.3,
    SUCCESS_DELAY: 0.3,
    CONFETTI_PARTICLE_COUNT: 60,
    MONEY_RAIN_INTERVAL: 50,
    MONEY_RAIN_FONT_SIZE: 14,
} as const;

/**
 * Configurações de cores (sincronizado com Tailwind)
 */
export const COLORS = {
    BACKGROUND: '#050505',
    SURFACE: '#0A0A0A',
    NG_GOLD: {
        400: '#EAC54F',
        500: '#C5A059',
        600: '#997B36',
    },
    NG_SILVER: '#C0C0C0',
} as const;

/**
 * Links externos
 */
export const EXTERNAL_LINKS = {
    INSTAGRAM: 'https://www.instagram.com/nghub.co/',
} as const;

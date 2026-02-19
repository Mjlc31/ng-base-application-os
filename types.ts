/**
 * Tipos do formulário de aplicação NG.BASE
 */

export interface ApplicationForm {
  full_name: string;
  whatsapp: string;
  email: string;
  industry: string;
  revenue_range: string;
  headcount: number | '';
  pain_point: string;
  instagram_profile: string;
}

export type StepField = keyof ApplicationForm;

export type InputType = 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'url';

export interface StepConfig {
  id: number;
  field: StepField;
  question: string;
  subtext?: string;
  type: InputType;
  placeholder?: string;
  options?: readonly string[];
  validation?: (value: string | number) => string | null;
  ariaLabel?: string;
}

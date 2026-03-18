/**
 * Aplicação Principal NG.RITMO
 * 
 * Formulário multi-step para aplicação ao programa NG.RITMO
 * Refatorado com hooks customizados e componentes modulares
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { formatPhoneNumber } from './utils/formatters';
import { FORM_STEPS } from './constants';
import { useFormStep } from './hooks/useFormStep';
import { BorderBeamInput } from './components/ui/BorderBeamInput';
import { ProgressBar } from './components/ProgressBar';
import { FormHeader } from './components/FormHeader';
import { ErrorMessage } from './components/ErrorMessage';
import { PaymentScreen } from './components/PaymentScreen';
import { ApplicationForm } from './types';

// Imports diretos para performance e estabilidade
import { MeshBackground } from './components/ui/MeshBackground';
import { MoneyRain } from './components/ui/MoneyRain';

/**
 * Componente principal da aplicação
 */
export default function App() {
  const form = useFormStep(FORM_STEPS);
  const formRef = React.useRef(form);

  React.useEffect(() => {
    formRef.current = form;
  }, [form]);

  const step = FORM_STEPS[form.currentStepIndex];
  const progress = ((form.currentStepIndex + 1) / FORM_STEPS.length) * 100;

  const handleInputChange = (field: keyof ApplicationForm, value: string) => {
    const finalValue = field === 'whatsapp' ? formatPhoneNumber(value) : value;
    form.handleInputChange(field, finalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleNext();
    }
  };

  // Tela de sucesso
  if (form.isSuccess) {
    return (
      <main className="min-h-[100dvh] relative font-sans text-white bg-[#030303] flex flex-col items-center justify-center">
        <MeshBackground />
        <MoneyRain />
        <PaymentScreen />
      </main>
    );
  }

  // Formulário principal
  return (
    <main className="min-h-[100dvh] relative font-sans text-white bg-[#030303]">
      <MeshBackground />
      <MoneyRain />

      {/* Main Layout Layer */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center p-3 pt-6 pb-24 sm:p-6 md:p-10 overflow-y-auto w-full">
        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-2xl bg-[#080808]/70 backdrop-blur-[40px] border border-white/5 border-t-white/10 rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_40px_rgba(197,160,89,0.02)] relative overflow-hidden flex flex-col my-auto"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-ngGold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-ngGold-400/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Form Content Padding Container */}
          <div className="relative z-10 p-5 sm:p-12 flex flex-col flex-1">
            <FormHeader />

            <div className="mt-8 mb-8">
              <ProgressBar progress={progress} />
            </div>

            {/* Step Rendering Area with Fixed Minimum Height */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait" custom={form.direction}>
                <motion.div
                  key={step.id}
                  custom={form.direction}
                  initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  <div className="mb-6 sm:mb-8">
                    <span className="text-ngGold-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">
                      Passo {form.currentStepIndex + 1} de {FORM_STEPS.length}
                    </span>
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] tracking-tight">
                      {step.question}
                    </h2>
                    {step.subtext && (
                      <p className="mt-3 sm:mt-4 text-white/40 text-[13px] sm:text-base font-light leading-relaxed max-w-lg">
                        {step.subtext}
                      </p>
                    )}
                  </div>

                  {/* Input Rendering with v4 Colors */}
                  <div className="mb-10 w-full min-h-[140px]">
                    {step.type === 'select' ? (
                      <div className="grid grid-cols-1 gap-3 w-full">
                        {step.options?.map((opt, idx) => (
                          <motion.button
                            key={opt}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => {
                              handleInputChange(step.field, opt);
                              setTimeout(() => {
                                if (formRef.current.currentStepIndex < FORM_STEPS.length - 1) {
                                  formRef.current.handleNext();
                                }
                              }, 400);
                            }}
                            className={`
                              relative text-left px-5 py-4 rounded-2xl border transition-all duration-300 w-full flex items-center justify-between group overflow-hidden
                              ${form.formData[step.field] === opt
                                ? 'border-ngGold-500 bg-ngGold-500/10 text-white shadow-[0_0_20px_rgba(197,160,89,0.15)]'
                                : 'bg-white/[0.02] border-white/10 text-white/50 hover:border-white/30 hover:bg-white/[0.06] hover:text-white'}
                            `}
                          >
                            <span className="font-sans font-light tracking-wide relative z-10">{opt}</span>
                            <div className={`w-2 h-2 rounded-full transition-all duration-500 relative z-10 ${form.formData[step.field] === opt ? 'bg-ngGold-500 shadow-[0_0_12px_#C5A059]' : 'bg-white/10 opacity-0 group-hover:opacity-100'}`} />
                            {form.formData[step.field] === opt && (
                              <div className="absolute inset-0 bg-gradient-to-r from-ngGold-500/0 via-ngGold-500/10 to-ngGold-500/0 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div onKeyDown={handleKeyDown}>
                        <BorderBeamInput
                          as={step.type === 'textarea' ? 'textarea' : 'input'}
                          type={step.type}
                          placeholder={step.placeholder}
                          value={form.formData[step.field] as string}
                          onChange={(e) => handleInputChange(step.field, e.target.value)}
                          autoFocus
                          className="font-light tracking-wide font-sans bg-transparent"
                          ariaLabel={step.ariaLabel}
                          isValid={!form.validateCurrentStep(step) && Boolean(form.formData[step.field])}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Actions Layer */}
            <div className="mt-4 sm:mt-6 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <ErrorMessage message={form.error} />
              
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto ml-auto">
                {form.currentStepIndex > 0 && (
                  <button
                    onClick={form.handleBack}
                    disabled={form.isSubmitting}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-white/30 hover:text-white transition-all text-[10px] sm:text-xs font-bold uppercase tracking-widest"
                  >
                    Voltar
                  </button>
                )}
                <button
                  onClick={form.handleNext}
                  disabled={form.isSubmitting}
                  className="flex-1 sm:flex-none px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-ngGold-400 to-ngGold-600 text-black font-bold hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.4)] active:scale-[0.98] disabled:opacity-50 min-w-[140px] sm:min-w-[160px] relative overflow-hidden group border border-ngGold-400/50"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-2 text-sm sm:text-base">
                    {form.isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {form.currentStepIndex === FORM_STEPS.length - 1 ? 'Finalizar' : 'Avançar'}
                        <ArrowRight className="w-4 h-4 opacity-50" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 z-20 hidden lg:block select-none pointer-events-none opacity-30 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 rotate-90 origin-bottom-right translate-y-full">
          <span className="text-[10px] tracking-[0.8em] font-serif text-white/50 uppercase">Silicon Valley Pattern</span>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-ngGold-500/50 to-transparent" />
          <span className="text-[10px] tracking-[0.6em] font-serif text-ngGold-500">NG.RITMO</span>
        </div>
      </div>
    </main>
  );
}
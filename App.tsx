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
      <main className="min-h-[100dvh] relative font-sans text-white overflow-hidden bg-background flex flex-col items-center justify-center">
        <MeshBackground />
        <PaymentScreen />
      </main>
    );
  }

  // Formulário principal
  return (
    <main className="min-h-[100dvh] relative font-sans text-white overflow-hidden bg-background">
      <MeshBackground />

      {/* Main Layout Layer */}
      <div className="relative z-10 min-h-[100dvh] flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-surface/40 backdrop-blur-2xl border border-white/5 rounded-[32px] sm:rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-ng-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ng-gold-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
                    <span className="text-ng-gold-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">
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
                              relative text-left px-5 py-4 rounded-2xl border transition-all duration-300 w-full flex items-center justify-between group
                              ${form.formData[step.field] === opt
                                ? 'border-ng-gold-500/50 bg-ng-gold-500/5 text-white'
                                : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/10 hover:bg-white/[0.04]'}
                            `}
                          >
                            <span className="font-sans font-light tracking-wide">{opt}</span>
                            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${form.formData[step.field] === opt ? 'bg-ng-gold-500 shadow-[0_0_10px_#C5A059]' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`} />
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
                  className="flex-1 sm:flex-none px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-black font-bold hover:bg-ng-gold-500 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.05)] hover:shadow-ng-gold-500/20 active:scale-[0.98] disabled:opacity-50 min-w-[140px] sm:min-w-[160px]"
                >
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
      <div className="fixed bottom-10 right-10 z-20 hidden lg:block select-none pointer-events-none opacity-20 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4 rotate-90 origin-bottom-right translate-y-full">
          <span className="text-[10px] tracking-[0.6em] font-serif text-ng-gold-500">NG.RITMO</span>
          <div className="w-20 h-[1px] bg-ng-gold-500/20" />
          <span className="text-[9px] tracking-[0.2em] font-sans text-white/20 font-bold uppercase">Exclusive Protocol</span>
        </div>
      </div>
    </main>
  );
}
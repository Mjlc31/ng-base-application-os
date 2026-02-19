/**
 * Aplicação Principal NG.BASE
 * 
 * Formulário multi-step para aplicação ao programa NG.BASE
 * Refatorado com hooks customizados e componentes modulares
 */

import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import { formatPhoneNumber } from './utils/formatters';
import { FORM_STEPS, ANIMATION_CONFIG } from './constants';
import { useFormStep } from './hooks/useFormStep';
import { BorderBeamInput } from './components/ui/BorderBeamInput';
import { ProgressBar } from './components/ProgressBar';
import { FormHeader } from './components/FormHeader';
import { ErrorMessage } from './components/ErrorMessage';
import { SuccessScreen } from './components/SuccessScreen';
import { ApplicationForm } from './types';

// Imports diretos para evitar erro de chunk loading
import { MeshBackground } from './components/ui/MeshBackground';
import { MoneyRain } from './components/ui/MoneyRain';

// Lazy load removido temporariamente para estabilidade
// const MeshBackground = React.lazy(() => import('./components/ui/MeshBackground').then(module => ({ default: module.MeshBackground })));
// const MoneyRain = React.lazy(() => import('./components/ui/MoneyRain').then(module => ({ default: module.MoneyRain })));

/**
 * Componente principal da aplicação
 */
export default function App() {
  const form = useFormStep(FORM_STEPS);

  const step = FORM_STEPS[form.currentStepIndex];
  const progress = ((form.currentStepIndex + 1) / FORM_STEPS.length) * 100;

  // ... handlers ...

  // Tela de sucesso
  if (form.isSuccess) {
    return (
      <main className="min-h-[100dvh] relative font-sans text-white overflow-hidden bg-background">
        <MeshBackground />
        <MoneyRain />
        <SuccessScreen />
      </main>
    );
  }

  // Formulário principal
  return (
    <main className="min-h-[100dvh] relative font-sans text-white overflow-hidden bg-background flex flex-col">
      <MeshBackground />
      <MoneyRain />

      <FormHeader />
      <ProgressBar progress={progress} />

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl mx-auto px-6 z-10 pt-20 pb-10">
        <AnimatePresence mode="wait" custom={form.direction}>
          <motion.div
            key={step.id}
            custom={form.direction}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            transition={{ duration: ANIMATION_CONFIG.STEP_TRANSITION_DURATION, ease: "easeOut" }}
            className="w-full"
          >
            {/* Question Counter */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-ngGold-500 text-sm font-mono border border-ngGold-500/30 px-3 py-1.5 rounded-md bg-ngGold-500/5 backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0.1)]">
                {form.currentStepIndex + 1} / {FORM_STEPS.length}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-ngGold-500/20 to-transparent"></div>
            </div>

            {/* Question Text with Gradient */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold mb-6 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-br from-white via-white to-neutral-300 bg-clip-text text-transparent">
                {step.question}
              </span>
            </h2>
            {step.subtext && (
              <p className="text-neutral-400 text-xl md:text-2xl mb-12 font-sans font-light leading-relaxed max-w-2xl">
                {step.subtext}
              </p>
            )}

            {/* Input Field */}
            <div className="mb-10 w-full">
              {step.type === 'select' ? (
                <div
                  className="flex flex-col gap-3 max-h-[60vh] md:max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar pb-24"
                  role="radiogroup"
                  aria-label={step.ariaLabel || step.question}
                >
                  {step.options?.map((opt, idx) => (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleInputChange(step.field, opt);
                        setTimeout(() => {
                          if (form.currentStepIndex < FORM_STEPS.length - 1) {
                            form.handleNext();
                          }
                        }, 300);
                      }}
                      className={`
                        relative overflow-hidden text-left p-5 md:p-6 rounded-xl border text-lg md:text-xl 
                        transition-all duration-300 w-full group backdrop-blur-sm
                        ${form.formData[step.field] === opt
                          ? 'border-ngGold-500 bg-ngGold-500/10 text-white shadow-[0_0_30px_rgba(197,160,89,0.2)]'
                          : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:border-ngGold-500/50 hover:bg-white/[0.05]'}
                      `}
                      role="radio"
                      aria-checked={form.formData[step.field] === opt}
                      aria-label={opt}
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                      </div>

                      <div className="relative flex items-center justify-between">
                        <span className="font-light font-sans">{opt}</span>
                        <div className="flex items-center gap-2">
                          {form.formData[step.field] === opt && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-5 h-5 rounded-full bg-ngGold-500 flex items-center justify-center"
                            >
                              <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                          <ChevronRight className={`w-5 h-5 transition-all duration-300 ${form.formData[step.field] === opt ? 'opacity-100 text-ngGold-500' : 'opacity-0 group-hover:opacity-50'}`} />
                        </div>
                      </div>
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
                    className="font-light tracking-wide font-sans"
                    ariaLabel={step.ariaLabel}
                    isValid={!form.validateCurrentStep(step) && Boolean(form.formData[step.field])}
                  />
                  {step.type === 'textarea' && (
                    <div className="text-right text-xs text-neutral-600 mt-2 font-mono">
                      {(form.formData[step.field] as string).length} chars
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Error Message */}
            <ErrorMessage message={form.error} />

            {/* Navigation Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={form.handleNext}
                disabled={form.isSubmitting}
                className="relative overflow-hidden group bg-gradient-to-r from-white to-neutral-100 text-black hover:from-ngGold-400 hover:to-ngGold-500 transition-all duration-500 px-10 py-5 rounded-xl font-bold text-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_40px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-[0.98]"
                aria-label={form.currentStepIndex === FORM_STEPS.length - 1 ? 'Enviar aplicação' : 'Continuar para próximo passo'}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                <span className="relative z-10 flex items-center gap-2 font-sans">
                  {form.isSubmitting ? (
                    <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>{form.currentStepIndex === FORM_STEPS.length - 1 ? 'Enviar Aplicação' : 'Continuar'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>

              {!form.isSubmitting && (
                <span className="text-xs text-neutral-600 hidden md:flex items-center gap-1.5 font-mono uppercase tracking-wider">
                  Press <span className="bg-white/10 px-2 py-1 rounded text-neutral-400 border border-white/10">Enter ↵</span>
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer decorative */}
      <div className="fixed bottom-6 right-6 z-20 hidden md:block pointer-events-none">
        <div className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
          <div className="w-1.5 h-1.5 bg-ngGold-500 rounded-full shadow-[0_0_10px_#C5A059]"></div>
        </div>
      </div>
    </main >
  );
}
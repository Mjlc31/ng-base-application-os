import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface BorderBeamInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: 'input' | 'textarea';
  ariaLabel?: string;
  isValid?: boolean;
}

/**
 * Input com efeito de borda animada (border beam) premium
 * Otimizado com React.memo, will-change CSS e animação breathing
 */
export const BorderBeamInput: React.FC<BorderBeamInputProps> = React.memo((({
  as = 'input',
  className,
  ariaLabel,
  isValid,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const Component = as === 'input' ? 'input' : 'textarea';

  return (
    <div className="relative group w-full max-w-xl mx-auto">
      {/* The Glow/Beam Effect Container with breathing animation */}
      <motion.div
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? [1, 1.02, 1] : 1
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-ngGold-600 via-ngGold-400 to-ngGold-600 opacity-0 blur-md transition-all duration-500"
        style={{ willChange: 'opacity, transform' }}
      />

      {/* Moving gradient animation when focused */}
      {isFocused && (
        <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[500%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#D4AF37_100%)] animate-spin-slow opacity-70"
            style={{ willChange: 'transform' }}
          />
        </div>
      )}

      {/* The Input Itself */}
      <div className="relative bg-surface rounded-xl p-[1px] w-full">
        <Component
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={ariaLabel || props.placeholder}
          className={`
            w-full bg-[#080808] text-white text-xl md:text-2xl lg:text-3xl font-light placeholder-neutral-700 
            border border-white/10 rounded-xl focus:border-transparent focus:outline-none 
            px-5 py-5 md:py-7 transition-all duration-300
            ${as === 'textarea' ? 'min-h-[180px] resize-none' : ''}
            ${isFocused ? 'shadow-[0_0_30px_rgba(197,160,89,0.15)]' : ''}
            ${props.value && (props.value as string).length > 0 ? 'bg-white/[0.02]' : ''}
            ${className}
          `}
        />

        {/* Validation Checkmark - Only shows if explicitly valid */}
        {isValid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ngGold-500 pointer-events-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}) as any);

BorderBeamInput.displayName = 'BorderBeamInput';
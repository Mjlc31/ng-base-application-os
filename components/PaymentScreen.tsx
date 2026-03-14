import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Confetti } from './ui/Confetti';

/**
 * Tela de Pagamento NG.RITMO
 * Visual Premium Glassmorphism com integração de PIX e Cartão
 */
export const PaymentScreen: React.FC = React.memo(() => {
    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('credit');
    const [isProcessing, setIsProcessing] = useState(false);
    
    const paymentLink = "https://link.infinitepay.io/artur-galdino-de/VC1DLTAtUg-SMpaDlkKL-297,00";

    const handlePaymentClick = () => {
      setIsProcessing(true);
      setTimeout(() => {
        window.open(paymentLink, '_blank');
        setIsProcessing(false);
      }, 800);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 relative z-10 overflow-hidden">
            <Confetti />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl bg-surface/40 backdrop-blur-2xl border border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden p-8 sm:p-12"
            >
                {/* Accent Background Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-ng-gold-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ng-gold-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Brand Header Section */}
                <div className="flex flex-col items-center mb-10 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 mb-6">
                      <Sparkles className="w-3 h-3 text-ng-gold-500" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold font-sans">Acesso Exclusivo</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight mb-4 tracking-tight">
                      Boas-vindas ao <span className="text-ng-gold-500">NG.RITMO</span>
                    </h1>
                    
                    <p className="text-white/40 text-sm font-light max-w-sm font-sans">
                      Sua vaga está pré-garantida. Escolha o método de ativação abaixo para acessar o ambiente de elite.
                    </p>
                </div>

                {/* Method Switcher */}
                <div className="flex bg-black/40 p-1.5 rounded-[22px] mb-8 border border-white/5 relative z-10">
                    <button
                        onClick={() => setPaymentMethod('credit')}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${paymentMethod === 'credit'
                            ? 'bg-white text-black shadow-xl scale-[1.02]'
                            : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
                            }`}
                    >
                        <CreditCard className="w-4 h-4" />
                        Cartão
                    </button>
                    <button
                        onClick={() => setPaymentMethod('pix')}
                        disabled={isProcessing}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[18px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${paymentMethod === 'pix'
                            ? 'bg-white text-black shadow-xl scale-[1.02]'
                            : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'
                            }`}
                    >
                        <QrCode className="w-4 h-4" />
                        PIX
                    </button>
                </div>

                {/* Main Action Area */}
                <div className="min-h-[300px] flex flex-col justify-center relative z-10">
                    <AnimatePresence mode="wait">
                        {paymentMethod === 'credit' ? (
                            <motion.div
                                key="credit"
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-center mb-10">
                                  <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-sans block mb-3 font-bold">Taxa de Adesão</span>
                                  <div className="text-6xl font-serif font-bold text-white tracking-tighter flex items-start justify-center">
                                    <span className="text-2xl text-ng-gold-500 mt-2 mr-1">R$</span>
                                    <span>297</span>
                                  </div>
                                </div>

                                <button
                                    onClick={handlePaymentClick}
                                    disabled={isProcessing}
                                    className="w-full flex items-center justify-center gap-3 py-5 px-8 bg-white text-black rounded-2xl font-bold text-lg hover:bg-ng-gold-500 transition-all shadow-[0_15px_40px_rgba(255,255,255,0.05)] hover:shadow-ng-gold-500/30 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {isProcessing ? (
                                      <Loader2 className="w-6 h-6 animate-spin text-black" />
                                    ) : (
                                      <>
                                        Pagar com Cartão
                                        <ArrowRight className="w-5 h-5 opacity-40 group-hover:translate-x-1 transition-transform" />
                                      </>
                                    )}
                                </button>
                                
                                <div className="mt-8 flex items-center gap-2 text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    InfinitePay Secure Layer Active
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="pix"
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col items-center"
                            >
                                <div className="bg-white p-5 rounded-[40px] mb-8 shadow-[0_0_60px_rgba(197,160,89,0.1)] relative group">
                                    <img
                                        src="/pix-qrcode.png"
                                        alt="PIX QR Code"
                                        className="w-44 h-44 object-contain mix-blend-multiply"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://placeholder.com/200?text=PIX+QR+CODE";
                                        }}
                                    />
                                    <div className="absolute inset-0 border-2 border-ng-gold-500/10 rounded-[40px] pointer-events-none" />
                                </div>

                                <div className="text-center w-full mb-8 py-5 px-8 bg-white/[0.03] rounded-3xl border border-white/5">
                                    <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] block mb-2 font-bold font-sans">Total Investimento</span>
                                    <div className="text-4xl font-serif font-bold text-white tracking-tight">R$ 297,00</div>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold font-sans">
                                    <QrCode className="w-4 h-4 text-ng-gold-500" />
                                    Escaneie e aguarde ativação
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
});

PaymentScreen.displayName = 'PaymentScreen';

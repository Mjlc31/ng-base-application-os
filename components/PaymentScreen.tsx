import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Confetti } from './ui/Confetti';

export const PaymentScreen: React.FC = React.memo(() => {
    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('credit');

    const paymentLink = "https://link.infinitepay.io/artur-galdino-de/VC1DLTAtUg-SMpaDlkKL-297,00";

    return (
        <div
            className="flex flex-col items-center justify-center min-h-[100dvh] p-4 text-center z-10 relative overflow-hidden"
            role="main"
            aria-label="Pagamento da Aplicação"
        >
            <Confetti />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl w-full flex flex-col items-center mt-2 md:mt-0 mb-4 md:mb-10 px-1"
            >
                <div className="inline-flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full bg-ngGold-500/10 border border-ngGold-500/20 text-ngGold-400 text-xs md:text-sm font-medium mb-3 md:mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Aplicação Recebida com Sucesso</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold mb-2 md:mb-4 tracking-tight leading-[1.1]">
                    <span className="bg-gradient-to-br from-white via-white to-neutral-300 bg-clip-text text-transparent">
                        Seja bem-vindo ao
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-ngGold-400 via-ngGold-500 to-ngGold-600 bg-clip-text text-transparent">
                        NG.RITMO
                    </span>
                </h1>

                <p className="text-neutral-400 text-sm md:text-lg max-w-2xl leading-relaxed font-sans font-light mt-2 md:mt-4 px-2">
                    Sua vaga está pré-garantida. Escolha a forma de pagamento abaixo para concluir sua inscrição e acessar o ambiente de elite.
                </p>
            </motion.div>

            {/* Payment Options */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xl mx-auto backdrop-blur-xl bg-[#080808]/80 border border-white/10 rounded-[1.5rem] p-5 md:p-8 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ngGold-500/50 to-transparent"></div>

                {/* Toggle Payment Methods */}
                <div className="flex bg-black/40 p-1 rounded-xl mb-4 md:mb-8 border border-white/5">
                    <button
                        onClick={() => setPaymentMethod('credit')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 md:px-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${paymentMethod === 'credit'
                            ? 'bg-gradient-to-r from-ngGold-600 to-ngGold-500 text-black shadow-lg translate-y-0'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="truncate">Cartão</span>
                    </button>
                    <button
                        onClick={() => setPaymentMethod('pix')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 md:px-4 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${paymentMethod === 'pix'
                            ? 'bg-gradient-to-r from-ngGold-600 to-ngGold-500 text-black shadow-lg translate-y-0'
                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <QrCode className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="truncate">PIX</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[200px] md:min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {paymentMethod === 'credit' ? (
                            <motion.div
                                key="credit"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center flex-1 w-full"
                            >
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center mb-4 md:mb-6 shadow-inner">
                                    <CreditCard className="w-6 h-6 md:w-10 md:h-10 text-ngGold-500" />
                                </div>

                                <h3 className="text-lg md:text-2xl font-bold font-sans mb-1 md:mb-3">Pagamento via Cartão</h3>
                                <p className="text-neutral-400 font-light text-xs md:text-base mb-5 md:mb-8 max-w-[280px]">
                                    Parcele sua inscrição ou pague à vista com toda a segurança.
                                </p>

                                <a
                                    href={paymentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group w-full flex items-center justify-center gap-2 py-4 md:py-4 px-4 md:px-6 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-base md:text-lg transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
                                >
                                    Pagar Agora com Cartão
                                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                                <div className="mt-4 md:mt-6 flex items-center gap-1.5 text-xs md:text-sm text-neutral-500">
                                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-green-500/70" />
                                    <span>Ambiente Seguro InfinitePay</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="pix"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center flex-1 w-full"
                            >
                                <h3 className="text-lg md:text-2xl font-bold font-sans mb-1 md:mb-3 text-white">Pagamento via PIX</h3>
                                <p className="text-neutral-400 text-xs md:text-base font-light mb-3 md:mb-6 leading-tight">
                                    Escaneie o QR Code abaixo com o aplicativo do seu banco:
                                </p>

                                <div className="bg-white p-2 md:p-4 rounded-[1rem] md:rounded-[1.5rem] mb-3 md:mb-6 shadow-[0_0_40px_rgba(197,160,89,0.15)] relative group max-w-[160px] md:max-w-[240px] w-full mx-auto aspect-square flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-r from-ngGold-400 to-ngGold-600 rounded-[1rem] md:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl -z-10"></div>
                                    {/* The QR Code Image */}
                                    <img
                                        src="/pix-qrcode.png"
                                        alt="QR Code PIX para Pagamento"
                                        className="w-full h-full object-cover rounded-xl border border-neutral-100 mix-blend-multiply"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            // Fallback visual if image fails to load
                                            e.currentTarget.parentElement!.innerHTML = `
                        <div class="w-full h-full bg-neutral-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 p-2 md:p-4">
                           <p class="text-neutral-500 text-[10px] md:text-sm font-medium text-center leading-tight">QR Code não encontrado.</p>
                        </div>
                      `;
                                        }}
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2 md:gap-3">
                                    <div className="bg-black/30 w-full rounded-lg md:rounded-xl p-3 md:p-5 border border-white/5 flex flex-row items-center justify-between gap-1 sm:gap-4 text-left">
                                        <span className="text-xs md:text-base text-neutral-400 font-medium">Total:</span>
                                        <span className="text-lg md:text-3xl font-bold bg-gradient-to-r from-ngGold-400 to-ngGold-500 bg-clip-text text-transparent tracking-tight">
                                            R$ 297,00
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-8 flex items-center justify-center flex-wrap gap-1 md:gap-2 text-[10px] md:text-sm text-neutral-400">
                                    <span className="flex items-center gap-1 md:gap-1.5"><ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-ngGold-500" /> Abra o app</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span>Pagar com QR Code</span>
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

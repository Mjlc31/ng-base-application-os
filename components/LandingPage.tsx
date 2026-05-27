import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, XCircle, CheckCircle2, TrendingUp, Clock, FileText, ChevronDown } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [showPitch, setShowPitch] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Simulando o pitch delay (5 segundos para teste)
    const timer = setTimeout(() => {
      setShowPitch(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const faqs = [
    {
      question: "Qual é o faturamento mínimo para participar?",
      answer: "O NGRITMO é focado em empresas que já tracionaram e enfrentam gargalos operacionais. Não é para quem está do zero."
    },
    {
      question: "O evento será apenas motivacional?",
      answer: "Absolutamente não. Nosso foco é 100% técnico e prático: estruturação de processos, contratação, gestão de caixa e escala previsível."
    },
    {
      question: "A aplicação garante minha vaga?",
      answer: "Não. Todas as aplicações passam por um filtro criterioso dos nossos sócios. Apenas empresas que se encaixam no perfil são aprovadas."
    }
  ];

  const carouselImages = [
    'NG-141.jpg', 
    'NG-149.jpg', 
    'NG-355.jpg', 
    'NG-392.jpg', 
    'NG-607.jpg', 
    'NG-863 (1).jpg', 
    'NG-895 (1).jpg'
  ];

  return (
    <div className="relative z-10 min-h-[100dvh] flex flex-col items-center bg-[#000000] overflow-x-hidden overflow-y-auto w-full font-sans text-white selection:bg-ngGold-500 selection:text-black">
      {/* VSL SECTION (Always Visible) */}
      <section className="w-full flex flex-col items-center justify-start pt-12 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 min-h-[85vh]">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/10 mb-8 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <div className="w-1.5 h-1.5 rounded-full bg-ngGold-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70">Experiência Presencial Exclusiva</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-sans font-bold text-white leading-[1.3] tracking-wide mb-6 uppercase">
            SUA EMPRESA ATÉ VENDE… <span className="block text-ngGold-500 mt-2">MAS PARECE QUE NUNCA ENTRA NO RITMO CERTO?</span>
          </h1>
          
          <p className="text-white/80 text-lg sm:text-xl font-light leading-relaxed max-w-3xl mb-12">
            O ecossistema onde empresários revelam a engenharia exata para estruturar processos, blindar o lucro e fazer a operação girar sem depender do dono.
          </p>

          {/* VSL Player */}
          <div className="w-full aspect-video bg-[#111111] border border-white/5 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ll7rzQh22LM?rel=0&modestbranding=1&controls=1" 
              title="Apresentação NGRITMO" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          {/* PRIMARY CTA (Closer to VSL) */}
          <AnimatePresence>
            {showPitch && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full mt-8 sm:mt-10 flex flex-col items-center"
              >
                 <button
                  onClick={onStart}
                  className="w-full sm:w-auto min-w-[320px] px-8 sm:px-12 py-5 rounded-2xl bg-gradient-to-r from-ngGold-400 to-ngGold-600 text-black font-bold text-lg hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.4)] active:scale-[0.98] relative overflow-hidden group border border-ngGold-400/50 uppercase tracking-wide"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    INICIAR MINHA APLICAÇÃO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <p className="mt-4 text-white/40 text-xs tracking-widest uppercase font-sans">Acesso restrito via seleção técnica</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* PITCH DELAY SECTION (Below the Fold) */}
      <AnimatePresence>
        {showPitch && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex flex-col items-center bg-[#030303] pb-24 border-t border-white/5 mt-8 pt-8"
          >
            {/* QUALIFICATION SECTION */}
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Para quem NÃO é */}
              <div className="bg-red-950/10 border border-red-900/20 rounded-[32px] p-8 sm:p-10 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <XCircle className="w-8 h-8 text-red-500/80" />
                  <h3 className="text-2xl font-serif font-bold text-white">Para quem <span className="text-red-500/80">NÃO</span> é</h3>
                </div>
                <ul className="space-y-5 relative z-10 flex-1">
                  {[
                    "Quem busca atalhos fáceis para enriquecer sem trabalhar.",
                    "Pessoas que ainda não abriram o seu CNPJ ou não faturam.",
                    "Empresários que não aceitam feedbacks duros sobre a própria gestão.",
                    "Quem acha que apenas marketing resolve problemas operacionais."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2 flex-shrink-0" />
                      <span className="text-white/60 font-light leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Para quem É */}
              <div className="bg-ngGold-500/5 border border-ngGold-500/20 rounded-[32px] p-8 sm:p-10 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ngGold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-3 mb-8 relative z-10">
                  <CheckCircle2 className="w-8 h-8 text-ngGold-500" />
                  <h3 className="text-2xl font-serif font-bold text-white">Para quem <span className="text-ngGold-500">É</span> o ritmo</h3>
                </div>
                <ul className="space-y-5 relative z-10 flex-1">
                  {[
                    "Donos de Clínicas que precisam padronizar atendimento e não depender apenas de si.",
                    "Construtoras e Incorporadoras lidando com gargalos logísticos e de equipe.",
                    "Varejo físico ou digital que atingiu um teto de vendas por desorganização interna.",
                    "Empresas de Serviços B2B que precisam escalar a entrega sem perder margem."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-ngGold-500 mt-2 flex-shrink-0" />
                      <span className="text-white/70 font-light leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* EVENT CAROUSEL SECTION */}
            <div className="w-full relative py-16 overflow-hidden bg-black/50 border-y border-white/5 my-8">
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
              
              <div className="text-center mb-10 relative z-20">
                <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-ngGold-500 mb-2">A Experiência</h3>
                <h2 className="text-3xl font-serif font-bold text-white">Um ambiente de alta performance</h2>
              </div>

              <div className="flex overflow-hidden">
                <style>{`
                  @keyframes scroll-marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                  }
                  .animate-scroll-marquee {
                    animation: scroll-marquee 40s linear infinite;
                    will-change: transform;
                  }
                  .animate-scroll-marquee:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="flex gap-4 sm:gap-6 px-4 animate-scroll-marquee w-max">
                  {/* Duplicando o array para criar o scroll infinito perfeito */}
                  {[...carouselImages, ...carouselImages].map((imgName, idx) => (
                    <div 
                      key={idx} 
                      className="w-[280px] h-[380px] sm:w-[350px] sm:h-[450px] flex-shrink-0 rounded-2xl overflow-hidden relative group bg-white/[0.02] border border-white/5"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                      
                      <img 
                        src={`/${imgName}`} 
                        alt={`Evento NGRITMO`} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105 relative z-0" 
                      />
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SOCIAL PROOF */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
               <div className="text-center mb-12">
                  <h3 className="text-sm uppercase tracking-[0.3em] font-bold text-ngGold-500 mb-2">Ecossistema Comprovado</h3>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Resultados de quem já aplica</h2>
               </div>
               
               {/* Logos Placeholder (using text for now, can be replaced with images later) */}
               <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-40 grayscale mb-16 max-w-4xl mx-auto">
                  <div className="text-lg sm:text-xl font-serif tracking-widest uppercase font-bold italic">Sergio's</div>
                  <div className="text-lg sm:text-xl font-sans tracking-tight uppercase font-black">Quark Energia</div>
                  <div className="text-lg sm:text-xl font-serif tracking-widest uppercase font-bold">EngenharQ</div>
                  <div className="text-lg sm:text-xl font-sans tracking-wide uppercase font-black text-center">Bósforo<br/>Investimentos</div>
                  <div className="text-lg sm:text-xl font-serif tracking-[0.2em] uppercase font-medium text-center">Pemagri<br/>Agrícola</div>
                  <div className="text-lg sm:text-xl font-sans tracking-widest uppercase font-semibold text-center">Agência<br/>Line</div>
                  <div className="text-lg sm:text-xl font-sans tracking-tighter uppercase font-bold italic text-center">Suzuki Wind<br/>Motos</div>
                  <div className="text-3xl sm:text-5xl font-sans font-light text-white">+</div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { icon: TrendingUp, title: "Lucro Protegido", text: "Mais de 30% de margem líquida recuperada após estruturar o processo de compras e precificação." },
                   { icon: Clock, title: "Horas Salvas", text: "O dono parou de apagar incêndios 14h por dia e passou a focar apenas na estratégia." },
                   { icon: FileText, title: "Processos Claros", text: "Onboarding da equipe reduzido de meses para dias com a documentação do playbook operacional." }
                 ].map((item, idx) => (
                   <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">
                     <item.icon className="w-6 h-6 text-ngGold-500 mb-4" />
                     <h4 className="text-white font-bold mb-2">{item.title}</h4>
                     <p className="text-white/50 text-sm font-light leading-relaxed">{item.text}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* FAQ */}
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-white mb-4">Perguntas Frequentes</h2>
                <p className="text-white/50">Tudo que você precisa saber antes de aplicar.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left"
                    >
                      <span className="font-bold text-white pr-4 text-left">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-ngGold-500 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-5 pt-0 text-white/50 font-light leading-relaxed text-sm">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA (Repeated) */}
            <div className="w-full flex justify-center pb-12 pt-8 px-4">
               <button
                onClick={onStart}
                className="w-full sm:w-auto min-w-[320px] px-8 sm:px-12 py-5 rounded-2xl bg-gradient-to-r from-ngGold-400 to-ngGold-600 text-black font-bold text-lg hover:brightness-110 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.4)] active:scale-[0.98] relative overflow-hidden group border border-ngGold-400/50 uppercase tracking-wide"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  INICIAR MINHA APLICAÇÃO
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* LEGAL FOOTER */}
            <footer className="w-full border-t border-white/5 py-8 mt-4 bg-black">
              <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center gap-4">
                <div className="flex flex-wrap justify-center gap-6 text-sm font-light text-white/40">
                  <a href="#" className="hover:text-ngGold-500 transition-colors">Termos de Uso</a>
                  <a href="#" className="hover:text-ngGold-500 transition-colors">Política de Privacidade</a>
                </div>
                <p className="text-xs text-white/20">
                  NGHUB OS © {new Date().getFullYear()} - Todos os direitos reservados.
                </p>
                <p className="text-[10px] text-white/10 max-w-2xl mt-4 leading-relaxed">
                  Este site não faz parte do site do Facebook ou do Facebook Inc. Além disso, este site não é endossado pelo Facebook de nenhuma maneira. FACEBOOK é uma marca comercial independente da FACEBOOK, Inc.
                </p>
              </div>
            </footer>

            {/* WHATSAPP FLOATING BUTTON */}
            <a
              href="https://wa.me/5582974009877"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300"
              aria-label="Fale conosco no WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
            </a>

          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;

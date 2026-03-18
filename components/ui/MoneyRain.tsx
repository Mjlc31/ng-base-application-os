import React, { useEffect, useRef } from 'react';

/**
 * Componente de animação de "chuva de dinheiro"
 * Otimizado com requestAnimationFrame e throttling
 */
export const MoneyRain: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(undefined as any);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Espaçamento e quantidades ajustados para performance
    const isMobile = width < 768;
    const dropCount = isMobile ? 35 : 80;

    const symbolsArray = ["€", "R$", "$", "₿"];

    // Array para propriedades das gotas de chuva dourada
    const drops = Array.from({ length: dropCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      speed: Math.random() * 1.0 + 0.3, // velocidade muito suave e elegante
      symbol: symbolsArray[Math.floor(Math.random() * symbolsArray.length)],
      color: Math.random() > 0.5 ? '#C5A059' : '#EAC54F', // tons de dourado
      opacity: Math.random() * 0.3 + 0.05,
      scale: Math.random() * 0.4 + 0.6
    }));

    // Target FPS (30 FPS em mobile para leveza e poupar bateria, 60 no desktop)
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

      // Trail effect ultra suave
      ctx.fillStyle = 'rgba(3, 3, 3, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Fonte elegante e luxuosa
      ctx.font = `${isMobile ? 18 : 24}px "Bodoni Moda", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Desenhar chuva dourada simbólica
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];

        ctx.fillStyle = `rgba(${drop.color === '#C5A059' ? '197,160,89' : '234,197,79'}, ${drop.opacity})`;
        
        ctx.save();
        ctx.translate(drop.x, drop.y);
        ctx.scale(drop.scale, drop.scale);
        ctx.fillText(drop.symbol, 0, 0);
        ctx.restore();

        // Animar para baixo
        drop.y += drop.speed;

        // Resetar gota no topo
        if (drop.y > height + 30) {
          drop.y = -30;
          drop.x = Math.random() * width;
          drop.symbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Inicia animação
    animationFrameRef.current = requestAnimationFrame(draw);

    // Throttle resize events
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
      aria-hidden="true"
    />
  );
});

MoneyRain.displayName = 'MoneyRain';
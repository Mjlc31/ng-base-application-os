import React, { useEffect, useRef } from 'react';

/**
 * Componente de animação de "chuva de dinheiro"
 * Otimizado com requestAnimationFrame e throttling
 */
export const MoneyRain: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
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

    const isMobile = width < 768;

    // Mais espaço entre as colunas para um visual mais limpo/arejado
    // No mobile aumentamos significativamente o espaçamento e fonte para reduzir a contagem de elementos
    const fontSize = isMobile ? 24 : 16;
    const gapMultiplier = isMobile ? 4 : 1.5;
    const columns = Math.floor(width / (fontSize * gapMultiplier));

    // Minimalist symbols
    const symbols = "$R$";

    // Array to track y position of drops
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random heights above
    }

    // Target FPS (12 FPS em mobile para poupar bateria e diminuir travamentos)
    const targetFPS = isMobile ? 12 : 20;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      // Throttle para manter FPS consistente
      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

      // Trail effect: fill screen with very low opacity black for longer trails/smoother fade
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Use the serif font for a "luxury magazine" feel
      ctx.font = `${fontSize}px "Bodoni Moda", serif`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly choose color between Gold variants and subtle white
        const rand = Math.random();
        // 60% Gold (various shades), 40% White/Silver
        if (rand > 0.4) {
          ctx.fillStyle = rand > 0.7 ? '#C5A059' : '#EAC54F';
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        }

        const text = symbols.charAt(Math.floor(Math.random() * symbols.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Only draw if within screen (optimization)
        if (y < height + fontSize) {
          // Removido globalAlpha randômico super pesado. O shimmer agora é puramente estático mas elegante
          ctx.fillText(text, x, y);
        }

        // Reset drop to top randomly or move down
        // Slower movement: increment less
        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slower speed (was 1)
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
      className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen"
      aria-hidden="true"
    />
  );
});

MoneyRain.displayName = 'MoneyRain';
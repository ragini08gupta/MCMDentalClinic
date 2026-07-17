import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const TOTAL_FRAMES = 240;
const MOBILE_BREAKPOINT = 860;

function preloadFrames() {
  const images = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++ ) {
    const img = new Image();
    const num = String(i).padStart(3, '0');
    img.src = `/frames/ezgif-frame-${num}.png`;
    images.push(img);
  }
  return images;
}

export default function HeroSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [showButton, setShowButton] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // On mobile we skip the whole scroll-driven frame animation — no point
  // downloading 240 landscape frames just to crop them into a portrait screen.
  useEffect(() => {
    if (isMobile) return;
    imagesRef.current = preloadFrames();
    const firstImg = imagesRef.current[0];
    firstImg.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const unsubscribe = frameIndex.on('change', (latest) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const index = Math.min(Math.max(Math.round(latest), 0), TOTAL_FRAMES - 1);
      const img = imagesRef.current[index];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      setShowButton(index >= TOTAL_FRAMES - 1);
    });
    return unsubscribe;
  }, [frameIndex, isMobile]);

  const bookButton = (
    <Link to="/book" style={{
      padding: 'clamp(0.9rem, 3vw, 1.2rem) clamp(1.75rem, 8vw, 3.6rem)',
      background: 'transparent',
      color: '#fff',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: 'clamp(0.9rem, 3vw, 1rem)',
      letterSpacing: '0.05em',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center',
    }}>
      Book Appointment
    </Link>
  );

  // ── MOBILE: skip the hero entirely — the page starts at the next section ──
  if (isMobile) {
    return null;
  }

  // ── DESKTOP: original scroll-driven frame animation, unchanged ──
  return (
    // ← paddingTop pushes scroll start below navbar
    <div ref={containerRef} style={{
  height: '500vh',
  position: 'relative',
}}>

      {/* sticky viewport-filling canvas */}
      <div style={{
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflow: 'hidden',
  background: '#000',
}}>

        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {showButton && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            paddingBottom: '6%',
            paddingLeft: 'clamp(1.25rem, 6.5%, 6.5%)',
            zIndex: 10,
          }}>
            {bookButton}
          </div>
        )}

      </div>
    </div>
  );
}

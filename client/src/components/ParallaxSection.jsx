import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxSection({ children, bgColor = '#fff', speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', background: bgColor }}>
      <motion.div
        style={{
          y: backgroundY,
          position: 'absolute',
          inset: '-20%',
          background: bgColor,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
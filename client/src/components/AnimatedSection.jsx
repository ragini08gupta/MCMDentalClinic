import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollAnimation';

// Wraps any section — rises up when it scrolls into view
export default function AnimatedSection({ children, delay = 0, className = '' }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 80, rotateX: 8 }}
      animate={isInView
        ? { opacity: 1, y: 0, rotateX: 0 }
        : { opacity: 0, y: 80, rotateX: 8 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]  // custom easing curve
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
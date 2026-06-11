import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollAnimation';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateY: -15,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function StaggerCards({ children }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        perspective: '1000px',
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCard({ children, style }) {
  return (
    <motion.div variants={cardVariants} style={{ transformStyle: 'preserve-3d', ...style }}>
      {children}
    </motion.div>
  );
}
import React from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'motion/react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.975,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const getDirectionalVariants = (
  direction: RevealDirection = 'up',
  distance = 36,
  delay = 0,
  reduced = false
): Variants => {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2, delay: 0 } },
    };
  }

  const hiddenState: Record<string, number | string> = {
    opacity: 0,
  };

  if (direction === 'up') hiddenState.y = distance;
  if (direction === 'down') hiddenState.y = -distance;
  if (direction === 'left') hiddenState.x = distance;
  if (direction === 'right') hiddenState.x = -distance;
  if (direction === 'scale') {
    hiddenState.scale = 0.93;
    hiddenState.y = 18;
  } else {
    hiddenState.scale = 0.985;
  }

  return {
    hidden: hiddenState,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
};

export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * Scroll-triggered section/item reveal that animates into view as the user scrolls down the page.
 */
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  once?: boolean;
}> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  once = true,
}) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={getDirectionalVariants(direction, 34, delay, !!prefersReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.14, margin: '0px 0px -45px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Dedicated ScrollReveal wrapper for individual cards, graphics, or columns inside sections.
 */
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  distance?: number;
  once?: boolean;
}> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  distance = 36,
  once = true,
}) => {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      variants={getDirectionalVariants(direction, distance, delay, !!prefersReduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.14, margin: '0px 0px -36px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


/**
 * Top viewport scroll progress bar that responds dynamically as the user scrolls down any page.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2D3A1E] via-[#8C9E5E] to-[#F5B841] origin-left z-50 pointer-events-none blur-xs opacity-70"
      />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2D3A1E] via-[#8C9E5E] to-[#F5B841] origin-left z-50 pointer-events-none"
      />
    </>
  );
};

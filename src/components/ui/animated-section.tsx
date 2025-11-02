"use client";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

export type AnimationType =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "stagger";

export interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  className?: string;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  as?: keyof typeof motion;
}

const animationVariants: Record<AnimationType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function AnimatedSection({
  children,
  animation = "slideUp",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.1,
  className = "",
  viewport = { once: true, amount: 0.3 },
  as = "div",
}: AnimatedSectionProps) {
  const Component = motion[as] as any;

  const variants = { ...animationVariants[animation] };

  // Apply custom delay and duration
  if (variants.visible && typeof variants.visible === "object") {
    variants.visible = {
      ...variants.visible,
      transition: {
        ...(variants.visible.transition || {}),
        delay,
        duration: animation === "stagger" ? undefined : duration,
        staggerChildren: animation === "stagger" ? staggerDelay : undefined,
      },
    };
  }

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  );
}

// Export item variants for use with stagger animations
export { itemVariants };

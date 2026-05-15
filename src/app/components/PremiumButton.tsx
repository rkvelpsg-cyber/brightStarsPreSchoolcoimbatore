import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PremiumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
}

export default function PremiumButton({
  children,
  variant = 'primary',
  onClick,
  className = ''
}: PremiumButtonProps) {
  const baseClasses = `
    relative overflow-hidden
    px-8 py-4 md:px-10 md:py-5
    rounded-full text-base md:text-lg font-bold
    transition-all duration-300
    transform hover:scale-105 hover:shadow-2xl
    ${className}
  `;

  const variantClasses = variant === 'primary'
    ? 'bg-gradient-to-r from-[#F47C20] to-[#A32035] text-white hover:from-[#A32035] hover:to-[#F47C20]'
    : 'bg-white/20 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white hover:text-[#F47C20]';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Shine effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const ClassicalCard: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`relative bg-[#fdfbf7] border-2 border-[#8b5a2b] p-6 shadow-[4px_4px_0px_0px_rgba(139,90,43,0.2)] ${className}`}>
      {/* Decorative Corners */}
      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-[#8b5a2b]" />
      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-[#8b5a2b]" />
      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-[#8b5a2b]" />
      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-[#8b5a2b]" />
      
      {title && (
        <h3 className="text-xl font-heading text-[#4a0404] mb-4 border-b border-[#d4af37] pb-2 inline-block pr-8">
          {title}
        </h3>
      )}
      <div className="text-[#2c1810]">
        {children}
      </div>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const ClassicalButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyles = "font-heading uppercase tracking-widest py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold";
  
  const variants = {
    primary: "bg-[#8b5a2b] text-[#fdfbf7] border-2 border-[#8b5a2b] hover:bg-[#654321] hover:border-[#654321] shadow-md",
    secondary: "bg-[#d4af37] text-[#4a0404] border-2 border-[#d4af37] hover:bg-[#b59326] hover:border-[#b59326]",
    outline: "bg-transparent text-[#4a0404] border-2 border-[#4a0404] hover:bg-[#4a0404] hover:text-[#fdfbf7]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} 
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export const SectionHeading: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-8">
    <h2 className="text-4xl md:text-5xl font-heading text-[#4a0404] mb-2">{title}</h2>
    {subtitle && (
      <div className="flex items-center justify-center gap-4 text-[#8b5a2b] italic">
        <span className="h-[1px] w-12 bg-[#d4af37]"></span>
        {subtitle}
        <span className="h-[1px] w-12 bg-[#d4af37]"></span>
      </div>
    )}
  </div>
);
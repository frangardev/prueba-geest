import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-[15px] py-[6px] rounded-[6px] font-["Gotham",_system-ui,_sans-serif] font-bold text-[14px] leading-snug transition-all duration-200 cursor-pointer select-none outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variantStyles = {
    primary:
      'bg-[#2462ec] text-white border border-[#2462ec] hover:bg-[#1d52ca] hover:border-[#1d52ca] active:bg-[#1744aa] focus-visible:ring-2 focus-visible:ring-[#2462ec] focus-visible:ring-offset-2 shadow-sm',
    secondary:
      'bg-white text-[#2462ec] border border-[#2462ec] hover:bg-[#2462ec]/10 active:bg-[#2462ec]/20 focus-visible:ring-2 focus-visible:ring-[#2462ec] focus-visible:ring-offset-2',
    ghost:
      'bg-white text-[#48505e] border border-[#0067b0] hover:bg-[#f6f5f5] hover:text-[#1a2035] active:bg-[#e5e7eb] focus-visible:ring-2 focus-visible:ring-[#0067b0] focus-visible:ring-offset-2',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};

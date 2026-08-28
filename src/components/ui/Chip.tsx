import React from 'react';

export interface ChipProps {
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  active = false,
  icon,
  children,
  onClose,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full font-["Segoe_UI",_system-ui,_sans-serif] text-[13px] leading-snug transition-all duration-200 select-none';

  const stateStyles = active
    ? 'bg-[#cbeefd] text-[#2462ec] font-semibold border border-[#2462ec]/30 shadow-xs'
    : 'bg-white text-gray-600 font-normal border border-gray-200 hover:bg-gray-100 hover:text-gray-900';

  const interactiveStyles = onClick && !disabled ? 'cursor-pointer active:scale-95' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <span
      onClick={!disabled && onClick ? onClick : undefined}
      className={`${baseStyles} ${stateStyles} ${interactiveStyles} ${disabledStyles} ${className}`.trim()}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {active && onClose && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-black/10 text-current transition-colors cursor-pointer outline-none ml-0.5"
          aria-label="Remove chip"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};

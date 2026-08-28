import React from 'react';

export interface ChipProps {
  active?: boolean;
  children: React.ReactNode;
  onClose?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  active = false,
  children,
  onClose,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center gap-1.5 py-[5px] px-[10px] rounded-[14px] font-["Segoe_UI",_system-ui,_sans-serif] text-[14px] leading-snug transition-all duration-200 select-none';

  const stateStyles = active
    ? 'bg-[#cbeefd] text-[#828d9e] font-normal hover:bg-[#b5e4fc]'
    : 'bg-[#f6f5f5] text-[#828d9e] font-normal hover:bg-[#e8e7e7]';

  const interactiveStyles = onClick && !disabled ? 'cursor-pointer active:scale-95' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <span
      onClick={!disabled && onClick ? onClick : undefined}
      className={`${baseStyles} ${stateStyles} ${interactiveStyles} ${disabledStyles} ${className}`.trim()}
    >
      <span>{children}</span>
      {active && onClose && (
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          className="inline-flex items-center justify-center p-0.5 rounded-full hover:bg-black/10 text-[#828d9e] transition-colors cursor-pointer outline-none"
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

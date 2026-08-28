import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  completed?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, completed = false, className = '', id, disabled, value, placeholder = 'Escriba aquí...', ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const isFilled = completed || (value !== undefined && value !== '');

    // Border and background calculation based on states (error, completed, default)
    let borderBgStyles = 'bg-white border-[#f6f5f5] text-[#48505e]';
    if (error) {
      borderBgStyles = 'bg-white border-[#df3f46] text-[#48505e]';
    } else if (isFilled) {
      borderBgStyles = 'bg-[#f6f5f5] border-[#828d9e]/40 text-[#48505e]';
    }

    return (
      <div className="w-full flex flex-col gap-1.5 text-left font-['Segoe_UI',_sans-serif]">
        {label && (
          <label
            htmlFor={inputId}
            className={`flex items-center gap-2 font-['Gotham',_system-ui,_sans-serif] font-bold text-[14px] leading-tight transition-colors ${
              error ? 'text-[#48505e]' : isFilled ? 'text-[#828d9e]' : 'text-[#48505e]'
            }`}
          >
            {error && <span className="text-[#df3f46]">*</span>}
            {icon && <span className="inline-flex shrink-0 text-[#48505e]">{icon}</span>}
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            id={inputId}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full py-[10px] px-[15px] rounded-[10px] border text-[14px] leading-normal transition-all duration-200 outline-none placeholder:text-[#828d9e] placeholder:font-normal focus:bg-white focus:border-[#2462ec] focus:ring-2 focus:ring-[#2462ec]/20 disabled:bg-[#f6f5f5] disabled:opacity-60 disabled:cursor-not-allowed ${borderBgStyles} ${className}`.trim()}
            {...props}
          />
        </div>

        {error && (
          <p className="text-[14px] text-[#df3f46] mt-0.5 font-['Segoe_UI',_sans-serif] leading-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

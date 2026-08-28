import React, { useState, useRef, useEffect } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Seleccione alguno',
  error,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const isSelected = !!selectedOption;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false);
  };

  // Base styling according to Figma specifications
  let buttonStyle = 'bg-white border-[#f6f5f5] text-[#828d9e]';
  if (error) {
    buttonStyle = 'bg-white border-[#df3f46] text-[#48505e]';
  } else if (isSelected) {
    buttonStyle = 'bg-[#f6f5f5] border-[#828d9e]/40 text-[#48505e]';
  }

  return (
    <div className="w-full flex flex-col gap-1.5 text-left font-['Segoe_UI',_sans-serif]" ref={dropdownRef}>
      {label && (
        <label className="font-['Gotham',_system-ui,_sans-serif] font-bold text-[14px] leading-tight text-[#48505e]">
          {error && <span className="text-[#df3f46] mr-1">*</span>}
          {label}
        </label>
      )}

      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full py-[10px] pl-[15px] pr-[12px] rounded-[10px] border text-[14px] leading-normal flex items-center justify-between transition-all duration-200 cursor-pointer outline-none focus:border-[#2462ec] focus:ring-2 focus:ring-[#2462ec]/20 disabled:bg-[#f6f5f5] disabled:opacity-60 disabled:cursor-not-allowed ${buttonStyle} ${className}`.trim()}
        >
          <span className={`truncate ${isSelected ? 'text-[#48505e] font-normal' : 'text-[#828d9e]'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-4 h-4 text-[#828d9e] shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 top-[calc(100%+6px)] left-0 w-full bg-[#f6f5f5] rounded-[12px] shadow-lg border border-[#828d9e]/20 overflow-hidden py-1">
            {options.map((option, index) => {
              const isOptionSelected = option.value === value;
              return (
                <div key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left px-4 py-2.5 text-[14px] text-[#1a2035] font-['Segoe_UI',_sans-serif] hover:bg-white hover:text-[#2462ec] transition-colors cursor-pointer flex items-center justify-between ${
                      isOptionSelected ? 'bg-white/80 font-semibold text-[#2462ec]' : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {isOptionSelected && (
                      <svg className="w-4 h-4 text-[#2462ec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  {index < options.length - 1 && <div className="h-[1px] bg-[#828d9e]/30 mx-3" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p className="text-[14px] text-[#df3f46] mt-0.5 font-['Segoe_UI',_sans-serif] leading-tight">
          {error}
        </p>
      )}
    </div>
  );
};

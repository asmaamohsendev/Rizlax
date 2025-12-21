import React, { forwardRef, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'filled';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'p-4 rounded-3xl transition-all duration-200 outline-none';
    
    const variantStyles = {
      default: 'border border-[#DADADA] focus:border-gray-500 focus:ring-2 focus:ring-gray-200',
      outlined: 'border-2 border-[#DADADA] focus:border-[#DADADA]',
      filled: 'bg-gray-100 border-b-2 border-gray-300 focus:border-blue-500 rounded-t-lg rounded-b-none',
    };

    const stateStyles = error
      ? 'border-destructive focus:border-destructive focus:ring-destructive'
      : disabled
      ? 'bg-[#DADADA] cursor-not-allowed opacity-60'
      : '';

    const widthStyles = fullWidth ? 'w-full' : '';
    const paddingStyles = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${baseStyles} ${variantStyles[variant]} ${stateStyles} ${widthStyles} ${paddingStyles} ${className}`}
            disabled={disabled}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <span className={`text-xs ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
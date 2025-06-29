
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false, 
    iconLeft, 
    iconRight, 
    disabled, 
    ...props 
  }, ref) => {
    const variantClasses = {
      primary: 'bg-crypto-blue text-white hover:bg-crypto-light-blue button-shine',
      secondary: 'bg-secondary text-crypto-dark hover:bg-secondary/80 button-shine',
      outline: 'bg-transparent border border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10',
      ghost: 'bg-transparent text-crypto-blue hover:bg-crypto-blue/10',
      link: 'bg-transparent text-crypto-blue hover:underline p-0 h-auto'
    };

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 rounded-md',
      md: 'text-sm px-4 py-2 rounded-lg',
      lg: 'text-base px-6 py-3 rounded-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'relative font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-crypto-blue/50 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && iconLeft}
          {children}
          {!isLoading && iconRight}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

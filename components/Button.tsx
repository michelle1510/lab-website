'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
// Define variants and sizes
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-secondary',
  secondary: 'border border-secondary text-primary hover:bg-accent',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-6 text-lg',
};

export interface ButtonProps extends ComponentProps<typeof Link> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      ...props
    },
    ref
  ) => {
    return (
      <Link
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${VARIANTS[variant]} ${SIZES[size]} ${className ?? ''}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

Button.displayName = 'Button';

export default Button;

import { ButtonHTMLAttributes } from 'react';

type variantT = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: variantT;
}

const variantsClasses: Record<variantT, string> = {
  primary: 'bg-green-200',
  secondary: 'bg-orange-200',
  danger:
    'bg-red-500 text-white hover:bg-red-600 focus:border focus:border-red-950',
};

export const Button = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md text-center py-2 px-4 ${variantsClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

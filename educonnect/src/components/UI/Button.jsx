// src/components/UI/Button.jsx
import React from 'react';
import Icon from '../common/Icon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  className = '',
  disabled = false,
  iconStyle,
}) => {
  const baseStyles = 'font-bold transition-all rounded-2xl flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20',
    secondary: 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-primary border border-primary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-5 py-2.5',
    xl: 'px-6 py-3.5 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {icon && iconPosition === 'left' && <Icon className={iconStyle}  name={icon} />}
      {children}
      {icon && iconPosition === 'right' && <Icon className={iconStyle} name={icon} />}
    </button>
  );
};

export default Button;
import React from 'react';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, className = '' }) => {
  const formattedName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

    const LucideIcon = LucideIcons[formattedName] || LucideIcons[name]
     if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in Lucide icons`);
        return null;
      }
  return (
    // <span className={`material-symbols-outlined ${className}`} style={{fontVariationSettings:" 'FILL' 1"}}>
    //   {name}
    // </span>
    <LucideIcon className={` ${className}`} />
  ) 
}

export default Icon;


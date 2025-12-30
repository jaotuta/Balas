
import React from 'react';

interface MagicBeanProps {
  color: string;
  borderColor: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const MagicBean: React.FC<MagicBeanProps> = ({ color, borderColor, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-4',
    md: 'w-10 h-6',
    lg: 'w-16 h-10'
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full relative shadow-lg ${className}`}
      style={{ 
        backgroundColor: color,
        border: `2px solid ${borderColor}`,
        boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.3)`
      }}
    >
      <div className="absolute top-1 left-2 w-1/2 h-1/4 bg-white opacity-30 rounded-full blur-[1px]"></div>
    </div>
  );
};

export default MagicBean;

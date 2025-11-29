import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'full' }) => {
  return (
    <div className={`flex items-center ${className}`}>
        {/* Logo Icon replicating the provided image: Orange square with T-shirt */}
        <svg viewBox="0 0 100 100" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#FF5500"/>
            <path d="M25 35 L35 25 Q50 35 65 25 L75 35 L65 45 V75 H35 V45 Z" stroke="white" strokeWidth="6" strokeLinejoin="round" fill="none" />
            <path d="M25 35 L35 25 Q50 35 65 25 L75 35 L65 45 L25 35" fill="none" stroke="white" strokeWidth="6" strokeLinejoin="round"/>
        </svg>
        
        {variant === 'full' && (
             <span className="ml-2 text-chall-orange font-bold text-3xl tracking-tight" style={{ fontFamily: 'sans-serif' }}>
                Chall
            </span>
        )}
    </div>
  );
};

export default Logo;
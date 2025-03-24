// src/components/UI/RegistrationButton.tsx
import React, { useState, useEffect } from 'react';
import config, { isRegistrationOpen } from '../../config';

interface RegistrationButtonProps {
  className?: string;
  label?: string;
  children?: React.ReactNode;
  variant?: 'link' | 'button';
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({ 
  className, 
  label = "Înscrie-te acum",
  children,
  variant = 'link'
}) => {
  // Use state to track registration status with periodic updates
  const [isOpen, setIsOpen] = useState(isRegistrationOpen());
  
  // Update status periodically (every 10 seconds)
  useEffect(() => {
    // Check immediately on mount
    setIsOpen(isRegistrationOpen());
    
    // Set up interval for periodic checking
    const checkInterval = setInterval(() => {
      setIsOpen(isRegistrationOpen());
    }, 10000);
    
    // Clean up on unmount
    return () => clearInterval(checkInterval);
  }, []);
  
  // Conținut bazat pe children sau label
  const content = children || label;
  
  if (!isOpen) {
    // Registration is not open - show locked button
    // (combines both 'before' and 'after' phases for simplicity)
    const isBeforeRegistration = new Date() < config.registrationPeriod.startDate;
    const buttonTitle = isBeforeRegistration 
      ? "Înscrierea nu a început încă" 
      : "Înscrierea s-a încheiat";
    const buttonIcon = isBeforeRegistration 
      ? <i className="fas fa-lock" style={{ marginRight: '8px' }}></i>
      : <i className="fas fa-calendar-times" style={{ marginRight: '8px' }}></i>;
    const buttonText = isBeforeRegistration 
      ? content 
      : "Înscriere închisă";
    
    if (variant === 'button') {
      return (
        <button 
          className={className} 
          disabled 
          title={buttonTitle}
        >
          {buttonIcon}
          {buttonText}
        </button>
      );
    } else {
      return (
        <span 
          className={className} 
          style={{ opacity: 0.7, cursor: 'not-allowed' }} 
          title={buttonTitle}
        >
          {buttonIcon}
          {buttonText}
        </span>
      );
    }
  } else {
    // Registration is open - show active button
    return (
      <a 
        href={config.registrationFormLink} 
        className={className} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
};

export default RegistrationButton;
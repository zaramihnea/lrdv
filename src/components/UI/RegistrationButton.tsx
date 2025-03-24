// src/components/UI/RegistrationButton.tsx
import React, { useState, useEffect } from 'react';
import config, { isRegistrationOpen } from '../../config';
import { timeService } from '../../services/TimeService';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initial setup and sync listeners
  useEffect(() => {
    // Check immediately on mount
    updateRegistrationStatus();
    
    // Listen for time sync events from TimeService
    const removeListener = timeService.addSyncListener(() => {
      updateRegistrationStatus();
    });
    
    // Also set up interval for periodic checking (as a backup)
    const checkInterval = setInterval(() => {
      updateRegistrationStatus();
    }, 10000);
    
    // Clean up on unmount
    return () => {
      removeListener();
      clearInterval(checkInterval);
    };
  }, []);
  
  // Function to update the registration status
  const updateRegistrationStatus = () => {
    setIsOpen(isRegistrationOpen());
    setIsInitialized(true);
  };
  
  // Conținut bazat pe children sau label
  const content = children || label;
  
  // Don't render anything meaningful until we've initialized
  if (!isInitialized) {
    // Optional: Show a loading indicator instead
    return (
      <span className={className} style={{ opacity: 0.7 }}>
        <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
        {content}
      </span>
    );
  }
  
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
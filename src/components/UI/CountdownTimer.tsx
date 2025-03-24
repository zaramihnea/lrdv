// src/components/UI/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';
import { getRegistrationStatus } from '../../config';
import { timeService } from '../../services/TimeService';
import RegistrationButton from './RegistrationButton';
import '../../styles/components/countdown-timer.css';

const CountdownTimer: React.FC<{ targetDate?: Date; eventLabel?: string }> = ({ 
  targetDate: propTargetDate,
  eventLabel: propEventLabel,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Get registration status based on server time
  const [regStatus, setRegStatus] = useState(getRegistrationStatus());
  
  // Use either the props or the registration status
  const targetDate = propTargetDate || regStatus.targetDate;
  const eventLabel = propEventLabel || regStatus.message;
  
  const [isExpired, setIsExpired] = useState(!targetDate);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update registration status when time is synced
  useEffect(() => {
    // Initial status update
    updateStatus();
    
    // Listen for time sync events
    const removeListener = timeService.addSyncListener(() => {
      updateStatus();
    });
    
    return () => removeListener();
  }, []);
  
  // Update status based on current time
  const updateStatus = () => {
    setRegStatus(getRegistrationStatus());
    setIsInitialized(true);
  };

  // Calculate and update time remaining
  useEffect(() => {
    if (!targetDate) {
      setIsExpired(true);
      return;
    }
    
    const calculateTimeLeft = () => {
      // Always use server time
      const now = timeService.getNow();
      const difference = targetDate.getTime() - now.getTime();
      
      // Check if timer is near zero
      if (difference <= 1000 && difference > 0) {
        setShouldRefresh(true);
      }
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Handle page refresh when timer expires
  useEffect(() => {
    if (shouldRefresh) {
      const refreshTimeout = setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      return () => clearTimeout(refreshTimeout);
    }
  }, [shouldRefresh]);
  
  // Format numbers with leading zeros
  const formatTimeUnit = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="countdown-container">
        <h3 className="countdown-title">Se încarcă...</h3>
        <div className="countdown-status">
          <p className="registration-message">
            <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
            Se sincronizează ora exactă...
          </p>
        </div>
      </div>
    );
  }

  // Render message and button based on registration phase
  const renderContent = () => {
    // Always get fresh status
    const status = getRegistrationStatus();
    
    if (status.phase === 'before') {
      return (
        <div className="countdown-status">
          <p className="registration-message">
            Formularul de înscriere nu este încă disponibil.
          </p>
        </div>
      );
    } else if (status.phase === 'during') {
      return (
        <div className="countdown-expired">
          <p className="registration-message">
            Formularul de înscriere este deschis!
          </p>
          <RegistrationButton className="countdown-cta">
            Înscrie-te acum
          </RegistrationButton>
        </div>
      );
    } else {
      return (
        <div className="countdown-status">
          <p className="registration-message">
            Formularul de înscriere este închis. Mult succes participanților!
          </p>
        </div>
      );
    }
  };

  return (
    <div className="countdown-container">
      {/* Title and timer */}
      <h3 className="countdown-title">
        {isExpired ? regStatus.message : eventLabel}
      </h3>
      
      {!isExpired && (
        <div className="countdown-timer">
          <div className="countdown-unit">
            <div className="countdown-value">{formatTimeUnit(timeLeft.days)}</div>
            <div className="countdown-label">Zile</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-value">{formatTimeUnit(timeLeft.hours)}</div>
            <div className="countdown-label">Ore</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-value">{formatTimeUnit(timeLeft.minutes)}</div>
            <div className="countdown-label">Minute</div>
          </div>
          <div className="countdown-separator">:</div>
          <div className="countdown-unit">
            <div className="countdown-value">{formatTimeUnit(timeLeft.seconds)}</div>
            <div className="countdown-label">Secunde</div>
          </div>
        </div>
      )}
      
      {/* Always present content */}
      {renderContent()}
    </div>
  );
};

export default CountdownTimer;
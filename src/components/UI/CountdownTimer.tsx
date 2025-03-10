// src/components/UI/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';
import '../../styles/components/countdown-timer.css';

interface CountdownTimerProps {
  targetDate: Date;
  eventLabel: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventLabel }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Set the initial values
    setTimeLeft(calculateTimeLeft());
    
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Helper function to add leading zeros
  const formatTimeUnit = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">
        {isExpired ? `${eventLabel} a început!` : `${eventLabel} începe în:`}
      </h3>
      
      {isExpired ? (
        <div className="countdown-expired">
          <p>Evenimentul este în desfășurare</p>
          <a href="https://forms.gle/5GPEu4GWnpxjbghd9" className="countdown-cta">
            Înscrie-te acum
          </a>
        </div>
      ) : (
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
    </div>
  );
};

export default CountdownTimer;
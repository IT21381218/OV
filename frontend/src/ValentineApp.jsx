import React, { useState } from 'react';
import './ValentineApp.css';

export default function ValentineApp() {
  const [noButtonPosition, setNoButtonPosition] = useState(null); // null means initial position
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);

  const handleYesClick = () => {
    setShowCelebration(true);
    
    // Create confetti effect
    createConfetti();
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  const createConfetti = () => {
    const colors = ['#ff6b9d', '#c9184a', '#ff4d6d', '#ffa8c5', '#ff758f'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }
  };

  const handleNoHover = () => {
    setHasMovedOnce(true);
    
    // Define safe zones to avoid content
    let randomTop, randomLeft;
    let attempts = 0;
    const maxAttempts = 20;
    
    do {
      randomTop = Math.random() * 80 + 10;
      randomLeft = Math.random() * 80 + 10;
      attempts++;
      
      const isInEdges = 
        (randomTop < 15 || randomTop > 85) || 
        (randomLeft < 20 || randomLeft > 80);
      
      const avoidsCenter = 
        !(randomTop > 20 && randomTop < 80 && randomLeft > 30 && randomLeft < 70);
      
      if (isInEdges || avoidsCenter) {
        break;
      }
    } while (attempts < maxAttempts);
    
    setNoButtonPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    });
  };

  return (
    <div className="valentine-container">
      <div className="content">
        <h1 className="title">Onelly</h1>
        
        <div className="image-container">
          <img 
            src="https://res.cloudinary.com/dwcxwpn7q/image/upload/v1769892319/IMG-20260130-WA0041_gqtups.jpg" 
            alt="Onelly" 
            className="profile-image"
          />
        </div>
        
        <p className="subtitle">will you be my Valentine?</p>
        
        <div className="buttons-wrapper">
          <button className="btn btn-yes" onClick={handleYesClick}>
            Yes
          </button>
          
          <button 
            className={`btn btn-no ${hasMovedOnce ? 'moved' : ''}`}
            onMouseEnter={handleNoHover}
            style={
              noButtonPosition 
                ? {
                    position: 'fixed',
                    top: noButtonPosition.top,
                    left: noButtonPosition.left,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.3s ease-out'
                  }
                : {}
            }
          >
            No
          </button>
        </div>
      </div>

      {showCelebration && (
        <div className="celebration-overlay">
          <div className="hearts-burst">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="heart-particle"
                style={{
                  '--angle': `${(360 / 12) * i}deg`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                ♥
              </div>
            ))}
          </div>
          <div className="celebration-message">
            <div className="message-line animate-in">You made me</div>
            <div className="message-line animate-in delay-1">the happiest!</div>
          </div>
        </div>
      )}
    </div>
  );
}
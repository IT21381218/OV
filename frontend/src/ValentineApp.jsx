import React, { useState, useRef, useEffect } from 'react';
import './ValentineApp.css';

export default function ValentineApp() {
  const [noButtonPosition, setNoButtonPosition] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasMovedOnce, setHasMovedOnce] = useState(false);
  const [yesButtonPos, setYesButtonPos] = useState(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  // Capture YES button's initial position
  useEffect(() => {
    if (yesButtonRef.current && !yesButtonPos) {
      const rect = yesButtonRef.current.getBoundingClientRect();
      setYesButtonPos({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
  }, [yesButtonPos]);

  // Add touch move detection for mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (!hasMovedOnce || !noButtonRef.current) return;
      
      const touch = e.touches[0];
      const noButton = noButtonRef.current;
      const rect = noButton.getBoundingClientRect();
      
      // Calculate distance from touch to button center
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(touch.clientX - buttonCenterX, 2) + 
        Math.pow(touch.clientY - buttonCenterY, 2)
      );
      
      // If finger is within 100px of button, move it away
      if (distance < 100) {
        moveNoButton();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [hasMovedOnce]);

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

  const moveNoButton = () => {
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

  const handleNoInteraction = (e) => {
    // Prevent default to avoid any click/tap behavior
    e.preventDefault();
    moveNoButton();
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
        
        <div className="buttons-container">
          {/* YES button */}
          <button 
            ref={yesButtonRef}
            className={`btn btn-yes ${hasMovedOnce ? 'locked' : ''}`}
            onClick={handleYesClick}
            style={hasMovedOnce && yesButtonPos ? {
              position: 'fixed',
              top: `${yesButtonPos.top}px`,
              left: `${yesButtonPos.left}px`,
              width: `${yesButtonPos.width}px`,
              height: `${yesButtonPos.height}px`
            } : {}}
          >
            Yes
          </button>
          
          {/* NO button */}
          {!hasMovedOnce && (
            <button 
              className="btn btn-no"
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
            >
              No
            </button>
          )}
        </div>
      </div>

      {/* Moving NO button when it's been hovered/touched */}
      {hasMovedOnce && (
        <button 
          ref={noButtonRef}
          className="btn btn-no moved"
          onMouseEnter={moveNoButton}
          onTouchStart={handleNoInteraction}
          style={{
            position: 'fixed',
            top: noButtonPosition?.top || '50%',
            left: noButtonPosition?.left || '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        >
          No
        </button>
      )}

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
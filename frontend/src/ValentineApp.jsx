import React, { useState } from 'react';
import './ValentineApp.css';

export default function ValentineApp() {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '60%', left: '40%' });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);

  const handleYesClick = () => {
    // Celebrate!
    const hearts = document.createElement('div');
    hearts.className = 'celebration-hearts';
    document.body.appendChild(hearts);
    
    setTimeout(() => {
      alert("Yayyy 💖 Onelly is my Valentine!");
    }, 300);
    
    setTimeout(() => {
      document.body.removeChild(hearts);
    }, 3000);
  };

  const handleNoHover = () => {
    // Move the NO button to a random position
    const randomTop = Math.random() * 80 + 10; // 10% to 90%
    const randomLeft = Math.random() * 80 + 10; // 10% to 90%
    
    setNoButtonPosition({
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    });

    // Shrink NO button and grow YES button for extra fun
    setNoButtonSize(prev => Math.max(prev - 0.1, 0.5));
    setYesButtonSize(prev => Math.min(prev + 0.15, 2));
  };

  return (
    <div className="valentine-container">
      {/* Floating hearts background */}
      <div className="hearts-background">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
              fontSize: `${20 + Math.random() * 30}px`,
              opacity: 0.3 + Math.random() * 0.4
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="content-wrapper">
        <h1 className="valentine-message">
          Onelly, will you be my Valentine? 💘
        </h1>

        <div className="buttons-container">
          <button
            className="yes-button"
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonSize})`
            }}
          >
            YES! 💖
          </button>

          <button
            className="no-button"
            onMouseEnter={handleNoHover}
            style={{
              position: 'absolute',
              top: noButtonPosition.top,
              left: noButtonPosition.left,
              transform: `translate(-50%, -50%) scale(${noButtonSize})`,
              transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            No 😢
          </button>
        </div>

        <p className="hint-text">
          (Psst... try hovering over "No" 😏)
        </p>
      </div>
    </div>
  );
}

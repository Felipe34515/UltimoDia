// src/Marquee.js
import React, { useEffect, useRef } from 'react';
import './Marquee.css'; // Asegúrate de crear este archivo para los estilos

function Marquee() {

  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    let startPosition = marqueeElement.offsetWidth;
    
    const animate = () => {
      startPosition--;
      if (startPosition < -marqueeElement.offsetWidth) {
        startPosition = window.innerWidth;
      }
      marqueeElement.style.left = startPosition + 'px';
      requestAnimationFrame(animate);
    };

    

    animate();
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee" ref={marqueeRef}>
        Esta es una prueba chiquita
      </div>
      
    </div>
  );
}

export default Marquee;

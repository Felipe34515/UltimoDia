import React, { useEffect, useRef, useState } from 'react';
import './Marquee.css'; // Asegúrate de crear este archivo para los estilos

function Marquee() {
  const marqueeRef = useRef(null);
  const [marqueeText, setMarqueeText] = useState('');
  const [frases, setFrases] = useState([]);
  const [currentFraseIndex, setCurrentFraseIndex] = useState(0);
  const velocidad = 5; // Aumenta este valor para incrementar la velocidad

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    let startPosition = window.innerWidth;
    let requestId;

    const animate = () => {
      startPosition -= velocidad;
      if (startPosition < -marqueeElement.offsetWidth) {
        startPosition = window.innerWidth;
        // Cambiar el mensaje al siguiente
        setCurrentFraseIndex((prevIndex) => (prevIndex + 1) % frases.length);
      }
      marqueeElement.style.left = startPosition + 'px';
      requestId = requestAnimationFrame(animate);
    };

    animate();

    // Cargar el archivo JSON desde la carpeta `public`
    fetch('/phrases.json')
      .then(response => response.json())
      .then(data => {
        setFrases(data.frases);
        // Seleccionar la primera frase
        setCurrentFraseIndex(0);
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });

    return () => cancelAnimationFrame(requestId);
  }, [frases.length]);

  useEffect(() => {
    if (frases.length > 0) {
      setMarqueeText(frases[currentFraseIndex]);
    }
  }, [currentFraseIndex, frases]);

  return (
    <div className="marquee-container">
      <div className="marquee" ref={marqueeRef}>
        {marqueeText}
      </div>
    </div>
  );
}

export default Marquee;

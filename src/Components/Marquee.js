import React, { useEffect, useRef, useState } from 'react';
import './Marquee.css'; // Asegúrate de crear este archivo para los estilos

function Marquee() {
  const marqueeRef = useRef(null);
  const [marqueeText, setMarqueeText] = useState('');
  const velocidad = 2; // Aumenta este valor para incrementar la velocidad

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    let startPosition = window.innerWidth;
    let requestId;

    const animate = () => {
      startPosition -= velocidad;
      if (startPosition < -marqueeElement.offsetWidth) {
        startPosition = window.innerWidth;
        // Cargar una nueva frase al terminar
        fetchFrase();
      }
      marqueeElement.style.left = startPosition + 'px';
      requestId = requestAnimationFrame(animate);
    };

    const fetchFrase = () => {
      // Cargar la frase desde el endpoint proporcionado
      fetch('https://pyn25b8xo6.execute-api.us-east-1.amazonaws.com/dev/texts')
        .then(response => response.json())
        .then(data => {
          setMarqueeText(data.body); // Establecer el texto del marquee con la respuesta del endpoint
        })
        .catch(error => {
          console.error('Error al cargar la frase:', error);
        });
    };

    fetchFrase(); // Cargar la primera frase
    animate();

    return () => cancelAnimationFrame(requestId);
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee" ref={marqueeRef}>
        {marqueeText}
      </div>
    </div>
  );
}

export default Marquee;

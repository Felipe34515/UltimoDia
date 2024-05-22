import React, { useState } from 'react';
import './LastDayThoughts.css';
import jsonData from '/phrases.json';
import { saveAs } from 'file-saver';


const LastDayThoughts = () => {
    const [text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    const handleSave = () => {
        // Agrega el nuevo texto al JSON
        const updatedData = {
            ...jsonData,
            thoughts: [
                ...jsonData.thoughts,
                text
            ]
        };

        // Convierte el objeto JSON actualizado a texto
        const updatedJsonText = JSON.stringify(updatedData, null, 2);

        // Crea un Blob con el JSON actualizado
        const blob = new Blob([updatedJsonText], { type: 'application/json' });

        // Sobreescribe el archivo JSON actual
        saveAs(blob, 'phrases.json');


        
        
    };

    return (
        <div className="last-day-thoughts">
            <h1>Si mañana fuera el último día, yo…</h1>
            <textarea 
                value={text}
                onChange={handleInputChange}
                placeholder="Escribe tu respuesta aquí..."
            />
            <br />
            <button onClick={handleSave}>Guardar</button>
        </div>
    );
};

export default LastDayThoughts;

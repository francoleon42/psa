import React, { useState, useEffect } from 'react';
import Asciidoctor from 'asciidoctor';
import './AdocEditer.css';

const asciidoctor = Asciidoctor();

const AsciiDocEditor = () => {
    const [adocContent, setAdocContent] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    // Cargar contenido inicial del servidor al montar
    useEffect(() => {
        const fetchInitialDoc = async () => {
            try {
                const baseUrl = import.meta.env.VITE_PUBLIC_URL || '';
                const url = `${baseUrl}/psa/adocs/doc.adoc`; // Suponiendo que este archivo está en el servidor
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error cargando documento inicial');
                const text = await response.text();
                setAdocContent(text);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialDoc();
    }, []);

    // Convertir contenido local a HTML
    useEffect(() => {
        const html = asciidoctor.convert(adocContent);
        setHtmlContent(html);
    }, [adocContent]);

    
    const handleChange = (event) => {
        setAdocContent(event.target.value);
    };

    const handleSave = async () => {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: 'doc.adoc', 
                startIn: 'documents', 
            });
    
            const writable = await handle.createWritable();
            await writable.write(adocContent);
            await writable.close();
            alert('Archivo guardado correctamente');
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    };
    
    return (
        <div className="adoc-container editor-container">
            <textarea
                style={{ color: '#000' }}
                className="adoc-editor"
                value={adocContent}
                onChange={handleChange}
            />
            <div
                className="adoc-preview"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <button style={{ color: '#000' }} onClick={handleSave} className="save-button">
                Guardar Cambios
            </button>
        </div>
    );
};

export default AsciiDocEditor;

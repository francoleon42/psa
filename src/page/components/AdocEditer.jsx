import React, { useState, useEffect } from 'react';
import Asciidoctor from 'asciidoctor';
import './AdocEditer.css';
import { supabase } from '../../supabase';

const asciidoctor = Asciidoctor();

const AsciiDocEditor = () => {
    const [adocContent, setAdocContent] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const fetchInitialDoc = async () => {
            try {
                const { data, error } = await supabase
                    .from('documento')
                    .select('*');
                if (error) throw error;

                const adocContent = data[0].texto;
                setAdocContent(adocContent);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialDoc();
    }, []);

    useEffect(() => {
        const html = asciidoctor.convert(adocContent);
        setHtmlContent(html);
    }, [adocContent]);


    const handleChange = (event) => {
        setAdocContent(event.target.value);
    };

    const handleSave = async () => {
        console.log(adocContent);
        try {
            const { error } = await supabase
                .from('documento')
                .update({ texto: adocContent })
                .eq('id', 1);

            if (error) throw error;
            alert('Documento guardado en Supabase ✅');
        } catch (err) {
            console.error('Error guardando en Supabase:', err);
            alert('Error al guardar en la base de datos ❌');
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

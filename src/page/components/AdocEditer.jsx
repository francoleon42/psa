import React, { useState, useEffect } from 'react';
import Asciidoctor from 'asciidoctor';
import './styles/AdocEditer.css';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

const asciidoctor = Asciidoctor();

const AsciiDocEditor = () => {
    const navigate = useNavigate();
    const [passwordDocument, setPasswordDocument] = useState(null);
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
                setPasswordDocument(data[0].password);
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
        const password = prompt('Ingrese la contraseña para guardar:');
        if (password !== passwordDocument) {
            alert('Contraseña incorrecta ❌');
            return;
        }
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
            <button onClick={() => navigate('../render/doc.adoc')} className="back-button">
                Volver a blog
            </button>
        </div>
    );
};

export default AsciiDocEditor;

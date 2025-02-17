import React, { useEffect, useState } from 'react';
import Asciidoctor from 'asciidoctor';
import { useParams, useNavigate } from 'react-router-dom';
import './adocRenderer.css'; 



const asciidoctor = Asciidoctor();

const AdocRenderer = () => {
  const { adocPath } = useParams();
  const [htmlContent, setHtmlContent] = useState('Cargando...');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchAdoc = async () => {
      try {
        console.log(adocPath)
        const baseUrl = import.meta.env.VITE_PUBLIC_URL || ''; 

        const response = await fetch(`${baseUrl}/adocs/doc.adoc`);
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo AsciiDoc.');
        }
        const adocContent = await response.text();
        const html = asciidoctor.convert(adocContent);
        setHtmlContent(html);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdoc();
  }, [adocPath]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>

      {/* <header className="adoc-header">
        <button onClick={() => navigate('/')} className="back-button"> Volver al menu </button>
      </header> */}
      <div

        className="adoc-container"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      


    </div>
  );
};

export default AdocRenderer;
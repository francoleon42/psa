import React, { useEffect, useState } from 'react';
import Asciidoctor from 'asciidoctor';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase'; // Asegúrate de importar la configuración de Supabase
import './adocRenderer.css';

const asciidoctor = Asciidoctor();

const AdocRenderer = () => {
  const { adocPath } = useParams();
  const [htmlContent, setHtmlContent] = useState('Cargando...');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdocFromDB = async () => {
      try {
        const { data, error } = await supabase
          .from('documento')
          .select('*');
        if (error) throw error;
      
        const adocContent = data[0].texto;
        const html = asciidoctor.convert(adocContent);
        setHtmlContent(html);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAdocFromDB();
  }, [adocPath]);

  if (error) {
    return <div className="error">{error} No carga...</div>;
  }

  return (
    <div>
      <div
        className="adoc-container"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <button onClick={() => navigate('../editer/doc.adoc')}>Editer</button>
    </div>
  );
};

export default AdocRenderer;

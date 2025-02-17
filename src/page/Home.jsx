import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('psa/render/psa.adoc');
  }, [navigate]);

  return null; 
};

export default Home;

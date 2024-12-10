// src/Series.js
import React, { useEffect, useState } from 'react';
import './estilo.css'; // Certifique-se de que o CSS está importado

function Series() {
  const [series, setSeries] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    fetch('/series.json') // Certifique-se de que o caminho está correto
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setSeries(data)) // Renomeado para 'data' para maior clareza
      .catch((error) => {
        console.error('Houve um problema com a requisição:', error);
      });
  }, []);

  const handlePesquisa = (e) => {
    setPesquisa(e.target.value);
  };

  const seriesFiltradas = series.filter((serie) => {
    return serie.title.toLowerCase().includes(pesquisa.toLowerCase()); // Alterado para 'title'
  });

  return (
    <div className='main-content'>
      <header>
        <div className='header-content'>
          <strong>Claquete - Séries</strong>
        </div>
      </header>

      <div className="welcome-message">
        <h2>Bem-vindo ao Claquete!</h2>
        <p>Seu site de entretenimento sobre séries.</p>
      </div>

      <div className='barra-pesquisa'>
        <input 
          type='text' 
          placeholder='Pesquisar séries...' 
          value={pesquisa} 
          onChange={handlePesquisa} 
        />
      </div>

      <div className='series-laterais'>
        {seriesFiltradas.length > 0 ? (
          seriesFiltradas.map((serie) => (
            <div key={serie.id} className='serie-lateral'>
              <img src={serie.image} alt={serie.title} /> {/* Alterado para 'image' */}
              <h3 className='titulo'>{serie.title}</h3> {/* Alterado para 'title' */}
              <p className='sinopse'>{serie.synopsis}</p> {/* Alterado para 'synopsis' */}
            </div>
          ))
        ) : (
          <p>Nenhuma série encontrada.</p>
        )}
      </div>
    </div>
  );
}

export default Series;
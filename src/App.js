import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './estilo.css';
import claqueteImg from './imagens/calquete.png';
import Sidebar from './Sidebar'; // Importação correta
import Series from './Series'; // Importação correta

function App() {
  const [filmes, setFilmes] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    fetch('/filmes.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => setFilmes(res))
      .catch((error) => {
        console.error('Houve um problema com a requisição:', error);
      });
  }, []);

  const handlePesquisa = (e) => {
    setPesquisa(e.target.value);
  };

  const filmesFiltrados = filmes.filter((filme) => {
    return filme.titulo.toLowerCase().includes(pesquisa.toLowerCase());
  });

  return (
    <Router>
      <div className='container' style={{ marginTop: '60px' }}>
        <Sidebar />

        <Routes>
          <Route path="/" element={
            <div className='main-content'>
              <header>
                <div className='header-content'>
                  <img src={claqueteImg} alt='Claquete' className='claquete-img' />
                  <strong>Claquete - Filmes</strong>
                </div>
              </header>

              <div className="welcome-message">
                <h2>Bem-vindo ao Claquete!</h2>
                <p>Seu site de entretenimento sobre filmes.</p>
              </div>

              <div className='barra-pesquisa'>
                <input 
                  type='text' 
                  placeholder='Pesquisar filmes...' 
                  value={pesquisa} 
                  onChange={handlePesquisa} 
                />
              </div>

              <div className='filmes-laterais'>
                {filmesFiltrados.length > 0 ? (
                  filmesFiltrados.map(( filme) => (
                    <div key={filme.id} className='filme-lateral'>
                      <img src={filme.posterUrl} alt={filme.titulo} />
                      <h3 className='titulo'>{filme.titulo}</h3>
                      <p className='sinopse'>{filme.sinopse}</p>
                    </div>
                  ))
                ) : (
                  <p>Nenhum filme encontrado.</p>
                )}
              </div>
            </div>
          } />
          <Route path="/series" element={<Series />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
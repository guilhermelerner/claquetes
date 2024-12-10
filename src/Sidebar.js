import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/">Filmes</Link>
        </li>
        <li>
          <Link to="/series">Séries</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; // Certifique-se de que a exportação está correta
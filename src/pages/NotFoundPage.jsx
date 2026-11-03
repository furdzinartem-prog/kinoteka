import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '72px', margin: 0, color: '#ffcc00' }}>404</h1>
      <h2>Упс! Такой страницы не существует.</h2>
      <Link to="/" style={{ color: 'white', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;

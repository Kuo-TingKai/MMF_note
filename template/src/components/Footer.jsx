import React from 'react';

function Footer({ author = "作者", year = new Date().getFullYear() }) {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <p className="text-center" style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem 0' }}>
          &copy; {year} {author}. 
          使用 <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a> 構建。
        </p>
      </div>
    </footer>
  );
}

export default Footer;


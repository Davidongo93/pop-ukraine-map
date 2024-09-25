
import { useState, useEffect } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <nav
      className={`${styles.footer} ${showFooter ? styles['opacity-1'] : styles['opacity-0']} ${
        showFooter ? styles['blur-10px'] : ''
      } ${showFooter ? styles['pointer-events-auto'] : ''}`}
    >
      <footer className="text-center">
        <p>
          &copy; {getCurrentYear()} By{' '}
          <a
            href="https://davidongo93.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 font-semibold"
          >
            DÆV
          </a>
        </p>
      </footer>
    </nav>
  );
}

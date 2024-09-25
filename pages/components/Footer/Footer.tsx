export default function Footer() {

    const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <nav
      className={`footer blur-10px`}
    >
      <footer className="text-center py-2">
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

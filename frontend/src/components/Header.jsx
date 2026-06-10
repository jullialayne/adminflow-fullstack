export default function Header({
  menuOpen,
  setMenuOpen,
  pageTitle
}) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div>
          <h1 className="system-title">
            Junine-se
          </h1>

          <span className="page-title">
            {pageTitle}
          </span>
        </div>
      </div>
    </header>
  );
}
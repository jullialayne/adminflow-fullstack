export default function Sidebar({
  tab,
  setTab,
  menuOpen
}) {
  return (
    <aside
      className={`sidebar ${
        menuOpen ? 'expanded' : ''
      }`}
    >
      <div className="sidebar-menu">

        <button
          className={`menu-item ${
            tab === 'dashboard'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setTab('dashboard')
          }
        >
          <span className="menu-icon">
            📊
          </span>

          {menuOpen && (
            <span className="menu-label">
              Dashboard
            </span>
          )}
        </button>

        <button
          className={`menu-item ${
            tab === 'clientes'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setTab('clientes')
          }
        >
          <span className="menu-icon">
            👤
          </span>

          {menuOpen && (
            <span className="menu-label">
              Clientes
            </span>
          )}
        </button>

        <button
          className={`menu-item ${
            tab === 'vestidos'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setTab('vestidos')
          }
        >
          <span className="menu-icon">
            👗
          </span>

          {menuOpen && (
            <span className="menu-label">
              Vestidos
            </span>
          )}
        </button>

        <button
          className={`menu-item ${
            tab === 'alugueis'
              ? 'active'
              : ''
          }`}
          onClick={() =>
            setTab('alugueis')
          }
        >
          <span className="menu-icon">
            📅
          </span>

          {menuOpen && (
            <span className="menu-label">
              Aluguéis
            </span>
          )}
        </button>

      </div>
    </aside>
  );
}
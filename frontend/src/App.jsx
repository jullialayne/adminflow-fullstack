import { useState } from 'react';
import './App.css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Clientes from './components/Clientes';
import Vestidos from './components/Vestidos';
import Alugueis from './components/Alugueis';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [token, setToken] = useState(null);
  const [tab, setTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLoginSuccess(data) {
    setToken(data.token);
  }
function showToast(msg) {
  alert(msg);
}
if (!token) {
  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      showToast={showToast}
    />
  );
}

  return (
    <div className="app-layout">
      <Sidebar
        tab={tab}
        setTab={setTab}
        menuOpen={menuOpen}
      />

      <div
        className={`content-area ${
          menuOpen ? 'menu-open' : 'menu-closed'
        }`}
      >
        <Header
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main className="main-content">
          {tab === 'dashboard' && (
            <Dashboard
              token={token}
              setTab={setTab}
            />
          )}

          {tab === 'clientes' && (
            <Clientes token={token} />
          )}

          {tab === 'vestidos' && (
            <Vestidos token={token} />
          )}

          {tab === 'alugueis' && (
            <Alugueis token={token} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
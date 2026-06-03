import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState(null);

  function handleLoginSuccess(data) {
    setToken(data.token);
  }

  function showToast(msg, type) {
    alert(msg, type);
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
    <Dashboard
      token={token}
      setTab={() => {}}
    />
  );
}

export default App;
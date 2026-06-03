import { useState } from 'react';

export default function Login({ onLoginSuccess, showToast }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:3000/api';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !senha || (!isLoginTab && !nome)) {
      showToast('Por favor, preencha todos os campos.', 'error');
      return;
    }

    setLoading(true);

    try {
      if (isLoginTab) {
        // Fluxo de Login
        const res = await fetch(`${API_URL}/usuarios/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Email: email, Senha: senha })
        });

        const data = await res.json();

        if (!res.ok) {
          showToast(data.erro || 'Falha na autenticação.', 'error');
        } else {
          showToast(`Bem-vindo(a) de volta, ${data.usuario.Nome}!`, 'success');
          onLoginSuccess(data);
        }
      } else {
        // Fluxo de Cadastro
        const res = await fetch(`${API_URL}/usuarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Nome: nome, Email: email, Senha: senha })
        });

        const data = await res.json();

        if (!res.ok) {
          showToast(data.erro || 'Erro ao realizar cadastro.', 'error');
        } else {
          showToast('Cadastro realizado com sucesso! Faça login.', 'success');
          setIsLoginTab(true);
          setNome('');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Erro de conexão com o servidor.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-card glass-panel">
        <div className="login-logo-container">
          <div className="login-logo">👗</div>
          <h1 className="login-title">AdminFlow</h1>
          <p className="login-subtitle">Aluguel de Vestidos Caipiras</p>
        </div>

        <div className="login-tabs">
          <button 
            type="button" 
            className={`login-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(true)}
          >
            Acessar Painel
          </button>
          <button 
            type="button" 
            className={`login-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => setIsLoginTab(false)}
          >
            Criar Conta
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLoginTab && (
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Seu Nome</label>
              <input 
                id="nome"
                type="text" 
                className="form-input" 
                placeholder="Ex: Maria Caipira"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required={!isLoginTab}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input 
              id="email"
              type="email" 
              className="form-input" 
              placeholder="Ex: maria@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input 
              id="senha"
              type="password" 
              className="form-input" 
              placeholder="••••••••"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="primary-btn login-submit-btn"
            disabled={loading}
          >
            {loading ? 'Processando...' : isLoginTab ? 'Entrar no Sistema' : 'Cadastrar e Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
}

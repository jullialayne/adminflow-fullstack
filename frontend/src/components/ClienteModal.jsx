import { useState } from 'react';

export default function ClienteModal({
  token,
  onClose,
  onSuccess,
  cliente
}) {
  const [nome, setNome] =
    useState(cliente?.Nome || '');

  const [telefone, setTelefone] =
    useState(cliente?.Telefone || '');

  const [email, setEmail] =
    useState(cliente?.Email || '');

  async function salvar() {
    const body = {
      Nome: nome,
      Telefone: telefone,
      Email: email
    };

    const url = cliente
      ? `http://localhost:3000/api/clientes/${cliente.IdCliente}`
      : 'http://localhost:3000/api/clientes';

    const method = cliente ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    onSuccess();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {cliente
            ? 'Editar Cliente'
            : 'Novo Cliente'}
        </h2>

        <input
          className="form-input"
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          className="form-input"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) =>
            setTelefone(e.target.value)
          }
        />

        <input
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <div className="modal-actions">

          <button
            className="secondary-btn"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="primary-btn"
            onClick={salvar}
          >
            Salvar
          </button>

        </div>

      </div>
    </div>
  );
}
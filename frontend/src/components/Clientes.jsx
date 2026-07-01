import { useEffect, useState } from 'react';
import ClienteModal from './ClienteModal';

export default function Clientes({ token }) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  async function carregarClientes() {
    const res = await fetch(
      'http://localhost:3000/api/clientes',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    setClientes(data);
  }

  async function desativarCliente(id) {
    const confirmar = window.confirm(
      "Deseja realmente desativar este cliente?"
    );

    if (!confirmar) return;

    await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    carregarClientes();
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="table-panel">

      <div className="table-header">
        <h2>Clientes</h2>

        <button
          className="primary-btn"
          onClick={() => {
            setClienteSelecionado(null);
            setShowModal(true);
          }}
        >
          + Novo Cliente
        </button>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.IdCliente}>
              <td>{cliente.Nome}</td>
              <td>{cliente.Telefone}</td>
              <td>{cliente.Email}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setClienteSelecionado(cliente);
                    setShowModal(true);
                  }}
                >
                ✏️
              </button>
              <button
                className="delete-btn"
                onClick={() => desativarCliente(cliente.IdCliente)}
                title="Desativar cliente"
              >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ClienteModal
          token={token}
          cliente={clienteSelecionado}
          onClose={() => {
            setClienteSelecionado(null);
            setShowModal(false);
          }}
          onSuccess={() => {
            carregarClientes();
            setClienteSelecionado(null);
            setShowModal(false);
          }}
        />
      )}

    </div>
  );
}

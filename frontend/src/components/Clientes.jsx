import { useEffect, useState } from 'react';
import ClienteModal from './ClienteModal';

export default function Clientes({ token }) {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="table-panel">

      <div className="table-header">
        <h2>Clientes</h2>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
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
                <button className="edit-btn">
                  ✏️
                </button>

                <button className="delete-btn">
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
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            carregarClientes();
            setShowModal(false);
          }}
        />
      )}

    </div>
  );
}
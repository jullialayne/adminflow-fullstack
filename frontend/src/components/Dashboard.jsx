import { useEffect, useState } from 'react';

export default function Dashboard({ token, setTab }) {
  const [metrics, setMetrics] = useState({
    totalDresses: 0,
    activeRentals: 0,
    revenue: 0,
    dressesInMaintenance: 0
  });

  const [recentRentals, setRecentRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const formatDate = (date) => {
    if (!date) return '-';

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return '-';

    return parsedDate.toLocaleDateString('pt-BR', {
      timeZone: 'UTC'
    });
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  useEffect(() => {
    async function carregarDados() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [vestidosRes, alugueisRes] = await Promise.all([
          fetch(`${API_URL}/vestidos`, { headers }),
          fetch(`${API_URL}/alugueis`, { headers })
        ]);

        const vestidos = await vestidosRes.json();
        const alugueis = await alugueisRes.json();

        const vestidosArray = Array.isArray(vestidos)
          ? vestidos
          : [];

        const alugueisArray = Array.isArray(alugueis)
          ? alugueis
          : [];

        setMetrics({
          totalDresses: vestidosArray.length,
          activeRentals: alugueisArray.filter(
            aluguel =>
              aluguel.Status === 'RESERVADO' ||
              aluguel.Status === 'RETIRADO'
          ).length,
          revenue: alugueisArray.reduce(
            (acc, aluguel) =>
              acc + Number(aluguel.Valor || 0),
            0
          ),
          dressesInMaintenance: vestidosArray.filter(
            vestido =>
              vestido.Status === 'MANUTENCAO'
          ).length
        });

        setRecentRentals(
          [...alugueisArray]
            .sort(
              (a, b) =>
                b.IdAluguel - a.IdAluguel
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [token]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        Carregando painel...
      </div>
    );
  }

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Bem-vinda ao Junine-se 👗</h1>

        <p>
          Gerencie vestidos, clientes e aluguéis
          em um só lugar.
        </p>
      </div>

      <div className="metrics-grid">

        <div className="metric-card">
          <div className="metric-icon-box pink">
            👗
          </div>

          <div>
            <span className="metric-label">
              Vestidos
            </span>

            <h2 className="metric-value">
              {metrics.totalDresses}
            </h2>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box purple">
            📅
          </div>

          <div>
            <span className="metric-label">
              Aluguéis Ativos
            </span>

            <h2 className="metric-value">
              {metrics.activeRentals}
            </h2>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box green">
            💰
          </div>

          <div>
            <span className="metric-label">
              Faturamento
            </span>

            <h2 className="metric-value">
              {formatCurrency(metrics.revenue)}
            </h2>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box orange">
            🛠️
          </div>

          <div>
            <span className="metric-label">
              Manutenção
            </span>

            <h2 className="metric-value">
              {metrics.dressesInMaintenance}
            </h2>
          </div>
        </div>

      </div>

     
      <div className="table-panel">

        <div className="section-title">

          <div>
            <h2>Aluguéis Recentes</h2>

            <p>
              Últimos contratos registrados
            </p>
          </div>

          <button
            className="secondary-btn"
            onClick={() => setTab('alugueis')}
          >
            Ver todos
          </button>

        </div>

        {recentRentals.length === 0 ? (
          <div className="empty-state">
            Nenhum aluguel cadastrado.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="styled-table">

              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Vestido</th>
                  <th>Retirada</th>
                  <th>Devolução</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {recentRentals.map(rental => (
                  <tr key={rental.IdAluguel}>

                    <td className="client-name-cell">

                     

                      {rental?.Cliente?.Nome ||
                        'Cliente'}

                    </td>

                    <td>
                      {rental?.Vestido?.Nome ||
                        'Vestido'}
                    </td>

                    <td>
                      {formatDate(
                        rental.DataRetirada
                      )}
                    </td>

                    <td>
                      {formatDate(
                        rental.DataDevolucao
                      )}
                    </td>

                    <td className="valor-cell">
                      {formatCurrency(
                        rental.Valor
                      )}
                    </td>

                    <td>

                      <span
                        className={`status-pill ${
                          rental?.Status?.toLowerCase()
                        }`}
                      >
                        {rental.Status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}
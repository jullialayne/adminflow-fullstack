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
    let isMounted = true;

    async function fetchDashboardData() {
      try {
        setLoading(true);

        const headers = {
          Authorization: `Bearer ${token}`
        };

        const [vestidosRes, alugueisRes] = await Promise.all([
          fetch(`${API_URL}/vestidos`, { headers }),
          fetch(`${API_URL}/alugueis`, { headers })
        ]);

        if (!vestidosRes.ok) {
          throw new Error(`Erro ao buscar vestidos: ${vestidosRes.status}`);
        }

        if (!alugueisRes.ok) {
          throw new Error(`Erro ao buscar aluguéis: ${alugueisRes.status}`);
        }

        const vestidos = await vestidosRes.json();
        const alugueis = await alugueisRes.json();

        const vestidosArray = Array.isArray(vestidos) ? vestidos : [];
        const alugueisArray = Array.isArray(alugueis) ? alugueis : [];

        const totalDresses = vestidosArray.length;

        const dressesInMaintenance = vestidosArray.filter(
          (dress) => dress?.Status === 'MANUTENCAO'
        ).length;

        const activeRentals = alugueisArray.filter(
          (rental) =>
            rental?.Status === 'RESERVADO' ||
            rental?.Status === 'RETIRADO'
        ).length;

        const revenue = alugueisArray.reduce(
          (sum, rental) => sum + (Number(rental?.Valor) || 0),
          0
        );

        const recent = [...alugueisArray]
          .sort(
            (a, b) =>
              Number(b?.IdAluguel || 0) -
              Number(a?.IdAluguel || 0)
          )
          .slice(0, 5);

        if (!isMounted) return;

        setMetrics({
          totalDresses,
          activeRentals,
          revenue,
          dressesInMaintenance
        });

        setRecentRentals(recent);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);

        if (!isMounted) return;

        setMetrics({
          totalDresses: 0,
          activeRentals: 0,
          revenue: 0,
          dressesInMaintenance: 0
        });

        setRecentRentals([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (token) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token, API_URL]);

  if (loading) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}
      >
        Carregando dados do painel...
      </div>
    );
  }

  return (
    <div>
      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon-box pink">👗</div>
          <div className="metric-details">
            <p>Total de Vestidos</p>
            <div className="metric-value">
              {metrics.totalDresses}
            </div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box orange">📅</div>
          <div className="metric-details">
            <p>Aluguéis Ativos</p>
            <div className="metric-value">
              {metrics.activeRentals}
            </div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box teal">💰</div>
          <div className="metric-details">
            <p>Faturamento Bruto</p>
            <div className="metric-value">
              {formatCurrency(metrics.revenue)}
            </div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box gold">🛠️</div>
          <div className="metric-details">
            <p>Em Manutenção</p>
            <div className="metric-value">
              {metrics.dressesInMaintenance}
            </div>
          </div>
        </div>
      </div>

      <div className="table-panel glass-panel">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '800'
            }}
          >
            Aluguéis Recentes
          </h2>

          <button
            type="button"
            className="secondary-btn"
            style={{
              padding: '8px 16px',
              fontSize: '12px'
            }}
            onClick={() => setTab('alugueis')}
          >
            Ver Todos
          </button>
        </div>

        {recentRentals.length === 0 ? (
          <p
            style={{
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '24px 0'
            }}
          >
            Nenhum aluguel cadastrado ainda.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Vestido</th>
                  <th>Data Retirada</th>
                  <th>Data Devolução</th>
                  <th>Valor</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentRentals.map((rental) => (
                  <tr key={rental.IdAluguel}>
                    <td className="client-name-cell">
                      <div className="client-initial-avatar">
                        {(rental?.Cliente?.Nome || 'C')
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      {rental?.Cliente?.Nome ||
                        'Cliente não encontrado'}
                    </td>

                    <td>
                      {rental?.Vestido?.Nome ||
                        'Vestido não encontrado'}
                    </td>

                    <td>
                      {formatDate(rental?.DataRetirada)}
                    </td>

                    <td>
                      {formatDate(rental?.DataDevolucao)}
                    </td>

                    <td
                      style={{
                        fontWeight: '700',
                        color: 'var(--color-secondary)'
                      }}
                    >
                      {formatCurrency(rental?.Valor)}
                    </td>

                    <td>
                      <span
                        className={`badge-status ${
                          rental?.Status?.toLowerCase() || ''
                        }`}
                      >
                        {rental?.Status || '-'}
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
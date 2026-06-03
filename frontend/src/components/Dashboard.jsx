import { useEffect, useState } from 'react';

export default function Dashboard({ token, setTab }) {
  const [metrics, setMetrics] = useState({
    totalDresses: 0,
    activeRentals: 0,
    revenue: 0.0,
    dressesInMaintenance: 0
  });
  const [recentRentals, setRecentRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Buscar Vestidos
        const vestidosRes = await fetch(`${API_URL}/vestidos`, { headers });
        const vestidos = await vestidosRes.json();
        
        // Buscar Alugueis
        const alugueisRes = await fetch(`${API_URL}/alugueis`, { headers });
        const alugueis = await alugueisRes.json();

        // Calcular Métricas
        const totalDresses = Array.isArray(vestidos) ? vestidos.length : 0;
        const dressesInMaintenance = Array.isArray(vestidos) 
          ? vestidos.filter(d => d.Status === 'MANUTENCAO').length 
          : 0;
        
        const activeRentals = Array.isArray(alugueis) 
          ? alugueis.filter(a => a.Status === 'RESERVADO' || a.Status === 'RETIRADO').length 
          : 0;
        
        const revenue = Array.isArray(alugueis)
          ? alugueis.reduce((sum, a) => sum + parseFloat(a.Valor || 0), 0)
          : 0;

        setMetrics({
          totalDresses,
          activeRentals,
          revenue,
          dressesInMaintenance
        });

        if (Array.isArray(alugueis)) {
          // Ordenar recentes por ID decrescente e pegar os 5 primeiros
          const sorted = [...alugueis].reverse().slice(0, 5);
          setRecentRentals(sorted);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [token]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Carregando dados do painel...</div>;
  }

  return (
    <div>
      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <div className="metric-icon-box pink">👗</div>
          <div className="metric-details">
            <p>Total de Vestidos</p>
            <div className="metric-value">{metrics.totalDresses}</div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box orange">📅</div>
          <div className="metric-details">
            <p>Alugueis Ativos</p>
            <div className="metric-value">{metrics.activeRentals}</div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box teal">💰</div>
          <div className="metric-details">
            <p>Faturamento Bruto</p>
            <div className="metric-value">R$ {metrics.revenue.toFixed(2)}</div>
          </div>
        </div>

        <div className="metric-card glass-panel">
          <div className="metric-icon-box gold">🛠️</div>
          <div className="metric-details">
            <p>Em Manutenção</p>
            <div className="metric-value">{metrics.dressesInMaintenance}</div>
          </div>
        </div>
      </div>

      <div className="table-panel glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Alugueis Recentes</h2>
          <button 
            type="button" 
            className="secondary-btn" 
            style={{ padding: '8px 16px', fontSize: '12px' }}
            onClick={() => setTab('alugueis')}
          >
            Ver Todos
          </button>
        </div>

        {recentRentals.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>Nenhum aluguel cadastrado ainda.</p>
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
                {recentRentals.map(rental => (
                  <tr key={rental.IdAluguel}>
                    <td className="client-name-cell">
                      <div className="client-initial-avatar">
                        {(rental.Cliente?.Nome || 'C').charAt(0).toUpperCase()}
                      </div>
                      {rental.Cliente?.Nome || 'Cliente Deletado'}
                    </td>
                    <td>{rental.Vestido?.Nome || 'Vestido Deletado'}</td>
                    <td>{new Date(rental.DataRetirada).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                    <td>{new Date(rental.DataDevolucao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                    <td style={{ fontWeight: '700', color: 'var(--color-secondary)' }}>
                      R$ {parseFloat(rental.Valor || 0).toFixed(2)}
                    </td>
                    <td>
                      <span className={`badge-status ${rental.Status?.toLowerCase()}`}>
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

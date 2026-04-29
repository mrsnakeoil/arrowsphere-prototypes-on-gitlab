import { useState, useEffect } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { getInventory } from '../api/petstore';

export function Inventory() {
  const { apiKey } = useApiKey();
  const [inventory, setInventory] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getInventory(apiKey)
      .then((data) => {
        if (!cancelled) setInventory(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [apiKey]);

  const totalPets = Object.values(inventory).reduce((sum, count) => sum + count, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginTop: 0 }}>Store Inventory</h2>
      <p style={{ color: '#666' }}>Pet counts by status from the Petstore API.</p>

      {loading && <p>Loading inventory...</p>}
      {error && <p style={{ color: '#d32f2f' }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <table style={{
            width: '100%',
            maxWidth: '500px',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right', borderBottom: '1px solid #e0e0e0' }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventory)
                .sort(([, a], [, b]) => b - a)
                .map(([status, count]) => (
                  <tr key={status}>
                    <td style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f0f0f0' }}>{status}</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', borderBottom: '1px solid #f0f0f0', fontWeight: 600 }}>{count}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Total</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600 }}>{totalPets}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
}

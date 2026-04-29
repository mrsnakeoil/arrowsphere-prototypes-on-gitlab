import { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { Pet, placeOrder } from '../api/petstore';

interface PetDetailProps {
  pet: Pet;
  onBack: () => void;
}

export function PetDetail({ pet, onBack }: PetDetailProps) {
  const { apiKey } = useApiKey();
  const [ordering, setOrdering] = useState(false);
  const [orderResult, setOrderResult] = useState<string | null>(null);
  const [orderError, setOrderError] = useState('');

  const handleOrder = async () => {
    setOrdering(true);
    setOrderError('');
    setOrderResult(null);
    try {
      const order = await placeOrder(apiKey, {
        petId: pet.id,
        quantity: 1,
        status: 'placed',
        complete: false,
      });
      setOrderResult(`Order #${order.id} placed successfully!`);
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  const statusColors: Record<string, string> = {
    available: '#4caf50',
    pending: '#ff9800',
    sold: '#f44336',
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#4a90d9',
          cursor: 'pointer',
          fontSize: '1rem',
          padding: 0,
          marginBottom: '1rem',
        }}
      >
        ← Back to pets
      </button>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        border: '1px solid #e0e0e0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>{pet.name || 'Unnamed'}</h2>
          {pet.status && (
            <span style={{
              backgroundColor: statusColors[pet.status] || '#999',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
            }}>
              {pet.status}
            </span>
          )}
        </div>

        <table style={{ marginTop: '1.5rem', borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ padding: '0.5rem 1rem 0.5rem 0', color: '#666', fontWeight: 500 }}>ID</td>
              <td style={{ padding: '0.5rem 0' }}>{pet.id}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 1rem 0.5rem 0', color: '#666', fontWeight: 500 }}>Category</td>
              <td style={{ padding: '0.5rem 0' }}>{pet.category?.name || '—'}</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem 1rem 0.5rem 0', color: '#666', fontWeight: 500 }}>Tags</td>
              <td style={{ padding: '0.5rem 0' }}>
                {pet.tags && pet.tags.length > 0
                  ? pet.tags.map((t) => t.name).join(', ')
                  : '—'}
              </td>
            </tr>
          </tbody>
        </table>

        {pet.photoUrls && pet.photoUrls.length > 0 && pet.photoUrls.some(url => url && url.startsWith('http')) && (
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.5rem' }}>Photos</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {pet.photoUrls.filter(url => url && url.startsWith('http')).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${pet.name} photo ${i + 1}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #eee' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
          <button
            onClick={handleOrder}
            disabled={ordering || pet.status === 'sold'}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: pet.status === 'sold' ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: pet.status === 'sold' ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {ordering ? 'Placing order...' : pet.status === 'sold' ? 'Already sold' : '🛒 Order this pet'}
          </button>
          {orderResult && <p style={{ color: '#4caf50', marginTop: '0.75rem' }}>{orderResult}</p>}
          {orderError && <p style={{ color: '#d32f2f', marginTop: '0.75rem' }}>{orderError}</p>}
        </div>
      </div>
    </div>
  );
}

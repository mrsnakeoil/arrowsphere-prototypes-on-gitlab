import { useState, useEffect } from 'react';
import { useApiKey } from '../context/ApiKeyContext';
import { findPetsByStatus, Pet, PetStatus } from '../api/petstore';
import { PetCard } from './PetCard';

interface PetBrowserProps {
  onSelectPet: (pet: Pet) => void;
}

export function PetBrowser({ onSelectPet }: PetBrowserProps) {
  const { apiKey } = useApiKey();
  const [status, setStatus] = useState<PetStatus>('available');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    findPetsByStatus(apiKey, status)
      .then((data) => {
        if (!cancelled) {
          // Limit to first 50 for performance
          setPets(data.slice(0, 50));
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [apiKey, status]);

  const statuses: PetStatus[] = ['available', 'pending', 'sold'];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            style={{
              padding: '0.5rem 1.25rem',
              border: '1px solid #4a90d9',
              borderRadius: '20px',
              backgroundColor: status === s ? '#4a90d9' : 'white',
              color: status === s ? 'white' : '#4a90d9',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: status === s ? 600 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && <p>Loading pets...</p>}
      {error && <p style={{ color: '#d32f2f' }}>Error: {error}</p>}

      {!loading && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
        }}>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onClick={() => onSelectPet(pet)} />
          ))}
          {pets.length === 0 && <p>No pets found with status "{status}".</p>}
        </div>
      )}
    </div>
  );
}

import { Pet } from '../api/petstore';

interface PetCardProps {
  pet: Pet;
  onClick: () => void;
}

export function PetCard({ pet, onClick }: PetCardProps) {
  const statusColors: Record<string, string> = {
    available: '#4caf50',
    pending: '#ff9800',
    sold: '#f44336',
  };

  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1rem',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, transform 0.2s',
        backgroundColor: 'white',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>{pet.name || 'Unnamed'}</h3>
        {pet.status && (
          <span style={{
            backgroundColor: statusColors[pet.status] || '#999',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
          }}>
            {pet.status}
          </span>
        )}
      </div>
      <p style={{ color: '#666', margin: '0 0 0.25rem', fontSize: '0.85rem' }}>
        ID: {pet.id}
      </p>
      {pet.category && (
        <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>
          Category: {pet.category.name}
        </p>
      )}
    </div>
  );
}

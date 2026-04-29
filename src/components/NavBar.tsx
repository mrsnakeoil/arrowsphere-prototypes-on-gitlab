import { useApiKey } from '../context/ApiKeyContext';

interface NavBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function NavBar({ currentView, onNavigate }: NavBarProps) {
  const { isConnected } = useApiKey();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#1a1a2e',
      color: 'white',
    }}>
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>🐾 Petstore Browser</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => onNavigate('pets')}
          style={{
            background: currentView === 'pets' ? '#4a90d9' : 'transparent',
            color: 'white',
            border: '1px solid #4a90d9',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Pets
        </button>
        <button
          onClick={() => onNavigate('inventory')}
          style={{
            background: currentView === 'inventory' ? '#4a90d9' : 'transparent',
            color: 'white',
            border: '1px solid #4a90d9',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Inventory
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: isConnected ? '#4caf50' : '#999',
          display: 'inline-block',
        }} />
        <span style={{ fontSize: '0.875rem' }}>
          {isConnected ? 'Connected' : 'Not connected'}
        </span>
      </div>
    </nav>
  );
}

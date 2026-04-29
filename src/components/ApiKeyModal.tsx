import { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';

export function ApiKeyModal() {
  const { setApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleConnect = () => {
    if (!inputValue.trim()) {
      setError('Please enter an API key');
      return;
    }
    setApiKey(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConnect();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
      }}>
        <h2 style={{ marginTop: 0 }}>🔑 Connect to Petstore API</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Enter your Petstore API key. For the demo, use <code style={{ backgroundColor: '#f0f0f0', padding: '2px 6px', borderRadius: '3px' }}>special-key</code>.
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setError(''); }}
          onKeyDown={handleKeyDown}
          placeholder="Enter API key..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            marginBottom: '0.5rem',
          }}
          autoFocus
        />
        {error && <p style={{ color: '#d32f2f', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{error}</p>}
        <button
          onClick={handleConnect}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#4a90d9',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Connect
        </button>
        <p style={{ color: '#999', fontSize: '0.75rem', marginBottom: 0, marginTop: '1rem', textAlign: 'center' }}>
          Your key is held in memory only and never stored to disk.
        </p>
      </div>
    </div>
  );
}

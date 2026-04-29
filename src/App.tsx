import { useState } from 'react';
import { useApiKey } from './context/ApiKeyContext';
import { ApiKeyModal } from './components/ApiKeyModal';
import { NavBar } from './components/NavBar';
import { PetBrowser } from './components/PetBrowser';
import { PetDetail } from './components/PetDetail';
import { Inventory } from './components/Inventory';
import { Pet } from './api/petstore';

function App() {
  const { isConnected } = useApiKey();
  const [currentView, setCurrentView] = useState('pets');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  if (!isConnected) {
    return <ApiKeyModal />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <NavBar currentView={currentView} onNavigate={(view) => { setCurrentView(view); setSelectedPet(null); }} />
      {currentView === 'pets' && !selectedPet && (
        <PetBrowser onSelectPet={(pet) => setSelectedPet(pet)} />
      )}
      {currentView === 'pets' && selectedPet && (
        <PetDetail pet={selectedPet} onBack={() => setSelectedPet(null)} />
      )}
      {currentView === 'inventory' && (
        <Inventory />
      )}
    </div>
  );
}

export default App;

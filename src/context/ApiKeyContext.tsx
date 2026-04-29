import { createContext, useContext, useState, ReactNode } from 'react';

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isConnected: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey, isConnected: apiKey.length > 0 }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey(): ApiKeyContextType {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
}

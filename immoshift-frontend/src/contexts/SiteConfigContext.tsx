import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { SiteConfig } from '../models/SiteConfig';

interface SiteConfigContextType {
  config: SiteConfig | null;
  loading: boolean;
  error: string | null;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: null,
  loading: true,
  error: null,
});

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const data = await api.getSiteConfig();
        setConfig(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch site configuration:', err);
        setError('Failed to load site configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

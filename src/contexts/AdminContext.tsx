import React, {
  createContext, useContext, useState, useMemo, FC, useCallback,
} from 'react';
import { AdminContextType, AdminProviderProps } from '../types';

const defaultContextValue: AdminContextType = {
  isManagerToolsVisible: false,
  toggleManagerTools: () => {},
  setManagerToolsVisible: () => {},
};

const AdminContext = createContext<AdminContextType>(defaultContextValue);

export const useAdmin = (): AdminContextType => useContext(AdminContext);
export const AdminProvider: FC<AdminProviderProps> = ({ children }) => {
  const [isManagerToolsVisible, setIsManagerToolsVisible] = useState(false);

  const toggleManagerTools = useCallback(() => {
    setIsManagerToolsVisible((prevState) => !prevState);
  }, []);

  const value = useMemo(() => ({
    isManagerToolsVisible,
    toggleManagerTools,
    setManagerToolsVisible: setIsManagerToolsVisible,
  }), [isManagerToolsVisible, toggleManagerTools]);

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

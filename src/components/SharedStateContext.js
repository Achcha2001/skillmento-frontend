import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [bidStatus, setBidStatus] = useState(null);

  const updateBidStatus = (status) => {
    setBidStatus(status);
  };

  return (
    <SharedStateContext.Provider value={{ bidStatus, updateBidStatus }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};

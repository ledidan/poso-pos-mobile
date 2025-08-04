import React, { createContext, useContext, useRef, useCallback } from 'react';

const DismissActionContext = createContext(null);

export const DismissActionProvider = ({ children }) => {
  const dismissActionsRef = useRef(new Map());

  const registerDismissAction = useCallback((key, action) => {
    dismissActionsRef.current.set(key, action);
  }, []);

  const unregisterDismissAction = useCallback((key) => {
    dismissActionsRef.current.delete(key);
  }, []);

  const dismissAllActions = useCallback(() => {
    dismissActionsRef.current.forEach((action) => action());
  }, []);

  const value = {
    registerDismissAction,
    unregisterDismissAction,
    dismissAllActions,
  };

  return (
    <DismissActionContext.Provider value={value}>
      {children}
    </DismissActionContext.Provider>
  );
};

export const useDismissAction = () => {
  return useContext(DismissActionContext);
};
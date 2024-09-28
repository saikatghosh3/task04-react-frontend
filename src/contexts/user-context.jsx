import React, { useState, useEffect, useCallback } from 'react';
import { getAuthClient } from '../services/auth';

export const UserContext = React.createContext(undefined);

export function UserProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = useCallback(async () => {
    try {
      const { data, error } = await getAuthClient().getUser();

      if (error) {
        console.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      console.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  useEffect(() => {
    checkSession().catch((err) => {
      console.error(err);
    });
  }, [checkSession]);

  return <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;

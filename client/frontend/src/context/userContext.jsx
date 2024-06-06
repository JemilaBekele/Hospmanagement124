import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get('/api/v1/auth/profile', { withCredentials: true }).then(({ data }) => {
        console.log('User data:', data); // Log user data to the console
        setUser(data);
      });
    }
  }, [user]); // Include user as a dependency to prevent unnecessary API calls.

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
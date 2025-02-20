// context/UserContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { User } from './data';

const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // State to store the user object

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];

      return value ? JSON.parse(decodeURIComponent(value)) : null; // Parse the cookie value
    };

    const userData = getCookie('user'); // Retrieve the user object from cookies
    setUser(userData); // Update the state with the user object
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
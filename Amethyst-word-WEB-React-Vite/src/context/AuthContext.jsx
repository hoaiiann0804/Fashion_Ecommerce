import { createContext, useState } from 'react';

export const AuthContext = createContext({
  username: null,
  setUsername: () => {},
});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  
  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  )
};
import { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../store/profile';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    dispatch(signOutUser());
  };

  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

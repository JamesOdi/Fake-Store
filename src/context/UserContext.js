import { createContext, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, refreshUserProfile, signOutUser } from '../store/profile';
import { deleteUserProfile, saveUserProfile } from '../lib/api-request';

export const UserContext = createContext(null);

export function UserProvider({ children, user, setUser }) {
  const selectorData = useSelector(getUser);
  const dispatch = useDispatch();

  const login = (userData, navigation) => {
    setUser(userData);
    navigation.replace('Profile');
  };

  const logout = (navigation) => {
    dispatch(signOutUser());
    setUser(null);
    new Promise(async () => {
      await deleteUserProfile();
    });
    if (navigation) {
      navigation.replace('Authentication');
    }
  };

  const updateUser = (newData) => {
    const newUserData = { ...user, name: newData.name };
    setUser(newUserData);
    new Promise(async () => {
      // Save the user profile to the async storage
      // For persistence when app is closed and restarted
      await saveUserProfile(newUserData);
    });
  };

  useLayoutEffect(() => {
    if (!selectorData.user && user) {
      dispatch(refreshUserProfile(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

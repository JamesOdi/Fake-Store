import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavBar from './src/components/BottomTabBar';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { UserProvider } from './src/context/UserContext';
import * as SplashScreen from 'expo-splash-screen';
import { useLayoutEffect, useState } from 'react';
import { deleteUserProfile, getUserProfile } from './src/lib/api-request';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null);
  const [appReady, setAppReady] = useState(false);

  useLayoutEffect(() => {
    const prepare = async () => {
      const savedUser = await getUserProfile();
      if (savedUser) {
        setUser(savedUser);
      } else {
        setUser(null);
        await deleteUserProfile();
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppReady(true);
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  if (!appReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <UserProvider user={user} setUser={(userData) => setUser(userData)}>
        <NavigationContainer>
          <BottomTabNavBar />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}

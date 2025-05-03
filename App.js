import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavBar from './src/components/BottomTabBar';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { UserProvider } from './src/context/UserContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <BottomTabNavBar />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}

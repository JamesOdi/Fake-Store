import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavBar from './src/components/BottomTabBar';
import { Provider } from 'react-redux';
import store from './src/store/store';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavBar />
      </NavigationContainer>
    </Provider>
  );
}

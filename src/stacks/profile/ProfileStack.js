import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/Profile';
import useUser from '../../hooks/useUser';
import EditProfile from '../../screens/EditProfile';
import Authentication from '../../screens/Authentication';

export default function ProfileStack() {
  const Stack = createStackNavigator();
  const { user } = useUser();

  const stackScreens = [
    { name: 'Profile', component: Profile, title: 'Profile' },
    { name: 'EditProfile', component: EditProfile, title: 'Edit Profile' },
    {
      name: 'Authentication',
      component: Authentication,
      title: 'Sign In / Sign Up',
    },
  ];

  // Determine initial route based on user
  const initialRouteName = user ? 'Profile' : 'Authentication';

  return (
    <Stack.Navigator key={initialRouteName} initialRouteName={initialRouteName}>
      {stackScreens.map(({ name, component, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title,
            headerShown: name !== 'Authentication',
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

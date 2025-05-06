import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Context
import { AuthContext } from '../context/AuthContext';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Screens
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  // Hiển thị SplashScreen khi đang load
  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Đã đăng nhập
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        // Chưa đăng nhập
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
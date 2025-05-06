import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/home/HomeScreen';
import ProgressScreen from '../screens/home/ProgressScreen';
import AchievementScreen from '../screens/home/AchievementScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Trang chủ' }}
      />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen} 
        options={{ title: 'Tiến độ học tập' }}
      />
      <Stack.Screen 
        name="Achievement" 
        component={AchievementScreen} 
        options={{ title: 'Thành tích' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
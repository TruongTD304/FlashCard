import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import AchievementScreen from '../screens/profile/AchievementScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'Hồ sơ cá nhân' }}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Cài đặt' }}
      />
      <Stack.Screen 
        name="UserAchievement" 
        component={AchievementScreen} 
        options={{ title: 'Thành tích' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// Stacks
import HomeStack from './HomeStack';
import FlashcardStack from './FlashcardStack';
import GameStack from './GameStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'FlashcardTab') {
            iconName = 'style';
          } else if (route.name === 'GameTab') {
            iconName = 'videogame-asset';
          } else if (route.name === 'ProfileTab') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee', // Màu chính
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ title: 'Trang chủ' }}
      />
      <Tab.Screen 
        name="FlashcardTab" 
        component={FlashcardStack} 
        options={{ title: 'Thẻ ghi nhớ' }}
      />
      <Tab.Screen 
        name="GameTab" 
        component={GameStack} 
        options={{ title: 'Trò chơi' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileStack} 
        options={{ title: 'Cá nhân' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
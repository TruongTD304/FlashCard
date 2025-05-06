import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import GamesScreen from '../screens/games/GamesScreen';
import QuizScreen from '../screens/games/QuizScreen';
import MatchingGameScreen from '../screens/games/MatchingGameScreen';

const Stack = createStackNavigator();

const GameStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Games" 
        component={GamesScreen} 
        options={{ title: 'Trò chơi' }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen} 
        options={{ title: 'Trắc nghiệm' }}
      />
      <Stack.Screen 
        name="MatchingGame" 
        component={MatchingGameScreen} 
        options={{ title: 'Ghép từ vựng' }}
      />
    </Stack.Navigator>
  );
};

export default GameStack;
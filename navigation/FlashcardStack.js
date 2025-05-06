import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import FlashcardLibraryScreen from '../screens/flashcards/FlashcardLibraryScreen';
import CreateFlashcardScreen from '../screens/flashcards/CreateFlashcardScreen';
import StudyFlashcardScreen from '../screens/flashcards/StudyFlashcardScreen';
import ReminderSettingsScreen from '../screens/flashcards/ReminderSettingsScreen';

const Stack = createStackNavigator();

const FlashcardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FlashcardLibrary" 
        component={FlashcardLibraryScreen} 
        options={{ title: 'Thư viện từ vựng' }}
      />
      <Stack.Screen 
        name="CreateFlashcard" 
        component={CreateFlashcardScreen} 
        options={{ title: 'Tạo thẻ ghi nhớ' }}
      />
      <Stack.Screen 
        name="StudyFlashcard" 
        component={StudyFlashcardScreen} 
        options={{ title: 'Ôn tập từ vựng' }}
      />
      <Stack.Screen 
        name="ReminderSettings" 
        component={ReminderSettingsScreen} 
        options={{ title: 'Cài đặt nhắc nhở' }}
      />
    </Stack.Navigator>
  );
};

export default FlashcardStack;
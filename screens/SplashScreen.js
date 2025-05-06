import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        duration={1500}
        style={styles.logoContainer}
      >
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>
      
      <Animatable.Text
        animation="fadeIn"
        iterationCount={1}
        style={styles.title}
      >
        Flashcard App
      </Animatable.Text>
      
      <Animatable.Text
        animation="fadeIn"
        delay={500}
        style={styles.subtitle}
      >
        Học từ vựng hiệu quả mỗi ngày
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default SplashScreen;
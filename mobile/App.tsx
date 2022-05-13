import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { Inter_400Regular, Inter_500Medium, useFonts } from '@expo-google-fonts/inter';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Widget from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  SplashScreen.preventAutoHideAsync();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  })

  if(!fontsLoaded) {
    return null
  }

  SplashScreen.hideAsync();

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <StatusBar style="auto" />
  
      <Widget />
    </View>
  );
}

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from './src/context/LanguageContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/components/organisms/MainNavigator';
import { NotificationProvider } from './src/context/NotificationContext';

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar 
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent />
      <LanguageProvider>
        <NotificationProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaView edges={['bottom']} style={styles.container}>
                <MainNavigator />
              </SafeAreaView>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </NotificationProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

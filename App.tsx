import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { LanguageProvider } from './src/context/LanguageContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/components/organisms/MainNavigator';

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent />
      <LanguageProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView edges={['bottom']} style={styles.container}>
              <MainNavigator />
            </SafeAreaView>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </LanguageProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

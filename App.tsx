import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { MainPage } from './src/components/pages/MainPage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants/Colors';

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent />
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={styles.container}>
          <MainPage />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
});

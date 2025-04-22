import React from 'react';
import { SafeAreaView } from 'react-native';
import { MainPage } from './src/components/pages/MainPage';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainPage />
    </SafeAreaView>
  );
}

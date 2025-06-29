import React, { useCallback, useEffect } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LanguageProvider } from "./src/context/LanguageContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./src/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainNavigator from "./src/components/organisms/MainNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansKR: require("./assets/fonts/NotoSansKR_VariableFont_wght.ttf"),
    NotoSansJP: require("./assets/fonts/NotoSansJP_VariableFont_wght.ttf"),
  });

  useEffect(() => {
    const loadFinish = async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    };

    loadFinish();
  }, [fontsLoaded, fontError]);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <LanguageProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView
              edges={["bottom"]}
              style={styles.container}
            >
              <MainNavigator />
            </SafeAreaView>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

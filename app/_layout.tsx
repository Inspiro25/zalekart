import React, { useEffect, useState, useRef } from "react";
import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, Animated, Easing } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { Platform } from "react-native";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { AddressProvider } from "../context/AddressContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function SplashScreenComponent() {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate the progress bar
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1800,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Fade out animation after progress completes
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, []);

  return (
    <Animated.View 
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#151D3B',
        opacity: fadeAnim
      }}
    >
      <View className="items-center px-6">
        <View className="w-32 h-32 bg-white rounded-full shadow-lg justify-center items-center mb-8">
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/687/687259.png" }} 
            style={{ width: 64, height: 64 }}
            resizeMode="contain"
          />
        </View>
        <Text className="text-3xl font-bold text-white mb-2">ZaleKart</Text>
        <Text className="text-gray-300 text-center mb-12">India's #1 Shopping App</Text>
        <View className="h-2 w-72 bg-gray-700 rounded-full overflow-hidden">
          <Animated.View 
            className="h-full bg-blue-500 rounded-full" 
            style={{ 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
}

function AppLayout() {
  const theme = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash after a delay
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenComponent />;
  }

  return (
    <>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.backgroundColor,
          },
        })}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="shop/[id]" />
        <Stack.Screen name="seller/dashboard" />
        <Stack.Screen name="categories/index" />
        <Stack.Screen name="shops/index" />
        <Stack.Screen name="account/index" />
        <Stack.Screen name="account/orders" />
        <Stack.Screen name="account/wishlist" />
        <Stack.Screen name="account/addresses" />
        <Stack.Screen name="account/payments" />
        <Stack.Screen name="account/settings" />
        <Stack.Screen name="search/index" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (process.env.EXPO_PUBLIC_TEMPO && Platform.OS === "web") {
      const { TempoDevtools } = require("tempo-devtools");
      TempoDevtools.init();
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AddressProvider>
        <NavigationThemeProvider value={DefaultTheme}>
          <AppLayout />
        </NavigationThemeProvider>
      </AddressProvider>
    </ThemeProvider>
  );
}

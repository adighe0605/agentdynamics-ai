import "../global.css";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppFooter } from "@/components/AppFooter";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View className="flex-1">
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#FFFFFF" },
              headerTintColor: "#0A1F3D",
              headerTitleStyle: { fontWeight: "600" },
              contentStyle: { backgroundColor: "#F8FAFC" },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </View>
        <AppFooter />
      </View>
    </SafeAreaProvider>
  );
}

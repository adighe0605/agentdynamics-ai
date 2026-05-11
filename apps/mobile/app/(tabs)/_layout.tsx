import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00B5E2",
        tabBarInactiveTintColor: "#475569",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E1E8F2",
        },
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerTintColor: "#0A1F3D",
        headerTitleStyle: { fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Overview" }} />
      <Tabs.Screen name="leads" options={{ title: "Leads" }} />
      <Tabs.Screen name="calls" options={{ title: "Calls" }} />
    </Tabs>
  );
}

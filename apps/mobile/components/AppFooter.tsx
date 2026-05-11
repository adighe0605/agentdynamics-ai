import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Persistent developer-credit footer pinned above the home indicator on every
 * screen. Matches the web app's fixed-bottom strip.
 */
export function AppFooter() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="border-t border-navy-100 bg-white/95"
    >
      <View className="px-4 py-2">
        <Text className="text-center text-[11px] text-slate">
          Developed by{" "}
          <Text className="font-semibold text-navy-800">Akshay Dighe</Text>
        </Text>
      </View>
    </View>
  );
}

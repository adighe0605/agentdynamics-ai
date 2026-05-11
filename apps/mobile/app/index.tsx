import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-12 w-12 items-center justify-center rounded-md bg-navy-800">
          <Text className="text-white font-bold">AD</Text>
        </View>
        <Text className="mt-6 text-center text-3xl font-semibold tracking-tight text-navy-900">
          AgentDynamics
        </Text>
        <Text className="mt-2 max-w-xs text-center text-base text-slate">
          Your AI Employee on the go. Monitor calls, hot leads, and appointments
          from anywhere.
        </Text>

        <View className="mt-10 w-full max-w-sm gap-3">
          <Pressable className="rounded-md bg-cyan-500 px-4 py-3 active:bg-cyan-600">
            <Text className="text-center font-semibold text-white">
              Continue with Google
            </Text>
          </Pressable>
          <Pressable className="rounded-md border border-navy-100 bg-white px-4 py-3 active:bg-mist">
            <Text className="text-center font-semibold text-navy-800">
              Continue with Microsoft
            </Text>
          </Pressable>
          <Pressable className="rounded-md border border-navy-100 bg-white px-4 py-3 active:bg-mist">
            <Text className="text-center font-semibold text-navy-800">
              Continue with Apple
            </Text>
          </Pressable>
        </View>

        <Link href="/(tabs)/dashboard" asChild>
          <Pressable className="mt-8">
            <Text className="text-sm font-medium text-cyan-600">
              Skip to demo dashboard →
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

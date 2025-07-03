import { Stack } from "expo-router";
import SafeScreen from "@/components/SafeScreen"

// basically the root layout as the function name suggests

export default function RootLayout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown : false }}/>
    </SafeScreen>
  );  
}

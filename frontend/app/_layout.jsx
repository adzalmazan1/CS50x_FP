import SafeScreen from "@/components/SafeScreen"; // created comp

import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

// ClerkProvidercomponent provides session and user context to Clerk's hooks and components
// wrap your entire app at the entry point with ClerkProvider to make authentication globally accessible
export default function RootLayout() {
  return (
    /*
      tokenCache:
      - recommended way to store sensitive data, such as tokens, is by using expo-secure-store
    */
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </ClerkProvider>
  );  
};
import { Redirect  } from "expo-router";
import { Stack } from "expo-router/stack";
import { useUser } from "@clerk/clerk-expo";

// via Codesistency
export default function Layout() {
  const { isSignedIn } = useUser(); // isSignedin checker

  if (!isSignedIn) return <Redirect href={"/sign-in"} />; // sign-in as default page

  return <Stack screenOptions={{ headerShown : false }} />;
}
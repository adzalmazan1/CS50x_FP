import { ErrorBox } from "@/components/ErrorBox";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Link, useRouter } from 'expo-router';
import { styles } from "@/assets/styles/auth.styles.js";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import { genStyles } from "../../assets/styles/general.styles";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  
  // additional state: for handling Error states
  const[error, setError] = useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    
    // To do: error and setError handling
    } catch (err) {
        setError(err.errors?.[0]?.message);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex : 1 }}
      contentContainerStyle={{ flexGrow : 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      >

      <View style={styles.container}>

        <Image source={require("../../assets/images/waterDispenserJug.png")} style={styles.illustration}></Image>
        <Text style={styles.title}>Welcome Back</Text>

        <ErrorBox error={error} setError={setError} />

        <TextInput
          style={[styles.input, error && genStyles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(email) => setEmailAddress(email)}
        />

        <TextInput
          style={[styles.input, error && genStyles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>

          {/* Not able to use router.back() */}
          {/* In React Native, specifically when using Expo Router, the Link component provides an asChild prop to customize its rendering behavior. */}
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}
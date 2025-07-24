import { ErrorBox } from "@/components/ErrorBox";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { styles } from "@/assets/styles/auth.styles.js";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import { genStyles } from "../../assets/styles/general.styles";

export default function SignUpScreen() {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  // additional state: Error state
  const[error, setError] = useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
        setError(err.errors?.[0]?.longMessage);
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      // console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.longMessage);
    }
  }

  // update the pendingVerification UI
  // temporarily set to 'true' instead of 'pendingVerification' to modify styles
  // added View before text
  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
        
        {/* If there's an error, display the UI below */}
        <ErrorBox error={error} setError={setError}/>
        
        {/* Conditional styles using array */}
        <TextInput
          style={[styles.verificationInput, error && genStyles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          placeholderTextColor="#9A8478"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // To do: styles of sign up page
  return (
    <KeyboardAwareScrollView 
      style={{ flex : 1 }}
      contentContainerStyle={{ flexGrow : 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >  
      <View style={styles.container}>
        {/* Edit sign-up area */}
        {/* Note on single and double brace usage for jsx */}

        {/* Image on top of */}
        <Image source={require("../../assets/images/waterDispenserBottle.png")} style={styles.illustration}></Image>
        <Text style={styles.title}>Create Account</Text>

        {/* Add error checker here */}
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

        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </KeyboardAwareScrollView>
  )
}
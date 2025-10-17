import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { firebaseConfig } from '@/config/config';

// contexts
import { AuthContext } from '@/contexts/AuthContext';
import { UserCredential } from 'firebase/auth';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // initialise firebase
  const FBapp = firebase.initializeApp(firebaseConfig)
  // initialise firebase authentication
  const FBauth:any = firebase.auth()


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContext.Provider value={FBauth}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
      </AuthContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

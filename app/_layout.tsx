import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { firebaseConfig } from '@/config/config';
import { getFirestore } from 'firebase/firestore';

// contexts
import { AuthContext } from '@/contexts/AuthContext';
import { DataContext } from '@/contexts/DataContext';
import { UserCredential } from 'firebase/auth';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // initialise firebase
  const FBapp = firebase.initializeApp(firebaseConfig)
  // initialise firebase authentication
  const FBauth: any = firebase.auth()
  // initialise firebase firestore
  const FBfs: any = getFirestore(FBapp)



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthContext.Provider value={FBauth}>
        <DataContext.Provider value={FBfs}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </DataContext.Provider>
      </AuthContext.Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

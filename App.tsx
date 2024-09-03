import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from './src/routes';
import { useEffect } from 'react';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/Ionicons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const client = new QueryClient();

export default function App() {

  useEffect(() => {
    async function Tryout() {
      await Icon.loadFont()
    }

    Tryout()
  }, [])

  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <GestureHandlerRootView>
            <QueryClientProvider client={client}>
              <StatusBar barStyle="light-content" backgroundColor={"#121214"} />
              <Routes />
            </QueryClientProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}

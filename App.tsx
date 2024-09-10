import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from './src/routes';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNotifications } from 'react-native-notificated';
import { ThemeProvider } from './src/context/themeContext';

const client = new QueryClient();
const { NotificationsProvider, useNotifications, ...events } = createNotifications()
export default function App() {

  useEffect(() => {
    async function Tryout() {
      await Icon.loadFont()
    }

    Tryout()
  }, [])

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <GestureHandlerRootView>
              <QueryClientProvider client={client}>
                <StatusBar barStyle="light-content" backgroundColor={"#121214"} />
                <Routes />
                <NotificationsProvider />
              </QueryClientProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from './src/routes';

const client = new QueryClient()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <QueryClientProvider client={client}>
            <StatusBar barStyle="light-content" backgroundColor={"#121214"} />
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}


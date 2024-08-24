import { createContext, useEffect, useState } from "react";
import { Session } from "../service/Session/session";
import { FieldValues } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { ActivityIndicator, Alert, View } from "react-native";
interface AuthContextData {
  signed: boolean;
  user: {
    id: string;
    name: string;
    secondName: string
    role: string;
    email: string;
    token: string;
    avatar: string
  } | null
  singInFc(data: FieldValues): Promise<void>
  logoutFc(): Promise<void>
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  secondName: string
  role: string;
  email: string;
  token: string;
  avatar: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadStoragedData() {
      try {

        const storagedToken = await AsyncStorage.getItem('token');
        const storagedUser = await AsyncStorage.getItem('user');

        if (storagedToken && storagedUser) {
          setUser(JSON.parse(storagedUser));

          const decodedToken = jwtDecode(storagedToken);
          const currentDate = new Date();
          const expirationDate = new Date(Number(decodedToken?.exp) * 1000);

          if (expirationDate < currentDate) {
            await AsyncStorage.clear();
            setUser(null);
            console.log('Token expirou e os dados foram limpos.');
          }

        }
      } catch (error) {
        console.error('Erro ao carregar os dados do armazenamento:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  async function singInFc(dataValue: FieldValues) {
    try {
      setLoading(true);
      const response = await Session(dataValue)
      const { data } = response
      setUser(data.user)
      await AsyncStorage.setItem('token', data.user.token)
      await AsyncStorage.setItem('user', JSON.stringify(data.user))
      setLoading(false);
    } catch (e) {
      console.log(e)
      console.log(JSON.stringify(e, null, 4))
      Alert.alert("Erro no Login", "Não foi possível realizar o login. Por favor, verifique suas credenciais e tente novamente.");
      setLoading(false);
    }
  }

  async function logoutFc() {
    await AsyncStorage.clear();
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, singInFc, loading, logoutFc }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthContext;

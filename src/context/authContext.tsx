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

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoragedData();
  }, []);

  async function loadStoragedData() {
    try {
      const storagedToken = await AsyncStorage.getItem('token');
      const storagedUser = await AsyncStorage.getItem('user');

      if (storagedToken && storagedUser) {
        const decodedToken = jwtDecode(storagedToken);
        const currentDate = new Date();

        // Verifica a expiração corretamente
        const expirationDate = new Date(Number(decodedToken?.exp) * 1000);
        if (expirationDate < currentDate) {
          // Token expirou
          setUser(null);
          await AsyncStorage.clear()
        } else {
          // Token ainda é válido
          setUser(JSON.parse(storagedUser));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar os dados do armazenamento:', error);
    } finally {
      setLoading(false);
    }
  }

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
      //console.log(e)
      //console.log(JSON.stringify(e, null, 4))
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
        <View className="flex items-center justify-center h-screen w-full bg-[#121214]">
          <ActivityIndicator size="large" color={"#B66182"} />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export default AuthContext;

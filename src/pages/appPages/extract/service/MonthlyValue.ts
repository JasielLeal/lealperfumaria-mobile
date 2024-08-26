import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend } from "../../../../service/backend";

export interface MonthlyValueRequest {
  monthSelected: string;
}

export async function MonthlyValue({ monthSelected }: MonthlyValueRequest) {
  const token = await AsyncStorage.getItem("token:");
  
  const response = await backend.get(`sale/monthlyvalue/${monthSelected}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

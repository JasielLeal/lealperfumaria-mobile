import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend } from "../../../../service/backend";

export interface DeleteSaleRequest {
  saleId: string;
}

export async function DeleteSale({ saleId }: DeleteSaleRequest) {
  const token = await AsyncStorage.getItem("token");

  const response = await backend.delete(`sale/delete/${saleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

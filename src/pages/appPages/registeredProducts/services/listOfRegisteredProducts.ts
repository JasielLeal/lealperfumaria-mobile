import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend } from "../../../../service/backend";

export interface ListOfRegisteredProductsResponse {
  take: number;
  skip: number;
  search: string;
}

export async function ListOfRegisteredProducts({
  search,
  take,
  skip,
}: ListOfRegisteredProductsResponse) {
  const token = await AsyncStorage.getItem("token");
  const response = await backend.get(`/bankproduct/getall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search,
      take,
      skip,
    },
  });

  return response.data;
}

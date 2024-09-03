import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend } from "../../../../service/backend";

export interface monthlyExtractRequest {
  month: string;
  search: string | undefined;
  take: number;
  skip: number;
}

export async function monthlyExtract({
  month,
  search,
  skip,
  take,
}: monthlyExtractRequest) {
  const token = await AsyncStorage.getItem("token");

  const response = await backend.get(`sale/monthlyextract/${month}`, {
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

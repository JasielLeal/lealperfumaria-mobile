import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function CreateBankProduct(data: FieldValues) {
  const token = await AsyncStorage.getItem("token");

  const response = await backend.post(
    `/bankproduct/create`,
    {
      name: data.name,
      value: data.value,
      code: data.code,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

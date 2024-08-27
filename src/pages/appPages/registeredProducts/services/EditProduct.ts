import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function EditProduct(data: FieldValues) {
  const token = await AsyncStorage.getItem("token");
  const response = await backend.put(
    `bankproduct/update`,
    {
      id: data.id,
      name: data.name,
      code: data.code,
      value: data.value,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function AddProductsToShoppinList(code: FieldValues) {

    const token = await AsyncStorage.getItem('token:');

    const response = await backend.post(`/bankproduct/find`, {
        code
    },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response
}

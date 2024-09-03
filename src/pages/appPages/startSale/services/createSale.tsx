import { backend } from "../../../../service/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CreateSaleProsps {
    customerName: string;
    selectedValue: string;
    products: { code: string; amount: string }[];
}

export async function CreateSale({
    customerName,
    products,
    selectedValue,
}: CreateSaleProsps) {


    const token = await AsyncStorage.getItem("token");
    const response = await backend.post(
        `sale/create`,
        {
            customerName,
            transictionType: selectedValue,
            products,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response;
}

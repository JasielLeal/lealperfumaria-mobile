import AsyncStorage from "@react-native-async-storage/async-storage";
import { backend } from "../../../../service/backend";

export async function ListingOfAllUsers() {
    const token = await AsyncStorage.getItem("token");
    const response = await backend.get("/user/getallusers", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data
}

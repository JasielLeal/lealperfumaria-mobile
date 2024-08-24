import { FieldValues } from "react-hook-form";
import { backend } from "../backend";

export async function Session(data: FieldValues) {
    
    const response = await backend.post("/user/auth", {
        email: data.email,
        password: data.password,
    });
    return response
}

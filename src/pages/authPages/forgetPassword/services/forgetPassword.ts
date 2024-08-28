import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";

export async function ForgetPasswordService(data: FieldValues) {
  const response = await backend.post("/user/forgetpassword", {
    email: data.email,
  });
  return response;
}

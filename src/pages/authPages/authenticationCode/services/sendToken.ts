import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";

export async function SendToken(data: FieldValues) {
  const token = data.code
  const response = await backend.post(`user/recovery?token=${token}`, {});
  return response;
}

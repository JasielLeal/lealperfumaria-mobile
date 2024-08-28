import { FieldValues } from "react-hook-form";
import { backend } from "../../../../service/backend";

interface changePasswordProps {
  data: FieldValues;
  code: string;
}

export async function ChangePassword({ data, code }: changePasswordProps) {

  const password = data.password
  const response = await backend.put(`user/changepassword?token=${code}`, {
     password
  });
  return response;
}

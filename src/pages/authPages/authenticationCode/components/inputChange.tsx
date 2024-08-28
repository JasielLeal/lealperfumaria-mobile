import { Controller, FieldValues, useForm } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import { Input } from "../../../../components/input/input";
import { PrimaryButton } from "../../../../components/primaryButton/primaryButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "../schemas/newPassword";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword } from "../services/changePassword";
import { useState } from "react";
import { Congratulations } from "./congratulations";

export function InputChange({ code }: FieldValues) {

    
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(newPasswordSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
    });

    const [congratulations, setCongratulations] = useState(false)

    const { mutateAsync: ChangePasswordFn } = useMutation({
        mutationFn: ChangePassword,
        onSuccess: () => {
            Alert.alert('Sucesso')
            setCongratulations(true)
        },
        onError: (e) => {
            Alert.alert('Error')
            console.log('Erro detalhado:', JSON.stringify(e, null, 2));
        },
    })

    async function handleCode(data: FieldValues) {
        await ChangePasswordFn({ data, code });
    }

    return (
        <>
            {congratulations ?
                <Congratulations />
                :
                <View className="px-5">
                    <View className="flex items-center mt-40">
                        <Text className="text-xl text-white">Redefinir senha</Text>
                        <Text className="mb-5 text-text text-center">Informe a sua nova senha</Text>
                    </View>
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    placehoulder="senha" keyboardType="default"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </>
                        )}
                    />
                    <PrimaryButton name="Enviar" onPress={handleSubmit(handleCode)} className="mt-5" />
                </View>
            }
        </>
    )
}
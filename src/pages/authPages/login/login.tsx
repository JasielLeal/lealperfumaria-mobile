import { View, Text, ImageBackground, Image, ScrollView, Alert } from "react-native";
import { Input } from "../../../components/input/input";
import { PrimaryButton } from "../../../components/primaryButton/primaryButton";
import AuthContext from "../../../context/authContext";
import { useContext } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "./schemas/LoginSchema";

export function Login() {
    const { singInFc } = useContext(AuthContext);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
    });

    async function handleLogin(data: FieldValues) {
        await singInFc(data);
    }

    return (
        <ImageBackground
            source={require('../../../assets/backgroundLogin.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View className="flex items-center mt-40">
                    <Image source={require('../../../assets/logo.png')} className="w-[70px] h-[70px]" />
                    <Text className="text-white">Leal Perfumaria</Text>
                </View>
                <View className="px-5">
                    <View className="flex items-center mt-40">
                        <Text className="text-xl mb-5 text-white">Acesse seu Espaço</Text>
                    </View>
                    <Controller
                        control={control}
                        name='email'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    placehoulder="E-mail" keyboardType="email-address"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.email && <Text className="text-red-500">{errors.email.message as string}</Text>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className="my-5">
                                <Input placehoulder="Senha" secureTextEntry onChangeText={onChange} onBlur={onBlur} value={value} />
                                {errors.password && <Text className="text-red-500">{errors.password.message as string}</Text>}
                            </View>
                        )}
                    />
                    <PrimaryButton name="Acessar" onPress={handleSubmit(handleLogin)} />
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

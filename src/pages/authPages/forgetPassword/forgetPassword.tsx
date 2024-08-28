import { View, Text, ImageBackground, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Input } from "../../../components/input/input";
import { PrimaryButton } from "../../../components/primaryButton/primaryButton";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgetPasswordSchema } from "./schemas/ForgetPassword";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../types/navigation";
import { useMutation } from "@tanstack/react-query";
import { ForgetPasswordService } from "./services/forgetPassword";
import axios from "axios";

export function ForgetPassword() {
    type SaleDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<SaleDetailsScreenNavigationProp>();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ForgetPasswordSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
    });

    const { mutateAsync: ForgetPasswordServiceFn } = useMutation({
        mutationFn: ForgetPasswordService,
        onSuccess: () => {
            navigation.navigate('AuthenticationCode')
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                switch (status) {
                    case 404: 'E-mail não cadastrado'
                }
            }
        },
    })

    async function handleLogin(data: FieldValues) {
        await ForgetPasswordServiceFn(data)
    }

    return (
        <ImageBackground
            source={require('../../../assets/backgroundLogin.png')}
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View className="flex items-center mt-32">
                    <Image source={require('../../../assets/logo.png')} className="w-[70px] h-[70px]" />
                    <Text className="text-white">Leal Perfumaria</Text>
                </View>
                <View className="px-5">
                    <View className="flex items-center mt-40">
                        <Text className="text-xl mb-5 text-white">Digite seu e-mail abaixo</Text>
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
                    <PrimaryButton name="Enviar" onPress={handleSubmit(handleLogin)} className="mt-5" />
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text className="text-center text-text mt-5">Voltar para o login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

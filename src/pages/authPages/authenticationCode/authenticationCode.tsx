import { View, Text, ImageBackground, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Input } from "../../../components/input/input";
import { PrimaryButton } from "../../../components/primaryButton/primaryButton";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthenticationCodeSchema } from "./schemas/authenticationCode";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../types/navigation";
import { useMutation } from "@tanstack/react-query";
import { SendToken } from "./services/sendToken";
import { useState } from "react";
import { InputChange } from "./components/inputChange";

export function AuthenticationCode() {

    type SaleDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<SaleDetailsScreenNavigationProp>();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(AuthenticationCodeSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
    });

    const { mutateAsync: SendTokenFn } = useMutation({
        mutationFn: SendToken,
        onSuccess: () => {
            Alert.alert('Sucesso', 'Codigo enviado com sucesso')
            setSucessCode(true)
        },
        onError: (e) => {
            //console.log(e)
            //console.log('Erro detalhado:', JSON.stringify(e, null, 2));
            Alert.alert('Error', 'Houve um erro ao codigo ser enviado')
        },
    })

    const [sucessCode, setSucessCode] = useState(false)
    const [code, setCode] = useState()

    async function handleCode(data: FieldValues) {
        await SendTokenFn(data);
        setCode(data.code)
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
                {sucessCode ?
                    <InputChange code={code} />
                    :
                    <View className="px-5">
                        <View className="flex items-center mt-40">
                            <Text className="text-xl text-white">Redefinir senha</Text>
                            <Text className="mb-5 text-text text-center">Foi enviado um codigo de redefinição para seu e-mail.</Text>
                        </View>
                        <Controller
                            control={control}
                            name='code'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <Input
                                        placehoulder="Codigo..." keyboardType="decimal-pad"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                    {errors.email && <Text className="text-red-500">{errors.email.message as string}</Text>}
                                </>
                            )}
                        />
                        <PrimaryButton name="Enviar" onPress={handleSubmit(handleCode)} className="mt-5" />
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                            <Text className="text-center text-text mt-5 font-medium">Voltar ao login</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>
        </ImageBackground>
    );
}

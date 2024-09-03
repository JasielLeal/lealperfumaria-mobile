import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../../../components/button/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExtractOfTheDay } from "../services/ExtractOfTheDay";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";

export function Card() {

    const [openEye, setOpenEye] = useState(false)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { data: extractOfTheDay } = useQuery({
        queryKey: ['ExtractOfTheDay'],
        queryFn: ExtractOfTheDay,
    });
    
    return (
        <>
            <View className=" bg-[#1D1D21] p-4 rounded-xl mt-5">
                <View className="flex flex-row justify-between">
                    <View>
                        <Text className="text-text text-xs">
                            Saldo Diário
                        </Text>
                        {openEye ?
                            <Text className="text-white">
                                {extractOfTheDay ? `R$ ${formatCurrency(String(extractOfTheDay))}` : 'R$ 00,00'}
                            </Text>
                            :
                            <Text className="text-white">
                                R$ ***
                            </Text>
                        }
                    </View>
                    {openEye ?
                        <Button iconColor="#fff" iconName="eye" iconSize={20} onPress={() => setOpenEye(!openEye)} />
                        :
                        <Button iconColor="#fff" iconName="eye-off" iconSize={20} onPress={() => setOpenEye(!openEye)} />

                        //ajusta botão de extrato para poder se redirecionado pro extrato
                    }
                </View>
                <View className="border-t my-4 border-[#ffffff0c] text-[#ffffff0c]"></View>
                <View>
                    <TouchableOpacity onPress={()=> navigation.navigate('Extract')}>
                        <Text className="text-primary font-medium">
                            Ver Extrato
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
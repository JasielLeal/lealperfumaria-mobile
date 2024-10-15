import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../../../components/button/Button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExtractOfTheDay } from "../services/ExtractOfTheDay";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";
import { useTheme } from "../../../../context/themeContext";
import Icon from "react-native-vector-icons/Ionicons";

export function Card() {

    const { theme } = useTheme();
    const [openEye, setOpenEye] = useState(false)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { data: extractOfTheDay } = useQuery({
        queryKey: ['ExtractOfTheDay'],
        queryFn: ExtractOfTheDay,
    });

    return (
        <>
            <View className="bg-[#e0e0e0] dark:bg-[#1D1D21]  p-4 rounded-xl mt-5">
                <View className="flex flex-row justify-between">
                    <View>
                        <Text className="dark:text-text text-xs">
                            Saldo Diário
                        </Text>
                        {openEye ?
                            <Text className="dark:text-white font-semibold text-base">
                                {extractOfTheDay ? `R$ ${formatCurrency(String(extractOfTheDay))}` : 'R$ 00,00'}
                            </Text>
                            :
                            <Text className="dark:text-white font-semibold text-base">
                                R$ ***
                            </Text>
                        }
                    </View>
                    {openEye ?
                        <Button iconColor={theme === "dark" ? "#fff" : '#121214'} iconName="eye" iconSize={20} onPress={() => setOpenEye(!openEye)} />
                        :
                        <Button iconColor={theme === "dark" ? "#fff" : '#121214'} iconName="eye-off" iconSize={20} onPress={() => setOpenEye(!openEye)} />

                        //ajusta botão de extrato para poder se redirecionado pro extrato
                    }
                </View>
                <View className="border-t border-[#0000001a] my-4 dark:border-[#ffffff0c] dark:text-[#ffffff0c]"></View>
                <View className="flex flex-row gap-2">
                    <TouchableOpacity onPress={() => navigation.navigate('Extract')}>
                        <View className="dark:bg-[#121214] bg-white  rounded-full px-3 py-2 flex flex-row items-center">
                            <Icon name='receipt' size={15} color={'#1D1D21'} />
                            <Text className="dark:text-background font-medium text-xs ml-2">
                                Extrato
                            </Text>
                        </View>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={() => navigation.navigate('Extract')}>
                        <View className="dark:bg-[#121214] bg-white  rounded-full px-3 py-2 flex flex-row items-center">
                            <Icon name='barcode' size={15} color={'#1D1D21'} />
                            <Text className="dark:text-background  font-medium text-xs ml-2">
                                Mais vendidos
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
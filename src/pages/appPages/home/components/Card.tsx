import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "../../../../components/button/Button";
import { useState } from "react";

export function Card() {

    const [openEye, setOpenEye] = useState(false)


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
                                R$ 13.234,23
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
                    }
                </View>
                <View className="border-t my-4 border-[#ffffff0c] text-[#ffffff0c]"></View>
                <View>
                    <TouchableOpacity>
                        <Text className="text-primary font-medium">
                            Ver Extrato
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
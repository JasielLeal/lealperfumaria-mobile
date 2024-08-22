import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { Button } from "../../../components/button/Button";
import perfil from '../../../assets/perfil.jpg'
import { Card } from "./components/Card";
import { ActionButton } from "./components/actionButton";
import { RecentesPayments } from "./components/recentesPayments";

export function Home() {
    return (
        <>
            <View className="bg-[#121214] h-screen px-5">
                <View className="flex flex-row justify-between items-center pt-5">
                    <View className="flex flex-row items-center">
                        <Image source={perfil} width={20} height={20} className="rounded-full w-[60px] h-[60px]" />
                        <View className="ml-2">
                            <Text className="text-[10px] text-[#AFAFAF]">Hello, Jasiel Leal</Text>
                            <Text className="text-white">Bem Vindo</Text>
                        </View>
                    </View>
                    <View className="">
                        <Button iconName="log-out" iconSize={30} iconColor="#fff" />
                    </View>
                </View>
                <Card />
                <ActionButton />
                <RecentesPayments />
            </View>
        </>
    )
}
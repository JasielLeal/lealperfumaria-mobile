import { View, Text, Image } from "react-native";
import { Button } from "../../../components/button/Button";
import perfil from '../../../../assets/perfil.jpg'
import { Card } from "./components/Card";
import { ActionButton } from "./components/actionButton";
import { RecentesPayments } from "./components/recentesPayments";
import { useContext, useState } from "react";
import AuthContext from "../../../context/authContext";
import { ModalLogout } from "./components/ModalLogout";
import { useTheme } from "../../../context/themeContext";

export function Home() {

    const { user } = useContext(AuthContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
        <>
            <View className="dark:bg-[#121214] h-screen px-5">
                <View className="flex flex-row justify-between items-center pt-5">
                    <View className="flex flex-row items-center">
                        <Image source={perfil} width={20} height={20} className="rounded-full w-[60px] h-[60px]" />
                        <View className="ml-2">
                            <Text className="text-[10px] dark:text-[#AFAFAF]">Hello, {user?.name} {user?.secondName}</Text>
                            <Text className="dark:text-white">Bem Vindo</Text>
                        </View>
                    </View>
                    <View className="flex flex-row items-center">
                        <Button iconName={theme === "dark" ? "moon" : 'sunny'} iconSize={20} iconColor={theme === "dark" ? "#fff" : '#121214'} onPress={toggleTheme} className="mr-5"/>
                        <Button iconName="log-out" iconSize={30} iconColor={theme === "dark" ? "#fff" : '#121214'} onPress={() => toggleModal()} />
                    </View>
                </View>
                <Card />
                <ModalLogout onClose={toggleModal} visible={isModalVisible} />
                <ActionButton />
                <RecentesPayments />
            </View>
        </>
    )
}
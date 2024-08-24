import React, { useContext, useState } from "react";
import { Modal, Text, View, Button, TouchableOpacity } from "react-native";
import AuthContext from "../../../../context/authContext";

interface ModalProps {
    visible: boolean;
    functionOption?: () => void;
    onClose: () => void;
}

export function ModalLogout({ visible, onClose, functionOption }: ModalProps) {

    const { logoutFc } = useContext(AuthContext)

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View className="flex items-center justify-center w-full h-screen bg-[#000000ad]">
                <View className="w-full px-5">
                    <View className="bg-white p-4 rounded-xl w-full">
                        <Text className="mb-5 font-medium">Você realmente deseja sair?</Text>
                        <View className="flex flex-row items-center justify-between">
                            <TouchableOpacity className="bg-primary p-3 rounded-xl w-[150px]" onPress={() => logoutFc()}>
                                <Text className="text-white font-semibold text-center">
                                    Sair
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose}>
                                <Text className="text-zinc-800 font-semibold w-[150px] text-center">
                                    Voltar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

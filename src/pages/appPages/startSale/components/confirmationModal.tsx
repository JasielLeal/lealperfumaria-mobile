import React, { useContext } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import AuthContext from "../../../../context/authContext";

interface ModalProps {
    visible: boolean;
    functionOption?: () => void;
    onClose: () => void;
    openAddProductModal: () => void; // Novo prop para abrir o AddProductModal
}

export function ConfirmationModal({ visible, onClose, functionOption, openAddProductModal }: ModalProps) {

    const handleLogoutAndOpenModal = () => { // Se você quiser manter essa função, pode chamar ela aqui
        onClose();  // Fechar o modal de confirmação
        openAddProductModal(); // Abrir o AddProductModal
    };

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
                        <Text className="font-medium">Produto não cadastrado!</Text>
                        <Text className="mb-5 text-text">Deseja cadastrar?</Text>
                        <View className="flex flex-row items-center justify-between">
                            <TouchableOpacity className="bg-primary p-3 rounded-xl w-[150px]" onPress={handleLogoutAndOpenModal}>
                                <Text className="text-white font-semibold text-center">
                                    Sim
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

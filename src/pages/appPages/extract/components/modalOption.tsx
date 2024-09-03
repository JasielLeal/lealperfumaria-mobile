import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Text, View, TouchableOpacity, Alert } from "react-native";
import { DeleteSale } from "../service/DeleteSale";

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    saleId: string | null;
}

export function ModalOtion({ visible, onClose, saleId }: ModalProps) {

    const queryClient = useQueryClient();

    const { mutateAsync: deleteSaleFn } = useMutation({
        mutationFn: () => {
            if (saleId) {
                return DeleteSale({ saleId });
            } else {
                throw new Error("ID da venda não pode ser nulo");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['MonthlyExtract'] as InvalidateQueryFilters);
            onClose();
        },
        onError: (e) => {
            Alert.alert('Erro', 'Erro ao deletar a venda');
            console.log('Erro detalhado:', JSON.stringify(e, null, 2));
        }
    });

    // Função que chama a mutação para deletar a venda
    const handleDeleteSale = async () => {
        try {
            await deleteSaleFn();
        } catch (e) {
            console.error("Erro ao tentar deletar a venda:", e);
        }
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
                        <Text className="mb-5 font-medium">Deseja realmente excluir essa venda?</Text>
                        <View className="flex flex-row items-center justify-between">
                            <TouchableOpacity
                                className="bg-red-500 p-3 rounded-xl w-[150px]"
                                onPress={handleDeleteSale}
                            >
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

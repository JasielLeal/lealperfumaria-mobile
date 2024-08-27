import { Modal, View, Text, TouchableOpacity, TextInput } from "react-native";
import { Input } from "../../../../components/input/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterProdutcSchema } from "../schema/RegisterProduct";
import { Scanner } from "./Scanner";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { PrimaryButton } from "../../../../components/primaryButton/primaryButton";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBankProduct } from "../services/createBankProduct";
import { useState } from "react";
import LottieView from "lottie-react-native";


interface ModalProps {
    visible: boolean;
    functionOption?: () => void;
    onClose: () => void;
}

export function AddProductModal({ onClose, visible, functionOption }: ModalProps) {

    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(RegisterProdutcSchema),
        mode: 'all',
        criteriaMode: 'all',
    });

    const handleCodeScanned = (code: string) => {
        setValue('code', code);
    };

    const handleValueChange = (value: string) => {
        // Format the value and set it directly using `setValue`
        const formatted = formatCurrency(value);
        setValue('value', formatted);
    };

    const [sucess, setSucess] = useState(false)
    const queryClient = useQueryClient();
    const { mutateAsync: CreateBankProductFn } = useMutation({
        mutationFn: CreateBankProduct,
        onSuccess: () => {
            setSucess(true)
            queryClient.invalidateQueries(['ListOfRegisteredProducts'] as InvalidateQueryFilters);
            onClose()
            reset();
        },
        onError: () => {
            onClose()
        },
    });

    const onSub = async (data: any) => {
        await CreateBankProductFn(data);
    };

    return (
        <>
            <Modal
                visible={visible}
                animationType="fade"
                transparent={true}
                onRequestClose={onClose}
            >
                <View className="flex items-center justify-center w-full h-screen bg-[#000000ad]">
                    <View className="w-full">
                        <View className="bg-[#000000] p-4 rounded-xl w-full h-screen">
                            <Text className="mb-5 font-medium text-text text-center pt-5">Adicione um produto</Text>
                            <View className="flex">
                                <View className="">
                                    <View className="mb-3">
                                        <Controller
                                            control={control}
                                            name="name"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placehoulder="Nome do produto"
                                                    autoCapitalize="sentences"
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                />
                                            )}
                                        />
                                    </View>

                                    <View className="mb-3">
                                        <Controller
                                            control={control}
                                            name="value"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placehoulder="Valor do produto"
                                                    autoCapitalize="none"
                                                    onBlur={onBlur}
                                                    onChangeText={handleValueChange}
                                                    value={value} // Directly bind value
                                                    keyboardType="number-pad"
                                                />
                                            )}
                                        />
                                    </View>

                                    <View className="mb-3">
                                        <Controller
                                            control={control}
                                            name="code"
                                            render={({ field: { value, onChange } }) => (
                                                <>
                                                    <Input
                                                        placehoulder="Digite o codigo do produto"
                                                        autoCapitalize="none"
                                                        value={value}
                                                        onChangeText={onChange}
                                                        placeholderTextColor={'#818181'}
                                                    />
                                                    <View className="flex items-center mt-3">
                                                        <Scanner onScan={handleCodeScanned} />
                                                    </View>
                                                </>
                                            )}
                                        />
                                    </View>
                                </View>
                                <View className="flex flex-row justify-between items-center mt-10">
                                    <PrimaryButton name="Registrar" className="w-[170px]" onPress={handleSubmit(onSub)} />
                                    <TouchableOpacity onPress={onClose}>
                                        <Text className="text-white w-[170px] bg-background text-center rounded-xl p-3">Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            {sucess ?
                <Modal
                    animationType="fade"
                >
                    <View className="bg-[#121214] bg-opacity-50 w-full h-screen flex justify-center items-center absolute z-50">
                        <LottieView
                            source={require('../../../../assets/lottie/check.json')}
                            autoPlay
                            loop={false}
                            onAnimationFinish={() => setSucess(false)}
                            style={{ width: 200, height: 200 }}
                        />
                    </View>
                </Modal>
                :
                ''}
        </>
    )
}
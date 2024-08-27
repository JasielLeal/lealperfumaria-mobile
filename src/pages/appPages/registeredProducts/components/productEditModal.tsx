import { zodResolver } from "@hookform/resolvers/zod";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { EditProduct } from "../services/EditProduct";
import { ProductEditModalSchema } from "../schema/productEditing";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { Modal, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import { Scanner } from "../../startSale/components/Scanner";
import { Input } from "../../../../components/input/input";
import { PrimaryButton } from "../../../../components/primaryButton/primaryButton";
import { useState } from "react";
import LottieView from "lottie-react-native";

export function ModalDeEditProduct({ ProductIdProp, isModalVisible, setIsModalVisible }: any) {

    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(ProductEditModalSchema),
        mode: 'all',
        criteriaMode: 'all',
    });
    const queryClient = useQueryClient();
    const [sucess, setSucess] = useState(false)
    const handleCodeScanned = (code: string) => {
        setValue('code', code);
    };

    async function onSub(data: FieldValues) {

        const dataWithId = { ...data, id: ProductIdProp };
        await EditProductFn(dataWithId);
    };

    const handleValueChange = (value: string) => {
        const formatted = formatCurrency(value);
        setValue('value', formatted);
    };

    function closeFunction() {
        setIsModalVisible(!isModalVisible)
    }

    const { mutateAsync: EditProductFn } = useMutation({
        mutationFn: EditProduct,
        onSuccess: () => {
            setSucess(true)
            queryClient.invalidateQueries(['ListOfRegisteredProducts'] as InvalidateQueryFilters);
            setIsModalVisible(false);
            reset();
        },
        onError: () => {
            setIsModalVisible(false);
        },
    });

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(!isModalVisible)}
            >
                <View className="bg-[#000000dc] bg-opacity-50 w-full h-screen flex justify-center items-center absolute z-50">
                    <View className="p-5 rounded-lg w-11/12 shadow-md">
                        <Text className="text-text text-center font-medium mb-5">Editar Produto</Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-3">
                                    <Input
                                        placehoulder="Nome do produto"
                                        autoCapitalize="sentences"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="value"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="mb-3">
                                    <Input
                                        placehoulder="Valor do produto"
                                        autoCapitalize="none"
                                        onBlur={onBlur}
                                        onChangeText={handleValueChange}
                                        value={value}
                                        keyboardType="number-pad"
                                    />
                                </View>
                            )}
                        />
                        <Controller
                            control={control}
                            name="code"
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <View className="mb-3">
                                        <Input
                                            placehoulder="Código do produto"
                                            autoCapitalize="none"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    </View>
                                    <Scanner onScan={handleCodeScanned} />
                                </>
                            )}
                        />
                        <View className="flex flex-row items-center justify-between mt-5">
                            <PrimaryButton name="Enviar" onPress={handleSubmit(onSub)} className="w-[150px]" />
                            <TouchableOpacity onPress={() => closeFunction()} className="p-3 rounded-md w-[150px]">
                                <Text className="text-red-500 font-semibold text-center">Fechar</Text>
                            </TouchableOpacity>
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
    );
}

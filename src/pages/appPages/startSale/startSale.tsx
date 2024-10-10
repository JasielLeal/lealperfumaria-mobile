import { View, Text, StyleSheet, Alert, FlatList, Modal, ActivityIndicator } from "react-native";
import { Input } from "../../../components/input/input";
import { Picker } from "@react-native-picker/picker";
import { Scanner } from "./components/Scanner";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProductsToShoppinList } from "./services/addProductsToShoppingList";
import { useState } from "react";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { calculeteTotal, formatCurrency } from "../../../utils/FormatMoney";
import { PrimaryButton } from "../../../components/primaryButton/primaryButton";
import { CreateSale } from "./services/createSale";
import LottieView from "lottie-react-native";
import { AddProductModal } from "./components/addProductModal";
import { ConfirmationModal } from "./components/confirmationModal";
import { useNotifications } from "react-native-notificated";
import { Button } from "../../../components/button/Button";

export function StartSale() {
    const styles = StyleSheet.create({
        pickerContainer: {
            marginTop: 20,
            height: 50,
            justifyContent: 'center',
            backgroundColor: '#B66182',
            marginBottom: 20,
            borderRadius: 10,
            color: '#fff',
        },
        text: {
            color: '#fff',
        },
        productListContainer: {
            flex: 1,
            marginTop: 10,
        },
        totalContainer: {
            paddingHorizontal: 20,
            backgroundColor: '#121214',
            paddingVertical: 10,
        },
        totalText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    const paymentsMethods = [
        { id: 1, name: "Pix" },
        { id: 2, name: "Cartão" },
        { id: 3, name: "Dinheiro" },
    ];

    interface ProductProps {
        id: string;
        name: string;
        qnt: string;
        value: string;
        code: string;
    }

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [sucess, setSucess] = useState(false);
    const [productsBack, setProductsBack] = useState<{ code: string; amount: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [selectedValue, setSelectedValue] = useState('Pix');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal);
    };

    const queryClient = useQueryClient();
    const { mutateAsync: AddProductsToShoppinListFn } = useMutation({
        mutationFn: AddProductsToShoppinList,
        onSuccess: (response) => {
            const newInputValue = inputValue || '1';  // Valor padrão de quantidade

            // Verifica se o produto já existe na lista com base no código
            const existingProductIndex = products.findIndex(
                (product) => product.id === response.data.id
            );

            if (existingProductIndex >= 0) {
                // Produto já existe, atualiza a quantidade
                const updatedProducts = [...products];
                const updatedProductBack = [...productsBack];

                updatedProducts[existingProductIndex].qnt = String(
                    Number(updatedProducts[existingProductIndex].qnt) + Number(newInputValue)
                );

                updatedProductBack[existingProductIndex].amount = String(
                    Number(updatedProductBack[existingProductIndex].amount) + Number(newInputValue)
                );

                setProducts(updatedProducts);
                setProductsBack(updatedProductBack);
            } else {
                // Produto novo, adiciona à lista
                const product = { id: response.data.id, qnt: newInputValue, name: response.data.name, value: response.data.value, code: response.data.code  };
                const productNew = { code: response.data.code, amount: newInputValue };

                setProducts([...products, product]);
                setProductsBack([...productsBack, productNew]);
            }

            // Limpa o campo de input após a adição ou atualização
            setInputValue('');
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                switch (status) {
                    case 404: setConfirmationModal(true);
                }
            }
        },
    });

    const handleScan = async (code: FieldValues) => {
        await AddProductsToShoppinListFn(code);
    };

    const calcularTotalGeral = () => {
        const total = products.reduce((acc, product) => {
            if (!product.qnt || !product.value) return acc;
            return acc + (Number(product.qnt) * Number(product.value) / 100);
        }, 0);
        return `R$ ${formatCurrency(total.toFixed(2))}`;
    };

    const { mutateAsync: CreateSaleFn, isPending } = useMutation({
        mutationFn: CreateSale,
        onSuccess: () => {
            queryClient.invalidateQueries(['MonthlyExtract'] as InvalidateQueryFilters);
            queryClient.invalidateQueries(['MonthlyValue'] as InvalidateQueryFilters);
            setSucess(true);
            setProducts([]);
            setProductsBack([]);
            setCustomerName('');
        },
        onError: (error) => {
            Alert.alert("Error", `${error}`);
        },
    });


    const { notify } = useNotifications()

    const handleRemoveProduct = (productId: string, productCode: string) => {

        
        // Remove o produto da lista visual
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);

        // Remove o produto da lista que será enviada ao backend
        const updatedProductsBack = productsBack.filter((product) => product.code !== productCode);
        setProductsBack(updatedProductsBack);

    };

    const handleCreateSale = async () => {
        if (!customerName) {
            notify('warning', {
                params: {
                    description: 'Insira o nome do cliente',
                    title: 'Aviso',
                },
                config: {

                }
            })
            return;

        }
        if (productsBack.length === 0) {
            notify('warning', {
                params: {
                    description: 'Adicione os Produtos',
                    title: 'Aviso',
                },
                config: {

                }
            })
            return;
        }

        if (!selectedValue) {
            setSelectedValue('Pix');
        }

        await CreateSaleFn({ customerName, products: productsBack, selectedValue });
    };

    return (
        <>
            {isPending ? (
                <View className="flex items-center justify-center h-screen w-full dark:bg-[#121214]">
                    <ActivityIndicator size="large" color={"#B66182"} />
                </View>
            ) : (
                <View className='dark:bg-[#121214] w-full h-screen'>
                    <View className='px-5 pt-5 flex-1'>
                        <View className='flex flex-row justify-center mb-5'>
                            <Text className='dark:text-white font-medium'>Nova Venda</Text>
                        </View>
                        <Input
                            placehoulder="Nome do cliente..."
                            value={customerName}
                            onChangeText={setCustomerName}
                        />
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.text}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            >
                                {paymentsMethods.map((method) => (
                                    <Picker.Item label={method.name} value={method.name} key={method.id} />
                                ))}
                            </Picker>
                        </View>
                        <View className="flex flex-row justify-between">
                            <View className="w-[70px]">
                                <Input
                                    placehoulder="01"
                                    className="text-center"
                                    keyboardType="number-pad"
                                    value={inputValue}
                                    onChangeText={setInputValue}
                                />
                            </View>
                            <Scanner onScan={handleScan} />
                        </View>

                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            style={styles.productListContainer}
                            renderItem={({ item }) => (
                                <View className="flex flex-row items-center mt-5 justify-between">
                                    <View className="flex flex-row justify-between border border-[#ffffff27] p-2 rounded-xl">
                                        <View className="flex flex-row">
                                            <Text className="w-[25px] dark:text-text">{item.qnt}x</Text>
                                            <Text numberOfLines={1} ellipsizeMode="tail" className="w-[200px] ml-1 dark:text-text">{item.name}</Text>
                                        </View>
                                        <Text className="dark:text-text">
                                            {calculeteTotal(item)}
                                        </Text>
                                    </View>
                                    <Button
                                        iconColor="#fff"
                                        iconName="trash"
                                        iconSize={15}
                                        onPress={() => handleRemoveProduct(item.id, item.code)} // Chama a função de remoção ao clicar
                                    />
                                </View>
                            )}
                        />

                        <View className="flex flex-row mt-5 items-center justify-between">
                            <Text className='dark:text-text font-medium text-base'>Valor total</Text>
                            <Text className='dark:text-text font-medium text-base'>{calcularTotalGeral()}</Text>
                        </View>
                        <View className="mb-20 mt-5">
                            <PrimaryButton name="Finalizar Venda" onPress={handleCreateSale} />
                        </View>

                        <AddProductModal onClose={toggleModal} visible={isModalVisible} />
                        <ConfirmationModal
                            onClose={toggleConfirmationModal}
                            visible={confirmationModal}
                            openAddProductModal={toggleModal}
                        />
                    </View>
                    {/* Lottie Animation */}
                    {sucess ?
                        <Modal
                            animationType="fade"
                        >
                            <View className="dark:bg-[#121214] bg-opacity-50 w-full h-screen flex justify-center items-center absolute z-50">
                                <LottieView
                                    source={require('../../../assets/lottie/check.json')}
                                    autoPlay
                                    loop={false}
                                    onAnimationFinish={() => setSucess(false)}
                                    style={{ width: 200, height: 200 }}
                                />
                            </View>
                        </Modal>
                        :
                        ''}
                </View>
            )}

        </>

    )
}

import { View, Text, StyleSheet, Alert, FlatList, Modal } from "react-native";
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
    }

    const [products, setProducts] = useState<ProductProps[]>([]);
    const [sucess, setSucess] = useState(false)
    const [productsBack, setProductsBack] = useState<{ code: string; amount: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [selectedValue, setSelectedValue] = useState('Pix');
    const queryClient = useQueryClient();
    const { mutateAsync: AddProductsToShoppinListFn } = useMutation({
        mutationFn: AddProductsToShoppinList,
        onSuccess: (response) => {
            const newInputValue = inputValue || '1';
            const product = { id: response.data.id, qnt: newInputValue, name: response.data.name, value: response.data.value };
            const productNew = { code: response.data.code, amount: newInputValue };
            setProducts([...products, product]);
            setProductsBack([...productsBack, productNew]);
            setInputValue('');
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                switch (status) {
                    case 404: Alert.alert('Error', 'Código de barra não cadastrado ou não encontrado');
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

    const { mutateAsync: CreateSaleFn } = useMutation({
        mutationFn: CreateSale,
        onSuccess: () => {
            queryClient.invalidateQueries(['MonthlyExtract'] as InvalidateQueryFilters);
            queryClient.invalidateQueries(['MonthlyValue'] as InvalidateQueryFilters);
            setSucess(true)
            setProducts([]);
            setProductsBack([])
            setCustomerName('');
            
        },
        onError: (error) => {
            Alert.alert("Error", 'Algo deu errado')
        },
    });

    const handleCreateSale = async () => {
        if (!customerName) {
            Alert.alert('Erro', 'Por favor, insira o nome do cliente');
            return;
        }
        if (productsBack.length === 0) {
            Alert.alert('Erro', 'Por favor, adicione produtos à venda');
            return;
        }

        if (selectedValue == null && selectedValue == undefined) {
            setSelectedValue('Pix')
        } //ultima coisa que fiz

        try {
            await CreateSaleFn({ customerName, products: productsBack, selectedValue });

        } catch (error) {

            Alert.alert('Erro', 'Erro ao criar a venda');
        }
    };

    return (
        <View className='bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5 flex-1'>
                <View className='flex flex-row justify-center mb-5'>
                    <Text className='text-white font-medium'>Nova Venda</Text>
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
                        <View className="flex flex-row justify-between mt-5">
                            <View className="flex flex-row">
                                <Text className="w-[25px] text-text">{item.qnt}</Text>
                                <Text numberOfLines={1} ellipsizeMode="tail" className="w-[200px] ml-1 text-text">{item.name}</Text>
                            </View>
                            <Text className="text-text">
                                {calculeteTotal(item)}
                            </Text>
                        </View>
                    )}
                />

                <View className="flex flex-row mt-5 items-center justify-between">
                    <Text className='text-text font-medium text-base'>Valor total</Text>
                    <Text className='text-text font-medium text-base'>{calcularTotalGeral()}</Text>
                </View>
                <View className="mb-20 mt-5">
                    <PrimaryButton name="Finalizar Venda" onPress={handleCreateSale} />
                </View>
            </View>
            {/* Lottie Animation */}
            {sucess ?
                <Modal
                    animationType="fade"
                >
                    <View className="bg-[#121214] bg-opacity-50 w-full h-screen flex justify-center items-center absolute z-50">
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
    )
}

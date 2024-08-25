import { View, Text, StyleSheet, Alert } from "react-native";
import { Input } from "../../../components/input/input";
import { PrimaryButton } from "../../../components/primaryButton/primaryButton";
import { Picker } from "@react-native-picker/picker";
import { Scanner } from "./components/Scanner";
import { useMutation } from "@tanstack/react-query";
import { AddProductsToShoppinList } from "./services/addProductsToShoppingList";
import { useState } from "react";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { calculeteTotal, formatCurrency } from "../../../utils/FormatMoney";

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
        }
    });

    const paymentsMethods = [
        { id: 1, name: "Pix" },
        { id: 2, name: "Cartão" },
        { id: 3, name: "Dinheiro" },
    ]

    interface productProps {
        id: string;
        name: string;
        qnt: string;
        value: string;
    }

    const [products, setProducts] = useState<productProps[]>([]);
    const [productsBack, setProductsBack] = useState<{ code: string; amount: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [customerName, setCustomerName] = useState('');

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
                const status = error.response?.status

                switch (status) {
                    case 404: Alert.alert('Error', 'Codigo de barra não cadastrado ou não encontrado')
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
    }

    return (
        <View className='bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5'>
                <View className='flex flex-row justify-center mb-5'>
                    <Text className='text-white font-medium'>Nova Venda</Text>
                </View>
                <Input
                    placehoulder="Nome do cliente..."
                    value={customerName}
                    onChangeText={setCustomerName}
                />
                <View style={styles.pickerContainer}>
                    <Picker style={styles.text}>
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
                {products.map((product) => (
                    <View className="flex flex-row justify-between mt-5" key={product.id}>
                        <View className="flex flex-row">
                            <Text className="w-[45px]">{product.qnt}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" className="w-[200px] ml-1">{product.name}</Text>
                        </View>
                        <Text>
                            {calculeteTotal(product)}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}
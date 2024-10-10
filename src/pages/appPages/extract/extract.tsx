import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Input } from "../../../components/input/input";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { TransactionList } from "./components/transactionList";
import { useQuery } from "@tanstack/react-query";
import { MonthlyValue, MonthlyValueRequest } from "./service/MonthlyValue";
import { formatCurrency } from "../../../utils/FormatMoney";

export function Extract() {

    interface Month {
        id: number;
        month: string;
        value: string;
    }

    const monthsAll: Month[] = [
        { id: 1, month: "Janeiro", value: "01" },
        { id: 2, month: "Fevereiro", value: "02" },
        { id: 3, month: "Março", value: "03" },
        { id: 4, month: "Abril", value: "04" },
        { id: 5, month: "Maio", value: "05" },
        { id: 6, month: "Junho", value: "06" },
        { id: 7, month: "Julho", value: "07" },
        { id: 8, month: "Agosto", value: "08" },
        { id: 9, month: "Setembro", value: "09" },
        { id: 10, month: "Outubro", value: "10" },
        { id: 11, month: "Novembro", value: "11" },
        { id: 12, month: "Dezembro", value: "12" },
    ];

    const styles = StyleSheet.create({
        pickerContainer: {
            height: 40,
            width: 150,
            justifyContent: 'center',
            backgroundColor: '#B66182',
            marginBottom: 30,
            borderRadius: 30,
            color: '#fff',
        } as ViewStyle,
        text: {
            color: '#fff',
        } as TextStyle,
    });

    const [monthSelected, setMonthSelected] = useState<string>('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const currentMonth = new Date().getMonth() + 1;
        const formattedMonth = currentMonth.toString().padStart(2, '0');
        setMonthSelected(formattedMonth);
    }, []);

    const { data: MonthlyAmount, isPending } = useQuery({
        queryKey: ['MonthlyValue', monthSelected],
        queryFn: () => MonthlyValue({ monthSelected } as MonthlyValueRequest),
    });

    return (
        <>
            <View className='dark:bg-[#121214] w-full h-screen'>
                <View className='px-5 pt-5'>
                    <View className='flex flex-row justify-center'>
                        <Text className='dark:text-white font-medium'>Extrato Mensal</Text>
                    </View>
                    <View className="my-5">
                        <Input placehoulder="Pesquisar..." onChangeText={setSearch} />
                    </View>
                    <View className="flex flex-row justify-between">
                        <View className="flex flex-row justify-between items-start mb-5">
                            <View>
                                <Text className="dark:text-text">
                                    Saldo consolidado
                                </Text>
                                <Text className="dark:text-white">
                                    R$ {formatCurrency(String(MonthlyAmount))}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={monthSelected}
                                onValueChange={setMonthSelected}
                                style={styles.text}
                            >
                                {monthsAll.map((month) => (
                                    <Picker.Item label={month.month} value={month.value} key={month.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <TransactionList month={monthSelected} search={search} />

                </View>
            </View>
        </>
    )
}


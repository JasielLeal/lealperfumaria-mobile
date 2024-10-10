import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RecentSale } from "../services/recentSale";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useState } from "react";
import { ModalOtion } from "./modalOption";

export function RecentesPayments() {

    interface SaleProduct {
        id: string;
        saleId: string;
        amount: string;
        BankProductId: string;
        BankProduct: {
            id: string;
            name: string;
            value: string;
            code: string;
            createdAt: string;
        };
    }

    interface Sale {
        id: string;
        customerName: string;
        value: string;
        transictionType: string;
        createdAt: string;
        saleProduct: SaleProduct[];
    }

    const { data } = useQuery({
        queryKey: ['RecentSale'],
        queryFn: RecentSale,
    });

    const [modalVisibleOn, setModalVisibleOn] = useState(false)
    const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);
    const toggleModal = (saleId?: string) => {
        setModalVisibleOn(!modalVisibleOn);
        setSelectedSaleId(saleId || null)
    };
    type SaleDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<SaleDetailsScreenNavigationProp>();

    const handlePress = (recent: Sale) => {
        navigation.navigate('SaleDetails', { sale: recent });
    }

    return (
        <>
            <View>
                <Text className="dark:text-white font-medium mb-5">
                    Recentes
                </Text>

                {data?.map((recent: Sale) => (
                    <View key={recent.id}>
                        <TouchableOpacity onPress={() => handlePress(recent)} onLongPress={() => toggleModal(recent.id)}>
                            <View className="flex flex-row mb-7 w-full justify-between items-center">
                                <View className="flex flex-row items-center">
                                    <Text className="border border-primary p-2 rounded-full">
                                        <Icon name='cart' size={20} color={'#B66182'} />
                                    </Text>
                                    <View className="ml-3">
                                        <Text className="dark:text-white text-xs font-medium">
                                            {recent.customerName}
                                        </Text>
                                        <Text className="dark:text-text text-xs">
                                            {recent.transictionType}
                                        </Text>
                                        <Text className="dark:text-white text-[10px] tex-text">
                                            {formatCurrency(String(recent.value))}
                                        </Text>
                                    </View>
                                </View>
                                <Icon name='chevron-forward' size={20} color={'#B66182'} />
                            </View>
                        </TouchableOpacity>
                        <ModalOtion onClose={toggleModal} visible={modalVisibleOn} saleId={selectedSaleId} />
                    </View>
                ))}

            </View>
        </>
    )
}
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
                <Text className="text-white font-medium">
                    Recentes
                </Text>
                {data?.map((recent: Sale) => (
                    <>
                        <TouchableOpacity onPress={() => handlePress(recent)} key={recent.id} onLongPress={() => toggleModal(recent.id)}>
                            <View className="flex flex-row justify-between mt-5 bg-background p-3 rounded-xl" >
                                <View className="flex flex-row">
                                    <Text className="bg-white p-2 rounded-lg w-[45px]">
                                        <Icon name='cart' size={20} color={'#AFAFAF'} />
                                    </Text>
                                    <View className="ml-3">
                                        <Text className="text-white font-medium">
                                            {recent.customerName}
                                        </Text>
                                        <Text className="text-text text-xs">
                                            {recent.transictionType}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text className="text-white text-xs">+R$ {formatCurrency(recent.value)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <ModalOtion onClose={toggleModal} visible={modalVisibleOn} saleId={selectedSaleId} />
                    </>
                ))}

            </View>
        </>
    )
}
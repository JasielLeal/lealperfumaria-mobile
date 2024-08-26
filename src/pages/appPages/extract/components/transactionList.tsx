import { TouchableOpacity, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { formatCurrency } from "../../../../utils/FormatMoney";
import { useInfiniteQuery } from "@tanstack/react-query";
import { monthlyExtract, monthlyExtractRequest } from "../service/monthlyExtract";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";
export function TransactionList({ month, search }: any) {

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['MonthlyExtract', month, search],
        queryFn: ({ pageParam = 0 }) => monthlyExtract({ month, search, take: 10, skip: pageParam * 10 } as monthlyExtractRequest),
        getNextPageParam: (lastPage, allPages) => lastPage.length === 10 ? allPages.length : undefined,
        initialPageParam: 0
    });

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View className="mb-20">
            <FlatList
                data={data?.pages.flatMap(page => page)}
                keyExtractor={(item) => String(item.id)}
                style={{ marginBottom: 370 }}
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('SaleDetails', { sale: item })}>
                        <View className="flex flex-row justify-between mt-5 bg-background p-3 rounded-xl" >
                            <View className="flex flex-row">
                                <Text className="bg-white p-2 rounded-lg w-[45px]">
                                    <Icon name='cart' size={20} color={'#AFAFAF'} />
                                </Text>
                                <View className="ml-3">
                                    <Text className="text-white font-medium">
                                        {item.customerName}
                                    </Text>
                                    <Text className="text-text text-xs">
                                        {item.transictionType}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-xs">+R$ {formatCurrency(item.value)}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={() => {
                    if (hasNextPage) {
                        fetchNextPage();
                    }
                }}
            />
        </View>
    )
}
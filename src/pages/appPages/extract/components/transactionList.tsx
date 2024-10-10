import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { monthlyExtract, monthlyExtractRequest } from "../service/monthlyExtract";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../types/navigation";
import { ModalOtion } from "./modalOption";
import SaleItem from './SaleItem';
import { formatCurrency, formatDateWithTimezone } from "../../../../utils/FormatMoney";

export function TransactionList({ month, search }: any) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [modalVisibleOn, setModalVisibleOn] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState<string | null>(null);

    const itemsPerPage = 10;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ['MonthlyExtract', month, search],
        queryFn: ({ pageParam = 0 }) => {
            const skip = pageParam * itemsPerPage;
            return monthlyExtract({ month, search, take: itemsPerPage, skip } as monthlyExtractRequest);
        },
        getNextPageParam: (lastPage, allPages) => {
            // Checa se a página atual alcançou o total de páginas disponíveis
            const currentPage = allPages.length;
            if (currentPage < lastPage.totalPages) {
                return currentPage;
            } else {
                return undefined; // Para a paginação quando a última página é atingida
            }
        },
        initialPageParam: 0
    });

    const toggleModal = (saleId?: string) => {
        setModalVisibleOn(!modalVisibleOn);
        setSelectedSaleId(saleId || null);
    };

    const handlePress = (sale: any) => {
        navigation.navigate('SaleDetails', { sale });
    };

    const handleLongPress = (saleId: string) => {
        toggleModal(saleId);
    };

    type saleProps = {
        id: string
        uniqueId: string
        sale: {
            id: string
            customerName: string
            value: string
            transictionType: string;
        }
    }

    // Transformar os dados para garantir que cada dia apareça apenas uma vez
    const transformedData = data?.pages.flatMap(page => page.result).reduce((acc: any, current) => {
        const existingDay = acc.find((item: any) => item.date === current.date);
        if (existingDay) {
            existingDay.sales.push(...current.sales); // Adiciona vendas ao dia existente
        } else {
            acc.push({ ...current, sales: [...current.sales] }); // Adiciona um novo dia
        }
        return acc;
    }, []);

    // Incrementar um ID único para cada item de venda
    const addUniqueIdsToSales = (data: any) => {
        let itemCounter = 0; // Inicializa um contador para IDs

        return data.map((day: any) => ({
            ...day,
            sales: day.sales.map((sale: any) => {
                return {
                    ...sale,
                    uniqueId: `${sale.id}-${itemCounter++}` // Cria um ID único combinando o ID da venda e o contador
                };
            })
        }));
    };

    const uniqueSalesData = transformedData ? addUniqueIdsToSales(transformedData) : [];

    return (
        <View className="mb-20">
            {isError ? (
                <Text>Error: {error.message}</Text>
            ) : (
                <FlatList
                    data={uniqueSalesData} // Usar os dados transformados com IDs únicos
                    keyExtractor={(item) => item.date} // A chave do dia deve ser única
                    style={{ marginBottom: 370 }}
                    renderItem={({ item }) => (
                        <View key={item.date}>
                            <View className="flex flex-row items-center justify-between border-b border-b-[#00000010] dark:border-b-[#ffffff1a] pb-1 mb-5">
                                <Text className="text-[8px] capitalize dark:text-text">{formatDateWithTimezone(item.date)}</Text>
                                <Text className="text-[8px] dark:text-text font-semibold">Saldo do dia {formatCurrency(String(item.totalValue))}</Text>
                            </View>
                            {item.sales.map((sale: any) => {
                                return (
                                    <SaleItem
                                        key={sale.uniqueId} // Use o novo ID único
                                        sale={sale}
                                        onPress={() => handlePress(sale)}
                                        onLongPress={() => handleLongPress(sale.id)}
                                    />
                                );
                            })}
                        </View>
                    )}
                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={1}
                    ListFooterComponent={() => {
                        if (isFetchingNextPage) {
                            return <Text>Carregando mais...</Text>;
                        } else {
                            return null;
                        }
                    }}
                />
            )}
            <ModalOtion onClose={toggleModal} visible={modalVisibleOn} saleId={selectedSaleId} />
        </View>
    );
}

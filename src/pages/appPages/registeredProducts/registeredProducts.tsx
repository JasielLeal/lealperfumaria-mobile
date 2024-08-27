import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { AddProductModal } from "./components/addProductModal";
import { useQuery } from "@tanstack/react-query";
import { ListOfRegisteredProducts } from "./services/listOfRegisteredProducts";
import { Input } from "../../../components/input/input";
import { formatCurrency } from "../../../utils/FormatMoney";
import Icon from "react-native-vector-icons/Ionicons";
import { ModalDeEditProduct } from "./components/productEditModal";

export function RegisteredProducts() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editProductId, setEditProductId] = useState<string | null>(null); // Adicionado para armazenar o ID do produto selecionado

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(0);

    const { data, refetch, isPending } = useQuery({
        queryKey: ['ListOfRegisteredProducts'],
        queryFn: () => ListOfRegisteredProducts({ search, take, skip }),
    });

    const handleSearchChange = useCallback((text: string) => {
        setSearch(text);
    }, []);

    interface ProductProps {
        id: string;
        name: string;
        value: string;
        code: string;
    }

    useEffect(() => {
        refetch();
    }, [search, refetch]);

    const renderProduct = ({ item }: { item: ProductProps }) => (
        <TouchableOpacity onPress={() => setEditProductId(item.id)}>
            <View className="flex flex-row justify-between mt-5 bg-background p-3 rounded-xl">
                <View className="flex flex-row">
                    <Text className="bg-white p-2 rounded-lg w-[45px]">
                        <Icon name="cart" size={20} color="#AFAFAF" />
                    </Text>
                    <View className="ml-3">
                        <Text className="text-white font-medium">{item.name}</Text>
                        <Text className="text-text text-xs">{item.code}</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-white text-xs">R$ {formatCurrency(item.value)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="bg-[#121214] w-full h-screen">
            <View className="px-5 pt-5 flex-1">
                <View className="flex flex-row justify-between mb-5 items-center">
                    <Text className="w-[35px]"></Text>
                    <Text className="text-white font-medium">Produtos Cadastrados</Text>
                    <TouchableOpacity onPress={toggleModal} className="bg-primary p-2 w-[40px] h-[40px] rounded-xl flex items-center justify-center">
                        <Text>+</Text>
                    </TouchableOpacity>
                    <AddProductModal onClose={toggleModal} visible={isModalVisible} />
                </View>
                <View>
                    <Input
                        placehoulder="Pesquisar..."
                        onChangeText={handleSearchChange}
                        value={search}
                    />
                </View>
                {isPending ? (
                    <View className="flex justify-center items-center h-screen -mt-36">
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <FlatList
                        data={data}
                        renderItem={renderProduct}
                        className="mb-[75px]"
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            {/* Modal para edição do produto */}
            {editProductId !== null && (
                <ModalDeEditProduct
                    ProductIdProp={editProductId}
                    isModalVisible={editProductId !== null} // Exibe o modal se um produto estiver selecionado
                    setIsModalVisible={() => setEditProductId(null)} // Fecha o modal ao definir o ID do produto como null
                />
            )}
        </View>
    );
}

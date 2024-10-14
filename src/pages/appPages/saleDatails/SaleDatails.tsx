import { View, Text } from 'react-native';
import { RouteButton } from '../../../components/routeButton/RouteButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency, formatDate } from '../../../utils/FormatMoney';
import { useTheme } from '../../../context/themeContext';
import Icon from "react-native-vector-icons/Ionicons";

export function SaleDetails({ route }: any) {
    const { sale } = route.params;
    const navigation = useNavigation();
    const { theme } = useTheme()

    return (
        <View className='dark:bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5'>
                <View className='flex flex-row justify-between'>
                    <RouteButton name="chevron-back" size={20} color={theme === "dark" ? "#fff" : '#121214'} onPress={() => navigation.goBack()} />
                    <Text className='dark:text-white font-semibold'>Detalhes da Compra</Text>
                    <Text className='dark:text-white w-[30px]'></Text>
                </View>

                <View className='flex flex-col justify-center items-center mt-7'>
                    <Text className="bg-[#e0e0e0] dark:bg-background  p-5 rounded-full">
                        <Icon name='checkmark' size={20} color={'#B66182'} className='' />
                    </Text>
                    <Text className='dark:text-white font-medium mt-5'>R$ {formatCurrency(sale.value)}</Text>
                    <Text className='dark:text-text text-xs'>{sale.customerName}</Text>
                    <Text className='text-xs bg-[#e0e0e0]   dark:bg-foreground font-medium py-1 mt-2 px-5 rounded-full dark:text-white '>{sale.transictionType}</Text>
                </View>

                <View className='mt-7'>
                    <Text className='text-xs dark:text-white font-medium '>Sobre a compra</Text>
                </View>

                <View className='bg-[#e0e0e0] dark:bg-background p-3 rounded-xl mt-5'>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='dark:text-white text-xs'>Data</Text>
                        <Text className='dark:text-text text-[10px] capitalize'>{formatDate(sale.createdAt)}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white text-xs'>Nome</Text>
                        <Text className='dark:text-text text-xs'>{sale.customerName}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white text-xs'>Forma de Pagamento</Text>
                        <Text className='dark:text-text text-xs'>{sale.transictionType}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white text-xs'>ID</Text>
                        <Text className='dark:text-text text-[10px]'>{sale.id}</Text>
                    </View>
                </View>

                <Text className='dark:text-white text-xs font-medium my-5'>Produtos</Text>

                <View>
                    {sale.saleProduct.map((product: any) => (
                        <>
                            <View className='flex flex-row items-center justify-between bg-[#e0e0e0] dark:bg-background p-3 rounded-xl mb-2'>
                                <View className='flex flex-row'>
                                    <Text className='dark:text-white mr-3 text-xs'>{product.amount}x</Text>
                                    <Text className='dark:text-white w-[200px] text-xs' numberOfLines={1} ellipsizeMode="tail">Teste</Text>
                                </View>
                                <View>
                                    <Text className='dark:text-white text-xs'>R$ {formatCurrency(product.BankProduct.value)}</Text>
                                </View>
                            </View>
                        </>
                    ))}
                </View>

            </View>
        </View>
    );
}
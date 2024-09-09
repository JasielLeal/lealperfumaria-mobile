import { View, Text } from 'react-native';
import { RouteButton } from '../../../components/routeButton/RouteButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency, formatDate } from '../../../utils/FormatMoney';
import { useTheme } from '../../../context/themeContext';

export function SaleDetails({ route }: any) {
    const { sale } = route.params;
    const navigation = useNavigation();
    const { theme } = useTheme()

    return (
        <View className='dark:bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5'>
                <View className='flex flex-row justify-between'>
                    <RouteButton name="chevron-back" size={20} color={theme === "dark" ? "#fff" : '#121214'} onPress={() => navigation.goBack()} />
                    <Text className='dark:text-white'>Detalhes da Compra</Text>
                    <Text className='dark:text-white w-[30px]'></Text>
                </View>

                <View className='bg-[#e0e0e0] dark:bg-background p-3 rounded-xl mt-5'>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='dark:text-white font-semibold'>Id</Text>
                        <Text className='dark:text-text text-[11px]'>{sale.id}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white font-semibold'>Nome</Text>
                        <Text className='dark:text-text '>{sale.customerName}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white font-semibold'>Forma de Pagamento</Text>
                        <Text className='dark:text-text'>{sale.transictionType}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='dark:text-white font-semibold'>Data</Text>
                        <Text className='dark:text-text'>{formatDate(sale.createdAt)}</Text>
                    </View>
                </View>

                <Text className='dark:text-text font-semibold my-5'>Produtos</Text>
                <View className='bg-[#e0e0e0] dark:bg-background p-3 rounded-xl'>
                    {sale.saleProduct.map((product: any) => (
                        <>
                            <View className='flex flex-row items-center justify-between'>
                                <View className='flex flex-row items-center'>
                                    <Text className='dark:text-text mr-3'>{product.amount}x</Text>
                                    <Text className='dark:text-text w-[200px]' numberOfLines={1} ellipsizeMode="tail">{product.BankProduct.name}</Text>
                                </View>
                                <View>
                                    <Text className='dark:text-white'>R$ {formatCurrency(product.BankProduct.value)}</Text>
                                </View>
                            </View>
                        </>
                    ))}
                    <View className="border-t my-4 border-[#ffffff0c] text-[#ffffff0c]"></View>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='dark:text-text font-medium'>Total</Text>
                        <Text className='dark:text-white font-semibold'>R$ {formatCurrency(sale.value)}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}
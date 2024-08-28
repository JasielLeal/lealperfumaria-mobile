import { View, Text } from 'react-native';
import { RouteButton } from '../../../components/routeButton/RouteButton';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/FormatMoney';


export function SaleDetails({ route }: any) {
    const { sale } = route.params;
    const navigation = useNavigation();




    return (
        <View className='bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5'>
                <View className='flex flex-row justify-between'>
                    <RouteButton name="chevron-back" size={20} color='#fff' onPress={() => navigation.goBack()} />
                    <Text className='text-white'>Detalhes da Compra</Text>
                    <Text className='text-white w-[30px]'></Text>
                </View>

                <View className='bg-background p-3 rounded-xl mt-5'>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-white'>Id</Text>
                        <Text className='text-text text-[11px]'>{sale.id}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='text-white'>Nome</Text>
                        <Text className='text-text'>{sale.customerName}</Text>
                    </View>
                    <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='text-white'>Forma de Pagamento</Text>
                        <Text className='text-text'>{sale.transictionType}</Text>
                    </View>
                </View>

                <Text className='text-text font-semibold my-5'>Produtos</Text>
                <View className='bg-background p-3 rounded-xl'>
                    {sale.saleProduct.map((product: any) => (
                        <>
                            <View className='flex flex-row items-center justify-between'>
                                <View className='flex flex-row items-center'>
                                    <Text className='text-text mr-3'>{product.amount}x</Text>
                                    <Text className='text-text'>{product.BankProduct.name}</Text>
                                </View>
                                <View>
                                    <Text className='text-white'>R$ {formatCurrency(product.BankProduct.value)}</Text>
                                </View>
                            </View>
                        </>
                    ))}
                    <View className="border-t my-4 border-[#ffffff0c] text-[#ffffff0c]"></View>
                    <View className='flex flex-row items-center justify-between'>
                        <Text className='text-text font-medium'>Total</Text>
                        <Text className='text-white font-semibold'>R$ {formatCurrency(sale.value)}</Text>
                    </View>
                </View>

            </View>
        </View>
    );
}
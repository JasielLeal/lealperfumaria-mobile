import { View, Text } from 'react-native';
import { RouteButton } from '../../../components/routeButton/RouteButton';
import { useNavigation } from '@react-navigation/native';


export function SaleDetails({ route }: any) {
    const { sale } = route.params;
    const navigation = useNavigation();
    return (
        <View className='bg-[#121214] w-full h-screen'>
            <View className='px-5 pt-5'>
                <View className='flex flex-row justify-between'>
                    <RouteButton name="chevron-back" size={20} color='#fff' onPress={()=> navigation.goBack()}/>
                    <Text className='text-white'>Detalhes da Compra</Text>
                    <Text className='text-white w-[30px]'></Text>
                </View>
            </View>
        </View>
    );
}
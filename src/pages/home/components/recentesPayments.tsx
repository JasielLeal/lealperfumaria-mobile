import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export function RecentesPayments() {

    const recents = [
        { id: 1, name: 'Simone Viana', value: '175,00', type: 'Pix' },
        { id: 2, name: 'Bernando', value: '35,00', type: 'Cartão' }
    ]

    return (
        <>
            <View>
                <Text className="text-white font-medium">
                    Recentes
                </Text>
                {recents.map((recent) => (
                    <TouchableOpacity>
                        <View className="flex flex-row justify-between mt-5 bg-background p-3 rounded-xl" key={recent.id}>
                            <View className="flex flex-row">
                                <Text className="bg-white p-2 rounded-lg w-[45px]">
                                    <Icon name='cart' size={20} color={'#AFAFAF'} />
                                </Text>
                                <View className="ml-3">
                                    <Text className="text-white font-medium">
                                        {recent.name}
                                    </Text>
                                    <Text className="text-text text-xs">
                                        {recent.type}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-xs">{recent.value}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </>
    )
}
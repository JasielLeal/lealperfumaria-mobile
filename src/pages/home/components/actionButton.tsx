import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const dataButton = [

    { id: 1, iconName: 'stats-chart' },
    { id: 2, iconName: 'stats-chart' },
    { id: 3, iconName: 'stats-chart' },
    { id: 4, iconName: 'stats-chart' },
]


export function ActionButton() {
    return (
        <View className="flex flex-row my-5 justify-between">
            {dataButton.map((action) => (
                <View key={action.id}>
                    <TouchableOpacity className="bg-background p-3 rounded-lg">
                        <Text className="bg-white p-2 rounded-lg">
                            <Icon name={action.iconName} size={15} color={'#AFAFAF'} />
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )

}
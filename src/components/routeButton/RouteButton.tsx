import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import icon from 'react-native-vector-icons/Ionicons'

interface routeButtonProps {
    name: string
    size?: number
    color?: string
    onPress: () => void;
}

export function RouteButton({ color, name, size, onPress }: routeButtonProps) {
    return (
        <>
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Text>
                        <Icon name={name} size={size} color={color} />
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
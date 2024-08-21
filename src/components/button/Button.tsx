import { TouchableOpacity, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

interface ButtonProps {
    iconName: string
    iconSize: number
    iconColor: string
    onPress?: () => void;
}

export function Button({ iconName, iconSize, iconColor, onPress }: ButtonProps) {
    return (
        <>
            <TouchableOpacity onPress={onPress}>
                <Text>
                    <Icon name={iconName} size={iconSize} color={iconColor} />
                </Text>
            </TouchableOpacity>
        </>
    )
}
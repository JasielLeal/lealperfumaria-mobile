import { TouchableOpacity, Text, Image, TouchableOpacityProps } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

interface ButtonProps extends TouchableOpacityProps {
    iconName: string
    iconSize: number
    iconColor: string
    onPress?: () => void;
}

export function Button({ iconName, iconSize, iconColor, onPress, ...rest }: ButtonProps) {
    return (
        <>
            <TouchableOpacity onPress={onPress} {...rest}>
                <Text>
                    <Icon name={iconName} size={iconSize} color={iconColor} />
                </Text>
            </TouchableOpacity>
        </>
    )
}
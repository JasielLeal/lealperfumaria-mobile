import { TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native";


interface primaryButttonProps extends TouchableOpacityProps {
    name: string
}

export function PrimaryButton({ name, ...rest }: primaryButttonProps) {
    return (
        <>
            <TouchableOpacity {...rest}>
                <Text className="p-3 bg-primary text-white font-semibold text-center rounded-xl">
                    {name}
                </Text>
            </TouchableOpacity>
        </>
    )
}
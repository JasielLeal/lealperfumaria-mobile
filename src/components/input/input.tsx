import { KeyboardTypeOptions, TextInput, TextInputProps, View } from "react-native";

interface textInputProps extends TextInputProps {
    placehoulder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
}

export function Input({ placehoulder, keyboardType, secureTextEntry, ...rest }: textInputProps) {
    return (
        <View className="bg-foreground text-text py-3 px-3 rounded-xl">
            <TextInput
                placeholder={placehoulder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={'#AFAFAF'}
                className="text-white"
                {...rest} // Spread all other props here
            />
        </View>
    );
}

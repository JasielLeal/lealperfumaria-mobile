
import { KeyboardTypeOptions, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../../context/themeContext";

interface textInputProps extends TextInputProps {
    placehoulder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
}

export function Input({ placehoulder, keyboardType, secureTextEntry, ...rest }: textInputProps) {

    const { theme } = useTheme()

    return (
        <View className="bg-[#e0e0e0] dark:bg-foreground dark:text-text py-3 px-3 rounded-xl">
            <TextInput
                placeholder={placehoulder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={theme === "dark" ? "#fff" : '#AFAFAF'}
                className="dark:text-white"
                {...rest} // Spread all other props here
            />
        </View>
    );
}

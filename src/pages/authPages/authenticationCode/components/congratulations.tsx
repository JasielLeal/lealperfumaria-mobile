import { ImageBackground, ScrollView, Text, View, Image } from "react-native";
import { PrimaryButton } from "../../../../components/primaryButton/primaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "../../../../types/navigation";

export function Congratulations() {

    type SaleDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
    const navigation = useNavigation<SaleDetailsScreenNavigationProp>();

    return (
        <>
            <>
                <ScrollView>
                    <View className="px-5">
                        <View className="flex items-center mt-40">
                            <Text className="text-xl text-white">Congratulations</Text>
                            <Text className="mb-5 text-text text-center">Sua senha foi redefinida com sucesso.</Text>
                        </View>
                        <PrimaryButton name="Ir para o login" onPress={() => navigation.navigate('SignIn')} />
                    </View>
                </ScrollView>
            </>
        </>
    )
}
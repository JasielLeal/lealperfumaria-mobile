import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { TouchableOpacity, View, Text, Button, Dimensions } from "react-native";

type ScannerProps = {
    onScan: (data: string) => void;
};

export function Scanner({ onScan }: FieldValues) {

    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [cod, setCod] = useState('')
    const { width, height } = Dimensions.get('window');
    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View >
                <TouchableOpacity className="bg-blue-300 p-3 rounded-xl" onPress={requestPermission}>
                    <Text className="text-white text-center font-semibold">
                        Conceder Permissão
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
        setScanned(true);
        setIsCameraVisible(false);
        onScan(data)
        setCod(data)
        setTimeout(() => setScanned(false), 500);
    };

    return (
        <>
            {
                isCameraVisible ?
                    <View className="flex-1 justify-center items-center z-50
                     ">
                        <CameraView onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} className="h-[50px] w-[360px]" style={{ width, height}}>
                            <View >
                            </View>
                        </CameraView>
                    </View>

                    :

                    <View className="flex flex-row items-center">
                        <View className="flex items-center flex-row">
                            <TouchableOpacity onPress={() => setIsCameraVisible(true)} className="bg-white p-3 rounded-xl w-full">
                                <Text className="font-semibold text-background text-center w-full">Scanear Produto</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


            }
        </>
    )
}
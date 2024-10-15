import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../button/Button';
import { PrimaryButton } from '../primaryButton/primaryButton';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductEditModalSchema } from '../../pages/appPages/registeredProducts/schema/productEditing';
import { Input } from '../input/input';
import { formatCurrency } from '../../utils/FormatMoney';
import { Scanner } from '../../pages/appPages/startSale/components/Scanner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProduct } from '../../pages/appPages/registeredProducts/services/EditProduct';

type ConfirmationModalProps = {
    isVisible: boolean;
    ProductIdProp: any
};

export function ConfirmationModal({ isVisible }: ConfirmationModalProps) {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["80%"], []);

    // Show the BottomSheet when `isVisible` changes
    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.snapToIndex(0);  // Open the BottomSheet
        } else {
            bottomSheetRef.current?.close();         // Close the BottomSheet
        }
    }, [isVisible]);

    const styles = StyleSheet.create({
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: 20
        },
    });

    const { control, handleSubmit, setValue, reset } = useForm({
        resolver: zodResolver(ProductEditModalSchema),
        mode: 'all',
        criteriaMode: 'all',
    });

    const handleValueChange = (value: string) => {
        const formatted = formatCurrency(value);
        setValue('value', formatted);
    };

    const handleCodeScanned = (code: string) => {
        setValue('code', code);
    };

    async function onSub(data: FieldValues) {
        const dataWithId = { ...data, id: ProductIdProp };
        await EditProductFn(dataWithId);
    };

    const queryClient = useQueryClient();
    const [sucess, setSucess] = useState(false)

    const { mutateAsync: EditProductFn } = useMutation({
        mutationFn: EditProduct,
        onSuccess: () => {
            setSucess(true)
            queryClient.invalidateQueries(['ListOfRegisteredProducts'] as InvalidateQueryFilters);
            reset();
        },
        onError: () => {
        },
    });

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={-1}
                enablePanDownToClose
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text className='font-medium'>Adicionar Produto</Text>
                    <Text className='text-xs mb-5'>Informe as informações abaixo</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className="mb-3 w-full">
                                <Input
                                    placehoulder="Nome do produto"
                                    autoCapitalize="sentences"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="value"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className="mb-3 w-full">
                                <Input
                                    placehoulder="Valor do produto"
                                    autoCapitalize="none"
                                    onBlur={onBlur}
                                    onChangeText={handleValueChange}
                                    value={value}
                                    keyboardType="number-pad"
                                />
                            </View>
                        )}
                    />
                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { value, onChange } }) => (
                            <>
                                <View className="mb-3 w-full">
                                    <Input
                                        placehoulder="Código do produto"
                                        autoCapitalize="none"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                </View>
                                <Scanner onScan={handleCodeScanned} />
                            </>
                        )}
                    />
                    <PrimaryButton name="Enviar" onPress={handleSubmit(onSub)} className="w-[150px]" />

                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}

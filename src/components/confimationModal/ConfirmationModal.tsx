import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '../button/Button';
import { PrimaryButton } from '../primaryButton/primaryButton';

type ConfirmationModalProps = {
    isVisible: boolean;
};

export function ConfirmationModal({ isVisible}: ConfirmationModalProps) {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["50%"], []);

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

    return (
        <View className='flex py-72 h-screen'>
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                index={-1} // Start in a closed state
                enablePanDownToClose // Allow the BottomSheet to be closed by swiping down
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text className='font-medium'>Confirmar transação</Text>
                    <Text className='text-xs mb-3'>Clique pra confirmar a sua venda</Text>
                    <PrimaryButton name='Confirmar' className='w-full'/>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}

import React from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { useModalContext } from '@app/context/ModalContextProvider';

const Loader = () => {
    const { loading } = useModalContext();
    
    return (
        <Modal
            transparent
            animationType='fade'
            visible={loading}
            statusBarTranslucent
            className='relative'
        >
            <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom:0,
                    right:0,
                    left:0
                }}
                blurType="dark"
                blurAmount={2}
            />

            <View className='flex-1  justify-center items-center'>
                <View className='p-4 rounded-lg bg-white'>
                    <ActivityIndicator size="large" color="#15BA43" />
                </View>
            </View>
            
        </Modal>
    )
}

export default Loader
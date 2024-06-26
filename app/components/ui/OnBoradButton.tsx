import { useModalContext } from '@app/context/ModalContextProvider'
import React from 'react'
import { Pressable, Text } from 'react-native'

interface Props {
    text: string,
    onPress: () => void,
    disabled ?: boolean,
}

const OnBoradButton = ({ text, onPress , disabled}: Props) => {
    const {loading} = useModalContext();
    return (
        <Pressable disabled={disabled || loading} className={`flex items-center justify-center py-3 rounded-full bg-app-green ${ disabled ? 'opacity-50' : 'opacity-100'}`} onPress={onPress}>
            <Text className='text-base font-poppins-semibold text-white'>{text}</Text>
        </Pressable>
    )
}

export default OnBoradButton
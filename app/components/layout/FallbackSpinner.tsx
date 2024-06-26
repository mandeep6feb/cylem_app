import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const FallbackSpinner = () => {
    return (
        <View className='flex-1 h-96 items-center justify-center'>
            <ActivityIndicator color={"#15BA43"} size={'large'}/>
        </View>
    )
}

export default FallbackSpinner
import React from 'react'
import { Text, View } from 'react-native'
import { SuccessPaymentSvg } from '@app/components/ui/SvgComponents'
import Header from '@app/components/ui/Header'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { PaymentSuccessScreenNavigationProp, PaymentSuccessScreenRouteProp } from '@app/types/navigationTypes'

const PaymentSuccessScreen = ({ navigation, route }: {
    navigation: PaymentSuccessScreenNavigationProp
    route: PaymentSuccessScreenRouteProp
}) => {
    const { amount, card } = route.params;
    return (
        <View className="w-full h-full flex-col justify-between py-2 bg-white dark:bg-app-dark-theme-0">
            <View className='flex-1'>
                <Header title='Payment Success' />
                <View className="mt-9 w-full h-auto items-center justify-center">
                    <SuccessPaymentSvg />
                </View>
                <View className={`flex-col items-center mt-6`}>
                    <Text className='text-2xl font-poppins-semibold text-[#121826] dark:text-gray-100'>Transaction Complete</Text>
                    <Text className="text-sm text-center mt-3 mx-2 text-[#9B9B9B] dark:text-gray-300">Your transaction has  been completed.
                        You subscription of {card} tier ₹{amount} per month.</Text>
                </View>
            </View>
            <View className="w-full px-2">
                <OnBoradButton text='Go to Dashboard' onPress={() => navigation.navigate('DashboardScreen')} />
            </View>
        </View>
    )
}

export default PaymentSuccessScreen
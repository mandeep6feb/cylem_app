import React, { useState } from 'react'
import { Share, Text, TouchableOpacity, View} from 'react-native'
import Header from '@app/components/ui/Header'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { ReferralSvg } from '@app/components/ui/SvgComponents'
import { Check, Copy } from 'lucide-react-native'

const ReferralScreen = () => {
    const [copy,setCopy] = React.useState(false);
    const [referralCode,setReferralCode] = useState('CYLEM6969')

    const copyToClipboard = () => {
        setCopy(true);
    }

    const onShare = async () => {
        try {
            await Share.share({
                message: `Hey! I'm inviting you to join Crometech solutions Pvt Ltd. Sign up using my referral link below and both of us will get ₹2000\n${"Rohit kohli"}'s referral link: https://www.cylem.in`,
            })
        } catch (err: any) {
            console.log(err);
        }
    }
    return (
        <View className={`w-full h-full flex-col justify-between py-2 bg-white dark:bg-app-dark-theme-0`}>
            <View className='flex-1'>
                <Header title='Payment Success' backButtonShown={true}  iconColor='#222' titleColor='#222' borderColor='#222'/>
                <View className="mt-9 w-full h-auto items-center justify-center">
                    <ReferralSvg />
                </View>
                <View className="only:flex-col items-center mt-4">
                    <Text className='text-2xl text-[#121826] font-poppins-semibold dark:text-gray-300'>Refer & Earn</Text>
                    <Text className="text-sm text-center mt-2 w-64 mx-auto">Share this code with your friend and both of you will get ₹XXXX</Text>
                </View>
                <View className="w-full h-20 mt-10 px-3 flex items-center justify-center">
                    <View className="w-full h-full flex-row items-center justify-between px-4 rounded-2xl border-2 border-dashed bg-[#f4fced] dark:bg-gray-100 border-app-green-outline" style={{
                        borderStyle: 'dotted'
                    }}>
                        <Text className='text-lg text-[#121826] font-poppins-semibold'>{referralCode}</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={copyToClipboard} className="flex-row items-center gap-x-3">
                            {!copy ? <Copy size={20} color={"#1B7A00"} /> : <Check size={20} color={"#1B7A00"}/>}
                            <Text className='text-lg text-[#1B7A00] font-poppins-semibold'>Copy Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="w-full px-2">
                <OnBoradButton text='Refer Friend' onPress={onShare} />
            </View>
        </View>
    )
}

export default ReferralScreen
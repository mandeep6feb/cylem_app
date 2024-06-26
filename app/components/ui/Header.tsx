import { ChevronLeft } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { IsDark } from '@app/utils/helper'

interface Props {
    title: string,
    backButtonShown?: boolean,
    iconColor?: string,
    titleColor?: string,
    borderColor?: string
}

const Header = ({ title, backButtonShown, iconColor, titleColor, borderColor }: Props) => {
    const navigation = useNavigation();
    const darkMode = IsDark();
    return (
        <View className="w-full h-auto flex-row py-5 relative items-center justify-center">
            <TouchableOpacity onPress={() => navigation.goBack()} className={`absolute left-3 border w-auto rounded-full p-2 flex-shrink-0 ${backButtonShown !== undefined ? backButtonShown ? 'block' : 'hidden' : 'block'}`} style={{ borderColor: darkMode ? "#ede9e9" : borderColor }}>
                <ChevronLeft color={darkMode ? '#ede9e9' : iconColor !== undefined ? iconColor : '#222'} size={24} />
            </TouchableOpacity>
            <View className={`flex flex-1 w-full items-center justify-center`}>
                <Text className="text-xl captilaize font-poppins-semibold  dark:text-gray-100" style={{
                    color: darkMode ? "#ede9e9" : titleColor !== undefined ? iconColor : '#222'
                }}>{title}</Text>
            </View>
        </View>
    )
}

export default Header
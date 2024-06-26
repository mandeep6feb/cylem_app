import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { HandCoins, Menu } from 'lucide-react-native'
import { IsDark } from '@app/utils/helper'
import { DrawerActions } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '@app/redux/store'
import WithdrawnModal from '@app/modules/payment/WithdrawalModal'

const DashboardHeader = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const user_collection_details = useSelector((state: RootState) => state.dashboard_slice.user_collection_details);

    const handleWithdrawnOpenModal = () => {
        setModalVisible(true);
    };

    const handleWithdrawnCloseModal = () => {
        setModalVisible(false);
    };


    return (
        <View className='w-full h-auto p-4'>
            <View className="w-full h-auto flex-row items-center justify-between">
                <TouchableOpacity onPress={() => {
                    navigation.dispatch(DrawerActions.openDrawer());
                }} activeOpacity={0.9} >
                    <Menu size={28} color={IsDark() ? '#fff' : "#000"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleWithdrawnOpenModal} activeOpacity={1} className="border relative flex-row items-center h-8 rounded-3xl border-gray-200">
                    <Text className="text-base pl-4 pr-2 pt-1 text-black dark:text-gray-100 font-poppins-medium">₹ {user_collection_details?.collection_in ?? "00.00"}</Text>
                    <View className="flex items-center justify-center p-2 rounded-full bg-app-green">
                        <HandCoins size={20} color={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <WithdrawnModal
                isVisible={modalVisible}
                totalAmount={user_collection_details ? user_collection_details?.collection_in  : 0}
                onClose={handleWithdrawnCloseModal}
            />
        </View>
    )
}

export default DashboardHeader
import React, { useEffect } from 'react'
import { Text, View, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import DashboardHeader from '../../components/ui/DashboardHeader'
import { Plus } from 'lucide-react-native'
import { IsDark } from '@app/utils/helper'
import { useDispatch, useSelector } from "react-redux"
import { SubscriptionScreenNavigationProp } from '@app/types/navigationTypes'
import { RootState } from '@app/redux/store'
import { getPaymentDetails } from '@app/redux/slices/dashboardSlice'
import { paymentType } from '@app/types/dashboard'

function findMyBucketAmount(subscription_id: number) {
    switch (subscription_id) {
        case 1: return 1000;
        case 2: return 3000;
        case 3: return 5000;
        default: return 0;
    }
}
const SubscriptionScreen = ({ navigation }: { navigation: SubscriptionScreenNavigationProp }) => {
    const { bucket_details, payment_details } = useSelector((slices: RootState) => slices.dashboard_slice.payment_details);
    const dispatch = useDispatch();
    const darkTheme = IsDark();

    useEffect(() => {
        const getSubscriptionData = () => {
            dispatch(getPaymentDetails());
        };
        getSubscriptionData();
    }, []);

    return (
        <View className="w-full h-full bg-white dark:bg-app-dark-theme-0">
            <StatusBar backgroundColor={darkTheme ? '#111111' : '#fff'} barStyle={darkTheme ? 'light-content' : 'dark-content'} />
            <DashboardHeader navigation={navigation} />
            <View className='flex-1 p-4'>
                {   bucket_details && payment_details ? (
                        <View className="w-full flex-1 px-2 py-4 rounded-lg border border-gray-200 dark:border-gray-500">
                            {
                                bucket_details && payment_details && (
                                    <>
                                        <View className='w-full h-[100px] bg-[#F4FAFF] border border-gray-100 dark:bg-[#00000033] rounded-lg flex-row items-center justify-between px-2 py-1'>
                                            <View className='w-auto h-full flex-col  justify-between'>
                                                <View>
                                                    <View className=''>
                                                        <Text className='text-sm font-medium text-black  dark:text-gray-200'>Subscription Amount</Text>
                                                        <Text className='text-xs text-[#626468] font-poppins-semibold dark:text-gray-300 pt-1'>₹ {findMyBucketAmount(bucket_details?.subscription_id)}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View className=''>
                                                        <Text className='text-sm font-medium text-black  dark:text-gray-200'>Remaining Duration</Text>
                                                        <Text className='text-xs text-[#626468] font-poppins-semibold dark:text-gray-300 pt-1'>{bucket_details?.duration}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View className='w-auto h-full flex-col justify-between'>
                                                <View>
                                                    <View className=''>
                                                        <Text className='text-sm font-medium text-black  dark:text-gray-200'>Total Subscription Paid</Text>
                                                        <Text className='text-xs text-[#626468] font-poppins-semibold dark:text-gray-300 pt-1'>{bucket_details?.total_paid_subs}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <View className=''>
                                                        <Text className='text-sm font-medium text-black  dark:text-gray-200'>Subscription Ending</Text>
                                                        <Text className='text-xs text-[#626468] font-poppins-semibold dark:text-gray-300 pt-1'>{bucket_details?.end_date.toString()}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                        <FlatList
                                            data={payment_details}
                                            renderItem={({ item, index }: { item: paymentType; index: number }) => {
                                                return (
                                                    <View className='w-full bg-[#F4FAFF] dark:bg-[#00000033] rounded-lg mb-2  flex-row items-center justify-between px-2 py-1 border border-gray-100'>
                                                        <View className='flex-row gap-x-4 items-center'>
                                                            <View className=''>
                                                                <Plus className='bg-app-green rounded-full' color={"#fff"} size={18} />
                                                            </View>
                                                            <View>
                                                                <Text className='text-app-green text-sm font-medium'>Subscription Added</Text>
                                                                <Text className='text-xs text-[#838D9F] dark:text-gray-400'>{item.subscription_date}</Text>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text className='text-black dark:text-gray-300 font-poppins-medium text-xs'>₹ {item.amount}</Text>
                                                        </View>
                                                    </View>
                                                );
                                            }}
                                            keyExtractor={(item) => item.created_at}
                                            showsVerticalScrollIndicator={false}
                                            className='flex-1 py-2'
                                        />
                                    </>
                                )
                            }
                        </View>
                    ) : (
                        <View className='border border-gray-200 flex-1 rounded-md itmes-center justify-center'>
                            <ActivityIndicator color={"#999"} size={'large'}/>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default SubscriptionScreen
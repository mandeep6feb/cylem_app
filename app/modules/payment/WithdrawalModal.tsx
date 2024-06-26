import { useModalContext } from '@app/context/ModalContextProvider';
import { commonService } from '@app/services/commonService';
import { WithdrawalFormType, WithdrawalSchema } from '@app/utils/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator, ScrollView } from 'react-native';

interface WithdrawalModalProps {
    isVisible: boolean;
    totalAmount: number;
    onClose: () => void;
}

interface DataTableType {
    amount: number;
    cashback_date: string;
    status: number;
}

const WithdrawalModal = ({ isVisible, totalAmount, onClose }: WithdrawalModalProps) => {

    const [cashbackJackpotDetails, setCashbackJackpotDetails] = useState<Array<DataTableType> | null>(null);
    const [cashbackUserAmount, setCashbackUserAmount] = useState<Array<DataTableType> | null>(null);
    const [withdrawRequest, setWithdrawRequest] = useState<Array<DataTableType> | null>(null);

    const { setLoading } = useModalContext();
    const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<WithdrawalFormType>({
        resolver: zodResolver(WithdrawalSchema),
        defaultValues: {
            withdrawal_amount: ''
        }
    });


    const doWithdrawal = async (data: { withdrawal_amount: string }) => {
        const amount_for_withdrawal = parseInt(data.withdrawal_amount);
        if (totalAmount < amount_for_withdrawal) {
            setError('withdrawal_amount', {
                type: 'validate',
                message: `Total balance is low from withdrawal amount ${amount_for_withdrawal}`
            })
        } else {
            try {
                clearErrors();
                setLoading(true);
                const data = await commonService(
                    'POST',
                    'api/user/collection_withdrawn',
                    { amount: amount_for_withdrawal }
                )

                onClose();

                if (!data.status) {
                    Alert.alert(
                        "Failed to Withdrawal",
                        `You amount ₹${amount_for_withdrawal} has been failed to withdrawal.`
                    )
                }

                if (data.status) {
                    Alert.alert(
                        "Amount Withdrawal",
                        `You amount ₹${amount_for_withdrawal} has been withdrawal successfully.`
                    )
                }

            } catch (err: any) {
                Alert.alert(
                    err.message,
                    'Something went wrong, Please try again..'
                )
            }
        }
        setLoading(false);
    }


    useEffect(() => {
        const getUserCollectionDetails = async () => {
            try {
                if (isVisible) {
                    const user_collection_data = await commonService(
                        'GET',
                        'api/user/get-user-cashback',
                    )

                    if (!user_collection_data?.status || !user_collection_data) {
                        throw new Error("Failed to get Collection details");
                    }

                    setCashbackJackpotDetails(user_collection_data.res.cashbackJackpotDetails);
                    setCashbackUserAmount(user_collection_data.res.cashbackUserAmount)
                    setWithdrawRequest(user_collection_data.res.withdrawRequest);
                }

            } catch (err: any) {
                Alert.alert(
                    err.message,
                    'Failed to fetch Withdrawal history !'
                );
            }
        }
        getUserCollectionDetails();
    }, [isVisible])

    return (
        <Modal
            animationType='fade'
            transparent={true}
            statusBarTranslucent
            visible={isVisible}
            onRequestClose={onClose}
        >
            <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
                blurType="light"
                blurAmount={6}
            />
            <View className='px-2 py-10 h-auto' style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className='relative flex-1 bg-white dark:bg-app-dark-theme-0 p-6 w-full rounded-md'>
                    <View className='pb-3 border-b border-gray-200 dark:border-gray-500 '>
                        <Text className='text-xl text-black-text-0 py-3 dark:text-gray-200'>Total balance: ₹{totalAmount}</Text>
                        <Controller
                            control={control}
                            name={'withdrawal_amount'}
                            render={({ field: { value, onChange, onBlur } }) => (
                                <TextInput
                                    placeholder="Enter your amount"
                                    className={`border pl-2 text-lg ${errors.withdrawal_amount?.message ? "border-red-400" : "border-gray-400"} rounded h-11`}
                                    value={value}
                                    onChangeText={onChange}
                                    maxLength={5}
                                    onBlur={onBlur}
                                    keyboardType="numeric"
                                />
                            )}
                        />
                        <Text className='text-red-500 text-xs py-1'>{errors?.withdrawal_amount?.message}</Text>
                        <View className="flex-row items-center justify-between mt-2">
                            <TouchableOpacity
                                activeOpacity={1}
                                className='bg-app-green rounded px-3 py-2'
                                onPress={handleSubmit(doWithdrawal)}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Withdraw</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                className='bg-app-green rounded px-4 py-2'
                                onPress={onClose}
                            >
                                <Text style={{ color: 'white', fontSize: 16 }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex-1'>
                        {
                            (cashbackJackpotDetails && cashbackUserAmount && withdrawRequest) ? (
                                <View className='flex-1'>
                                    <View className='flex-1 py-1'>
                                        <Text className='text-xs text-app-dark-theme-0 dark:text-gray-200'>Withdraw History</Text>
                                        <DataTable data={withdrawRequest} showStatus={true} />
                                    </View>
                                    <View className='flex-1 py-1'>
                                        <Text className='text-xs text-app-dark-theme-0 dark:text-gray-200'>Mega & Mini Cashback History</Text>
                                        <DataTable data={cashbackUserAmount} />
                                    </View>
                                    <View className='flex-1 py-1'>
                                        <Text className='text-xs text-app-dark-theme-0 dark:text-gray-200'>Jackpot Cashback History</Text>
                                        <DataTable data={cashbackJackpotDetails} />
                                    </View>

                                </View>
                            ) : (
                                <View className="flex-1 items-center justify-center">
                                    <ActivityIndicator color={"#111"} size={'large'} />
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
};



const DataTable = ({ data, showStatus }: {
    data: Array<DataTableType>,
    showStatus?: boolean
}) => {
    return (
        <View className='flex-1 py-1 border-b border-gray-200 dark:border-gray-500'>
            <View className='w-full bg-gray-800 flex-row items-center justify-around rounded'>
                <View>
                    <Text className='text-sm text-white py-1'>S.No</Text>
                </View>
                <View>
                    <Text className='text-sm text-white py-1'>Amount</Text>
                </View>
                {showStatus && (
                    <View>
                        <Text className='text-sm text-white py-1'>Status</Text>
                    </View>
                )}
                <View>
                    <Text className='text-sm text-white py-1'>Date</Text>
                </View>
            </View>
            {data.length === 0 ? (
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-sm text-gray-500 dark:text-gray-300 font-poppins-medium'>No history found</Text>
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} className=''>
                    {data.map((item: DataTableType, index) => (
                        <View key={index} className='w-full h-auto flex-row justify-around my-1.5 border-b border-gray-200'>
                            <View className='flex-1'>
                                <Text className='text-center text-xs text-black dark:text-gray-100'>{index + 1}</Text>
                            </View>
                            <View className='flex-1'>
                                <Text className='text-center text-xs text-black dark:text-gray-100'>{item.amount}</Text>
                            </View>
                            {showStatus && (
                                <View className='flex-1'>
                                    <Text className='text-center text-xs text-black dark:text-gray-100'>{item.status}</Text>
                                </View>
                            )}
                            <View className='flex-1'>
                                <Text className='text-center text-xs text-black dark:text-gray-100'>{item.cashback_date}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView >
            )}
        </View>
    )
}

export default WithdrawalModal;



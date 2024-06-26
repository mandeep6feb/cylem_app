import { CommonActions } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent, Text, TextInput, TextInputKeyPressEventData, TouchableOpacity, View, Alert } from 'react-native'
import { IsDark, verifyTheUser } from '@app/utils/helper'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { addToken } from '@app/utils/mmkvStorage'
import { useDispatch } from 'react-redux'
import { addUserDetails } from '@app/redux/slices/userSlice'
import { OtpScreenNavigationProp, OtpScreenRouteProp } from '@app/types/navigationTypes'
import { useModalContext } from '@app/context/ModalContextProvider'
import { SquarePen } from 'lucide-react-native'
import { commonService } from '@app/services/commonService'

const OtpScreen = ({ navigation, route }: {
    navigation: OtpScreenNavigationProp,
    route: OtpScreenRouteProp
}) => {

    const { mobileNumber, token } = route.params;
    const dispatch = useDispatch();
    const { setLoading } = useModalContext();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [securedOtp, setSecuredOtp] = useState(['', '', '', '']);
    const [code, setCode] = useState('');
    const inputs = useRef<TextInput[]>([]);
    const [counter, setCounter] = useState(30);

    const handleChange = (value: string, index: number) => {
        if (isNaN(parseInt(value)) || value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        const newSecuredOtp = [...securedOtp];
        newSecuredOtp[index] = value ? '*' : '';
        setSecuredOtp(newSecuredOtp);

        const newCode = newOtp.join('');
        setCode(newCode);

        if (value && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);

            const newSecuredOtp = [...securedOtp];
            newSecuredOtp[index - 1] = '';
            setSecuredOtp(newSecuredOtp);

            setCode(newOtp.join(''));

            if (index > 0) {
                inputs.current[index - 1].focus();
            }
        }
    };
    // verify the otp
    const verifyOtp = async () => {
        try {
            setLoading(true);

            if (code !== '1977') {
                setLoading(false);
                return;
            }

            const user_data = await commonService("GET", "api/user/user_details");
            const { status, not_filled_tab } = verifyTheUser(user_data)!;
            dispatch(addUserDetails(user_data));
            setLoading(false);

            status
                ? navigation.navigate("DashboardScreen")
                : navigation.navigate('SignupScreen', {
                    screen: not_filled_tab
                })

        } catch (err) {
            setLoading(false);
            Alert.alert("No Internet Connection", "Please check your internet connection");
        }
    }

    // timer for expired the otp
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [counter]);

    return (
        <View className="w-full h-full px-3 relative flex-1 flex-col justify-between bg-white py-4 dark:bg-app-dark-theme-0">
            <View>
                <View className="w-full">
                    <Text className="text-4xl mt-1 font-poppins-semibold text-black dark:text-gray-200">OTP Verification</Text>
                </View>
                <View className='my-6'
                >
                    <Text className='text-xl font-poppins-light text-[#797979] dark:text-gray-200'>Code has been</Text>
                    <View className='flex-row items-center gap-x-3'>
                        <Text className='text-xl font-poppins-light text-[#797979] dark:text-gray-200'>sent to <Text className='text-black dark:text-white'>{'+91 XXXXXXX' + mobileNumber.toString().substring(7)}</Text></Text>
                        <TouchableOpacity onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'LoginScreen' }],
                                })
                            )
                        }}>
                            <SquarePen color={IsDark() ? '#fff' : "#000"} size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-row items-center justify-center w-full h-auto mt-6">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            className="w-20 h-14 text-center text-lg rounded-full mx-1 border focus:border-2 border-[#c0c0c0] text-black dark:text-gray-100"
                            value={securedOtp[index]}
                            onChangeText={(value: string) => handleChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            secureTextEntry={true}
                            ref={(ref) => ref && (inputs.current[index] = ref)}
                        />
                    ))}
                </View>
                <View className="mt-6 flex-row items-center">
                    <Text className='text-[18px] font-poppins-light text-gray-800 dark:text-gray-200'>Didn't received code ?</Text>
                    <View className="pl-3">
                        {counter === 0 ? (
                            <Text className="underline text-[18px] font-poppins-semibold text-black dark:text-gray-50" onPress={() => {
                                setCounter(30)
                            }}>Resend OTP</Text>
                        ) : (
                            <Text className="underline text-[17px] font-poppins-light text-black dark:text-gray-50">Resend ({counter})</Text>
                        )}
                    </View>
                </View>

            </View>
            <View className="w-full h-auto">
                <OnBoradButton text='Verify' onPress={verifyOtp} />
            </View>
        </View>
    )
}

export default OtpScreen
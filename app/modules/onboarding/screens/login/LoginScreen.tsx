import React, { useState } from 'react'
import { Text, View, Image, Alert, ScrollView } from 'react-native'
import { COLORS, verifyTheUser } from '@app/utils/helper';
import CheckBox from 'react-native-check-box'
import LoginInputField from "../../components/login/LoginInputField"
import { Controller, useForm } from 'react-hook-form';
import OnBoradButton from '@app/components/ui/OnBoradButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { mobileFieldFormType, LoginSchema } from '@app/utils/zodSchema';
import { useModalContext } from '@app/context/ModalContextProvider';
import { LoginScreenNavigationProp } from '@app/types/navigationTypes';
import { addToken } from '@app/utils/mmkvStorage';
import { useDispatch } from 'react-redux';
import { addUserDetails } from '@app/redux/slices/userSlice';
import { commonService } from '@app/services/commonService';

interface LoginCredentialsType {
    mobile: string,
    password: string
}

const LoginScreen = ({ navigation }: { navigation: LoginScreenNavigationProp }) => {

    const { setLoading } = useModalContext();
    const dispatch = useDispatch();
    const [check, setCheck] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<mobileFieldFormType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            mobile: '',
            password: ''
        }
    });

    const Login = async (credentials: LoginCredentialsType) => {
        try {
            setLoading(true);

            const data = await commonService(
                "POST",
                "api/user/login",
                {
                    mobile: credentials.mobile,
                    password: credentials.password
                }
            );

            if (!data.success) {
                setLoading(false);
                Alert.alert("Invalid credentials", data.message);
            }

            if (data.success) {
                addToken(data.token);
                const user_data = await commonService("GET", "api/user/user_details");
                const { status, not_filled_tab } = verifyTheUser(user_data)!;
                dispatch(addUserDetails(user_data));
                setLoading(false);

                status
                    ? navigation.replace("DashboardScreen")
                    :  navigation.navigate('SignupScreen', {
                        screen: not_filled_tab
                    } as any)
            }

        } catch (error: any) {
            setLoading(false);
            Alert.alert(
                "No Internet Connection",
                "Please check your internet connection. And Try again.."
            );
        }

    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="w-full h-full flex-1 flex-col items-center justify-between bg-white dark:bg-app-dark-theme-0 py-4">
                <View className="w-full h-auto relative mb-0">
                    <View>
                        <Text className="text-center py-3 text-5xl text-black dark:text-gray-100 font-poppins-bold">Welcome!</Text>
                    </View>
                    <View className="w-full h-auto items-center">
                        <Image
                            style={{ width: 210, height: 200 }}
                            source={require("../../../../../assets/gif/login.gif")}
                        />
                    </View>
                    <View className='px-5 pt-4'>
                        <View className='py-3'>
                            <Text className='text-3xl font-poppins-semibold text-black dark:text-gray-100 '>Enter your</Text>
                            <Text className='text-3xl pt-1 font-poppins-semibold text-black dark:text-gray-100'>Mobile Number</Text>
                            <Text className='pt-1 text-base text-[#171717] dark:text-gray-300'>Please fill in your password and then</Text>
                        </View>
                        <View className='pt-3'>
                            <Controller
                                control={control}
                                name="mobile"
                                render={({ field: { value, onChange } }) => (
                                    <LoginInputField
                                        isError={errors.mobile}
                                        keyboardType={'decimal-pad'}
                                        value={value}
                                        onChangeMethod={onChange}
                                        placeholder="Your Phone Number"
                                        secureTextEntry={false}
                                        maxLength={10}
                                        iconName='SmartPhone'
                                    />
                                )}
                            />
                        </View>
                        <View className='pt-3'>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { value, onChange } }) => (
                                    <LoginInputField
                                        isError={errors.password}
                                        keyboardType={'name-phone-pad'}
                                        value={value}
                                        onChangeMethod={onChange}
                                        placeholder="Enter Your Password"
                                        secureTextEntry={true}
                                        maxLength={40}
                                        iconName='Lock'
                                    />
                                )}
                            />
                        </View>
                        <View className="py-4 flex-row items-center">
                            <CheckBox
                                onClick={() => { setCheck(!check) }}
                                isChecked={check}
                                checkBoxColor={COLORS.APP_GREEN}
                                uncheckedCheckBoxColor={COLORS.LIGHT_GRAY}
                            />
                            <Text className="text-sm pl-2 font-poppins-light text-[#171717] dark:text-gray-200">
                                Are you agree with {" "}
                                <Text className='underline' onPress={() => navigation.navigate('TermsAndCondition')}>
                                    Term of Service
                                </Text>
                                {" "}
                                and
                                {" "}
                                <Text className='underline' onPress={() => navigation.navigate('PrivacyPolicyScreen')}>
                                    Privacy policy
                                </Text>?
                            </Text>
                        </View>
                    </View>
                </View>
                <View className="w-full px-3">
                    <Text className='text-sm text-center font-poppins-light mb-2 text-[#9B9B9B] dark:text-gray-300'>Don't have an account? <Text className='text-blue-500 underline' onPress={() => navigation.navigate("SignupScreen")}>Register</Text></Text>
                    <OnBoradButton disabled={!check} text="Continue" onPress={handleSubmit(Login)} />
                </View>
            </View>
        </ScrollView>
    )
}

export default LoginScreen
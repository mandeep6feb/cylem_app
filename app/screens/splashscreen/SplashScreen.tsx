import React, { useEffect } from 'react'
import { CylemLogoSvgLight, CylemLogoSvgDark } from '@app/components/ui/SvgComponents'
import { Text, View, ActivityIndicator } from 'react-native'
import { IsDark, verifyTheUser } from '@app/utils/helper'
import { getToken } from '@app/utils/mmkvStorage'
import { useDispatch } from 'react-redux'
import { addUserDetails } from '@app/redux/slices/userSlice'
import { SplashScreenNavigationProp } from '@app/types/navigationTypes'
import { commonService } from '@app/services/commonService'

interface SplashScreenProps {
    navigation: SplashScreenNavigationProp;
}

const SplashScreen = ({ navigation }: SplashScreenProps) => {

    const token = getToken('token');
    const disptach = useDispatch();

    const handleUserScreen = async () => {
        try {

            if (!token) return navigation.replace('LoginScreen');

            const data = await commonService(
                "GET",
                "api/user/user_details"
            )
            
            if (data?.message) return navigation.replace('LoginScreen');

            disptach(addUserDetails(data));
            const { status, not_filled_tab } = verifyTheUser(data)!;

            status
                ? navigation.replace('DashboardScreen')
                : navigation.navigate("SignupScreen",{
                    screen: not_filled_tab
                } as any)

        } catch (err: any) {
            navigation.replace('LoginScreen');
        }
    }

    useEffect(() => {
        let isMounted = true;
        const initiateUserScreen = () => {
            if (isMounted) {
                if (token) {
                    handleUserScreen();
                } else {
                    setTimeout(() => {
                        if (isMounted) handleUserScreen();
                    }, 1000);
                }
            }
        };

        initiateUserScreen();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <View className="w-full h-full flex-1 items-center justify-center bg-white dark:bg-app-dark-theme-0 relative">
            {!IsDark() ? <CylemLogoSvgLight width={92} height={101} /> : <CylemLogoSvgDark width={92} height={101} fill={"red"} />}
            <Text className='my-3 font-poppins-semibold text-4xl text-black-text-0 dark:text-gray-100'>CYLEM</Text>
            <ActivityIndicator size={'large'} color={"#9B9B9B"} />
            <View className="flex-col items-center absolute bottom-5">
                <Text className="text-black dark:text-gray-300 font-inter-light">Powered by</Text>
                <Text className="text-1xl uppercase mt-1 text-black-text-0 dark:text-gray-100 font-poppins-medium">CROMTEK SOLUTIONS pvt. ltd.</Text>
            </View>
        </View>
    )
}

export default SplashScreen
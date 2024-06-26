import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { ScrollView, View } from 'react-native';
import Header from '@app/modules/onboarding/components/signup/ui/Header';
import { COLORS, IsDark } from '@app/utils/helper';
import NameToIcon from '@app/components/layout/NameToIcon';
import { RootTabParamList } from '@app/types/navigationTypes'
import { useSelector } from 'react-redux';
import PersonalScreen from "@app/modules/onboarding/components/signup/personalDetailsScreen/PersonalScreen";
import AddressScreen from "@app/modules/onboarding/components/signup/addressDetailsScreen/AddressScreen";
import BankScreen from "@app/modules/onboarding/components/signup/bankDetailsScreen/BankScreen";
import PaymentScreen from "@app/modules/onboarding/components/signup/paymentDetailsScreen/PaymentScreen";

const Tab = createMaterialTopTabNavigator<RootTabParamList>();
const useTitle = (route: any) => {
  switch (route.name) {
    case 'PersonalScreen':
      return 'Profile';
    case 'AddressScreen':
      return 'Address';
    case 'BankScreen':
      return 'Bank';
    case 'PaymentScreen':
      return 'Payment';
  }
}

const SignupScreen = () => {
  const darkMode = IsDark();
  const { ispersonaldetails, isaddress, isbank } = useSelector((state: any) => state.user);

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="w-full h-full bg-white dark:bg-app-dark-theme-0">
      <View style={{ flexShrink: 0 }}>
        <Header />
      </View>
      <View className='flex-1 px-1'>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let iconName = '';
                let iconColor = focused ? COLORS.APP_GREEN : darkMode ? COLORS.WHITE : COLORS.BLACK
                if (route.name === 'PersonalScreen') {
                  iconName = 'CircleUserRound';
                  if (ispersonaldetails === 1) {
                    iconColor = COLORS.APP_GREEN;
                  }
                } else if (route.name === 'AddressScreen') {
                  iconName = 'MapPin';
                  if (isaddress !== 0) {
                    iconColor = COLORS.APP_GREEN;
                  }
                } else if (route.name === 'BankScreen') {
                  iconName = 'Landmark';
                  if (isbank !== 0) {
                    iconColor = COLORS.APP_GREEN;
                  }
                } else if (route.name === 'PaymentScreen') {
                  iconName = 'Wallet';
                }

                return <NameToIcon name={iconName} size={24} color={iconColor} />;
              },
              tabBarActiveTintColor: COLORS.APP_GREEN,
              tabBarInactiveTintColor: COLORS.BLACK,
              tabBarIconStyle: {
                borderColor: COLORS.DARK_GRAY,
                borderStyle: 'solid',
                borderWidth: 0.1,
                backgroundColor: darkMode ? '#333333' : COLORS.WHITE,
                borderRadius: 100,
                width: 46,
                height: 46,
                alignItems: 'center',
                justifyContent: 'center'
              },
              tabBarPressColor: 'transparent',
              swipeEnabled: false,
              animationEnabled: true,
              tabBarLabelStyle: {
                fontSize: 11,
                fontFamily: 'Poppins Medium',
                textTransform: 'capitalize',
                color: darkMode ? "#fff" : COLORS.ORIGINAL_GRAY,
              },
              tabBarStyle: {
                elevation: 0,
                backgroundColor: darkMode ? "#121212" : "#fff",
              },
              tabBarIndicatorStyle: {
                borderBottomColor: COLORS.APP_GREEN,
                borderRadius: 5,
                borderBottomWidth: 7,
              },
              tabBarPressOpacity: 0,
              title: useTitle(route),
            })}
          >
            <Tab.Screen name='PersonalScreen' component={PersonalScreen} />
            <Tab.Screen name='AddressScreen' component={AddressScreen} />
            <Tab.Screen name='BankScreen' component={BankScreen} />
            <Tab.Screen name='PaymentScreen' component={PaymentScreen} />
          </Tab.Navigator>
      </View>
    </ScrollView>
  )
}

export default SignupScreen
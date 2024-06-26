import React from 'react'
import { Text, View } from 'react-native'
import { IsDark } from '@app/utils/helper'
import { CylemLogoSvgDark, CylemLogoSvgLight } from '@app/components/ui/SvgComponents'
import Logout from '@app/components/ui/Logout'
import { useSelector } from 'react-redux'
import { RootState } from '@app/redux/store'
import { useNavigation } from '@react-navigation/native'
import { SignupScreenNavigationProp } from '@app/types/navigationTypes'

const Header = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const ispersonaldetails = useSelector((states: RootState) => states.user.ispersonaldetails);
  return (
    <View className="px-4 pb-3 w-full flex-col items-center">
      <View className='flex-row items-center h-auto w-full justify-between'>
        <View className=''>
          {
            IsDark() ? <CylemLogoSvgDark width={70} height={70} /> : <CylemLogoSvgLight width={70} height={70} />
          }
        </View>
        <View className='flex-1 mt-4'>
          <Text className='text-xl text-center font-poppins-medium text-[#515151]  dark:text-gray-200'>Since you are new here, lets get to know you more.</Text>
        </View>
      </View>
      <View className='mt-1'>
        <Text className='text-sm font-poppins-light text-[#9B9B9B] dark:text-gray-300'>First Step towards an exciting journey</Text>
        { ispersonaldetails != 0 ? (
            <Text className='text-xs text-center font-poppins-light mt-1 text-[#9B9B9B] dark:text-gray-300'>Do you want to ? <Logout style={'text-blue-500 underline'}/></Text> )
          : (
            <Text className='text-xs text-center font-poppins-light mt-1 text-[#9B9B9B] dark:text-gray-300'>Already have an account ? <Text className='text-blue-500 underline' onPress={() => {
              navigation.replace("LoginScreen");
            }}>Login</Text></Text>
          )
        }
      </View>
    </View>
  )
}

export default Header
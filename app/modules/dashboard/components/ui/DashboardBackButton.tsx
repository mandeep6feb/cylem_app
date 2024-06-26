import { ProfileScreenNavigationProp } from '@app/types/navigationTypes';
import React from 'react'
import { Pressable, Text } from 'react-native'

const DashboardBackButton = ({navigation}:{navigation:ProfileScreenNavigationProp}) => {
  return (
    <Pressable className='w-full py-3 px-4 rounded-3xl bg-app-green flex items-center justify-center' onPress={() => {
        navigation.goBack();
    }}>
      <Text className='text-base font-poppins-semibold text-white'>Back to Dashboard</Text>
    </Pressable>
  )
}

export default DashboardBackButton
import React from 'react'
import { View, Text, StatusBar} from 'react-native'
import { useSelector } from 'react-redux'
import { User } from "lucide-react-native"
import Header from '@app/components/ui/Header';
import { RootState } from '@app/redux/store';

interface InputProps {
  value: string;
  title: string;
  uppercase?: boolean;
}

const InputField = ({ value, title, uppercase }: InputProps) => {
  return (
    <View className='w-full h-12 mt-4 border relative  border-app-green rounded-lg'>
      <View className='absolute -top-3 left-4 bg-white dark:bg-app-dark-theme-0 px-1'>
        <Text className='text-sm text-black-text-0 dark:text-gray-100'>{title}</Text>
      </View>
      <View className='w-full h-full flex justify-center opacity-60'>
        <Text className={`text-sm ml-4 tracking-widest text-[#181818] dark:text-gray-200 ${uppercase && 'uppercase'}`}>{value}</Text>
      </View>
    </View>
  )
}

const ProfileScreen = () => {
  const user = useSelector((states: RootState) => states.user.user);
  return (
    <View className="w-full h-full bg-white dark:bg-app-dark-theme-0">
      <StatusBar backgroundColor={"#15BA43"} barStyle={"light-content"} />
      <View className='w-full h-60 mb-2 rounded-b-3xl bg-app-green relative'>
        <Header title='Profile' backButtonShown={true} iconColor='#fafafa' titleColor='#fafafa' borderColor='#fafafa' />
        <View className='w-full h-auto absolute bottom-2 flex items-center justify-center gap-y-1'>
          <View className='w-20 h-20 overflow-hidden mb-3 flex items-center justify-center relative bg-white rounded-full border-2 border-gray-200'>
            <View className="absolute top-5">
              <User size={65} color={"#000"} fill={"#121212"} />
            </View>
          </View>
          <View className='w-full h-auto flex items-center justify-center'>
            <Text className='text-3xl font-poppins-semibold text-white' numberOfLines={1} ellipsizeMode='tail'>{user?.first_name + " " + user?.last_name}</Text>
          </View>
          <View className='w-full h-auto flex items-center justify-center'>
            <Text className='text-2xl font-poppins-semibold text-white'>{"+91 " + user?.mobile}</Text>
          </View>
        </View>
      </View>
      {/* personal details section */}
      <View className='px-4 pt-2'>
        <View className='w-full mb-1'>
          <Text className="text-black dark:text-gray-100">Personal Details</Text>
        </View>
        <InputField value={user?.email} title='Email' />
        <InputField value={user?.gender} title='Gender' />
        <InputField value={user?.user_code} title="User's Code" />
      </View>
      {/* bank details section */}
      <View className='px-4 pt-2'>
        <View className='w-full mb-1'>
          <Text className="text-black dark:text-gray-100">Bank Details</Text>
        </View>
        <InputField value={user?.user_bank_detail?.ifsc_code} title='IFSC Code' uppercase={true} />
        <InputField value={user?.user_bank_detail?.account_number} title='Account Number' />
      </View>
      <View className='px-4 pt-2'>
        <View className='w-full mb-1'>
          <Text className="text-black dark:text-gray-100">Address Details</Text>
        </View>
        <InputField value={user?.user_address_detail?.house_number + " " + user?.user_address_detail?.adress_line_1 + " " + user?.user_address_detail?.pincode} title='Address' uppercase={true} />
      </View>
    </View>
  )
}

export default ProfileScreen
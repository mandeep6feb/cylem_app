import React, { useEffect, useRef, useState } from 'react'
import { Alert, View, TextInput } from 'react-native'
import { Address_details_Type } from '@app/types/onboarding'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { AddressDetailsFormType, addressDetailSchema } from '@app/utils/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddressScreenNavigationProp } from '@app/types/navigationTypes'
import { useModalContext } from '@app/context/ModalContextProvider'
import { updateAddressDetailsState } from '@app/redux/slices/userSlice'
import SignupInputField from '../ui/SignupInputField'
import { commonService } from '@app/services/commonService'
import { RootState } from '@app/redux/store'

const AddressScreen = ({ navigation }: {
  navigation: AddressScreenNavigationProp;
}) => {

  const dispatch = useDispatch();
  const { user, ispersonaldetails } = useSelector((state: RootState) => state.user);
  const { setLoading } = useModalContext();
  const [isEditable, setIsEditable] = useState<boolean>(true);

  // ref of all the inputs fields
  const addressRef = useRef<TextInput>(null);
  const pincodeRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const landmarkRef = useRef<TextInput>(null);

  // method for focus to next input without closing keyboard
  function onSubmitHouseNumber() {
    addressRef.current?.focus();
  }
  function onSubmitAddress() {
    pincodeRef.current?.focus();
  }
  function onSubmitPincode() {
    cityRef.current?.focus();
  }
  function onSubmitCity() {
    stateRef.current?.focus();
  }
  function onSubmitState() {
    landmarkRef.current?.focus();
  }

  // address form states
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AddressDetailsFormType>({
    resolver: zodResolver(addressDetailSchema),
    defaultValues: {
      adress_line_1: '',
      state: '',
      house_number: '',
      landmark: '',
      city: '',
      pincode: ''
    }
  });

  // submit the address
  const onSubmit = async (data: Address_details_Type) => {
    try {
      setLoading(true);

      const res = await commonService(
        'POST',
        'api/address/create-new-address',
        data
      )
      
      if (!res.status) Alert.alert('Address',res.message);
      
      dispatch(updateAddressDetailsState(1));
      setLoading(false);
      setIsEditable(false);
      navigation.navigate('BankScreen');

    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection"
      );
    }
  };

  // if user address is exist in redux store. so filled in inputs
  useEffect(() => {
    const defaultValues = control._defaultValues;
    if (user !== null && user.user_address_detail != null) {
      const details = user.user_address_detail;
      Object.keys(details).forEach((key: string) => {
        if (key in defaultValues) {
          setValue(key as any, details[key] || '');
        }
      });
      setIsEditable(false);
    }

  }, [user, setValue, user?.user_address_detail]);

  return (
    <View className="w-full h-full relative px-2 items-center bg-white dark:bg-app-dark-theme-0">
      <View className='w-full'>
        <View className='mt-2'>
          {/* inputs fields */}
          <Controller
            control={control}
            name={'house_number'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='House Number'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                placeholder='Enter your House number*'
                editable={isEditable}
                onSubmitEditing={onSubmitHouseNumber}
                maxLength={20}
                errors={errors.house_number}
                keyboardType='default'
              />
            )}
          />
          <Controller
            control={control}
            name={'adress_line_1'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='Address'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                placeholder='Enter your Address*'
                editable={isEditable}
                onSubmitEditing={onSubmitAddress}
                forwardedRef={addressRef}
                maxLength={55}
                errors={errors.adress_line_1}
                keyboardType='default'
              />
            )}
          />
          <Controller
            control={control}
            name={'pincode'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='PinCode'
                value={value.toString()}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                placeholder='Enter your PinCode*'
                editable={isEditable}
                onSubmitEditing={onSubmitPincode}
                forwardedRef={pincodeRef}
                maxLength={6}
                errors={errors.pincode}
                keyboardType='decimal-pad'
              />
            )}
          />
          <Controller
            control={control}
            name={'city'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='City'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                placeholder='Enter your City*'
                editable={isEditable}
                onSubmitEditing={onSubmitCity}
                forwardedRef={cityRef}
                maxLength={25}
                errors={errors.city}
                keyboardType='default'
              />
            )}
          />
          <Controller
            control={control}
            name={'state'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='State'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                placeholder='Enter your State*'
                editable={isEditable}
                onSubmitEditing={onSubmitState}
                forwardedRef={stateRef}
                maxLength={25}
                errors={errors.state}
                keyboardType='default'
              />
            )}
          />
          <Controller
            control={control}
            name={'landmark'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                labelText='Landmark'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='done'
                blurOnSubmit={true}
                placeholder='Enter your Landmark*'
                editable={isEditable}
                forwardedRef={landmarkRef}
                onSubmitEditing={() => { }}
                maxLength={50}
                errors={errors.landmark}
                keyboardType='default'
              />
            )}
          />
        </View>
      </View>
      <View className="w-full my-4">
        {/* submit button */}
        <OnBoradButton disabled={!isEditable || ispersonaldetails == 0} text='Continue' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}
export default AddressScreen
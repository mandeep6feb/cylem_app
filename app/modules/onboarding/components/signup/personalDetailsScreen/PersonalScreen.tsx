import React, { useEffect, useRef, useState } from 'react'
import { Alert, Text, View, TextInput } from 'react-native'
import { Personal_details_Type } from '@app/types/onboarding'
import { COLORS, IsDark } from '@app/utils/helper'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown'
import { Controller, useForm } from 'react-hook-form'
import { PersonalDetailsFormType, personalDetailSchema } from '@app/utils/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PersonalScreenNavigationProp } from '@app/types/navigationTypes'
import { addToken } from '@app/utils/mmkvStorage'
import { updatePersonalDetailsState } from '@app/redux/slices/userSlice'
import { useModalContext } from '@app/context/ModalContextProvider'
import SignupInputField from '../ui/SignupInputField'
import { commonService } from '@app/services/commonService'
import { RootState } from '@app/redux/store'

const gender_data = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
]

const PersonalScreen = ({ navigation }: {
  navigation: PersonalScreenNavigationProp
}) => {

  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const { setLoading } = useModalContext();
  const user = useSelector((state: RootState) => state.user.user);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const darkMode = IsDark();

  // ref of all the inputes fields
  const lastNameRef = useRef<TextInput>(null);
  const mobileRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const fatherNameRef = useRef<TextInput>(null);
  const referralRef = useRef<TextInput>(null);

  // switch next field using keyboard next key
  function onSubmitFirstnameField() {
    lastNameRef.current?.focus();
  }
  function onSubmitLastnameField() {
    mobileRef.current?.focus();
  }
  function onSubmitMobileField() {
    emailRef.current?.focus();
  }
  function onSubmitEmailField() {
    passwordRef.current?.focus();
  }
  function onSubmitPasswordField() {
    confirmPasswordRef.current?.focus();
  }
  function onSubmitComfirmPasswordField() {
    fatherNameRef.current?.focus();
  }
  function onSubmitFatherNameField() {
    referralRef.current?.focus();
  }


  const { control, handleSubmit, setValue, setError, clearErrors, formState: { errors } } = useForm<PersonalDetailsFormType>({
    resolver: zodResolver(personalDetailSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      password: '',
      confirm_password: '',
      gender: '',
      father_name: '',
      referral: '',
    }
  })

  // submit the user personal details
  const onSubmit = async (data: Personal_details_Type) => {
    try {
        setLoading(true); 
        data['role'] = 4;
        
        const res = await commonService(
          'POST',
          'api/user/create-new-user',
          data
        )

        // mobile already exits
        if (!res.status){
          setLoading(false);
          setError('mobile', {
            type: 'validate',
            message: 'Mobile Already registered'
          })
        }

        if (res.status) {
          addToken(res.token);
          clearErrors('mobile'); 
          dispatch(updatePersonalDetailsState(1));
          setLoading(false); 
          setIsEditable(false);
          navigation.navigate('AddressScreen');
        }
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection"
      );
    }
  }

  // check your already filled this or not
  useEffect(() => {
    const defaultValues = control._defaultValues;
    if (user !== null) {
      const details = user;
      Object.keys(details).forEach((key: string) => {
        if (key in defaultValues) {
          setValue(key as any, details[key] || '');
        }
      });
      setIsEditable(false);
    }
  }, [setValue, user]);

  return (
    <View className="w-full h-full relative px-2 items-center pt-2 bg-white dark:bg-app-dark-theme-0">
      <View className='w-full h-auto'>
        
        {/* first name and last name fields */}
        <View className='w-full h-auto flex flex-row items-center'>
          <Controller
            control={control}
            name={'first_name'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                editable={isEditable}
                labelText='First Name'
                onSubmitEditing={onSubmitFirstnameField}
                maxLength={30}
                placeholder="Enter your First Name*"
                errors={errors.first_name}
                keyboardType='default'
              />
            )}
          />
          <View className='border-4 border-transparent'></View>
          <Controller
            control={control}
            name={'last_name'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                editable={isEditable}
                labelText='Last Name'
                forwardedRef={lastNameRef}
                onSubmitEditing={onSubmitLastnameField}
                maxLength={30}
                placeholder="Enter your Last Name*"
                errors={errors.last_name}
                keyboardType='default'
              />
            )}
          />
        </View>

        {/* mobile field */}
        <Controller
          control={control}
          name={'mobile'}
          render={({ field: { value, onChange, onBlur } }) => (
            <SignupInputField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType='next'
              blurOnSubmit={false}
              editable={isEditable}
              labelText='Mobile'
              forwardedRef={mobileRef}
              onSubmitEditing={onSubmitMobileField}
              maxLength={10}
              placeholder="Enter your Mobile Number*"
              errors={errors.mobile}
              keyboardType='decimal-pad'
            />
          )}
        />

        {/* email field */}
        <Controller
          control={control}
          name={'email'}
          render={({ field: { value, onChange, onBlur } }) => (
            <SignupInputField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType='next'
              blurOnSubmit={false}
              editable={isEditable}
              forwardedRef={emailRef}
              labelText='Email'
              onSubmitEditing={onSubmitEmailField}
              maxLength={30}
              placeholder="Enter your Email Address*"
              errors={errors.email}
              keyboardType='email-address'
            />
          )}
        />

        {/* password and cpassword fields */}
        <View className='w-full h-auto flex flex-row items-center'>
          <Controller
            control={control}
            name={'password'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                editable={isEditable}
                forwardedRef={passwordRef}
                onSubmitEditing={onSubmitPasswordField}
                maxLength={20}
                labelText='Password'
                placeholder="Enter your Password*"
                errors={errors.password}
                keyboardType='default'
                secureTextEntry={true}
              />
            )}
          />
          <View className='border-4 border-transparent'></View>
          <Controller
            control={control}
            name={'confirm_password'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                editable={isEditable}
                forwardedRef={confirmPasswordRef}
                onSubmitEditing={onSubmitComfirmPasswordField}
                maxLength={20}
                labelText='Confirm Password'
                placeholder="Retype your password*"
                errors={errors.confirm_password}
                keyboardType='default'
              />
            )}
          />
        </View>

        {/* father name and gender field */}
        <View className='w-full flex flex-row justify-center items-center'>
          <Controller
            control={control}
            name={'gender'}
            render={({ field: { onChange, value } }) => (
              <View className={`flex-1 h-13 relative py-2 border rounded-3xl ${errors?.gender?.message ? 'mt-4 mb-3' : 'my-2'} ${errors.gender ? 'border-red-300' : 'border-gray-200'}`}>
                <Dropdown
                  style={{
                    position: 'relative',
                  }}
                  placeholder={!isFocus ? 'Select Gender*' : '...'}
                  containerStyle={{
                    borderRadius: 10,
                  }}
                  mode='auto'
                  fontFamily='Poppins Medium'
                  placeholderStyle={{
                    fontSize: 12,
                    color: COLORS.VERY_LIGHT_GRAY,
                    textAlign: 'center',
                    fontFamily: 'Poppins Medium'
                  }}
                  iconStyle={{
                    position: 'absolute',
                    right: 15,
                  }}
                  itemTextStyle={{
                    color: darkMode ? '#000' : '#9B9B9B',
                    fontFamily: 'Poppins Medium'
                  }}
                  selectedTextStyle={{
                    fontSize: 12,
                    color: isEditable ? darkMode ? '#E5E7EB' : "#000" : '#9B9B9B',
                    textAlign: 'center',
                    fontFamily: 'Poppins Medium'
                  }}
                  data={gender_data}
                  value={value}
                  labelField={'label'}
                  valueField={'value'}
                  disable={!isEditable}
                  maxHeight={200}
                  onFocus={() => setIsFocus(true)}
                  dropdownPosition='auto'
                  onChange={item => onChange(item.value)}
                />
                {(isFocus || value !== "") && <Text className="text-xs text-[#374151] dark:text-gray-100 absolute -top-2 bg-white dark:bg-app-dark-theme-0 left-3.5">{"Gender"}</Text>}
                <Text className="py-1 text-xs text-red-400 absolute -bottom-5 left-3.5">{errors?.gender?.message}</Text>

              </View>
            )}
          />
          <View className='border-4 border-transparent'></View>
          <Controller
            control={control}
            name={'father_name'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType='next'
                blurOnSubmit={false}
                editable={isEditable}
                forwardedRef={fatherNameRef}
                labelText="Father's Name"
                onSubmitEditing={onSubmitFatherNameField}
                maxLength={30}
                placeholder="Your Father's name*"
                errors={errors.father_name}
                keyboardType='default'
              />
            )}
          />
        </View>

        {/* referral field */}
        <Controller
          control={control}
          name={'referral'}
          render={({ field: { value, onChange, onBlur } }) => (
            <SignupInputField
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType='done'
              blurOnSubmit={true}
              editable={isEditable}
              forwardedRef={referralRef}
              labelText='Referral Code'
              onSubmitEditing={() => { }}
              maxLength={30}
              placeholder="Enter Referral Code (Optional)"
              errors={errors.referral}
              keyboardType='default'
            />
          )}
        />

      </View>
      <View className="my-4 w-full">
        <OnBoradButton disabled={!isEditable} onPress={handleSubmit(onSubmit)} text='Contiune' />
      </View>
    </View>
  )
}

export default PersonalScreen
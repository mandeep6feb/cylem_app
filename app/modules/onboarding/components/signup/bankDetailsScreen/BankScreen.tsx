import React, { useEffect, useRef, useState } from 'react'
import { View, Keyboard, Alert, TextInput, Text } from 'react-native'
import { Bank_details_Type } from '@app/types/onboarding'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BankDetailsFormType, bankDetailSchema } from '@app/utils/zodSchema'
import { BankScreenNavigationProp } from '@app/types/navigationTypes'
import { useModalContext } from '@app/context/ModalContextProvider'
import SignupInputField from '../ui/SignupInputField'
import { commonService } from '@app/services/commonService'
import { updateBankDetailsState } from '@app/redux/slices/userSlice'
import { RootState } from '@app/redux/store'

const BankScreen = ({ navigation }: {
  navigation: BankScreenNavigationProp
}) => {

  const dispatch = useDispatch();
  const { user, isaddress } = useSelector((state: RootState) => state.user);
  const { setLoading } = useModalContext();
  const [hiddenField, setHiddenField] = useState<boolean>(true);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  // ref of all inputs field
  const accountRef = useRef<TextInput>(null);
  const holderNameRef = useRef<TextInput>(null);
  const ifscRef = useRef<TextInput>(null);

  // focus next input field without closing keyboard
  function onSubmitBankName() {
    accountRef.current?.focus();
  }
  function onSubmitAccount() {
    holderNameRef.current?.focus();
  }
  function onSubmitHolderName() {
    ifscRef.current?.focus();
  }

  // ifsc data field getting from thrid party api [city,branch,address]
  const [ifscCodeData, setIfscCodeData] = useState<{
    city: string,
    address: string,
    branch: string
  } | null>(null)

  // bank from state
  const { control, handleSubmit, watch, setValue, setError, clearErrors, formState: { errors } } = useForm<BankDetailsFormType>({
    resolver: zodResolver(bankDetailSchema),
    defaultValues: {
      bank: '',
      account_number: '',
      holder_name: '',
      ifsc_code: '',
      city: '',
      isdefault: 0,
      status: 0,
      branch: '',
      account_type: 0,
    }
  })

  const onSubmit = async (data: Bank_details_Type) => {
    try {
      if (ifscCodeData) {
        setLoading(true);

        data['branch'] = ifscCodeData.branch;
        data['city'] = ifscCodeData.city;

        const res = await commonService(
          "POST",
          "api/bank/create-new-bank",
          data
        )

        if (!res.status) Alert.alert("Bank", res.message);

        if (res.status) {
          dispatch(updateBankDetailsState(1));
          setLoading(false);
          setIsEditable(false);
          navigation.navigate('PaymentScreen');
        }
      }else{
        setError('ifsc_code', { 
          type: 'validate',
          message: 'Invalid ifsc code'
        })
      }
    } catch (err: any) {
      setLoading(false);
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection"
      );
    }
  }

  // check user bank details is exist so set in value in inputs fields
  useEffect(() => {
    const defaultValues = control._defaultValues;
    if (user !== null && user.user_bank_detail != null) {
      const details = user.user_bank_detail;
      Object.keys(details).forEach((key: string) => {
        if (key in defaultValues) {
          setValue(key as any, details[key] || '');
        }
      });
      setHiddenField(false);
      setIsEditable(false);
    }

  }, [user, setValue, user?.user_bank_detail]);

  // call api automatic when user fill their ifsc code
  useEffect(() => {
    const getDetailsByIfsc = async () => {
      const ifscCode = watch('ifsc_code').toString();
      if (ifscCode.length === 11) { 
        Keyboard.dismiss(); 
        setLoading(true);
        try {

          const response = await fetch(`${process.env.RAZORPAY_BANK_API_BASE_URL!}${ifscCode}`);
          const data = await response.json();
          setLoading(false);

          if (data == "Not Found") { 
            setHiddenField(true); 
            setError('ifsc_code', {
              type: 'validate',
              message: 'Invalid ifsc code'
            })
            setIfscCodeData(null);
            return;
          }

          setValue('bank', data.BANK);
          setIfscCodeData({
            city: data.DISTRICT,
            address: data.ADDRESS,
            branch: data.BRANCH,
          })
          setHiddenField(false);
          clearErrors('ifsc_code');

        } catch (err) {
          setLoading(false);
          Alert.alert(
            "No Internet Connection",
            "Please check your internet connection"
          );
        }
      }
    };

    getDetailsByIfsc();
  }, [watch('ifsc_code')]);

  return (
    <View className="w-full h-full relative px-2 items-center bg-white dark:bg-app-dark-theme-0">
      <View className='w-full'>
        <View className='mt-3'>
          <Controller
            control={control}
            name={'bank'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                placeholder='Enter your Bank name*'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType={'next'}
                blurOnSubmit={false}
                maxLength={40}
                onSubmitEditing={onSubmitBankName}
                editable={isEditable}
                keyboardType='default'
                labelText='Bank'
                errors={errors.bank}
              />
            )}
          />

          <Controller
            control={control}
            name={'account_number'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                placeholder='Enter your Account number*'
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType={'next'}
                blurOnSubmit={false}
                maxLength={40}
                onSubmitEditing={onSubmitAccount}
                forwardedRef={accountRef}
                editable={isEditable}
                keyboardType='decimal-pad'
                labelText='Account Number'
                errors={errors.account_number}
              />
            )}
          />

          <Controller
            control={control}
            name={'holder_name'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                placeholder="Enter Your Holder's Name*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType={'next'}
                blurOnSubmit={false}
                maxLength={25}
                onSubmitEditing={onSubmitHolderName}
                forwardedRef={holderNameRef}
                editable={isEditable}
                keyboardType='default'
                labelText="Holder's Name"
                errors={errors.holder_name}
              />
            )}
          />

          <Controller
            control={control}
            name={'ifsc_code'}
            render={({ field: { value, onChange, onBlur } }) => (
              <SignupInputField
                placeholder="Enter Your IFSC Code*"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType={'done'}
                blurOnSubmit={true}
                maxLength={20}
                onSubmitEditing={() => { }}
                forwardedRef={ifscRef}
                editable={isEditable}
                keyboardType='default'
                labelText="IFSC Code"
                errors={errors.ifsc_code}
              />
            )}
          />
          <View className={`${hiddenField ? 'hidden' : 'block'}`}>
            <View className={`w-full rounded-3xl border mt-2.5 relative border-gray-200`}>
              <Text className="text-xs text-black absolute -top-2 bg-white left-3.5">Branch</Text>
              <TextInput
                className={`text-center text-xs font-poppins-medium dark:text-gray-200 text-[#9B9B9B]`}
                placeholder="Your Bank Branch"
                editable={false}
                value={ifscCodeData?.branch ?? ""}
              />
            </View>
          </View>
          <View className={`${hiddenField ? 'hidden' : 'block'}`}>
            <View className={`w-full rounded-3xl border mt-2.5 relative border-gray-200`}>
              <Text className="text-xs text-black absolute -top-2 bg-white left-3.5">City</Text>
              <TextInput
                className={`text-center text-xs font-poppins-medium dark:text-gray-200 text-[#9B9B9B]`}
                placeholder="Your Bank City"
                editable={false}
                value={ifscCodeData?.city ?? ""}
              />
            </View>
          </View>
          <View className={`${hiddenField ? 'hidden' : 'block'}`}>
            <View className={`w-full rounded-3xl border mt-2.5 relative border-gray-200`}>
              <Text className="text-xs text-black absolute -top-2 bg-white left-3.5">Address</Text>
              <TextInput
                className={`text-center text-xs font-poppins-medium dark:text-gray-200 text-[#9B9B9B]`}
                placeholder="Your Bank Address"
                editable={false}
                value={ifscCodeData?.address ?? ""}
              />
            </View>
          </View>
        </View>
      </View>
      <View className='w-full my-4'>
        <OnBoradButton disabled={!isEditable || isaddress == 0} text='Continue' onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

export default BankScreen
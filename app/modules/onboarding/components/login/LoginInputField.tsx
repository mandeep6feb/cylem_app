import { KeyboardTypeOptions, Text, TextInput, View } from "react-native"
import { FieldError } from "react-hook-form";
import { IsDark } from "@app/utils/helper";
import { Smartphone, Lock } from "lucide-react-native";

interface Props {
  onChangeMethod: any;
  isError: FieldError | undefined
  value: string;
  keyboardType: KeyboardTypeOptions,
  placeholder: string;
  secureTextEntry: boolean,
  maxLength: number,
  iconName: string,
}

const LoginInputField = ({
  onChangeMethod,
  isError,
  value,
  placeholder,
  secureTextEntry,
  maxLength,
  iconName,
  keyboardType
}: Props) => {

  return (
    <View className={`relative border rounded-full flex-row  ${isError ? 'border-error my-2' : 'border-[#333333] dark:border-gray-100'}`}>
      <View className="flex-row items-center px-3 rounded-full shadow-lg bg-gray-200 dark:bg-gray-300">
        {iconName == "SmartPhone" ?
          (
            <>
              <Smartphone color="#363636" size={27} />
              <Text className={`text-base text-[#363636]`}>+91</Text>
            </>
          )
          : <Lock color="#363636" size={27} />}

      </View>
      <TextInput maxLength={maxLength} autoCorrect={false} autoComplete="off" value={value} secureTextEntry={secureTextEntry} onChangeText={onChangeMethod} className="text-base pl-3 font-poppins-light text-black dark:text-gray-100" placeholder={placeholder} placeholderTextColor={IsDark() ? '#fff' : '#000'} keyboardType={keyboardType}/>
      <Text className="py-1 absolute -bottom-5 left-3 text-red-600 bg-transparent text-xs">{isError?.message}</Text>
    </View>
  )
}

export default LoginInputField
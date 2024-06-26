import { IsDark } from '@app/utils/helper';
import React, { useState } from 'react'
import { Noop } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native';
import { KeyboardTypeOptions, ReturnKeyTypeOptions } from 'react-native'

interface InputProps {
    value: string,
    onChangeText: (text: string) => any,
    onBlur: Noop,
    onSubmitEditing: () => void;
    placeholder: string,
    errors: any,
    keyboardType: KeyboardTypeOptions,
    returnKeyType: ReturnKeyTypeOptions,
    blurOnSubmit: boolean;
    editable: boolean;
    labelText: string;
    secureTextEntry?: boolean;
    maxLength: number;
    forwardedRef?: React.RefObject<TextInput>;
}

const SignupInputField = ({ 
    value, 
    onChangeText,
    onSubmitEditing,
    forwardedRef,
    onBlur,
    placeholder,
    errors,
    keyboardType,
    labelText,
    returnKeyType,
    blurOnSubmit,
    editable,
    maxLength,
    secureTextEntry
}: InputProps) => {
    const [focus,setFocus] = useState(false);
    return (
        <View className={`flex-1 h-13 rounded-3xl border ${errors ? 'mt-4 mb-3' : 'my-2'} relative ${errors ? 'border-red-300' : 'border-gray-200'}`}>
            <Text className="py-1 text-xs text-red-400 absolute -bottom-5 left-3.5" numberOfLines={1} ellipsizeMode='tail'>{errors?.message}</Text>
            {(focus || value !== "") && <Text className={`text-xs text-gray-700 dark:text-gray-100 absolute -top-2 bg-white dark:bg-app-dark-theme-0 left-3.5`}>{labelText}</Text>}
            <TextInput
                className={`text-center text-xs font-poppins-medium text-black ${editable ? 'dark:text-gray-200' : 'text-[#9B9B9B]'}`}
                placeholder={placeholder}
                value={value}
                returnKeyType={returnKeyType}
                ref={forwardedRef}
                placeholderTextColor={IsDark() ? "#F1f1f1" : "#9B9B9B" }
                maxLength={maxLength}
                onFocus={() => setFocus(true)}
                onSubmitEditing={onSubmitEditing}
                onChangeText={(text: string) => onChangeText(text)}
                editable={editable}
                blurOnSubmit={blurOnSubmit}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default SignupInputField
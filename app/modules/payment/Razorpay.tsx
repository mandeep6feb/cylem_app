import React from 'react'
import { Pressable, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { paymentHandler } from '@app/utils/paymentHandler';
import { useModalContext } from '@app/context/ModalContextProvider';

const RazorpayButton = ({ buttonTitle, subscription_amount, success_cb, failure_cb }: {
    buttonTitle: string,
    subscription_amount: number,
    success_cb: () => void,
    failure_cb: (errMessage: string) => void;
}) => {

    const { user } = useSelector((states: any) => states.user);
    const { setLoading } = useModalContext();

    const openRazorpayCheckout = async () => {

        setLoading(true);
        await paymentHandler(
            subscription_amount,
            user.id,
            user.first_name,
            user.email,
            user.mobile,
            () => {
                setLoading(false);
                success_cb();
            },
            (err: string) => {
                setLoading(false);
                failure_cb(err);
            }
        );
    }

    return (
        <Pressable className={`flex items-center justify-center py-3 rounded-full bg-app-green `} onPress={openRazorpayCheckout}>
            <Text className='text-base font-poppins-semibold text-white'>{buttonTitle}</Text>
        </Pressable>
    )
}

export default RazorpayButton
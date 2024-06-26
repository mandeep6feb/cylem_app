import React from 'react';
import { View , Alert} from 'react-native';
import { SilverCardSvg, GoldCardSvg, DiamondCardSvg } from '@app/components/ui/SvgComponents';
import RazorpayButton from '@app/modules/payment/Razorpay'
import Header from '@app/components/ui/Header';
import { ConfirmOrderScreenRouteProp,ConfirmOrderScreenNavigationProp} from '@app/types/navigationTypes';

const ConfirmOrderScreen = ({navigation,route}: {
    navigation:ConfirmOrderScreenNavigationProp,
    route: ConfirmOrderScreenRouteProp
}) => {
    const { subscription_amount, subscription_card } = route.params;

    const paymentSuccess = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "PaymentSuccess", params: {
                amount: subscription_amount,
                card: subscription_card
            }}],
        });
    }

    const paymentFailed = (errMessage: string) => {
        Alert.alert("Payment Failed",errMessage);
    }

    const renderCardSvg = () => {
        switch (subscription_card) {
            case 'Silver': return <SilverCardSvg />;
            case 'Gold': return <GoldCardSvg />;
            case 'Diamond': return <DiamondCardSvg />;
            default: return null;
        }
    };

    return (
        <View className="w-full h-full flex-col justify-between py-2 bg-white dark:bg-app-dark-theme-0">
            <View>
                <Header title='Confirm Order' backButtonShown={true} iconColor='#222' titleColor='#222' borderColor='#222'/>
                <View className="mt-5 flex items-center w-full rounded-lg overflow-hidden">
                    {renderCardSvg()}
                </View>
            </View>
            <View className="w-full px-2">
                <RazorpayButton 
                    buttonTitle={"Pay Now"}
                    subscription_amount={subscription_amount}
                    success_cb={paymentSuccess}
                    failure_cb={paymentFailed}
                />
            </View>
        </View>
    );
};

export default ConfirmOrderScreen;

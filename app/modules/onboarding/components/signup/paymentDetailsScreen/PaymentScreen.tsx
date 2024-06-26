import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { DiamondCardSvg, GoldCardSvg, GooglePlayCard, MasterCard, SilverCardSvg, VisaMasterCard } from '../../../../../components/ui/SvgComponents'
import OnBoradButton from '@app/components/ui/OnBoradButton'
import { useDispatch, useSelector } from 'react-redux'
import { addUserDetails } from '@app/redux/slices/userSlice'
import { ConfirmOrderScreenNavigationProp } from '@app/types/navigationTypes'
import { commonService } from '@app/services/commonService'
import { RootState } from '@app/redux/store'

interface cardType{
  subscription_card_series_number: number,
  subscription_amount: number,
  subscription_card: string
}

const PaymentScreen = ({ navigation }: {
  navigation: ConfirmOrderScreenNavigationProp
}) => {
  
  const [selectedCard, setSelectedCard] = useState<cardType | null>(null);
  const {isbank,user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function handleSubscription(subscription_card_number: number){
    switch (subscription_card_number) {
      case 1: 
            setSelectedCard({
              subscription_amount: 1000,
              subscription_card: 'Silver',
              subscription_card_series_number: 1
            })
        break;
      case 2: 
            setSelectedCard({
              subscription_amount: 3000,
              subscription_card: 'Gold',
              subscription_card_series_number: 2,
            })
        break;
      case 3: 
            setSelectedCard({
              subscription_amount: 5000,
              subscription_card: 'Diamond',
              subscription_card_series_number: 3,
            })
        break;
      default: setSelectedCard(null);
    }
  }

  const navigateToConfirmScreen = async () => {
    if (selectedCard) {
      if(selectedCard.subscription_card_series_number == 2 || selectedCard.subscription_card_series_number == 3){
        Alert.alert(
          "Coming soon !",
          "This is subscription is under working."
        );
        return;
      }
      if(user === null){
        const user_data = await commonService(
          "GET",
          "api/user/user_details"
        )
        dispatch(addUserDetails(user_data));
      }

      
      return navigation.navigate("ConfirmOrderScreen",{
        subscription_amount: selectedCard.subscription_amount,
        subscription_card: selectedCard.subscription_card
      });

    }

    Alert.alert(
      'Card not selected',
      "Please selected a card !"
    );
  }

  return (
    <View className="w-full h-full bg-white p-2 flex-col dark:bg-app-dark-theme-0 justify-between">
      <View className='w-full h-auto'>
        <View className="w-full m-auto flex-col items-center">
          <Text className="text-sm text-center text-[#9B9B9B] dark:text-gray-300">Select tier</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            className={`mt-2 rounded-xl overflow-hidden ${selectedCard?.subscription_card_series_number === 1 && 'border-2 border-app-green border-dotted'}`}
            onPress={() => handleSubscription(1)}
          >
            <SilverCardSvg />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            className={`mt-2 rounded-xl overflow-hidden ${selectedCard?.subscription_card_series_number === 2 && 'border-2 border-app-green border-dotted'}`}
            onPress={() => handleSubscription(2)}
          >
            <GoldCardSvg />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            className={`mt-2 rounded-xl overflow-hidden ${selectedCard?.subscription_card_series_number === 3 && 'border-2 border-app-green border-dotted'}`}
            onPress={() => handleSubscription(3)}
          >
            <DiamondCardSvg />
          </TouchableOpacity>
          <Text className="text-sm text-center pt-1 text-[#9B9B9B] dark:text-gray-300">We Accept</Text>
        </View>
        <View className="flex mt-4 w-full h-auto flex-row items-center justify-center">
          <View>
            <GooglePlayCard />
          </View>
          <View>
            <VisaMasterCard />
          </View>
          <View>
            <MasterCard />
          </View>
        </View>
        <View className='mt-1'>
          <OnBoradButton disabled={isbank == 0} onPress={navigateToConfirmScreen} text='Contiune' />
        </View>
      </View>
    </View>
  )
}

export default PaymentScreen;
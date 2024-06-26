import React, { Suspense } from 'react'
import Provider from '@app/provider/Provider'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@app/types/navigationTypes';
import FallbackSpinner from './components/layout/FallbackSpinner';
import DashboardScreen from '@app/modules/dashboard/DashboardScreen';
import LoginScreen from '@app/modules/onboarding/screens/login/LoginScreen';
import SignupScreen from '@app/modules/onboarding/screens/signup/SignupScreen';
import SplashScreen from '@app/screens/splashscreen/SplashScreen';
import PaymentSuccessScreen from '@app/screens/payment_success/PaymentSuccessScreen';

const ConfirmOrderScreen = React.lazy(() => import('@app/screens/confirm_order/ConfirmOrderScreen'));
const PdfViewerScreen = React.lazy(() => import('@app/screens/pdf_viewer/PdfViewerScreen'));
const TermsConditionScreen = React.lazy(() => import('@app/screens/terms_and_condition/TermsConditionScreen'));
const AboutusScreen = React.lazy(() => import('@app/screens/aboutus/AboutusScreen'));
const PrivacyPolicyScreen = React.lazy(() => import("@app/screens/privacy_policy/PrivacyPolicyScreen"))

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <Provider>
      <Suspense fallback={<FallbackSpinner/>}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 500,
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }} initialRouteName='SplashScreen'>

          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='SignupScreen' component={SignupScreen} />
          <Stack.Screen name='PaymentSuccess' component={PaymentSuccessScreen} />
          <Stack.Screen name='ConfirmOrderScreen' component={ConfirmOrderScreen} />
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='DashboardScreen' component={DashboardScreen} />
          <Stack.Screen name="TermsAndCondition" component={TermsConditionScreen} />
          <Stack.Screen name='PdfViewerScreen' component={PdfViewerScreen} />
          <Stack.Screen name='AboutusScreen' component={AboutusScreen} />
          <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} />

        </Stack.Navigator>
      </Suspense>
    </Provider>
  )
}

export default App
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type RootStackParamList = {
    SplashScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
    DashboardScreen: undefined;
    OtpScreen: { mobileNumber: string; token: string };
    PaymentSuccess: {amount: string, card: string};
    ReferralScreen: undefined;
    ConfirmOrderScreen: {subscription_amount: number, subscription_card: string};
    TermsAndCondition: undefined;
    PdfViewerScreen: {pdf_title: string, pdf_url: string};
    AboutusScreen: undefined;
    PrivacyPolicyScreen: undefined;
};


type RootTabParamList = {
    PersonalScreen: undefined;
    AddressScreen: undefined;
    BankScreen: undefined;
    PaymentScreen: undefined;
};

type RootDrawerParamList = {
    LeaderboardScreen: undefined;
    ProfileScreen: undefined;
    SubscriptionScreen: undefined;
    SettingScreen: undefined;
    DashboardHomeScreen: undefined;
}

// Define types for the navigation and route props for each screen
type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'SplashScreen'>;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'LoginScreen'>;
type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignupScreen'>;
type SignupScreenRouteProp = RouteProp<RootStackParamList, 'SignupScreen'>;
type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'DashboardScreen'>;
type OtpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'OtpScreen'>;
type OtpScreenRouteProp = RouteProp<RootStackParamList, 'OtpScreen'>;
type PaymentSuccessScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'PaymentSuccess'>;
type PaymentSuccessScreenRouteProp = RouteProp<RootStackParamList,'PaymentSuccess'>;
type ReferralScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'ReferralScreen'>;
type ConfirmOrderScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'ConfirmOrderScreen'>;
type ConfirmOrderScreenRouteProp = RouteProp<RootStackParamList,'ConfirmOrderScreen'>;
type TermsAndConditionNavigationProp = NativeStackNavigationProp<RootStackParamList,'TermsAndCondition'>;
type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'PrivacyPolicyScreen'>;
type PdfViewerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'PdfViewerScreen'>;
type PdfViewerScreenRouteProp = RouteProp<RootStackParamList,'PdfViewerScreen'>;


// material top tab navigation prop
type PersonalScreenNavigationProp = MaterialTopTabNavigationProp<RootTabParamList, 'PersonalScreen'>;
type PersonalScreenRouteProp = RouteProp<RootTabParamList, 'PersonalScreen'>;
type AddressScreenNavigationProp = MaterialTopTabNavigationProp<RootTabParamList, 'AddressScreen'>;
type BankScreenNavigationProp = MaterialTopTabNavigationProp<RootTabParamList, 'BankScreen'>;
type PaymentScreenNavigationProp = MaterialTopTabNavigationProp<RootTabParamList, 'PaymentScreen'>;

// drawer navigation
type LeaderboardScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList,'LeaderboardScreen'>
type ProfileScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList,'ProfileScreen'>;
type SubscriptionScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList,'SubscriptionScreen'>
type DashboardHomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList,'DashboardHomeScreen'>;

export type { 
    RootStackParamList,
    SplashScreenNavigationProp,
    LoginScreenNavigationProp,
    OtpScreenNavigationProp,
    SignupScreenNavigationProp,
    DashboardScreenNavigationProp,
    PaymentSuccessScreenNavigationProp,
    PaymentSuccessScreenRouteProp,
    OtpScreenRouteProp,
    ReferralScreenNavigationProp,
    ConfirmOrderScreenNavigationProp,
    TermsAndConditionNavigationProp,
    ConfirmOrderScreenRouteProp,
    PrivacyPolicyScreenNavigationProp,
    RootTabParamList, // tab navigator
    AddressScreenNavigationProp, 
    PersonalScreenNavigationProp, 
    PersonalScreenRouteProp,
    BankScreenNavigationProp,
    PaymentScreenNavigationProp,
    SignupScreenRouteProp,
    RootDrawerParamList, // drawer navigator
    LeaderboardScreenNavigationProp,
    SubscriptionScreenNavigationProp,
    ProfileScreenNavigationProp,
    DashboardHomeScreenNavigationProp,
    PdfViewerScreenNavigationProp,
    PdfViewerScreenRouteProp,
};
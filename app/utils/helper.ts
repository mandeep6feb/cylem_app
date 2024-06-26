import { Platform, useColorScheme } from "react-native";

export const COLORS = {
    BLACK: "#000000",
    DARK_GRAY: "#171717",
    DARK_MODE_BLACK: "#333333",
    OUTLINE_COLOR: '#8EE04E',
    WHITE: "#FFF",
    MEDIUM_GRAY: "#737373",
    LIGHT_GRAY: "#515151",
    WRONING_RED: "#d00000",
    APP_GREEN: "#15BA43",
    DARK_GREEN: "#1B7A00",
    WHITE_MEDIUM: "#ede9e9",
    VERY_LIGHT_GRAY: "#9B9B9B",
    GRAY: "#575757",
    HEADER_TITLE_BLACK: "#121826",
    ORIGINAL_GRAY: "gray",
    DASHBOARD_PROFILE_WHITE: "#F8F8F8"
}


export const IsDark = () => {
    const colorScheme = useColorScheme();
    return colorScheme === "dark";
}

export const IsIOS = () => {
    return Platform.OS === 'ios'
}


export const verifyTheUser = (data: any) => {

    if (data['is_form_completed'] === 1) {
        return {
            status: true,
            not_filled_tab: 'DashboardScreen'
        };
    }

    if (data['isaddress'] === 0) {
        return {
            status: false,
            not_filled_tab: 'AddressScreen'
        }
    }

    if (data['isbank'] === 0) {
        return {
            status: false,
            not_filled_tab: 'BankScreen'
        }
    }

    if (data['subscription_paid'] === 0) {
        return {
            status: false,
            not_filled_tab: 'PaymentScreen'
        }
    }
}



export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `20${year}-${month}-${day}`;
}


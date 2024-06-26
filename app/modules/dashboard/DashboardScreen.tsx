import React from 'react'
import ProfileScreen from '@app/modules/dashboard/screens/profile/ProfileScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Leaderboard from '@app/modules/dashboard/screens/leaderboard/Leaderboard';
import { COLORS } from '@app/utils/helper';
import CustomDrawer from '@app/modules/dashboard/components/ui/CustomDrawer';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { RootDrawerParamList } from '@app/types/navigationTypes';
import SubscriptionScreen from '@app/modules/dashboard/screens/subscription/SubscriptionScreen';
import DashboardHomeScreen from './DashboardHomeScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const useTitle = (route: RouteProp<ParamListBase, string>) => {
    switch (route.name) {
        case 'DashboardHomeScreen': return 'Home';
        case 'LeaderboardScreen': return 'Leaderboard';
        case 'SubscriptionScreen': return 'Subscription';
        case 'ProfileScreen': return 'My Profile'
    }
}

const DashboardScreen = () => {
    return (
        <>
            <Drawer.Navigator  drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={({ route }) => ({ 
                    drawerStyle: {
                        width: 210,
                        backgroundColor: COLORS.WHITE
                    },
                    drawerItemStyle: {
                        paddingVertical: 5,
                        fontFamily: 'Poppins Medium',
                        fontSize: 14,
                        color: COLORS.HEADER_TITLE_BLACK,
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    },
                    drawerActiveTintColor: COLORS.APP_GREEN,
                    drawerActiveBackgroundColor: 'transparent',
                    drawerInactiveTintColor: COLORS.GRAY,
                    headerShown: false,
                    title: useTitle(route)
                })} initialRouteName='DashboardHomeScreen'>
                <Drawer.Screen name='DashboardHomeScreen' component={DashboardHomeScreen} />
                <Drawer.Screen name="LeaderboardScreen" component={Leaderboard} />
                <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                <Drawer.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
            </Drawer.Navigator>
        </>
    )
}

export default DashboardScreen
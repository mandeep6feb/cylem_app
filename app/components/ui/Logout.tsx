import React from 'react'
import { useModalContext } from '@app/context/ModalContextProvider';
import { clearDashboardState } from '@app/redux/slices/dashboardSlice';
import { clearUserState } from '@app/redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { Alert, Text } from 'react-native'
import { useDispatch } from 'react-redux';
import { removeToken } from '@app/utils/mmkvStorage';

const Logout = ({ style }: any) => {
    const { setLoading } = useModalContext();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const doLogout = () => {
        Alert.alert(
            'Are you sure ?',
            'Logging out will redirect you to the login screen.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setLoading(true);
                        setTimeout(() => {
                            removeToken("token");
                            dispatch(clearUserState('CLEAR_USER_DATA'));
                            dispatch(clearDashboardState("CLEAR_DASHBOARD_DATA"));
                            setLoading(false);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LoginScreen' as never }],
                            });
                        }, 2000)
                    },
                },
            ]
        );
    };

    return (
        <Text onPress={doLogout} className={`${style}`}>
            Logout
        </Text>
    )
}

export default Logout
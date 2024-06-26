import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from '@app/redux/store';
import { IsDark } from '@app/utils/helper';
import Loader from '@app/components/layout/Loader';
import ModalProvider from '@app/context/ModalContextProvider';

const Provider = ({ children }: any) => {
  const darkMode = IsDark();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReduxStoreProvider store={store}>
        <NavigationContainer>
          <ModalProvider>
              <StatusBar backgroundColor={darkMode ? '#111111' : '#fff'} barStyle={darkMode ? 'light-content' : 'dark-content'} />
              <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 64}
              >
                {children}
              </KeyboardAvoidingView>
              <Loader />
          </ModalProvider>
        </NavigationContainer>
      </ReduxStoreProvider>
    </SafeAreaView>
  )
}

export default Provider
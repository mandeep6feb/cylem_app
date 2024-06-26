import Header from '@app/components/ui/Header';
import { PdfViewerScreenRouteProp } from '@app/types/navigationTypes';
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Pdf  from 'react-native-pdf'

const PdfViewerScreen = ({ route }: {
  route: PdfViewerScreenRouteProp,
}) => {
  const { pdf_title, pdf_url } = route.params;
  console.log(pdf_url);
  return (
    <View className='flex-1 items-center justify-start bg-white dark:bg-app-dark-theme-0'>
      <Header title={pdf_title} backButtonShown={true} iconColor='#222' titleColor='#222' borderColor='#222' />
      <View className='border-t border-gray-200 w-full h-full'>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: pdf_url,
            cache: true
          }}
          progressContainerStyle={{ backgroundColor: '#fff' }}
          renderActivityIndicator={() => {
            return (
              <ActivityIndicator size="large" color="#222" />
            )
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages} ${filePath}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex: 1,
            backgroundColor: '#F4FAFF'
          }}
        />
      </View>
    </View>
  )
}

export default PdfViewerScreen
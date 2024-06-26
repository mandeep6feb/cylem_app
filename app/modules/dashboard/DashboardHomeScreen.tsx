import React, { useEffect } from 'react'
import { Alert, Image, StatusBar, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import DashboardHeader from './components/ui/DashboardHeader'
import { DashboardHomeScreenNavigationProp, DashboardScreenNavigationProp } from '@app/types/navigationTypes'
import { useDispatch, useSelector } from 'react-redux'
import { getBooksData, getCollectionDetails } from '@app/redux/slices/dashboardSlice'
import { IsDark } from '@app/utils/helper'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@app/redux/store'

interface Book {
    pdf_image: string;
    pdf_link: string;
    title: string;
}

const DashboardHomeScreen = ({ navigation }: { navigation: DashboardHomeScreenNavigationProp }) => {

    const stackNavigation = useNavigation<DashboardScreenNavigationProp>();
    const dispatch = useDispatch();
    const { error, books } = useSelector((state: RootState) => state.dashboard_slice);
    const darkTheme = IsDark();
    if (error) {
        Alert.alert(
            error,
            "Please check your internet connection. And Try again.."
        )
    }

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            if (isMounted) {
                dispatch(getCollectionDetails());
                dispatch(getBooksData());
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    return (
        <View className='w-full h-full bg-white dark:bg-app-dark-theme-0'>
            <StatusBar backgroundColor={darkTheme ? '#111111' : '#fff'} barStyle={darkTheme ? 'light-content' : 'dark-content'} />
            <DashboardHeader navigation={navigation} />
            <View className='flex-1 m-2'>
                {books ?
                    <View className="w-full h-auto flex-col pl-2 pr-1">
                        {
                            
                            Object.keys(books).map((category: string, index: number) => (
                                <View key={index} className='mt-4'>
                                    <Text className="text-xl text-black mb-3 capitalize dark:text-gray-100 font-poppind-medium font-medium">{category.replace(/_/g, ' ')}</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='flex-row flex-wrap gap-2'>
                                        {
                                            books[category].map((item: Book, idx: number) => (
                                                <View key={idx} className='w-32'>
                                                    <TouchableOpacity className='w-full h-auto rounded overflow-hidden' activeOpacity={0.9} onPress={() => {
                                                        stackNavigation.navigate('PdfViewerScreen', {
                                                            pdf_title: item.title?.replace(/\s\s+/g, ' '),
                                                            pdf_url: item.pdf_link
                                                        })
                                                    }}>
                                                        <Image
                                                            style={{ width: 'auto', height: 183 }}
                                                            resizeMode='cover'
                                                            alt={"Loading.."}
                                                            source={{
                                                                uri: item.pdf_image
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                    <Text className='text-sm text-black-text-0 dark:text-gray-300 capitalize font-poppins-light' numberOfLines={1}>{item.title?.replace(/\s\s+/g, ' ')}</Text>
                                                </View>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            ))
                        }
                    </View>
                    : (
                        <View className="flex-1 p-4 bg-white dark:bg-app-dark-theme-0 h-full items-center justify-center">
                            <View className="">
                                <ActivityIndicator size="large" color={darkTheme ? "#fafafa" : "#999"} />
                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default DashboardHomeScreen
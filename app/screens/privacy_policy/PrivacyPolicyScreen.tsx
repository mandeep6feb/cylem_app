import Header from '@app/components/ui/Header'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
const policySections = [
    {
        title: "Privacy Policy for Cylem",
        desc: `Last Updated: 22 June, 2024\n\nThis privacy policy applies to www.cylem.in owned and operated by Cromteksolutions.info Pty Limited.\n\nThis privacy policy describes how Cromtek Solutions Pty Limited collects and uses the personally identifiable information you provide on our website: www.Cylem.in. It also describes the choices available to you regarding our use of your personally identifiable information and how you can access and update this information.`
    },
    {
        title: "Collection of Personally Identifiable Information",
        desc: `Cromtek Solutions Pty Limited is the sole owner of the information collected on Cylem.in. Cylem.in collects personally identifiable information from our users at several different points on our website.`
    },
    {
        title: "Use and Disclosure of Information",
        desc: `We will use personally identifiable information you provide to us for the purpose of providing you with the service or product that you have requested. We do not share personally identifiable information with third parties.`
    },
    {
        title: "Tracking Technologies",
        desc: `We Cromtek Solutions Limited and our affiliates, or analytics use technologies such as cookies, beacons, tags, and scripts, to analyze trends, administer the website, tracking users' movements around the website, and to gather demographic information about our user base as a whole.`
    },
    {
        title: "Access to Personally Identifiable Information",
        desc: `Upon request Cromtek Solutions Pty Limited will provide you with information about whether we hold any of your personal information. If your personally identifiable information changes, or if you no longer desire our service, you may update, delete/remove it by logging in to your account or by emailing Customer Support at cromtek@cromteksolutions.info or by contacting us by telephone or postal mail at the contact information listed below. We will respond to your request within a reasonable timeframe.`
    },
    {
        title: "Choice/Opt Out",
        desc: `We provide you the opportunity to "opt-out" of having your personally identifiable information used for certain purposes, when we ask for this information.`
    },
    {
        title: "Data Security",
        desc: `cylem.in takes your privacy and the privacy of all its customers very seriously. We follow generally accepted standards to protect the personal information submitted to us, both during transmission and once it is received.`
    },
    {
        title: "Contact Us",
        desc: `If you have any questions or suggestions regarding our privacy policy, please contact us at:\nCROMTEK SOLUTIONS (OPC) PRIVATE LIMITED,\nat 943/23, krishanpura panipat\nPanipat\nHARYANA 132103.\nIndia\ncontact us at +91 7988932952 and email us at cromtek@cromteksolutions.info.`
    }
    
];


const PrivacyPolicyScreen = () => {
    return (
        <View className='flex-1 bg-white dark:bg-app-dark-theme-0 '>
            <View className='bg-white dark:bg-app-dark-theme-0'>
                <Header title='Privacy Policy' />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className={`w-full h-full p-2 mb-4 bg-white dark:bg-app-dark-theme-0`}>
                {policySections.map((section, index) => (
                    <View key={index} className='relative gap-x-2 h-auto w-auto px-2 '>
                        <Text className='text-lg text-black-text-0 dark:text-gray-200'>{index + 1 + ". "}{section.title}</Text>
                        <Text className='my-2 font-inter-light text-xs text-black-text-0 dark:text-gray-200'>{section.desc}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default PrivacyPolicyScreen
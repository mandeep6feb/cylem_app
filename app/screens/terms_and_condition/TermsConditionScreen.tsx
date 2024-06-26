import Header from '@app/components/ui/Header';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const termsAndConditions = [
    {
        id: 101,
        title: "Introduction",
        desc: "Welcome to CROMTEK SOLUTIONS (OPC) PRIVATE LIMITED, a platform dedicated to providing a seamless online reading experience through our subscription service. These Terms and Conditions govern your access to and use of our website, mobile application, and related services. By using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services."
    },
    {
        id: 102,
        title: "Definitions",
        desc: `We, us, our: CROMTEK SOLUTIONS (OPC) PRIVATE LIMITED, registered at 943/23, krishanpura panipat Panipat HARYANA 132103.
You, user, subscriber: Any natural or legal person who accesses or uses our platform.
Subscription: Paid access to our library of digital books and related services.`
    },
    {
        id: 103,
        title: "Subscription Plans",
        desc: `Subscription Types: We offer various plans including monthly, quarterly, and annual plans.
Payment: By subscribing, you agree to pay the fees as detailed on our platform. Fees are non-refundable except as expressly stated.
Renewal and Cancellation: Subscriptions auto-renew unless canceled before renewal. You may cancel anytime, effective at the end of the current billing period.`
    },
    {
        id: 104,
        title: "Content and Use",
        desc: `Access: Personal, non-transferable access to our digital book library during your subscription.
Restrictions: No reproduction, distribution, modification, or derivative works without prior written consent.
Copyright: All content is protected by copyright and intellectual property laws.`
    },
    {
        id: 105,
        title: "Privacy",
        desc: `Data Collection and Use: We collect and process personal information as per our Privacy Policy.
Cookies: By using our platform, you consent to our use of cookies in accordance with our Cookie Policy.`
    },
    {
        id: 106,
        title: "Disclaimer of Warranties",
        desc: `Accuracy of Information: We do not warrant the accuracy, completeness, or reliability of any information on our platform.
Availability: We reserve the right to modify, suspend, or discontinue services at any time without notice.`
    },
    {
        id: 107,
        title: "Limitation of Liability",
        desc: `Indirect Damages: We shall not be liable for indirect, incidental, special, or consequential damages arising from use of our platform or services.`
    },
    {
        id: 108,
        title: "Governing Law and Dispute Resolution",
        desc: `Jurisdiction: These Terms are governed by the laws of Subject Matter Jurisdiction.
Dispute Resolution: Any dispute shall be resolved exclusively in the courts of Subject Matter Jurisdiction.`
    },
    {
        id: 109,
        title: "Changes to Terms",
        desc: "Updates: We reserve the right to update these Terms and Conditions. Changes are effective immediately upon posting."
    },
    {
        id: 110,
        title: "Contact Us",
        desc: "If you have any questions about these Terms and Conditions, please contact us at +91 7988932952 ."
    },
    {
        id: 111,
        title: "Acceptance",
        desc: "By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions."
    },
];

const TermsConditionScreen = () => {

    return (
        <View>
            <View className='bg-white dark:bg-app-dark-theme-0'>
                <Header title='Terms & Conditions' backButtonShown={true} titleColor='#121826' iconColor='#121826' borderColor='#222' />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="w-full h-full bg-white dark:bg-app-dark-theme-0 px-2">
                {termsAndConditions.map((item: { id: number, title: string, desc: string }, index: number) => (
                    <View key={item.id} className='relative gap-x-2 h-auto w-auto px-2 '>
                        <Text className='text-lg text-black-text-0 dark:text-gray-200'>{index + 1 + ". "}{item.title}</Text>
                        <Text className='my-2 font-inter-light text-xs text-black-text-0 dark:text-gray-200'>{item.desc}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

export default TermsConditionScreen;

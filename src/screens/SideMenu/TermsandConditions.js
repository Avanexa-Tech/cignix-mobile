//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Components/Dimensions';
import {Mulish} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import { useTranslation } from 'react-i18next';
const termsData = [
  {
    id: '0',
    abt_title: 'Terms',
    abt_subText: 'terms and conditions',
  },
];

// create a component
const TermsandConditions = () => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(undefined);
  const { t }=useTranslation()

  const renderHeaderItem = () => {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                marginTop: 10,
              }}>
              {t("TermsandConditions.AGREEMENT TO OUR LEGAL TERMS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We are Cignix ('Company', 'we', 'us', or 'our'), a company registered in India at")}{' '}
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("TermsandConditions.Unit No. 105, First Floor, Iris Tech Park, Sector-48, Gurgaon, Haryana 122018.")}
              </Text>{' '}
              {t("TermsandConditions.We operate the website")} https://www.cignix.com {t("TermsandConditions.(the 'Site'), as well as any other related products and services that refer or link to these legal terms (the 'Legal Terms') (collectively, the 'Services').")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                marginTop: 10,
              }}>
              {t("TermsandConditions.About Cignix")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Cignix is a dedicated platform designed to help smokers quit and embrace a healthier, smoke-free life. Through interactive quizzes and engaging videos, we assess your level of nicotine dependence, providing you with insights and guidance. Our personalized approach supports you every step of the way, helping you overcome cravings, build healthy habits, and achieve a lasting, smoke-free lifestyle.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              {t("TermsandConditions.You can contact us by phone at")}{' '}
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                9873832002
              </Text>
              , {t("TermsandConditions.email at quit@cignix.com, or by mail to")}{' '}
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("TermsandConditions.Unit No. 105, First Floor, Iris Tech Park, Sector-48, Gurgaon, Haryana 122018, India.")}
              </Text>
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                marginTop: 10,
              }}>
              {t("TermsandConditions.Acceptance of Legal Terms")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you'), and Cignix, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.")}{' '}
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 15,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("TermsandConditions.IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.")}
              </Text>
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.We will provide you with prior notice of any scheduled changes to the Services you are using. The modified Legal Terms will become effective upon posting or notifying you by quit@cignix.com, as stated in the email message. By continuing to use the Services after the effective date of any changes, you agree to be bound by the modified terms.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.The Services are intended for users who are at least 18 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Services. If you are a minor, you must have your parent or guardian read and agree to these Legal Terms prior to you using the Services.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We recommend that you print a copy of these Legal Terms for your records.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              1. {t("TermsandConditions.OUR SERVICES")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              2. {t("TermsandConditions.INTELLECTUAL PROPERTY RIGHTS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
                marginTop: 10,
              }}>
              {t("TermsandConditions.Our intellectual property")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              {t("TermsandConditions.The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties around the world.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              {t("TermsandConditions.The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use only.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              {t("TermsandConditions.Your use of our Services")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Subject to your compliance with these Legal Terms, including the'PROHIBITED ACTIVITIES' section below, we grant you a non-exclusive, non-transferable, revocable license to")}: {t("TermsandConditions.access the Services; and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to quit@cignix.com. If we ever grant you permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content. `We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Your submissions")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.Please review this section and the 'PROHIBITED ACTIVITIES' section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Submissions")}:
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ('Submissions'), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgement or compensation to you.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You are responsible for what you post or upload")}: {t("TermsandConditions.By sending us Submissions through any part of the Services you")}{t("TermsandConditions.confirm that you have read and agree with our 'PROHIBITED ACTIVITIES' and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading.to the extent permissible by applicable law, waive any and all moral rights to any such Submission")};
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.warrant that any such Submission is original to you or that you have the necessary rights and licences to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.warrant and represent that your Submissions do not constitute confidential information. You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party’s intellectual property rights, or (c) applicable law.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 0}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              3. {t("TermsandConditions.USER REPRESENTATIONS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.By using the Services, you represent and warrant that")}: {t("TermsandConditions.(1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not under the age of 18; (5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services; (6) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (7) you will not use the Services for any illegal or unauthorised purpose; and (8) your use of the Services will not violate any applicable law or regulation. If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              4. {t("TermsandConditions.USER REGISTRATION")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              5. {t("TermsandConditions.SUBSCRIPTIONS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Billing and Renewal")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Cignix offers an exclusive lifetime plan at a one-time price, giving you unlimited access to our entire video library for life. With this subscription, you’ll have continuous support and resources whenever you need them.")}
            </Text>

            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Cancellation")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You can cancel your subscription at any time by contacting us using the contact information provided below. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at quit@cignix.com")}
            </Text>

            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("Fee Changes")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              6. {t("TermsandConditions.PRODUCTS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              7.{t("TermsandConditions.PURCHASES AND PAYMENT")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We accept the following forms of payment")}:
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Visa
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Mastercard
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                American Express
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Discover
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'checkcircle'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                Razorpay
              </Text>
            </View>

            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in Rupees.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorise us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              8. {t("TermsandConditions.SUBSCRIPTIONS")}
            </Text>

            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Billing and Renewal")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Cignix offers an exclusive lifetime plan at a one-time price, giving you unlimited access to our entire video library for life. With this subscription, you’ll have continuous support and resources whenever you need them.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Cancellation")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
              }}>
              {t("TermsandConditions.Cignix offers a one-time payment model, so cancellations or refunds aren't available. Enjoy uninterrupted access to all premium features with no renewal hassles. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at quit@cignix.com.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
                marginTop: 10,
              }}>
              {t("TermsandConditions.Fee Changes")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.")}
            </Text>
          </View>

          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              9. {t("TermsandConditions.REFUNDS POLICY")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.All sales are final and no refund will be issued.")}
            </Text>
          </View>
          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              10. {t("TermsandConditions.PROHIBITED ACTIVITIES")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.As a user of the Services, you agree not to")}:
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Use any information obtained from the Services in order to harass, abuse, or harm another person.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Make improper use of our support services or submit false reports of abuse or misconduct.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Use the Services in a manner inconsistent with any applicable laws or regulations.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Engage in unauthorised framing of or linking to the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Delete the copyright or other proprietary rights notice from any Content.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Attempt to impersonate another user or person or use the username of another user.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ('gifs'), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as 'spyware' or 'passive collection mechanisms' or 'pcms').")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorised script or other software.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Use a buying agent or purchasing agent to make purchases on the Services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Make any unauthorised use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited emails, or creating user accounts by automated means or under false pretences.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavour or commercial enterprise.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Use the Services to advertise or offer to sell goods and services.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Sell or otherwise transfer your profile.")}
              </Text>
            </View>
          </View>

          <View style={{width: '100%', paddingVertical: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              11. {t("TermsandConditions.USER GENERATED CONTRIBUTIONS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, 'Contributions'). Contributions may be viewable by other users of the Services and through third-party websites. When you create or make available any Contributions, you thereby represent and warrant that")}:
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You are the creator and owner of or have the necessary licences, rights, consents, releases, and permissions to use and to authorise us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You have the written consent, release, and/or permission of each identifiable individual in your Contributions to use their name or likeness in any manner contemplated by the Services and these Legal Terms.")}
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions are not false, inaccurate, or misleading.")}{' '}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions are not unsolicited or unauthorised advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libellous, slanderous, or otherwise objectionable (as determined by us).")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person or to promote violence against a specific person or class of people.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not violate any applicable law, regulation, or rule.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not violate the privacy or publicity rights of any third party.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.")}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Iconviewcomponent
                Icontag={'Entypo'}
                iconname={'dot-single'}
                icon_size={22}
                icon_color={Color.primary}
                iconstyle={{marginTop: 0}}
              />
              <Text
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                  textAlign: 'justify',
                  letterSpacing: 0.5,
                  lineHeight: 22,
                }}>
                {t("TermsandConditions.Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.")}
              </Text>
            </View>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.")}
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      console.log('catch in renderHeaderItem_Terms :', error);
    }
  };

  const renderFooterItem = () => {
    try {
      return (
        <View style={{width: '100%', alignItems: 'center', marginBottom: 30}}>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              12. {t("TermsandConditions.CONTRIBUTION LICENCE")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You and Services agree that we may access, store, process, and use any information and personal data that you provide and your choices (including settings). By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area of the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              13. {t("TermsandConditions.MOBILE APPLICATION LICENCE")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Use Licence")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application licence contained in these Legal Terms. You shall not")}:{t("TermsandConditions.(1) except as permitted by applicable law, decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the App; (5) use the App for any revenue-generating endeavour, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the App available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the App for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the App; (8) use the App to send automated queries to any website or to send any unsolicited commercial email; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Apple and Android Devices")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an 'App Distributor') to access the Services")}: {t("TermsandConditions.(1) the licence granted to you for our App is limited to a non-transferable licence to use the application on a device that utilises the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the App as specified in the terms and conditions of this mobile application licence contained in these Legal Terms or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App; (3) in the event of any failure of the App to conform to any applicable warranty, you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, may refund the purchase price, if any, paid for the App, and to the maximum extent permitted by applicable law, the App Distributor will have no other warranty obligation whatsoever with respect to the App; (4) you represent and warrant that (i) you are not located in a country that is subject to a US government embargo, or that has been designated by the US government as a 'terrorist supporting' country and (ii) you are not listed on any US government list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when using the App, e.g. if you have a VoIP application, then you must not be in violation of their wireless data service agreement when using the App; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries of the terms and conditions in this mobile application licence contained in these Legal Terms, and that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this mobile application licence contained in these Legal Terms against you as a third-party beneficiary thereof.")}
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              14. {t("TermsandConditions.SERVICES MANAGEMENT")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We reserve the right, but not the obligation, to")}: {t("TermsandConditions.(1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems, and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              15. {t("TermsandConditions.TERM AND TERMINATION")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
             {t("TermsandConditions.THESE LEGAL TERMS SHALL REMAIN IN FULL FORCE AND EFFECT WHILE YOU USE THE SERVICES. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
             {t("TermsandConditions.If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              16. {t("TermsandConditions.MODIFICATIONS AND INTERRUPTIONS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              17. {t("TermsandConditions.GOVERNING LAW")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.These Legal Terms shall be governed by and defined following the laws of India. Cignix and you irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.")}
            </Text>
          </View>

          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              18. {t("TermsandConditions.DISPUTE RESOLUTION")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Informal Negotiations")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 'Dispute' and collectively, the 'Disputes') brought by either you or us (individually, a 'Party' and collectively, the 'Parties'), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Binding Arbitration")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.Any dispute arising out of or in connection with these Legal Terms, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by the International Commercial Arbitration Court under the European Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to the Rules of this ICAC, which, as a result of referring to it, is considered as the part of this clause. The seat, or legal place, of arbitration, shall be Gurgaon, India. The language of the proceedings shall be English. The governing law of these Legal Terms shall be the substantive law of India.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Restrictions")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilise class-action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Exceptions to Informal Negotiations and Arbitration")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 0,
              }}>
              {t("TermsandConditions.The Parties agree that the following Disputes are not subject to the above provisions concerning informal negotiations binding arbitration")}: {t("TermsandConditions.(a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorised use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                paddingVertical: 10,
              }}>
              19. {t("TermsandConditions.CORRECTIONS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              20. {t("TermsandConditions.DISCLAIMER")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS, AND YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK; TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT, AND WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES, AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, PERSONAL INJURY OR PROPERTY DAMAGE RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY PERSONAL OR FINANCIAL INFORMATION STORED THEREIN, ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES; WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES, AND AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.")}
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              21. {t("TermsandConditions.LIMITATIONS OF LIABILITY")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              22. {t("TermsandConditions.INDEMNIFICATION")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of")}: {t("TermsandConditions.(1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defence and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defence of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              23. {t("TermsandConditions.USER DATA")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.")}
            </Text>
          </View>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              24. {t("TermsandConditions.ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.")}
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              25. {t("TermsandConditions.SMS TEXT MESSAGING")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Opting Out")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Using Notification Settings")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Message and Data Rates")}{' '}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Please be aware that message and data rates may apply to any SMS messages sent or received. The rates are determined by your carrier and the specifics of your mobile plan.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.Support")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.If you have any questions or need assistance regarding our SMS communications, please email us at quit@cignix.com or call")} +91
              9873832002.
            </Text>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              26. {t("TermsandConditions.MISCELLANEOUS")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.These Legal Terms and any policies or operating rules posted by us on the Services or with respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defences you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.")}
            </Text>
          </View>
          <View style={{width: '100%', marginBottom: 10}}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              27. {t("ContactUs.CONTACT US")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 10,
              }}>
              {t("TermsandConditions.In order to resolve a complaint regarding the Services or to receive further information regarding the use of the Services, please contact us at")}:
            </Text>

            <Text
              style={{
                textAlign: 'left',
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              Cignix
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.Unit No. 105, First Floor,")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.Iris Tech Park, Sector-48,")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.Gurgaon,")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.Haryana")} 122018,
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.India.")}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              {t("ContactUs.Phone")}:{' '}
              <Text
                style={{
                  fontSize: 15,
                  color: Color.primary,
                  fontFamily: Mulish.SemiBold,
                }}>
                +91 9873832002
              </Text>
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 15,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
                textDecorationLine: 'underline',
              }}>
              quit@cignix.com
            </Text>
          </View>
        </View>
      );
    } catch (error) {
      console.log('catch in renderFooterItem_Terms :', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar
                backgroundColor={Color.primary}
                barStyle={'light-content'}
                translucent
            /> */}
      <View
        style={{
          backgroundColor: Color?.white,
          flexDirection: 'row',
          paddingLeft: 5,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <Pressable
          style={{width: scr_width / 5}}
          onPress={() => {
            navigation?.goBack();
          }}>
          <Iconviewcomponent
            // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={25}
            icon_color={'#000'}
            iconname={'chevron-back'}
          />
        </Pressable>
        <View>
          <Text
            style={{fontFamily: Mulish?.SemiBold, fontSize: 22, color: '#000'}}>
            {t("TermsandConditions.Terms and Conditions")}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '95%',
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}>
        <FlatList
          data={termsData}
          keyExtractor={(item, index) => item + index}
          ListHeaderComponent={() => renderHeaderItem()}
          // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
          ListFooterComponent={() => renderFooterItem()}
          style={{width: '95%'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: 10,
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default TermsandConditions;

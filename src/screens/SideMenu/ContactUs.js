//import liraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Components/Dimensions';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useTranslation } from 'react-i18next';

// create a component
const ContactUs = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Color?.white,
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          <Pressable
            style={{ width: scr_width / 5 }}
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
              style={{ fontFamily: Mulish?.SemiBold, fontSize: 17, color: '#000' }}>
              {t("ContactUs.Contact Support")}
            </Text>
          </View>
        </View>
        <Text
          style={{
            textAlign: 'justify',
            fontSize: 14,
            color: Color.cloudyGrey,
            fontFamily: Mulish.Medium,
            letterSpacing: 0.5, paddingVertical: 5
          }}>
          {t("ContactUs.We’re here to help! There are several ways to reach our customer support team")}:
        </Text>

        <View style={{ width: '100%', marginTop: 20 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Color.black,
              fontFamily: Mulish.Black,
              letterSpacing: 0.5,
            }}>
            {t("ContactUs.Email Support")}:
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
            {t("ContactUs.For any questions or concerns, feel free to email us")}{' '}
            <Text
              style={{
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.BoldItalic,
                letterSpacing: 0.5,
              }}>
              atquit@cignix.com
            </Text>
            , {t("ContactUs.and we’ll get back to you as soon as possible.")}
          </Text>
        </View>
        <View style={{ width: '100%', marginTop: 20 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Color.black,
              fontFamily: Mulish.Black,
              letterSpacing: 0.5,
            }}>
            {t("ContactUs.Phone Support")}:
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
            {t("ContactUs.If you prefer to speak directly with our team, call us at")}{' '}
            <Text
              style={{
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.BoldItalic,
                letterSpacing: 0.5,
              }}>
              9873832002
            </Text>{' '}
            {t("ContactUs.for assistance")}. {t("ContactUs.Our phone lines are open during our support hours.")}
          </Text>
        </View>
        <View style={{ width: '100%', marginTop: 20 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Color.black,
              fontFamily: Mulish.Black,
              letterSpacing: 0.5,
            }}>
            {t("ContactUs.Live Chat")}:
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
            {t("ContactUs.Need immediate help? Our live chat service is available")}{' '}
            <Text
              style={{
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.BoldItalic,
                letterSpacing: 0.5,
              }}>
              24/7{' '}
            </Text>{' '}
            {t("ContactUs.on our website")}. {t("ContactUs.Connect instantly with a support agent for quick resolutions.")}
          </Text>
        </View>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Color.black,
              fontFamily: Mulish.Black,
              letterSpacing: 0.5,
            }}>
            {t("ContactUs.Customer Support Hours")}:
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
            {t("ContactUs.Our team is dedicated to providing excellent support during the following hours")}:
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
              iconstyle={{ marginTop: 0 }}
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
              <Text
                style={{
                  fontSize: 13,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("ContactUs.Monday")} - {t("ContactUs.Friday")}:
              </Text>{' '}
              10:00 AM - 6:00 PM (IST)
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
              iconstyle={{ marginTop: 0 }}
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
              <Text
                style={{
                  fontSize: 13,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("ContactUs.Saturday")} & {t("ContactUs.Sunday")}
              </Text>
              : {t("ContactUs.Closed")}
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
            <Text
              style={{
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              {t("ContactUs.Note")}:
            </Text>{' '}
            {t("ContactUs.If you need help outside of our customer support hours, you can make use of the")}{' '}
            <Text
              style={{
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              {t("ContactUs.Live Chat")}{' '}
            </Text>
            {t("ContactUs.option on our website.")}
          </Text>

          <View style={{ width: '100%', marginTop: 10, marginBottom: 10 }}>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              {t("ContactUs.CONTACT US")}
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
              {t("ContactUs.In order to resolve a complaint regarding the Services or to receive further information regarding the use of the Services, please contact us at")}:
            </Text>

            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              Cignix
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 13,
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
                fontSize: 13,
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
                fontSize: 13,
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
                fontSize: 13,
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
                fontSize: 13,
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
                fontSize: 13,
                color: Color.black,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
              }}>
              Phone:{' '}
              <Text
                style={{
                  fontSize: 13,
                  color: Color.primary,
                  fontFamily: Mulish.Bold,
                }}>
                +91 9873832002
              </Text>
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 13,
                color: Color.primary,
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
                lineHeight: 22,
                paddingVertical: 5,
                textDecorationLine: 'underline',
              }}>
              quit@cignix.com
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
            {t("ContactUs.We’re committed to offering the best possible support, ensuring your experience with us is smooth!")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    backgroundColor: Color.white,
    marginBottom: 20,
  },
  scrollContent: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default ContactUs;

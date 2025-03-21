//import liraries
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Components/Dimensions';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useTranslation } from 'react-i18next';


// create a component
const GetStarted = () => {
    const { t } = useTranslation();
    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled" >
            <View style={styles.container}>
                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.SemiBold, letterSpacing: 0.5, lineHeight: 22 }}>{t("HelpCenter.Embark on your journey to quit smoking with Cignix. With our simple resources and dedicated support, you're never alone on this path.")}</Text>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Mulish.Black, letterSpacing: 0.5 }}>{t("HelpCenter.Sign Up")}</Text>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Head over to the landing page of Cignix and click on the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Sign-in")} </Text>{t("HelpCenter.tab.")}</Text>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Then, select the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Sign-up")} </Text>{t("HelpCenter.on the next screen.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Now, fill in the required details, including Name, email ID, mobile number, DOB, and gender.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Enter a secure password for Cignix’s account.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Click on the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Get Started")} </Text>{t("HelpCenter.Now option and you have to take a")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.SIM test")}</Text>.</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Then, you can access the free videos available.")}</Text>
                    </View>
                    <Text style={{ textAlign: 'justify', fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.Note")}:</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.In addition, you can also sign up using your Google account.")}</Text>
                </View>


                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Mulish.Black, letterSpacing: 0.5 }}>{t("HelpCenter.Log In")}</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.Using Password")}</Text>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Once registered, click on the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Sign-in")} </Text>{t("HelpCenter.tab on the landing page.")}</Text>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Next, enter the registered mobile number or email ID.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Following that, click on the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Password")} </Text>{t("HelpCenter.bar.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Then, input the appropriate password and click on")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>{t("HelpCenter.Continue")}</Text>.</Text>
                    </View>

                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.Using OTP")}</Text>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.On the landing page, click on the")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}> {t("HelpCenter.Sign-in")} </Text> {t("HelpCenter.option.")}</Text>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Then, input the registered email ID or mobile number.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Select the OTP bar and you will receive an")} <Text style={{ fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5 }}>OTP </Text>{t("HelpCenter.via registered email ID or mobile number.")}</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <Iconviewcomponent
                            Icontag={'Entypo'}
                            iconname={'dot-single'}
                            icon_size={22}
                            icon_color={Color.primary}
                            iconstyle={{ marginTop: 0 }}
                        />
                        <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Enter the OTP and you can further access the videos available on Cignix.")}</Text>
                    </View>

                    <Text style={{ textAlign: 'justify', fontSize: 13, color: Color.black, fontFamily: Mulish.Bold, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.Note")}:</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, }}>{t("HelpCenter.Alternatively, you can sign in using your Google account or OTP.")}</Text>
                </View>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Mulish.Black, letterSpacing: 0.5 }}>{t("HelpCenter.Customize Your Profile")}</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.To customize your profile on Cignix, you have to take the SIM test.")}</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>{t("HelpCenter.Begin the test to assess your smoking habits and readiness to quit. Simply select a number on the scale that best reflects your agreement, likelihood, or preference.")}</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 5 }}>{t("HelpCenter.Your responses will help us provide tailored support for your quit-smoking journey.")}</Text>
                </View>

                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text style={{ textAlign: 'left', fontSize: 16, color: Color.black, fontFamily: Mulish.Black, letterSpacing: 0.5 }}>{t("HelpCenter.Begin Your Program")}</Text>
                    <Text style={{ textAlign: 'justify', fontSize: 13, color: Color.cloudyGrey, fontFamily: Mulish.Medium, letterSpacing: 0.5, lineHeight: 22, paddingVertical: 10 }}>{t("HelpCenter.Access your personalized dashboard and start your quit-smoking journey with our expert-guided videos.")}</Text>
                </View>

            </View>
        </ScrollView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1, width: '95%',
        backgroundColor: Color.white, marginVertical: 10
    },
    scrollContent: {
        width: '100%',
        padding: 10,
        alignItems: 'center', backgroundColor: Color.white,
    },
});

//make this component available to the app
export default GetStarted;

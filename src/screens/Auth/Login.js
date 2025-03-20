//import liraries
import React, { useEffect, useState } from 'react';
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
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Components/Dimensions';
import { Mulish } from '../../Global/FontFamily';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import common_fn from '../../Components/common_fn';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import fetchData from '../../Config/fetchData';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

// create a component
const Login = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const routeName = useRoute();
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [loader, setloader] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Cleanup listeners on unmount
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);
  const chkNumber = number => {
    // setNumber(number);
    // if (number.length == 10) {
    //     Keyboard.dismiss();
    // }
    const filteredText = number.replace(/[^0-9]/g, '');
    setNumber(filteredText);

    if (filteredText.length === 10) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '542915280674-ksrh2555r57pc5ml1gb09bsqft4fq7cn.apps.googleusercontent.com',
    });
  }, []);

  const chkNumberError = number => {
    // let reg = /^[6-9][0-9]*$/;

    // if (number.length === 0) {
    //     setError('Enter Your Mobile Number');
    // } else if (reg.test(number) === false) {
    //     setError(false);
    //     setError(false);
    // } else if (reg.test(number) === true) {
    //     setError('');
    // }

    let reg = /^[6-9][0-9]*$/; // Starts with 6-9 and contains digits only

    if (number.length === 0) {
      setError('Enter Your Mobile Number');
    } else if (!reg.test(number)) {
      setError('Enter a valid mobile number');
    } else {
      setError(''); // Clear the error if the input is valid
    }
  };
  //  LOGIN FUNCTION :
  const login = async () => {
    try {
      setloader(true);
      if (number.length == 10) {
        const login_res = await fetchData?.login({
          mobile: number,
        });

        console.log('login resp ================== :', login_res);

        if (login_res?.success == true) {
          await AsyncStorage.setItem('WhatsAppModal', 'true');
          common_fn.showToast(login_res?.message);
          navigation.navigate('OTPScreen', {
            number: number,
            token: login_res?.token,
          });
          setNumber('');
          setloader(false);
        } else {
          common_fn.showToast(login_res?.message);
          setloader(false);
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast(
            'Invalid Phone Number, Please Enter Your 10 Digit Phone Number',
          );
          setloader(false);
        } else {
          alert(
            'Invalid Phone Number, Please Enter Your 10 Digit Phone Number',
          );
          setloader(false);
        }
      }
    } catch (error) {
      setloader(false);
      console.log('CATCH IN LOGIN', error);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
      console.log("userInfo", userInfo?.data?.user);

      let googleAuthPayload = {
        email: userInfo?.data?.user?.email,
        name: userInfo?.data?.user?.givenName,
        mobile: '',
        dob: '',
        step: 0,
        type: 'free',
      };
      console.log('googleAuthPayload', googleAuthPayload)
      const googleLogin = await fetchData?.googleLogin(googleAuthPayload);
      console.log('googleAuthPayload', googleLogin);
      if (googleLogin?.message == "Login Successfully" || googleLogin?.message == "User Created Successfully") {
        await AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(googleLogin?.token));
        await AsyncStorage.setItem(
          'USERDATA',
          JSON.stringify(googleLogin?.data),
        );
        common_fn.showToast(googleLogin?.message);
        await GoogleSignin.signOut();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Tab' }],
          })
        );
      }
    } catch (error) {
      console.log('catch in signIn_login ----------: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };
  const changeLanguage = (lang) => {
    console.log("ccccccccccc");

    i18n.changeLanguage(lang); // Change language dynamically
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      // scrollEnabled={isKeyboardVisible ? true : false }
      >
        <StatusBar
          hidden={false} // Hides the status bar
          backgroundColor={Color.white} // Matches background color
          translucent={true}
          barStyle={'dark-content'}
        />

        <View
          style={{
            width: scr_width,
            // height: scr_height,
            marginTop: scr_height / 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <View
            style={{
              flex: 4,
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
              }}>
              <Image
                source={require('../../assets/Logos/cignix.png')}
                style={[styles.image]}
              />
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  paddingVertical: 5,
                }}>
                {/* {t("mobilelogin.Welcome Back")} */}
                Welcome Back,
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.cloudyGrey,
                  fontFamily: Mulish.Medium,
                }}>
                {/* {t("mobilelogin.Welcome description")} */}
                Login with your Mobile Number
              </Text>

              <View style={{ marginVertical: 20 }}>
                <View style={styles.NumberBoxConatiner}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Image
                      source={require('../../assets/Images/india.png')}
                      style={{ width: 25, height: 25, resizeMode: 'contain' }}
                    />
                    <Text
                      style={[
                        styles.numberCountryCode,
                        { paddingHorizontal: 5 },
                      ]}>
                      +91
                    </Text>
                  </View>
                  <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor={Color.black}
                    value={number}
                    keyboardType="numeric"
                    maxLength={10}
                    autoFocus={number.length == 10 ? false : true}
                    onChangeText={number => {
                      chkNumber(number);
                      chkNumberError(number);
                    }}
                    style={[styles.numberTextBox, { right: 5 }]}
                  />
                </View>
                {error && <Text style={styles.invalidLogin}>{error}</Text>}
              </View>

              <TouchableOpacity
                onPress={() => login()}
                // onPress={() => changeLanguage('ma')}
                style={{
                  width: '100%',
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  borderRadius: 30,
                  marginVertical: 20,
                }}>
                {loader == true ? (
                  <ActivityIndicator size={'small'} color={Color.white} />
                ) : (
                  <Text
                    style={{
                      fontSize: 20,
                      color: Color.white,
                      fontFamily: Mulish.SemiBold,
                    }}>
                    {/* {t("mobilelogin.Get Otp")} */}
                    Get OTP
                  </Text>
                )}
              </TouchableOpacity>

              <View
                style={{
                  width: scr_width,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <View
                  style={{
                    width: scr_width / 3.3,
                    height: 0.5,
                    borderStyle: 'dashed',
                    borderWidth: 0.5,
                    backgroundColor: Color.softGrey,
                    borderRadius: 1,
                  }}></View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Mulish.Medium,
                      paddingHorizontal: 5,
                    }}>
                    {/* {t("mobilelogin.or Login With")} */}
                    Or Login With
                  </Text>
                </View>
                <View
                  style={{
                    width: scr_width / 3.3,
                    height: 0.5,
                    borderStyle: 'dashed',
                    borderWidth: 0.5,
                    backgroundColor: Color.softGrey,
                    borderRadius: 1,
                  }}></View>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  onPress={() => signIn()}
                  style={{
                    flex: 1,
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#C5C5C5',
                  }}>
                  <Image
                    source={require('../../assets/Images/google.png')}
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: Color.cloudyGrey,
                      fontFamily: Mulish.SemiBold,
                      paddingHorizontal: 10,
                    }}>
                    {/* {t("mobilelogin.Google")} */}
                    Google
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 20,
                    height: '100%',
                    backgroundColor: Color.white,
                  }}></View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EmailPassword')}
                  style={{
                    flex: 1,
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#C5C5C5',
                  }}>
                  <Image
                    source={require('../../assets/Images/pass.png')}
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: Color.cloudyGrey,
                      fontFamily: Mulish.SemiBold,
                      paddingHorizontal: 10,
                    }}>
                    {/* {t("mobilelogin.Password")} */}
                    Password
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.Venus,
                    fontFamily: Mulish.Medium,
                    paddingHorizontal: 5,
                  }}>
                  {/* {t("mobilelogin.Don't have an account?")}{' '} */}
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SimTest')}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: Color.primary,
                      fontFamily: Mulish.SemiBold,
                    }}>
                    {/* {t("mobilelogin.Sign Up")} */}
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: scr_width,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  scrollContent: {
    width: scr_width,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 80,
    resizeMode: 'contain',
  },
  NumberBoxConatiner: {
    width: '100%',
    display: 'flex',
    borderColor: Color.grey,
    borderWidth: 1,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    fontSize: 14,
    fontFamily: Mulish.SemiBold,
    textAlign: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  invalidLogin: {
    fontSize: 12,
    fontFamily: Mulish.Light,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  numberTextBox: {
    flex: 1,
    display: 'flex',
    height: 55,
    borderLeftColor: Color.grey,
    borderLeftWidth: 1,
    color: Color.black,
    fontSize: 16,
    padding: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    fontFamily: Mulish.SemiBold,
    alignItems: 'flex-start',
  },
});

//make this component available to the app
export default Login;

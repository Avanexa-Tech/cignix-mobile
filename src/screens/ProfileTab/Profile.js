//import liraries
import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
  LogBox,
  StatusBar,
  FlatList,
  PermissionsAndroid,
  Modal,
  NativeEventEmitter,
  NativeModules,
  TextInput,
  ImageBackground,
  Linking,
  ToastAndroid,
  Alert,
} from 'react-native';

import { Iconviewcomponent } from '../../Components/Icontag';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { scr_height } from '../../Components/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Components/common_fn';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// create a component
const Profile = ({ navigation }) => {
  // const navigation = useNavigation();
  const [Uservalue, setuserdata] = useState(null);
  const [shopSection] = useState([
    { id: 1, title: 'Profile', data: ['Profile'] },
    { id: 2, title: 'Account', data: ['Account'] },
    { id: 3, title: 'Other Settings', data: ['Other Settings'] },
  ]);
  const { t, i18n } = useTranslation();

  const User_Function = async () => {
    try {
      const Userdata = await fetchData?.Getuserdata();
      console.log('fffffffffffff', Userdata);

      if (Userdata?.success == true) {
        setuserdata(Userdata?.data);
      } else {
        setuserdata(null);
      }
    } catch (error) {
      console.log('CATCH IN ERRROR', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      User_Function();
      return () => { };
    }, []),
  );
  useEffect(() => {
    User_Function();
  }, []);

  const Logout = async () => {
    try {
      const logout = await fetchData?.Logout();
      console.log('logout', logout);
      if (logout?.success == true) {
        await AsyncStorage.removeItem('ACCESS_TOKEN');
        await AsyncStorage.removeItem('USERDATA');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Auth' }],
        });
      } else {
        console.log('error');
        common_fn.showToast(logout?.message);
      }
    } catch (error) {
      console.log('Catch in Logout', error);
    }
  };
  const RemoveAccount = async () => {
    try {
      const ACCESS_TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      const token = JSON.parse(ACCESS_TOKEN);
      let v = `https://test.cignix.com/user-delete?token=${token}`;
      console.log('access token', v);

      Alert.alert('Alert', 'Are you sure you want to Remove/Delete account?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            Linking.openURL(
              `https://test.cignix.com/user-delete?token=${token}`,
            );
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ]);
    } catch (error) {
      console.log('catch in RemoveAccount : ', error);
    }
  };

  console.log('Current language:', i18n.language);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false} // Hides the status bar
        backgroundColor={Color.white} // Matches background color
        translucent={true}
        barStyle={'dark-content'}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconviewcomponent
            viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={30}
            icon_color={Color.black}
            iconname="chevron-back"
          />
        </TouchableOpacity>
        <View style={{ fontSize: 20, color: Color.black, fontFamily: Mulish.Bold,flex: 1, justifyContent: 'center', alignItems: 'center',marginLeft:20}}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Mulish.Bold,
              textAlign: 'center',
            }}
          >
            {t("profile.Profile")}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsList')}
          >
            <Iconviewcomponent
              viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
              Icontag="Ionicons"
              icon_size={30}
              icon_color={Color.black}
              iconname="notifications-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.navigate("LanguageSelector")}
          >
            <Iconviewcomponent
              viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
              Icontag="Ionicons"
              icon_size={30}
              icon_color={Color.black}
              iconname="language-outline"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.SectionList
        sections={shopSection}
        scrollEnabled={true}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        nestedScrollEnabled
        initialNumToRender={5}
        renderItem={({ item }) => {
          switch (item) {
            case 'Profile':
              return (

                <View
                  style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: Color.cloudyGrey,
                          borderRadius: 50,
                        }}>
                        <Image
                          source={
                            Uservalue?.profile
                              ? { uri: Uservalue?.profile }
                              : require('../../assets/Logos/cignix_black.png')
                          }
                          style={{
                            width: 60,
                            height: 60,
                            resizeMode: 'cover',
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: Color?.grey,
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 3,
                        width: '100%',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          fontSize: 16,
                          textAlign: 'left',
                          color: Color.black,
                          fontFamily: Mulish.Bold,
                          letterSpacing: 0.5,
                          padding: 3,
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={1}>
                        {Uservalue?.name}
                      </Text>
                      <Text
                        style={{
                          width: '100%',
                          fontSize: 14,
                          textAlign: 'left',
                          color: Color.cloudyGrey,
                          fontFamily: Mulish.Medium,
                          letterSpacing: 0.5,
                          padding: 3,
                        }}
                        numberOfLines={1}>
                        {Uservalue?.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          padding: 10,
                          paddingHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#62A2FD',
                          borderRadius: 50,
                        }}>
                        <Text
                          style={{
                            fontSize: 10,
                            color: Color.white,
                            fontFamily: Mulish.Medium,
                          }}>
                          {Uservalue?.step == 1 ||
                            Uservalue?.step == 2 ||
                            Uservalue?.step == 3
                            ? t('profile.Free User')
                            : t('profile.Premium User')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 5,
                      backgroundColor: '#F9F9F9',
                      marginVertical: 20,
                    }}></View>
                </View>
              );
            case 'Account':
              return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <View style={{ width: '95%' }}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: Color.black,
                        fontFamily: Mulish.Bold,
                        letterSpacing: 0.5,
                      }}>
                      {t('profile.Account Settings')}
                    </Text>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('EditProfile')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Feather"
                          icon_size={22}
                          icon_color={Color.lightBlack}
                          iconname="user"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.Edit Profile')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('Membership')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="MaterialCommunityIcons"
                          icon_size={22}
                          icon_color={Color.lightBlack}
                          iconname="crown-outline"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.Manage Subscription')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('ChangePassword')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="MaterialCommunityIcons"
                          icon_size={22}
                          icon_color={Color.lightBlack}
                          iconname="key-outline"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.Change Password')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('NotificationSettings')
                      }
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={22}
                          icon_color={Color.lightBlack}
                          iconname="notifications-outline"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.Notification Settings')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        height: 3,
                        backgroundColor: Color.softGrey,
                        marginTop: 20,
                      }}
                    />
                  </View>
                </View>
              );
            case 'Other Settings':
              return (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingBottom: scr_height / 9,
                  }}>
                  <View style={{ width: '95%', marginTop: 20 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: 'left',
                        color: Color.black,
                        fontFamily: Mulish.Bold,
                        letterSpacing: 0.5,
                      }}>
                      {t('profile.Other Settings')}
                    </Text>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('Blogs')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Feather"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="help-circle"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.Blogs')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('NewandMedia')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Feather"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="help-circle"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t('profile.News and Media')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('HelpCenter')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Feather"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="help-circle"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Help Center")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ContactUs')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="AntDesign"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="customerservice"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Contact Support")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('PrivacyPolicy')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="SimpleLineIcons"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="lock"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Privacy Policy")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('TermsandConditions')}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <Iconviewcomponent
                                                    viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                                                    Icontag="Ionicons"
                                                    icon_size={25}
                                                    icon_color={Color.cloudyGrey}
                                                    iconname="notifications-outline"
                                                /> */}
                        <Image
                          source={require('../../assets/Images/terms.png')}
                          style={{ width: 25, height: 25, resizeMode: 'contain' }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Terms and Conditions")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => RemoveAccount()}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 30,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="AntDesign"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="delete"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Remove Account")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        // navigation.reset({
                        //   index: 0,
                        //   routes: [{name: 'Auth'}], // Replace 'Auth' with your desired route name
                        // })
                        Logout()
                      }
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 25,
                      }}>
                      <View
                        style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="MaterialCommunityIcons"
                          icon_size={22}
                          icon_color={Color.cloudyGrey}
                          iconname="logout"
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          paddingHorizontal: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: Color.lightBlack,
                            fontFamily: Mulish.SemiBold,
                            letterSpacing: 0.5,
                          }}>
                          {t("profile.Logout")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}>
                        <Iconviewcomponent
                          viewstyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          Icontag="Ionicons"
                          icon_size={20}
                          icon_color={Color.Venus}
                          iconname="chevron-forward-outline"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
          }
        }}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontFamily: Mulish.Bold,
  },
  languageOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 16,
    color: Color.lightBlack,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Color.red,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

//make this component available to the app
export default Profile;

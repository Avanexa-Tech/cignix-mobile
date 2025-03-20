import React, { useEffect, useState } from 'react';
import {
  Linking,
  LogBox,
  NativeEventEmitter,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator, { Auth } from '../../route';
import SplashScreen from '../../SplashScreen';
import OnboardScreen from '../Onboard/OnboardScreen';
import TermsandConditions from '../SideMenu/TermsandConditions';
import PrivacyPolicy from '../SideMenu/PrivacyPolicy';
import AboutUs from '../SideMenu/AboutUs';
import ContactUs from '../SideMenu/ContactUs';
import NotificationsList from '../Home/NotificationsList';
import HelpCenter from '../SideMenu/HelpCenter';
import GetStarted from '../SideMenu/GetStarted';
import PricePayments from '../SideMenu/PricePayments';
import TechnicalSupport from '../SideMenu/TechnicalSupport';
import FAQs from '../SideMenu/FAQs';
import Color from '../../Global/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import SimTest from '../Auth/SimTest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimTestScreen from '../Home/SimTestScreen';
import Membership from '../ProfileTab/Membership';
import Blogs from '../SideMenu/Blogs';
import NewsandMedia from '../SideMenu/NewsandMedia';
import EditProfile from '../ProfileTab/EditProfile';
import ChangePassword from '../ProfileTab/ChangePassword';
import NotificationSettings from '../ProfileTab/NotificationSettings';
import Viewblog from '../SideMenu/Viewblog';
import LanguageSelector from '../ProfileTab/LanguageSelector';
export const navigationRef = React.createRef();
const MainStack = () => {
  const [initial, setinitial] = useState(true);
  const [loading, setLoading] = useState(false);

  const Stack = createNativeStackNavigator();
  const Getuserdata = async () => {
    setLoading(false);
    try {
      const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
      const ACCESS_TOKEN = JSON.parse(TOKEN);
      if (ACCESS_TOKEN) {
        console.log('Check', ACCESS_TOKEN);
        navigationRef.current?.navigate('Tab');
      } else {
        console.log('Checkddddddddddd');
        navigationRef.current?.navigate('OnboardScreen');
      }
    } catch (error) {
      console.log('Error getting user data:', error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    Getuserdata();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnboardScreen"
        component={OnboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsandConditions"
        component={TermsandConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Blogs"
        component={Blogs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Viewblog"
        component={Viewblog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Membership"
        component={Membership}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewandMedia"
        component={NewsandMedia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LanguageSelector"
        component={LanguageSelector}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation, route }) => ({
          headerTitle: 'About Us',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: Color.black,
            fontSize: 16,
            // fontFamily: Manrope.Bold,
          },
          headerStyle: { backgroundColor: Color.white },
          headerLeft: () => (
            <View style={{ marginHorizontal: 10 }}>
              <Icon
                name="arrow-back"
                size={30}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationsList"
        component={NotificationsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SimTestScreen"
        component={SimTestScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PricePayments"
        component={PricePayments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TechnicalSupport"
        component={TechnicalSupport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
export default MainStack;

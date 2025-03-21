import React, { useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
import HomeScreen from './screens/Home/HomeScreen';
import AboutUs from './screens/SideMenu/AboutUs';
import ContactUs from './screens/SideMenu/ContactUs';
import TermsandConditions from './screens/SideMenu/TermsandConditions';
import PrivacyPolicy from './screens/SideMenu/PrivacyPolicy';
import Timeline from './screens/TimeLine/Timeline';
import Profile from './screens/ProfileTab/Profile';
import Login from './screens/Auth/Login';
import OTPScreen from './screens/Auth/OTPScreen';
import Color from './Global/Color';
import { scr_height, scr_width } from './Components/Dimensions';
import EmailPassword from './screens/Auth/EmailPassword';
import Register from './screens/Auth/Register';
import SimTest from './screens/Auth/SimTest';
import SimTestScreen from './screens/Home/SimTestScreen';
import SuccesScreen from './screens/Auth/SuccesScreen';

const wp = (percentage) => {
  return (percentage * scr_width) / 100;
};

const hp = (percentage) => {
  return (percentage * scr_height) / 100;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={({ navigation, route }) => ({
          headerTitle: 'About Us',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Icon
                name="arrow-back"
                size={wp(8)}
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
        options={({ navigation, route }) => ({
          headerTitle: 'Contact Us',
          headerTitleAlign: 'center',
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Icon
                name="arrow-back"
                size={wp(8)}
                color={Color.black}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="TermsandConditions"
        component={TermsandConditions}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SimTestScreen"
        component={SimTestScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const TimeLineStack = () => {
  return (
    <Stack.Navigator initialRouteName="Timeline">
      <Stack.Screen
        name="Timeline"
        component={Timeline}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  const notificationCount = useSelector(
    state => state.UserReducer.notificationCount,
  );
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailPassword"
        component={EmailPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Simtest"
        component={SimTest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuccesScreen"
        component={SuccesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SimTest"
        component={SimTest}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'HomeTab') {
            return focused ? (
              <View style={styles.tabIconContainer}>
                <View style={styles.activeTabIcon}>
                  <Image
                    source={require('../src/assets/Images/home.png')}
                    style={styles.activeIconImage}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.inactiveTabContainer}>
                <Image
                  source={require('../src/assets/Images/home.png')}
                  style={styles.inactiveIconImage}
                />
              </View>
            );
          } else if (route.name === 'TimelineTab') {
            return focused ? (
              <View style={styles.tabIconContainer}>
                <View style={styles.activeTabIcon}>
                  <Image
                    source={require('../src/assets/Images/up_arrow.png')}
                    style={styles.activeIconImage}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.inactiveTabContainer}>
                <Image
                  source={require('../src/assets/Images/up_arrow.png')}
                  style={styles.inactiveIconImage}
                />
              </View>
            );
          } else if (route.name === 'ProfileTab') {
            return focused ? (
              <View style={styles.tabIconContainer}>
                <View style={styles.activeTabIcon}>
                  <Image
                    source={require('../src/assets/Images/user.png')}
                    style={styles.activeIconImage}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.inactiveTabContainer}>
                <Image
                  source={require('../src/assets/Images/user.png')}
                  style={styles.inactiveIconImage}
                />
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="TimelineTab"
        component={TimeLineStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    color: Color.black,
    fontSize: wp(4.5),
  },
  headerStyle: {
    backgroundColor: Color.white,
  },
  headerLeftContainer: {
    marginHorizontal: wp(2.5),
  },
  tabBarStyle: {
    position: 'absolute',
    marginLeft: scr_width / 6.5,
    marginBottom: hp(3),
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 100,
    width: scr_width / 1.45,
    height: hp(8),
    backgroundColor: '#0B1215',
    alignItems: 'center', 
  },
  tabIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    top:hp(2)
  },
  inactiveTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    top:hp(2)
  },
  activeTabIcon: {
    backgroundColor: Color.primary,
    width: wp(14),
    height: wp(14),
    borderRadius: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveTabIcon: {
    backgroundColor: 'transparent',
    width: wp(13),
    height: wp(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconImage: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
  inactiveIconImage: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
});

export default TabNavigator;
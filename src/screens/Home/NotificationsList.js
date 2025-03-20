import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import { Iconviewcomponent } from '../../Components/Icontag';
import { scr_width } from '../../Components/Dimensions';
import { useTranslation } from 'react-i18next';
import { translateText } from '../Context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'; // Add this dependency

const NotificationsList = () => {
  const navigation = useNavigation();
  const [selectItem, setSelectedItem] = useState('');
  const [notificationData, setNotificationData] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const { t, i18n } = useTranslation();

  const translateNotifications = async (notifications) => {
    try {
      if (!notifications?.length) return [];

      const translatedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          const translatedNotification = { ...notification };
          try {
            if (typeof translateText !== 'function') {
              console.error('translateText is not a function:', translateText);
              return notification;
            }
            translatedNotification.title = await translateText(notification.title || '');
            translatedNotification.message = await translateText(notification.message || '');
          } catch (err) {
            console.error('Translation error for single notification:', err);
            translatedNotification.title = notification.title;
            translatedNotification.message = notification.message;
          }
          return translatedNotification;
        })
      );
      return translatedNotifications;
    } catch (error) {
      console.error('Error in translateNotifications:', error);
      return notifications;
    }
  };

  const getSelectedLanguage = async () => {
    try {
      const language = (await AsyncStorage.getItem('selectedLanguage')) || 'en';
      setTargetLanguage(language);
      return language;
    } catch (error) {
      console.error('Error getting selected language:', error);
      return 'en';
    }
  };

  const getNotificationList = async () => {
    try {
      setIsLoading(true); // Show skeleton while fetching
      const notificationList = await fetchData?.GetnotificationList();
      if (notificationList?.success === true) {
        const translatedData = await translateNotifications(notificationList?.data);
        setNotificationData(translatedData);
      }
    } catch (error) {
      console.error('Error in getNotificationList:', error);
    } finally {
      setIsLoading(false); // Hide skeleton when done
    }
  };

  useEffect(() => {
    getNotificationList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const checkLanguageAndUpdate = async () => {
        const newLanguage = (await AsyncStorage.getItem('selectedLanguage')) || 'en';
        if (newLanguage !== targetLanguage) {
          setTargetLanguage(newLanguage);
          await getNotificationList();
        }
      };
      checkLanguageAndUpdate();
    }, [targetLanguage])
  );

  // Skeleton component
  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      {[...Array(5)].map((_, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            margin: 5,
            width: '97%',
          }}>
          <View style={{ width: 40, height: 40, borderRadius: 20 }} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ width: '80%', height: 20, borderRadius: 4 }} />
            <View style={{ width: '60%', height: 16, borderRadius: 4, marginTop: 6 }} />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );

  // Notification item component
  const renderItem = ({ item, index }) => (
    <View
      key={index}
      style={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: Color.white,
      }}>
      <Pressable
        onPress={() => console.log("fdf")}
        style={{
          width: '97%',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 5,
          margin: 5,
          padding: 10,
          borderColor: Color.cloudyGrey,
          backgroundColor: Color?.white,
          shadowColor: '#383840',
          shadowOffset: { width: 0, height: 7 },
          shadowOpacity: 0.2,
          shadowRadius: 4.65,
          elevation: 10,
        }}>
        <View
          style={{
            flex: 0,
            width: 40,
            height: 40,
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: '#fde047',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Iconviewcomponent
            viewstyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            Icontag="FontAwesome"
            icon_size={15}
            icon_color={Color.white}
            iconname="bell"
          />
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: item.read ? Color.white : Color.black,
              fontFamily: Mulish.Bold,
              letterSpacing: 0.5,
              paddingVertical: 5,
            }}
            numberOfLines={1}>
            {item?.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: item.read ? Color.white : Color.cloudyGrey,
              fontFamily: Mulish.Medium,
              letterSpacing: 0.5,
            }}
            numberOfLines={2}>
            {item?.message}
          </Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: Color?.white,
          flexDirection: 'row',
          paddingLeft: 0,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <Pressable
          style={{ width: scr_width / 4 }}
          onPress={() => navigation?.goBack()}>
          <Iconviewcomponent
            Icontag="Ionicons"
            icon_size={25}
            icon_color={'#000'}
            iconname={'chevron-back'}
          />
        </Pressable>
        <View>
          <Text
            style={{ fontFamily: Mulish?.SemiBold, fontSize: 17, color: '#000' }}>
            {t("Notifications List")}
          </Text>
        </View>
      </View>
      
      {isLoading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={notificationData}
          renderItem={renderItem}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No notifications available
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});

export default NotificationsList;
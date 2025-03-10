//import liraries
import React, {useState, useEffect, useCallback, useRef} from 'react';
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
  Pressable,
} from 'react-native';
import Color from '../../Global/Color';
import {Mulish} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import {Iconviewcomponent} from '../../Components/Icontag';
import { scr_width } from '../../Components/Dimensions';

// create a component
const NotificationsList = () => {
  const navigation = useNavigation();
  const [selectItem, setSelectedItem] = useState('');
  const [notificationData, setNotificationData] = useState([]);
//   const onSelectedItem = item => {
//     try {
//       setNotificationData(prevData =>
//         prevData.map(notification =>
//           notification.id === item.id
//             ? {...notification, read: true} // Mark as read
//             : notification,
//         ),
//       );
//       setSelectedItem(item.id); // Optional: Keep track of the selected item
//     } catch (error) {
//       console.log('catch in onSelected_Item :', error);
//     }
//   };
  // GET NOTIFICATION LIST :
  const getNotificationList = async () => {
    try {
      const notificationList = await fetchData?.GetnotificationList();
      if (notificationList?.success == true) {
        console.log('GetnotificationList', notificationList?.data);
        setNotificationData(notificationList?.data);
      }
    } catch (error) {
      console.log('Catch in getNotificationList : ', error);
    }
  };
  useEffect(() => {
    getNotificationList();
  }, []);
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
                onPress={() => {
                  navigation?.goBack();
                }}>
                <Iconviewcomponent
                  Icontag="Ionicons"
                  icon_size={25}
                  icon_color={'#000'}
                  iconname={'chevron-back'}
                />
              </Pressable>
              <View>
                <Text
                  style={{ fontFamily: Mulish?.SemiBold, fontSize: 22, color: '#000' }}>
                 Notifications List
                </Text>
              </View>
            </View>
      <FlatList
        data={notificationData}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: Color.white,
            }}>
            <Pressable
              onPress={() =>
                console.log("fdf")
                
              }
              style={{
                width: '97%',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                margin: 5,
                padding: 10,
            
                // borderWidth:1,
                borderColor: Color.cloudyGrey,
                backgroundColor: Color?.white,
                shadowColor: '#383840',
                shadowOffset: {width: 0, height: 7},
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
                {/* <Image
                                    source={item.notify_Image}
                                    style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 10 }}
                                /> */}
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
                    fontSize: 16,
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
            {/* <View style={{ width: '100%', height: 1, backgroundColor: '#F9F9F9', marginVertical: 5 }}></View> */}
          </View>
        )}
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default NotificationsList;

import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
// import Videoplayercomponent from './Videoplayercomponent';
import {Mulish} from '../Global/FontFamily';
import Color from '../Global/Color';
import VideoPlayerWithThumbnail from './Video';
import {ScrollView} from 'react-native-gesture-handler';
import {scr_width} from './Dimensions';
import {Iconviewcomponent} from './Icontag';
import {useFocusEffect} from '@react-navigation/native';
import fetchData from '../Config/fetchData';
import {ToastAndroid} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Test from './test';
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Videostep4 from './Videostep4';
import { useTranslation } from "react-i18next";



const {width, height} = Dimensions.get('window');

const Step4 = ({navigation}) => {
  const { t, i18n } = useTranslation();
  const TestBottomSheet = useRef();
  const Scrollref = React.useRef(null);
  const scrollViewRef = useRef(null);
  const [video, setVideo] = useState([]);
  const [Question, setQuestion] = useState(null);
  const [Currentvideo, setCurrentvideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [Dayvideo, setDayvideo] = useState([]);
  const [length, setLength] = useState(null);
  const [getonline, setGetonline] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [paused, setPaused] = useState(true);
  // USERDATA :

  const Userdata = async () => {
    try {
      const Userdata = await fetchData?.Getuserdata();
      if (Userdata?.success == true) {
        console.log('USERDATA', Userdata?.data);
        setUserdata(Userdata?.data);
      }
    } catch (error) {
      console.log('Catch in Userdata', error);
    }
  };

  // GETVIDEO :

  const Getvideo = async () => {
    try {
      const Getvideo = await fetchData?.UserLesson();
      if (Getvideo?.success == true) {
        console.log('<====VIDEO=====>', Getvideo?.total_days);

        const filterdata = Getvideo?.data?.sort(
          (a, b) =>
            a?.lesson_details?.video_order - b?.lesson_details?.video_order,
        );
        setVideo(filterdata);
        // if()
        if (
          Getvideo?.data[0]?.user?.current_day ==
            Getvideo?.data[0]?.lesson_details?.day &&
          Getvideo?.total_days == Getvideo?.data[0]?.user?.current_day
        ) {
          const Len = parseInt(Getvideo?.data?.length) - 1;
          if (Getvideo?.data[Len]?.status == 'completed') {
            getlivesession();
          }
        } else {
          console.log('fffffffffffffail');
        }
        setCurrentvideo(Getvideo?.data[0]);
        const totalday = parseInt(Getvideo?.data[0]?.lesson_details?.day) + 1;
        if (Getvideo?.total_days == Getvideo?.data[0]?.lesson_details?.day) {
          Getdayvideo(1);
        } else {
          Getdayvideo(totalday);
        }
      }
    } catch (error) {
      console.log('Catch in Getvideo', error);
    }
  };

  //GETDAYVIDEO :

  const Getdayvideo = async item => {
    try {
      const Getdayvideo = await fetchData?.Getdayvideo(item);
      if (Getdayvideo?.success == true) {
        console.log('rrrrrrrrrrrrrrrrrr', Getdayvideo);
        setLength(Getdayvideo?.total_days);
        setDayvideo(Getdayvideo?.data);
      }
    } catch (error) {
      console.log('CATCH IN GETDAYVIDEO', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      Userdata();
      Getvideo();
      // getlivesession();
      return () => {};
    }, []),
  );

  //   GETFILTER :
  const getfilter = async item => {
    try {
      console.log('kkkiiiiiiiii', item);
      console.log('kkkiiiiiiiii', Currentvideo?.user?.current_day);

      if (Currentvideo?.user?.current_day < item) {
        ToastAndroid.show(
          `Currently you have access to watch till day ${Currentvideo?.user?.current_day} lessons `,
          ToastAndroid.SHORT,
        );
      } else {
        console.log('current ', Currentvideo?.user?.current_day);
        const getcurrent = await fetchData?.Getdayvideo(item);
        if (getcurrent?.success == true) {
          console.log('GETDAYVIDEO', getcurrent?.data);
          setCurrentvideo(getcurrent?.data[0]);
          setVideo(getcurrent?.data);
          const value = parseInt(item) + 1;
          const getnextday = await fetchData?.Getdayvideo(value);
          console.log('getnextday', getnextday);
          if (getnextday?.success == true) {
            setDayvideo(getnextday?.data);
            console.log('ggggg', getnextday?.data);
          }
        }
      }
    } catch (error) {
      console.log('Catch in getfilter', error);
    }
  };

  const Videoend = async value => {
    try {

    console.log("LAST VIDEO IN STEP 4");
      
      const enddata = {
        is_viewed: true,
      };
      const Endvideo = await fetchData?.PUT_END_VIDEO(
        value?._id,
        JSON.stringify(enddata),
      ); 
      console.log('Endvideo', Endvideo);

      if (Endvideo?.success == true) {
        Getvideo();
        console.log('Endvideo', Endvideo);
      } else {
        console.log('Fail in video end');
      }
    } catch (error) {
      console.log('Catch in PUT_END_VIDEO', error);
    }
  };
  const getQuestion = async (value, data) => {
    if (data?.route) {
      const getQuestion = await fetchData.getquestionstep4(data?.route);
      if (getQuestion?.success == true) {
        setQuestion(getQuestion?.data);
        TestBottomSheet.current.open();
      }
    }
  };
  const getclose = () => {
    TestBottomSheet.current.close();
    setPaused(false);
  };
  const getlivesession = async () => {
    try {
      const getlivesession = await fetchData?.getlivesession();
      if (getlivesession?.success == true) {
        console.log('getlivesession', getlivesession?.data);
        setGetonline(getlivesession?.data);
      }
    } catch (error) {
      console.log('Catch in getlivesession', error);
    }
  };
  const gstFunction = async amt => {
    try {
      if (amt) {
        const gstvalue = parseInt(amt) + (parseInt(amt) * 18) / 100;
        return gstvalue;
      }
    } catch (error) {
      console.log('ERROR IN CATCH IN GSTFUN', error);
    }
  };
  const getRazorpayfun = async value => {
    try {
      console.log('Checking value', value);
      const gstvalue = await gstFunction(value?.amount);
      const payload = {
        live_session: value?._id,
        amount: gstvalue,
      };
      const getoptions = await fetchData?.getliveoptions(payload);
      if (getoptions?.success == true) {
        var razorpayOptions = getoptions?.data?.payment;
        RazorpayCheckout.open(razorpayOptions)
          .then(async data => {
            const payload = {
              order_id: data?.razorpay_order_id,
              payment_id: data?.razorpay_payment_id,
              id: value?._id,
            };
            try {
              const url = 'https://api.cignix.com/user-live-session';
              const ACCESS_TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
              const accesstoken = JSON.parse(ACCESS_TOKEN);
              const response = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  accept: '*/*',
                  'x-razorpay-signature': `${data?.razorpay_signature}`,
                  Authorization: `Bearer ${accesstoken}`,
                },
                body: JSON.stringify(payload),
              });
              const result = await response.json();
              if (response.ok && result.success) {
                console.log('====================================');
                console.log('dfghjkl;');
                console.log('====================================');
                ToastAndroid.show(result?.message, ToastAndroid.SHORT);
              } else {
                console.error('Payment verification failed:', result);
              }
            } catch (error) {
              console.log('CATCH IN VERIFY API', error);
            }
          })
          .catch(error => {
            // handle failure
            console.log('ERROR', error);

            setFailuremodal(true);
          });
      }
    } catch (error) {
      console.log('CATCH IN getRazorpayfun', error);
    }
  };
  return (
    <ScrollView style={{flex: 1, gap: 25}} ref={scrollViewRef}>
      {/* LIVE SESSION */}
      {getonline !== null ? (
        <View style={{marginTop: 5, gap: 20, marginBottom: 15}}>
          <Text style={{fontSize: 16, color: '#000'}}>Live Sessions</Text>
          {getonline?.length &&
            getonline?.map((item, index) => {
              console.log('<===> item <====>', item);
              return (
                <View
                  style={{
                    backgroundColor: '#1c207d',
                    padding: 20,
                    paddingVertical: 40,
                    borderRadius: 20,
                    width: width / 1.13,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      padding: 20,
                      borderRadius: 20,
                      gap: 10,
                    }}>
                    <View style={{gap: 5}}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontFamily: Mulish?.Bold,
                          textTransform: 'capitalize',
                        }}>
                        Unlock Your Potential With
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#7ead2d',
                          fontFamily: Mulish?.Bold,
                          textTransform: 'capitalize',
                        }}>
                        1-on-1 Sessions
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#000',
                          fontFamily: Mulish?.SemiBold,
                        }}>
                        Personalized Guidance Tailored just for You !
                      </Text>
                    </View>
                  </View>
                  <View style={{margin: 25, gap: 20}}>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#fff',
                          fontFamily: Mulish?.SemiBold,
                        }}>
                        Date
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#7ead2d',
                          fontFamily: Mulish?.SemiBold,
                        }}>
                        {moment(item?.session_date).format('LL')}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#fff',
                          fontFamily: Mulish?.SemiBold,
                        }}>
                        Time
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#7ead2d',
                          fontFamily: Mulish?.SemiBold,
                        }}>
                        {moment(item?.session_date).format('LT')}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        getRazorpayfun(item);
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#000',
                          fontFamily: Mulish?.Bold,
                          textTransform: 'capitalize',
                        }}>
                        Enroll Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      ) : null}

      {/* INITIAL VIDEO */}

      <View style={{gap: 20}}>
        <View
          style={{
            width: '89%',
            height: height / 3.9,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: 'green',
          }}>
          {/* <Videoplayercomponent
            source={Currentvideo?.lesson_details?.source}
            Videoendfun={Videoend}
            currentdata={Currentvideo}
          /> */}
          <Videostep4
            source={Currentvideo?.lesson_details?.source}
            Videoendfun={Videoend}
            currentdata={Currentvideo}
            getQuestion={getQuestion}
            setPaused={setPaused}
            paused={paused}
          />
        </View>
        <View style={{gap: 5}}>
          <Text
            style={{
              fontSize: 16,
              color: Color?.black,
              fontFamily: Mulish.Medium,
              textTransform: 'capitalize',
            }}>
            {Currentvideo?.lesson_details?.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666666',
              fontFamily: Mulish.Regular,
              textTransform: 'capitalize',
            }}>
            {Currentvideo?.lesson_details?.content}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#666666',
              fontFamily: Mulish.Regular,
              textTransform: 'capitalize',
            }}>
            {`Day - ${Currentvideo?.lesson_details?.day}`}
          </Text>
        </View>
        <View
          style={{
            height: 6,
            width: '100%',
            backgroundColor: Color.softGrey,
          }}
        />
      </View>

      {/* UPCOMING VIDEO */}

      <View
        style={{gap: 15, width: '90%', height: height / 2.5, marginTop: 15}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Mulish.SemiBold,
            color: Color?.black,
          }}>
          {`Upcoming Day - ${Currentvideo?.lesson_details?.day} Lessons`}
        </Text>
        <FlatList
          data={video}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width / 1.4,
                  height: height / 3.9,
                  paddingTop: 15,
                }}>
                <View
                  style={{
                    width: 250,
                    borderRadius: 5,
                    marginHorizontal: 10,
                    height: 137,
                  }}>
                  <VideoPlayerWithThumbnail
                    thumbnailUri={item?.lesson_details?.thumbnail_img}
                    videoUri={item?.lesson_details?.source}
                    data={item}
                    currentdata={Currentvideo}
                    setCurrentdata={setCurrentvideo}
                  />
                </View>
                <View
                  style={{
                    paddingTop: 15,
                    paddingLeft: 15,
                    gap: 5,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: Mulish?.Medium,
                      fontSize: 16,
                      color: '#333333',
                      textTransform: 'capitalize',
                    }}>
                    {item?.lesson_details?.title}
                  </Text>
                  <Text
                    style={{
                      color: '#666666',
                      fontFamily: Mulish?.Regular,
                      fontSize: 14,
                      textTransform: 'capitalize',
                    }}>
                    {item?.lesson_details?.content}
                  </Text>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            height: 6,
            width: '100%',
            backgroundColor: Color.softGrey,
          }}
        />
      </View>

      {/* SELECT DAYS UI */}

      <View style={{gap: 15, width: '90%', paddingTop: 25}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Array?.from({length})?.map((_, index) => {
            const day =
              index + 1 == parseInt(Currentvideo?.lesson_details?.day);
            if (day) {
              return null;
            }
            const selected =
              parseInt(Dayvideo[0]?.lesson_details?.day) == index + 1;
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: selected ? '#4254B6' : '#ffff',
                  borderRadius: 100,
                  padding: 10,
                  marginRight: 10,
                  paddingHorizontal: 18,
                  borderWidth: selected ? 0 : 1,
                  borderColor: selected ? null : '#EEEEEE',
                }}
                onPress={() => {
                  getfilter(index + 1);
                  scrollViewRef.current?.scrollTo({y: 0, animated: true});
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: selected ? Color?.white : '#787882',
                    textTransform: 'capitalize',
                  }}>
                  {`Day - ${index + 1}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* UPCOMING DAY ==> VIDEO */}

      <View style={{marginTop: 25, gap: 0}}>
        <View>
          <Text
            style={{
              color: Color?.black,
              fontSize: 16,
              fontFamily: Mulish?.SemiBold,
            }}>{`Day - ${Dayvideo[0]?.lesson_details?.day} Lessons`}</Text>
        </View>
        <FlatList
          data={Dayvideo}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    width: '85%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    if (item?.status == 'inactive') {
                      ToastAndroid.show(
                        `Day ${Dayvideo[0]?.lesson_details?.day} Video is Locked`,
                        ToastAndroid.SHORT,
                      );
                    }
                  }}>
                  <View>
                    <View
                      style={{
                        width: width / 1.6,
                        height: height / 5,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 15,
                      }}>
                      <Image
                        source={{
                          uri: item?.lesson_details?.thumbnail_img,
                        }}
                        style={{
                          width: '50%',
                          height: '60%',
                          resizeMode: 'cover',
                          borderRadius: 10,
                        }}
                      />
                      <View style={{gap: 14}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: Mulish?.SemiBold,
                            color: Color?.black,
                            textTransform: 'capitalize',
                          }}>
                          {item?.lesson_details?.title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            gap: 5,
                            alignItems: 'center',
                          }}>
                          <Iconviewcomponent
                            Icontag="AntDesign"
                            icon_size={15}
                            icon_color={'#666666'}
                            iconname="clockcircleo"
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: Mulish?.Regular,
                              color: '#666666',
                            }}>
                            {`${item?.lesson_details?.total_duration} Mins`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#E9ECFF',
                      padding: item?.status == 'inactive' ? 10 : 5,
                      borderRadius: 100,
                    }}>
                    <Iconviewcomponent
                      Icontag={
                        item?.status == 'inactive' ? 'Fontisto' : 'AntDesign'
                      }
                      icon_size={item?.status == 'inactive' ? 15 : 20}
                      icon_color={
                        item?.status == 'inactive' ? '#666666' : 'green'
                      }
                      iconname={
                        item?.status == 'inactive' ? 'locked' : 'checkcircle'
                      }
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 3,
                    backgroundColor: '#EEEEEE',
                    width: '100%',
                  }}
                />
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>

      {/* data?.current_day == currentLesson[videoIndex]?.day && currentLesson[currentLesson?.length -1]?.is_viewed */}
      {/* {
        userdata?.current_day == video && video[video?.length - 1]?.is_viewed ? null:null
      } */}
      {/* <View style={{marginTop: 25, gap: 20}}>
        <Text style={{fontSize: 16, color: '#000'}}>Live Sessions</Text>
        {getonline?.length &&
          getonline?.map((item, index) => {
            // console.log("<===> item <====>",item);    
            return (
              <View
                style={{
                  backgroundColor: '#1c207d',
                  padding: 20,
                  paddingVertical: 40,
                  borderRadius: 20,
                  width: width / 1.13,
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 20,
                    gap: 10,
                  }}>
                  <View style={{gap: 5}}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: Mulish?.Bold,
                        textTransform: 'capitalize',
                      }}>
                      Unlock Your Potential With
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#7ead2d',
                        fontFamily: Mulish?.Bold,
                        textTransform: 'capitalize',
                      }}>
                      1-on-1 Sessions
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        fontFamily: Mulish?.SemiBold,
                      }}>
                      Personalized Guidance Tailored just for You !
                    </Text>
                  </View>
                </View>
                <View style={{margin: 25, gap: 20}}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#fff',
                        fontFamily: Mulish?.SemiBold,
                      }}>
                      Date
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#7ead2d',
                        fontFamily: Mulish?.SemiBold,
                      }}>
                      {moment(item?.session_date).format('LL')}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#fff',
                        fontFamily: Mulish?.SemiBold,
                      }}>
                      Time
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#7ead2d',
                        fontFamily: Mulish?.SemiBold,
                      }}>
                     {moment(item?.session_date).format('LT')}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000',
                        fontFamily: Mulish?.Bold,
                        textTransform: 'capitalize',
                      }}>
                      Enroll Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View> */}

      <View
        style={{
          height: height / 4,
          width: '100%',
        }}
      />

      {/* MODAL UI */}

      <RBSheet
        ref={TestBottomSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000088',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
          },
        }}>
        <View>
          <Test data={Question} close={getclose} />
        </View>
      </RBSheet>
    </ScrollView>
  );
};

export default Step4;

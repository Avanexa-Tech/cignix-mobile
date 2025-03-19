//import liraries
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Mulish } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { scr_height, scr_width } from '../../Components/Dimensions';
import Videoplayercomponent from '../../Components/Videoplayercomponent';
import fetchData from '../../Config/fetchData';
import VideoPlayerWithThumbnail from '../../Components/Video';
import RBSheet from 'react-native-raw-bottom-sheet';
import common_fn from '../../Components/common_fn';
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';
import Step4 from '../../Components/Step4';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from "react-i18next";
import { translateText } from '../Context/userContext'
import { useSelector } from 'react-redux';
// create a component
const HomeScreen = () => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(undefined);
  const [homeSection, setHomeSection] = useState([]);
  // const [homeSection] = useState([
  //   {id: 1, title: 'Profile', data: ['Profile']},
  //   {id: 2, title: 'Score', data: ['Score']},
  //   {id: 2, title: 'SimTest', data: ['SimTest']},
  //   {id: 3, title: 'Recommended Videos', data: ['Recommended Videos']},
  //   {id: 4, title: 'Upcoming Videos', data: ['Upcoming Videos']},
  // ]);

  const [loading, setLoading] = useState(false);

  // const videoRef = useRef(null);
  const refRBSheetssss = useRef();
  const [isPlaying, setIsPlaying] = useState(true); // Video play/pause state
  // const [currentTime, setCurrentTime] = useState(0); // Current time in seconds
  // const [duration, setDuration] = useState(0); // Total video duration
  const [modalVisible, setModalVisible] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [getvideo, setgetvideo] = useState([]);
  const [Currentvideo, setCurrentvideo] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [scoredata, setscoredata] = useState(null);
  const [Feedback, setFeedback] = useState('');
  const [getQuestion, setgetQuestion] = React.useState([]);
  const [selctedAnswer, setSelctedAnswer] = React.useState([]);
  const [videoloader, setvideoloader] = useState(false);
  const [onlastvideo, setonlastvideo] = useState(false);
  const [Whatsappmodal, setwhatsappmodal] = useState(false);
  const [Change, setchange] = useState(false);
  const [Whatsappnumber, setwhatsappnumber] = useState(null);
  const [Whatsappotp, setwhatsappOtp] = useState(null);
  const [whatsapploader, setWhatsapploader] = useState(false);
  const [is_Whatsappcheck, setIs_Whatsappcheck] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = useSelector((state) => {
    console.log('==================state values===>', state);
    return state.UserReducer.language;
  });
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          handleChangeLanguage(storedLanguage);
        }
      } catch (error) {
        console.log("Error loading language:", error);
      }
    };

    loadLanguage();
  }, []);
  const handleChangeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('selectedLanguage=========================================>', lang);
      console.log("Language changed to:", lang);
    } catch (err) {
      console.log("Error changing language:", err);
    }
  };
  const onBuffer = bufferInfo => {
    console.log('Video is buffering:', bufferInfo);
  };

  const onError = error => {
    console.error('Video playback error:', error);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Callback for video progress
  const handleProgress = progress => {
    console.log('progress', progress.currentTime);

    setCurrentTime(progress.currentTime);
  };

  const handleLoad = data => {
    const videoDuration = data.duration; // Duration in seconds
    setDuration(videoDuration);
    setvideoloader(true);
    console.log(`Video duration: ${videoDuration} seconds`);
  };

  // Callback for video load to get duration
  const onLoad = data => {
    setDuration(data.duration); // Set total duration
  };
  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.seek(0); // Seek to the beginning (0 seconds)
    }
  };
  // GET QUESTION :
  const GetQustion = async () => {
    try {
      const Getquestion = await fetchData.GetQusetion(0);
      console.log(
        '====================>GET QUESTION <=================',
        Getquestion,
      );
      if (Getquestion?.success == true) {
        setgetQuestion(Getquestion?.data);
        setHomeSection([{ id: 2, title: 'SimTest', data: ['SimTest'] }]);
        setLoading(false);
        console.log('checked', Getquestion?.data);
      } else {
        setgetQuestion([]);
      }
    } catch (error) {
      console.log('Catch in GetQuestion', error);
    }
  };

  const handleSelectAnswer = (questionId, optionValue) => {
    setSelctedAnswer(prev => ({ ...prev, [questionId]: optionValue }));
  };
  // Format time as mm:ss
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    setLoading(true);
    Getvideo();
    Userdata();
    Get_Score();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      Userdata();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );
  //  FEEDBACK :
  const FeedbackApi = async value => {
    try {
      const data = {
        feedback: Feedback,
      };
      const FeedbackApi = await fetchData?.PUT_END_VIDEO(value?._id, data);
      if (FeedbackApi?.success == true) {
        common_fn?.showToast('Feedback submitted successfully');
        setFeedback('');
        refRBSheetssss?.current?.close();
        if (onlastvideo) {
          setTestModalVisible(true);
        }
      } else {
        setFeedback('');
        common_fn?.showToast(FeedbackApi?.message);
        refRBSheetssss?.current?.close();
        if (onlastvideo) {
          setTestModalVisible(true);
        }
      }
      console.log('FeedbackApi', FeedbackApi);
    } catch (error) {
      console.log('Catch in FeedbackApi', error);
    }
  };
  // GET VIDEO :
  const Getvideo = async () => {
    try {
      const Getvideo = await fetchData?.UserLesson();

      let filterdata = Getvideo?.data?.sort(
        (a, b) =>
          a?.lesson_details?.video_order - b?.lesson_details?.video_order,
      );

      const translatedData = await Promise.all(
        filterdata.map(async (item) => {
          const translatedTitle = await translateText(item.lesson_details.title);
          const translatedContent = await translateText(item.lesson_details.content);

          return {
            ...item,
            lesson_details: {
              ...item.lesson_details,
              title: translatedTitle,
              content: translatedContent,
            },
          };
        })
      );

      setgetvideo(translatedData);

    } catch (error) {
      console.log('Catch in Getvideo', error);
    }
  };

  useEffect(() => {
    Getvideo();
  }, [language])

  // USERDATA :
  const Userdata = async () => {
    try {
      const Userdata = await fetchData?.Getuserdata();
      if (Userdata?.success == true) {
        setuserdata(Userdata?.data);
        console.log(
          ' =============> Userdata?.data <============= ',
          Userdata?.data,
        );
        if (Userdata?.data?.whatsapp_no) {
          if (Userdata?.data?.step == 0) {
            GetQustion();
          } else {
            if (Userdata?.data?.step == 1 || Userdata?.data?.step == 2) {
              await Get_Score();
              setHomeSection([
                { id: 1, title: 'Profile', data: ['Profile'] },
                { id: 2, title: 'Score', data: ['Score'] },
                {
                  id: 3,
                  title: 'Recommended Videos',
                  data: ['Recommended Videos'],
                },
                { id: 4, title: t('Upcoming Videos'), data: ['Upcoming Videos'] },
              ]);
              setLoading(false);
            } else {
              if (Userdata?.data?.step == 3) {
                await Get_Score();
                setHomeSection([
                  { id: 1, title: 'Profile', data: ['Profile'] },
                  { id: 2, title: 'Score', data: ['Score'] },
                  {
                    id: 3,
                    title: 'Recommended Videos',
                    data: ['Recommended Videos'],
                  },
                  { id: 4, title: t('Upcoming Videos'), data: ['Upcoming Videos'] },
                ]);
                setLoading(false);
              } else {
                if (Userdata?.data?.step == 4) {
                  setHomeSection([{ id: 4, title: 'step4', data: ['step4'] }]);
                }
              }
            }
          }
        } else {
          setwhatsappmodal(true);
        }
      }
    } catch (error) {
      console.log('Catch in Userdata', error);
    }
  };
  const Get_Score = async () => {
    try {
      const Get_Score = await fetchData?.Get_Score();
      console.log('GET SCORE', Get_Score);
      if (Get_Score?.success == true) {
        console.log('======> GET SCORE <=====', Get_Score);
        setscoredata(Get_Score?.data);
      } else {
        setscoredata(null);
      }
    } catch (error) {
      console.log('Catch in Score', error);
    }
  };

  useEffect(() => {
    restartVideo();
  }, [Currentvideo]);

  const Videoend = async value => {
    try {
      const enddata = {
        is_viewed: true,
      };
      const Endvideo = await fetchData?.PUT_END_VIDEO(
        value?._id,
        JSON.stringify(enddata),
      );
      if (Endvideo?.success == true) {
        if (getvideo[getvideo?.length - 1]?._id == Currentvideo?._id) {
          let formData = {
            step: 2,
          };
          console.log(
            '=========> CALL LAST VIDEO FUNCTION <==========',
            formData,
          );
          const Stepupdate = await fetchData?.UpdateProfile(
            JSON.stringify(formData),
          );

          if (Stepupdate?.success == true) {
            refRBSheetssss?.current?.open();
            await Get_Score();
            await Userdata();
            await Getvideo();
            setonlastvideo(true);
          } else {
            console.log(
              '<==============STEP UPDATE 2 API FAIL===========>',
              Stepupdate,
            );
          }
        } else {
          refRBSheetssss?.current?.open();
          await Getvideo();
        }
      } else {
        console.log('Fail in video end');
      }
    } catch (error) {
      console.log('Catch in PUT_END_VIDEO', error);
    }
  };
  // RENDER :
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ gap: 20, width: scr_width - 40 }}>
        <View style={{ gap: 10, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 12,
              color: '#4254B6',
              fontFamily: Mulish.Regular,
            }}>
            {`Question ${index + 1} of ${getQuestion?.length}`}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: Color?.black,
              fontFamily: Mulish.Medium,
            }}>
            {item?.question} ?
          </Text>
        </View>
        <View style={{ gap: 25, paddingLeft: 5 }}>
          <FlatList
            data={item?.options}
            renderItem={({ item: option }) => {
              return (
                <Pressable
                  style={{
                    gap: 10,
                    flexDirection: 'row',
                    width: scr_width,
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    handleSelectAnswer(item._id, option.value);
                  }}>
                  <Iconviewcomponent
                    Icontag="Fontisto"
                    icon_size={24}
                    icon_color={
                      selctedAnswer[item._id] === option.value
                        ? '#4254B6'
                        : 'gray'
                    }
                    iconname={
                      selctedAnswer[item._id] === option.value
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: Color?.black,
                      fontFamily: Mulish.Regular,
                    }}>
                    {option?.value}
                  </Text>
                </Pressable>
              );
            }}
            keyExtractor={(option, idx) => `${item._id}-${idx}`}
          />
          {index + 1 == getQuestion?.length ? null : (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                height: 5,
                backgroundColor: '#F9F9F9',
              }}
            />
          )}
          {index + 1 == getQuestion?.length && (
            <TouchableOpacity
              style={{
                padding: 20,
                backgroundColor: '#4254B6',
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                width: scr_width - 70
              }}
              onPress={() => {
                if (Object.keys(selctedAnswer)?.length == getQuestion?.length) {
                  const total = Object.values(selctedAnswer).reduce(
                    (sum, value) => sum + Number(value),
                    0,
                  );
                  SIMTEST_UPDATE_SCORE(total);
                } else {
                  console.log('selctedAnswer', selctedAnswer);
                  common_fn.showToast('Please Answer All Questions');
                }
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: Color?.white,
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Homescreen.Discover Your Score")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const SIMTEST_UPDATE_SCORE = async val => {
    try {
      const data = {
        total_points: val,
      };
      const SIMTEST_UPDATE_SCORE = await fetchData?.POST_USER_LESSON(data);
      console.log('SIMTEST_UPDATE_SCORE', SIMTEST_UPDATE_SCORE);
      if (SIMTEST_UPDATE_SCORE?.success == true) {
        await UserStep();
        common_fn.showToast('Answer Submited Successfully');
      } else {
        console.log('SIMTEST_UPDATE_SCORE', SIMTEST_UPDATE_SCORE);
      }
    } catch (error) {
      console.log('Catch in SIMTEST_UPDATE_SCORE', error);
    }
  };
  const UserStep = async () => {
    try {
      const formData = new FormData();
      formData.append('step', 1);
      const Stepupdate = await fetchData?.UpdateProfile(formData);
      if (Stepupdate?.success == true) {
        await Get_Score();
        setHomeSection([
          { id: 1, title: 'Profile', data: ['Profile'] },
          { id: 2, title: 'Score', data: ['Score'] },
          { id: 3, title: 'Recommended Videos', data: ['Recommended Videos'] }
        ]);
      } else {
        console.log('Stepupdate', Stepupdate);
      }
    } catch (error) {
      console.log('Catch in UserStep', error);
    }
  };
  if (loading == true) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4254B6" />
    </View>;
  }
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0.1);
  const [fullscreen, setFullscreen] = useState(false);

  const videoRef = useRef(null);
  const overlayTimer = useRef(null);
  const lastTap = useRef(null);
  const handleFullscreen = () => {
    const newFullscreen = !fullscreen;
    console.log('newFullscreen', newFullscreen);

    if (newFullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    setFullscreen(newFullscreen);
  };

  // getrecentVideo Button Functionality :
  const getrecentVideo = data => {
    try {
      const activeIndex = data.findIndex(item => item?.status == 'active');
      if (activeIndex !== -1) {
        const activeItem = data[activeIndex];
        setCurrentvideo(activeItem);
      } else {
        console.log('sss', data);
        console.log('No active item found');
      }
    } catch (error) { }
  };

  // Send otp
  const sendotpfun = async () => {
    try {
      if (is_Whatsappcheck == false) {
        if (userdata?.mobile?.length == 0) {
          ToastAndroid.show('Please Enter Alternative Whatsapp Number', ToastAndroid.SHORT);
        } else {
          const sendotp = await fetchData?.sendotpwhatsapp(
            {
              whatsapp_no: userdata?.mobile,
              check: false,
            }
          );
          console.log('sendotp', sendotp);
          if (sendotp?.success) {
            console.log('sendotp', sendotp);
            ToastAndroid.show('Otp Send Successfully', ToastAndroid.SHORT);
            await AsyncStorage?.setItem(
              'Whatsapptoken',
              JSON.stringify(sendotp?.token),
            );
            setchange(true);
            setWhatsapploader(false);
          } else {
            ToastAndroid.show(sendotp?.message, ToastAndroid.SHORT);
            setWhatsapploader(false);
          }
        }
      } else {
        const sendotp = await fetchData?.sendotpwhatsapp(
          {
            whatsapp_no: Whatsappnumber,
            check: false,
          }
        );
        console.log('sendotp', sendotp);
        if (sendotp?.success) {
          console.log('sendotp', sendotp);
          ToastAndroid.show('Otp Send Successfully', ToastAndroid.SHORT);
          await AsyncStorage?.setItem(
            'Whatsapptoken',
            JSON.stringify(sendotp?.token),
          );
          setchange(true);
          setWhatsapploader(false);
        } else {
          ToastAndroid.show(sendotp?.message, ToastAndroid.SHORT);
          setWhatsapploader(false);
        }
      }

    } catch (error) {
      console.log('CATCH IN SENDOTPFUN', error);
    }
  };
  const sendverifyotp = async () => {
    try {
      const value = {
        whatsapp_no: is_Whatsappcheck ? Whatsappnumber : userdata?.mobile,
        otp: Whatsappotp,
      };
      const token_data = await AsyncStorage.getItem('Whatsapptoken');
      const token = JSON.parse(token_data);
      const verifyotp = await fetchData?.otpverifywhatsapp(value, token);
      if (true == true) {
        ToastAndroid.show('Otp Verified Successfully', ToastAndroid.SHORT);
        setchange(false);
        setWhatsapploader(false);
        setwhatsappmodal(false);
        setIs_Whatsappcheck(false);
        Userdata();
        Getvideo();
        Get_Score();
      } else {
        ToastAndroid.show(verifyotp?.message, ToastAndroid.SHORT);
        setWhatsapploader(false);
      }
    } catch (error) {
      console.log('CATCH IN SENDOTPFUN', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false} // Hides the status bar
        backgroundColor={'#e0e5ff'} // Matches background color
        translucent={true}
        barStyle={'dark-content'}
      />
      <LinearGradient
        style={{
          flex: 1,
          height: scr_height,
          alignItems: 'center',
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#ffffff', '#D9DDF0']}>
        <View
          style={{
            width: scr_width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: scr_width * 0.025,
            paddingHorizontal: scr_width * 0.0375,
          }}>
          <TouchableOpacity
            style={{
              flex: 0,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scr_width * 0.25,
              backgroundColor: Color.softGrey,
            }}>
            <Image
              source={
                userdata?.profile
                  ? { uri: userdata?.profile }
                  : require('../../assets/Gallery/profile.png')
              }
              style={{
                width: scr_width * 0.125,
                height: scr_width * 0.125,
                resizeMode: 'cover',
                borderRadius: scr_width * 0.25,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 4,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color.black,
                  fontFamily: Mulish.Bold,
                  letterSpacing: 0.5,
                }}>
                {t("Homescreen.Hello")},
              </Text>
              {userdata?.name && (
                <Text
                  style={{
                    fontSize: 18,
                    color: Color.black,
                    fontFamily: Mulish.Bold,
                    paddingHorizontal: 5,
                    letterSpacing: 0.2,
                  }}
                  numberOfLines={1}>
                  {userdata?.name}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: 12,
                color: Color.cloudyGrey,
                fontFamily: Mulish.Medium
              }}
              numberOfLines={2}>
              {userdata?.step == 1 || userdata?.step == 2
                ? t('Homescreen.Here is Your SIM Test Score')
                : t("Homescreen.You've Done It! SIM Test 2 Complete!")}
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
        <View
          style={{
            width: scr_width * 0.9, // 90% of screen width
            height: scr_height * 0.9, // 90% of screen height
            alignItems: 'center',
          }}>
          <Animated.SectionList
            sections={homeSection}
            scrollEnabled={true}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            nestedScrollEnabled
            initialNumToRender={5}
            renderItem={({ item }) => {
              switch (item) {
                case 'Profile':
                  return userdata?.step == 3 ? (
                    <View>
                      <View style={{ marginBottom: scr_height * 0.025, marginTop: scr_height * 0.02 }}>
                        <Text
                          style={{
                            fontFamily: Mulish?.SemiBold,
                            fontSize: 24,
                            color: '#000',
                            fontWeight: '600',
                          }}>
                          {t("Homescreen.Your Test Results")}
                        </Text>
                      </View>
                      <View>
                        <FlatList
                          data={scoredata}
                          renderItem={({ item }) => {
                            console.log('item', item);

                            return (
                              <View
                                style={{
                                  padding: 29,
                                  backgroundColor: '#fff',
                                  gap: 10,
                                  marginBottom: 10,
                                  borderRadius: 20,
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 15,
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    source={require('../../assets/Images/Simtest.png')}
                                    width={30}
                                    height={30}
                                  />
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: '#666666',
                                      fontFamily: Mulish?.SemiBold,
                                    }}>
                                    {`SIM ${item?.attempt} Test Score`}
                                  </Text>
                                </View>
                                <View>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text
                                      style={{
                                        fontSize: 50,
                                        fontFamily: Mulish?.Medium,
                                        color: '#4254B6',
                                      }}>
                                      {`${item?.total_points}` + '/' + `250`}
                                    </Text>
                                    {item?.attempt == 2 ? (
                                      <View
                                        style={{
                                          padding: 5,
                                          backgroundColor: '#D9DDF0',
                                          borderRadius: 100,
                                          width: 70,
                                          height: 30,
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                        }}>
                                        <Text>
                                          {scoredata[0]?.total_points -
                                            scoredata[1]?.total_points}{' '}
                                          Pts
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        color: '#333333',
                                        fontFamily: Mulish?.Regular,
                                        fontSize: 14,
                                        textTransform: 'capitalize',
                                      }}>
                                      {t("Homescreen.updated on")}{' '}
                                      {moment(item?.createdAt).format('LL')}.
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            );
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                          }}>
                          <Image
                            source={require('../../assets/Images/accepts.png')}
                            style={{ width: 50, height: 50 }}
                          />
                          <View>
                            <Text
                              style={{
                                color: '#53B98F',
                                fontSize: 16,
                                fontFamily: Mulish?.Bold,
                                textTransform: 'capitalize',
                              }}>
                              {t("Homescreen.Great attempt")} !
                            </Text>
                            <Text
                              style={{
                                color: '#333333',
                                fontSize: 12,
                                fontFamily: Mulish?.Regular,
                                textTransform: 'capitalize',
                              }}>
                              {t("Homescreen.A few tweaks can make a big difference.")}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 5,
                            backgroundColor: Color.softGrey,
                            marginTop: 20,
                          }}
                        />
                        <View style={{ marginTop: 15, gap: 8 }}>
                          <Text
                            style={{
                              color: '#000000',
                              fontSize: 16,
                              fontFamily: Mulish?.Bold,
                            }}>
                            {t("Homescreen.What’s Next?")}
                          </Text>
                          <Text
                            style={{
                              color: '#666666',
                              fontSize: 14,
                              fontFamily: Mulish?.Regular,
                            }}>
                            {t("Homescreen.Don’t worry! Here’s what you can do to improve")}.
                          </Text>
                          <View
                            style={{
                              width: scr_width - 45,
                              height: scr_height / 4.7,
                              borderRadius: 30,
                              position: 'relative',
                            }}>
                            <Image
                              source={require('../../assets/Images/Cropedimage.jpg')}
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                                borderRadius: 20,
                              }}
                            />
                            <View
                              style={{
                                position: 'absolute',
                                top: 20,
                                left: 15,
                                gap: 5,
                              }}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#fff',
                                    fontFamily: Mulish?.Bold,
                                  }}>
                                  {t("Homescreen.Become the")}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: '#fff',
                                    fontFamily: Mulish?.Bold,
                                  }}>
                                  {t("Homescreen.Best Version of You")} !
                                </Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                bottom: 30,
                                left: 13,
                                padding: 10,
                                backgroundColor: Color?.white,
                                borderRadius: 5,
                              }}
                              onPress={() => {
                                navigation.navigate('Membership');
                              }}>
                              <Text
                                style={{
                                  fontSize: 14,
                                  color: '#000',
                                  fontFamily: Mulish?.Bold,
                                }}>
                                {t("Homescreen.Sign Up for Membership")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              width: '100%',
                              height: 5,
                              backgroundColor: Color.softGrey,
                              marginTop: 20,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ) : scoredata !== null ? (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <ImageBackground
                        source={require('../../assets/Gallery/back.png')}
                        style={{
                          width: scr_width - 50,
                          height: scr_height / 2.455,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        resizeMode="stretch">
                        <View
                          style={{
                            width: scr_width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                          }}>
                          <Text
                            style={{
                              fontSize: 55,
                              color: Color.white,
                              fontFamily: Mulish.SemiBold,
                              letterSpacing: 0.5,
                            }}>
                            {`${scoredata[0]?.total_points
                              ? scoredata[0]?.total_points
                              : 0
                              }` +
                              '/' +
                              `250`}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.white,
                              fontFamily: Mulish.Medium,
                              textTransform: 'capitalize',
                            }}>
                            {t("Homescreen.updated on")}{' '}
                            {moment(scoredata[0]?.updatedAt).format('LL')}.
                          </Text>

                          {Currentvideo == null && userdata?.step !== 2 ? (
                            <Text
                              style={{
                                width: '70%',
                                textAlign: 'center',
                                fontSize: 15,
                                color: Color.white,
                                fontFamily: Mulish.SemiBold,
                                marginTop: 15,
                              }}>
                              * {t("Homescreen.Complete Our Free video course to Improve Score")}
                            </Text>
                          ) : null}

                          {Currentvideo == null && userdata?.step !== 2 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: scr_width / 1.6,
                                height: scr_height / 14.5,
                                backgroundColor: '#5F6AA5',
                                borderColor: Color.white,
                                borderWidth: 0.2,
                                borderRadius: 50,
                                shadowOpacity: 0.5,
                                marginVertical: 20,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.white,
                                    fontFamily: Mulish.SemiBold,
                                  }}>
                                  {t("Homescreen.Start Video Course")}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  getrecentVideo(
                                    getvideo?.sort(
                                      (a, b) =>
                                        a?.lesson_details?.video_order -
                                        b?.lesson_details?.video_order,
                                    ),
                                  );
                                }}>
                                <Iconviewcomponent
                                  viewstyle={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                  Icontag="Feather"
                                  icon_size={55}
                                  icon_color={Color.white}
                                  iconname="play-circle"
                                />
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: scr_width / 1.6,
                                  height: scr_height / 14.5,
                                  backgroundColor: '#5F6AA5',
                                  borderColor: Color.white,
                                  borderWidth: 0.2,
                                  borderRadius: 50,
                                  shadowOpacity: 0.5,
                                  marginVertical: 20,
                                }}
                                onPress={() => {
                                  if (userdata?.step == 2) {
                                    navigation.navigate('SimTestScreen');
                                  } else {
                                    if (
                                      userdata?.step == 1 ||
                                      userdata?.step == 0
                                    ) {
                                      common_fn?.showToast(
                                        'Please Watch All Videos and take the test.',
                                      );
                                    }
                                  }
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: Color.white,
                                      fontFamily: Mulish.SemiBold,
                                    }}>
                                    {t("Homescreen.Test Yourself Again")}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    paddingRight: 15,
                                  }}>
                                  <Iconviewcomponent
                                    viewstyle={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    Icontag="Ionicons"
                                    icon_size={30}
                                    icon_color={Color.white}
                                    iconname="lock-closed"
                                  />
                                </View>
                              </TouchableOpacity>
                              <Text
                                style={{
                                  width: '60%',
                                  textAlign: 'center',
                                  fontSize: 15,
                                  color: Color.white,
                                  fontFamily: Mulish.SemiBold,
                                }}>
                                * {t("Homescreen.Complete the video course to retake the test")}
                              </Text>
                            </>
                          )}
                        </View>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            marginHorizontal: 5,
                          }}
                          onPress={() => {
                            setModalVisible(true);
                          }}>
                          <Iconviewcomponent
                            viewstyle={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            Icontag="MaterialCommunityIcons"
                            icon_size={24}
                            icon_color={Color.white}
                            iconname="information-outline"
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <ImageBackground
                        source={require('../../assets/Gallery/back.png')}
                        style={{
                          width: scr_width - 50,
                          height: scr_height / 2.455,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        resizeMode="stretch">
                        <View
                          style={{
                            width: scr_width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                            marginBottom: 20,
                          }}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: Color.white,
                              fontFamily: Mulish.SemiBold
                            }}>
                            {t("Homescreen.Welcome Back! Your Journey to a")}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.white,
                              fontFamily: Mulish.Medium,
                              textTransform: 'capitalize',
                            }}>
                            {t("Homescreen.Smoke-Free Life Continues")}
                          </Text>

                          <View
                            style={{
                              padding: 10,
                              paddingHorizontal: 30,
                              backgroundColor: Color.white,
                              borderRadius: 30,
                              marginTop: 15
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                color: Color.notify,
                                fontFamily: Mulish.SemiBold,
                              }}>
                              {t("Homescreen.Low Score")}
                            </Text>
                          </View>

                          {Currentvideo == null && userdata?.step !== 2 ? (
                            <Text
                              style={{
                                width: '70%',
                                textAlign: 'center',
                                fontSize: 15,
                                color: Color.white,
                                fontFamily: Mulish.SemiBold,
                                marginTop: 15,
                              }}>
                              * {t("Homescreen.Complete Our Free video course to Improve Score")}
                            </Text>
                          ) : null}

                          {Currentvideo == null && userdata?.step !== 2 ? (
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: scr_width / 1.6,
                                height: scr_height / 14.5,
                                backgroundColor: '#5F6AA5',
                                borderColor: Color.white,
                                borderWidth: 0.2,
                                borderRadius: 40,
                                shadowOpacity: 0.5,
                                marginVertical: 20,
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.white,
                                    fontFamily: Mulish.SemiBold,
                                  }}>
                                  {t("Homescreen.Start Video Course")}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  getrecentVideo(
                                    getvideo?.sort(
                                      (a, b) =>
                                        a?.lesson_details?.video_order -
                                        b?.lesson_details?.video_order,
                                    ),
                                  );
                                }}>
                                <View
                                  style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    backgroundColor: Color.white,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 5,
                                    marginRight: 10
                                  }}>
                                  <Iconviewcomponent
                                    viewstyle={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    Icontag="MaterialCommunityIcons"
                                    icon_size={40}
                                    icon_color="#000"
                                    iconname="play-outline"
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <>
                              <TouchableOpacity
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  width: scr_width / 1.6,
                                  height: scr_height / 14.5,
                                  backgroundColor: '#5F6AA5',
                                  borderColor: Color.white,
                                  borderWidth: 0.2,
                                  borderRadius: 50,
                                  shadowOpacity: 0.5,
                                  marginVertical: 20,
                                }}
                                onPress={() => {
                                  if (userdata?.step == 2) {
                                    navigation.navigate('SimTestScreen');
                                  } else {
                                    if (
                                      userdata?.step == 1 ||
                                      userdata?.step == 0
                                    ) {
                                      common_fn?.showToast(
                                        'Please Watch All Videos and take the test.',
                                      );
                                    }
                                  }
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: Color.white,
                                      fontFamily: Mulish.SemiBold,
                                    }}>
                                    {t("Homescreen.Test Yourself Again")}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    paddingRight: 15,
                                  }}>
                                  <Iconviewcomponent
                                    viewstyle={{
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                    Icontag="Ionicons"
                                    icon_size={30}
                                    icon_color={Color.white}
                                    iconname="lock-closed"
                                  />
                                </View>
                              </TouchableOpacity>
                              <Text
                                style={{
                                  width: '60%',
                                  textAlign: 'center',
                                  fontSize: 15,
                                  color: Color.white,
                                  fontFamily: Mulish.SemiBold,
                                }}>
                                * {t("Homescreen.Complete the video course to retake the test")}
                              </Text>
                            </>
                          )}
                        </View>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            marginHorizontal: 5,
                          }}
                          onPress={() => {
                            setTestModalVisible(true);
                          }}>
                          <Iconviewcomponent
                            viewstyle={{
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            Icontag="MaterialCommunityIcons"
                            icon_size={24}
                            icon_color={Color.white}
                            iconname="information-outline"
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  );
                case 'SimTest':
                  return (
                    <ScrollView
                      style={{ width: scr_width, marginBottom: scr_height / 4 }}>
                      <Text
                        style={{
                          fontFamily: Mulish?.SemiBold,
                          fontSize: 24,
                          color: '#000',
                          fontWeight: '600',
                        }}>
                        {t("Homescreen.Complete your SIM Test")}
                      </Text>
                      <FlatList
                        data={getQuestion}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ gap: 20 }}
                      />
                    </ScrollView>
                  );
                case 'Score':
                  return Currentvideo != null ? (
                    <View
                      style={{
                        width: '100%',
                        height: scr_height / 2.9,
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          fontSize: 20,
                          color: Color.black,
                          fontFamily: Mulish.Bold,
                          letterSpacing: 0.5,
                        }}>
                        {t("Homescreen.Continue Watching")}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          height: 250,
                          borderRadius: 10,
                          marginVertical: 10,
                        }}>
                        <Videoplayercomponent
                          source={Currentvideo?.lesson_details?.source}
                          Videoendfun={Videoend}
                          currentdata={Currentvideo}
                        />
                        <View style={{ gap: 5 }}>
                          <Text
                            style={{
                              fontFamily: Mulish?.Medium,
                              fontSize: 18,
                              color: '#333333',
                            }}>
                            {Currentvideo?.lesson_details?.title}
                          </Text>
                          <Text
                            style={{
                              color: '#666666',
                              fontFamily: Mulish?.Regular,
                              fontSize: 14,
                            }}>
                            {Currentvideo?.lesson_details?.content}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null;
                case 'Recommended Videos':
                  return (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginVertical: 20,
                      }}>
                      <Text
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          fontSize: 20,
                          color: Color.black,
                          fontFamily: Mulish.Bold,
                          letterSpacing: 0.5,
                        }}>
                        {getvideo[parseInt(getvideo?.length) - 1]?.status ==
                          'completed'
                          ? t('Homescreen.Completed Videos')
                          : t('Homescreen.Upcoming Videos')}
                      </Text>
                      <View
                        style={{
                          width: '100%',
                          marginBottom: scr_height / 5,
                          height: '100%',
                        }}>
                        <FlatList
                          data={getvideo?.sort(
                            (a, b) =>
                              a?.lesson_details?.video_order -
                              b?.lesson_details?.video_order,
                          )}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) => {
                            return (
                              <View
                                style={{
                                  width: scr_width / 1.4,
                                  height: scr_height / 3.9,
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
                                    thumbnailUri={
                                      item?.lesson_details?.thumbnail_img
                                    }
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
                                      fontSize: 18,
                                      color: '#333333',
                                    }}>
                                    {item?.lesson_details?.title}
                                  </Text>
                                  <Text
                                    style={{
                                      color: '#666666',
                                      fontFamily: Mulish?.Regular,
                                      fontSize: 14,
                                    }}>
                                    {item?.lesson_details?.content}
                                  </Text>
                                </View>
                              </View>
                            );
                          }}
                        />
                      </View>
                    </View>
                  );
                case 'step4':
                  return (
                    <View
                      style={{
                        width: scr_width,
                        marginTop: 10,
                      }}>
                      <Step4 navigation={navigation} />
                    </View>
                  );
              }
            }}
          />
        </View>
      </LinearGradient>
      <RBSheet
        ref={refRBSheetssss}
        height={550}
        customStyles={{
          wrapper: {
            backgroundColor: '#00000088',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
          },
        }}
        onClose={() => {
          setFeedback('');
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled">
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                padding: 23,
                alignItems: 'center',
              }}>
              <View style={{ alignItems: 'center', gap: 15, flex: 1 }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/Images/feedbackimg.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                      alignItems: 'center',
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontFamily: Mulish?.SemiBold,
                    fontSize: 30,
                  }}>
                  {t("Homescreen.Any Questions?")}
                </Text>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={{
                      alignItems: 'center',
                      color: '#666666',
                      fontSize: 14,
                      fontFamily: Mulish?.Regular,
                    }}>
                    {t("Homescreen.Do you need help or have any questions about")}
                  </Text>
                  <Text
                    style={{
                      alignItems: 'center',
                      color: '#666666',
                      fontSize: 14,
                      fontFamily: Mulish?.Regular,
                    }}>
                    {t("Homescreen.what you just learned? Let us know below!")}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    borderColor: '#CCCCCC',
                    borderWidth: 1,
                    alignItems: 'flex-start',
                    width: scr_width - 50,
                    height: scr_height / 7,
                    padding: 10,
                  }}>
                  <TextInput
                    placeholder={t("PlaceHolder.Type your question here...")}
                    placeholderTextColor={'#666666'}
                    numberOfLines={7}
                    multiline
                    value={Feedback}
                    onChangeText={text => setFeedback(text)}
                    scrollEnabled={true}
                    style={{
                      flex:1,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      borderRadius: 5,
                      padding: 5,
                      color: Color.black,
                      textAlignVertical:'top'
                    }}
                  />
                </View>
              </View>
              <View style={{ gap: 15, width: '100%' }}>
                <TouchableOpacity
                  style={{
                    padding: 15,
                    backgroundColor: '#4254B6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    Feedback == ''
                      ? common_fn.showToast('Please Enter Feedback')
                      : FeedbackApi(Currentvideo);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: Mulish?.Medium,
                    }}>
                    {t("Homescreen.Submit Question")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 15,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                  }}
                  onPress={() => {
                    setFeedback('');
                    refRBSheetssss?.current?.close();
                    if (onlastvideo) {
                      setTestModalVisible(true);
                    }
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontFamily: Mulish?.Medium,
                    }}>
                    {t("Homescreen.No Questions, I Understand")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </RBSheet>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              width: scr_width / 1.1,
              height: scr_height / 1.8,
              borderRadius: 20,
            }}>
            <View
              style={{
                width: scr_width / 1.1,
                height: scr_height / 2.3,
                backgroundColor: 'white',
                position: 'relative',
                alignItems: 'center',
                gap: 20,
                zIndex: 2,
                borderRadius: 15,
              }}>
              <Image
                source={require('../../assets/Images/score.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'stretch',
                  borderRadius: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#4254B6',
                  padding: 15,
                  width: scr_width / 1.5,
                  borderRadius: 5,
                  marginBottom: 20,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontFamily: Mulish?.Medium,
                  }}>
                  {t("Homescreen.Got It")} !
                </Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 28,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text style={{ color: '#000' }}>x</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={testModalVisible}
        onRequestClose={() => {
          setTestModalVisible(!modalVisible);
          setonlastvideo(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: '#fff',
              width: scr_width / 1.1,
              height: scr_height / 1.8,
              borderRadius: 20,
            }}>
            <View
              style={{
                width: scr_width / 1.1,
                height: scr_height / 2.3,
                backgroundColor: 'white',
                position: 'relative',
                alignItems: 'center',
                gap: 20,
                zIndex: 2,
                borderRadius: 15,
              }}>
              <Image
                source={require('../../assets/Images/testpopimage.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'stretch',
                  borderRadius: 15,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#4254B6',
                  padding: 15,
                  width: scr_width / 1.5,
                  borderRadius: 5,
                  marginBottom: 20,
                }}
                onPress={() => {
                  navigation.navigate('SimTestScreen'),
                    setTestModalVisible(false);
                  setonlastvideo(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 20,
                    fontFamily: Mulish?.Medium,
                  }}>
                  {t("Homescreen.Got It")} !
                </Text>
              </TouchableOpacity>
              <Pressable
                onPress={() => {
                  setTestModalVisible(false);
                  setonlastvideo(false);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  width: 30,
                  height: 28,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                }}>
                <Text style={{ color: '#000' }}>x</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={Whatsappmodal}
        onRequestClose={() => {
          ToastAndroid.show(
            `${Change == false
              ? t('Homescreen.Enter Your Whatsapp Number')
              : t('Homescreen.Enter 6 Digit Otp')
            }`,
            ToastAndroid.SHORT,
          );
        }}>
        {is_Whatsappcheck == true || Change == true ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000088',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: scr_width - 30,
                margin: 30,
                borderRadius: 10,
                padding: 15,
                gap: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color?.black,
                  fontFamily: Mulish?.SemiBold,
                }}>
                {Change ? t('Homescreen.Enter 6 Digit Otp') : t('Homescreen.Enter Your Whatsapp Number')}
              </Text>
              <TextInput
                placeholder={Change ? t("PlaceHolder.Enter Otp") : t('PlaceHolder.Whatsapp Number')}
                style={{
                  color: Color.black,
                  fontFamily: Mulish?.Regular,
                  fontSize: 16,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'gray',
                  paddingLeft: 10,
                }}
                keyboardType="number-pad"
                value={Change ? Whatsappotp : Whatsappnumber}
                onChangeText={text => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  if (Change == true) {
                    setwhatsappOtp(numericText);
                  } else {
                    setwhatsappnumber(numericText);
                  }
                }}
                maxLength={Change ? 6 : 10}
              />
              <TouchableOpacity
                style={{
                  padding: 15,
                  backgroundColor: '#4259B7',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (Change) {
                    if (Whatsappotp?.length == 6) {
                      setWhatsapploader(true);
                      sendverifyotp();
                    } else {
                      ToastAndroid.show(
                        'Please Enter 6 Digit Otp ',
                        ToastAndroid.SHORT,
                      );
                    }
                  } else {
                    if (Whatsappnumber?.length == 10) {
                      setWhatsapploader(true);
                      sendotpfun();
                    } else {
                      ToastAndroid.show(
                        'Please Enter 10 Digit whatsApp Number',
                        ToastAndroid.SHORT,
                      );
                    }
                  }
                }}>
                {whatsapploader ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontFamily: Mulish?.Medium,
                      textTransform: 'capitalize',
                    }}>
                    {Change ? t('Homescreen.Verify Otp') : t('Homescreen.Send Otp')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000088',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                width: scr_width - 30,
                padding: 15,
                borderRadius: 10,
                gap: 20,
              }}>
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: Color?.black,
                    fontFamily: Mulish?.SemiBold,
                  }}>
                  {t("Homescreen.Whatsapp Number")}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color?.black,
                    fontFamily: Mulish?.Regular,
                  }}>
                  {t("Homescreen.Is the given number during registration is your whatsapp number")}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: Color?.primary,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40%',
                    borderRadius: 10,
                  }}
                  onPress={() => setIs_Whatsappcheck(true)}>
                  <Text
                    style={{
                      color: Color?.primary,
                      fontSize: 14,
                      fontFamily: Mulish?.Medium,
                    }}>
                    {t("Homescreen.No")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: Color?.primary,
                    padding: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40%',
                    borderRadius: 10,
                  }}
                  onPress={() => sendotpfun()}>
                  <Text
                    style={{
                      color: Color?.white,
                      fontSize: 14,
                      fontFamily: Mulish?.Medium,
                    }}>
                    {t("Homescreen.Yes")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: scr_width * 0.025,
  },
  video: {
    width: '100%',
    height: scr_height * 0.3,
    resizeMode: 'contain',
    borderRadius: scr_width * 0.15
  },
  controls: {
    position: 'absolute',
    bottom: scr_height * 0.015,
    left: scr_width * 0.025,
    right: scr_width * 0.025,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: scr_width * 0.025,
    borderRadius: scr_width * 0.0125,
  },
  time: {
    color: '#FFF',
    fontSize: scr_width * 0.035,
  },
  button: {
    padding: scr_width * 0.025,
    backgroundColor: '#1E90FF',
    borderRadius: scr_width * 0.0125,
    marginBottom: scr_height * 0.015,
  },
  buttonText: {
    color: '#FFF',
    fontSize: scr_width * 0.04,
    fontWeight: 'bold',
  },
  timing: {
    color: '#FFF',
    fontSize: scr_width * 0.035,
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: scr_width * 0.075,
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scr_width * 0.0125
  },
});

export default HomeScreen;

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
} from 'react-native';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Badge } from 'react-native-paper';
import { scr_height, scr_width } from '../../Components/Dimensions';
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment';
import MIcon from 'react-native-vector-icons/Feather';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import MMIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Fontisto';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// create a component
const Timeline = () => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState();
  const { t } = useTranslation();

  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 0,
  };

  const steps = [
    {
      label: t('Roadmap.Complete the SIM Test'),
      subtext:
        t('Roadmap.Start by taking the SIM Test to evaluate your Smoking habits  and readiness to quit'),
      status: t('Roadmap.Completed'),
    },
    {
      label: t('Roadmap.Watch All 7 Videos'),
      subtext:
        t('Roadmap.Each video is designed to guide you through the quitting process'),
      status: t('Roadmap.Pending'),
    },
    {
      label: t('Roadmap.Retake the SIM Test (SIM Test 2)'),
      subtext:
        t('Roadmap.Each video is designed to guide you through the quitting process'),
      status: t('Roadmap.Pending'),
    },
    {
      label: t('Roadmap.Upgrade to premium'),
      subtext:
        t('Roadmap.Upgrade to premium for advanced resources , personal coaching to support your smoke-free journey'),
      status: t('Roadmap.Pending'),
    },
  ];

  const GetSimTest = async () => {
    try {
      const Getcount = await fetchData?.Getuserdata();
      if (Getcount?.success == true) {
        if (
          Getcount?.data?.step == 0 ||
          Getcount?.data?.step == null ||
          Getcount?.data?.step == 1
        ) {
          setCurrentPosition(0);
        } else {
          if (Getcount?.data?.step == 2) {
            setCurrentPosition(1);
          } else {
            if (Getcount?.data?.step == 3) {
              setCurrentPosition(2);
            } else {
              if (Getcount?.data?.step == 4 || Getcount?.data?.step == 5) {
                setCurrentPosition(3);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      GetSimTest();
      return () => { };
    }, []),
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        hidden={false}
        backgroundColor={Color.white}
        translucent={true}
        barStyle={'dark-content'}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconviewcomponent
            viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={26}
            icon_color={Color.black}
            iconname="chevron-back"
          />
        </TouchableOpacity>
        <View>
          <Text
            style={{ fontSize: 20, color: Color.black, fontFamily: Mulish.Bold }}>
            {t("Roadmap.Roadmap")}
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => navigation.navigate('NotificationsList')}>
          <View style={{ position: 'absolute', zIndex: 999, top: -5, right: -5 }}>
            {/* <Badge
              badgeStyle={{
                position: 'absolute',
                zIndex: 999,
                backgroundColor: Color.red,
                color: Color.white,
                fontSize: 12,
              }}
              maxLength={3}>
              10
            </Badge> */}
          </View>
          <Iconviewcomponent
            viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={25}
            icon_color={Color.black}
            iconname="notifications-outline"
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, width: scr_width - 30, alignItems: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            // labels={steps.map((step, index) => (
            //   <View
            //     style={{
            //       width: '70%',
            //       justifyContent: 'flex-start',
            //       alignItems: 'flex-start',
            //       padding: 5,
            //       paddingVertical: 20,
            //     }}
            //     key={index} // Use key for React list rendering
            //   >
            //     <Text
            //       style={{
            //         textAlign: 'left',
            //         paddingVertical: 5,
            //         fontSize: 18,
            //         color: Color.black,
            //         fontFamily: Mulish.SemiBold,
            //         letterSpacing: 0.5,
            //       }}>
            //       {step.label}
            //     </Text>
            //     <Text
            //       style={{
            //         textAlign: 'justify',
            //         fontSize: 14,
            //         color: Color.cloudyGrey,
            //         fontFamily: Mulish.Medium,
            //         letterSpacing: 0.5,
            //       }}>
            //       {step.subtext}
            //     </Text>
            //   </View>
            // ))}
            labels={steps.map(step => step.label)}
            renderLabel={({ position }) => {
              const step = steps[position]; // Access the current step object
              const labelStyle =
                position === currentPosition
                  ? { color: '#4aae4f', fontSize: 18, fontWeight: 'bold' } // Style for the current step
                  : { color: '#999999', fontSize: 16 }; // Style for other steps
              const subtextStyle = {
                color: '#aaaaaa',
                fontSize: 14,
                textAlign: 'justify',
              };

              return (
                <View
                  style={{
                    // backgroundColor:'red',
                    width: scr_width / 1.3,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 5,
                    paddingVertical: 20,
                    gap: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      // textTransform: 'capitalize',
                      fontFamily: Mulish?.Bold,
                    }}>
                    {step.label}
                  </Text>
                  <Text
                    style={{
                      color: '#666666',
                      fontSize: 14,
                      fontFamily: Mulish?.Regular,
                    }}>
                    {step.subtext}
                  </Text>
                </View>
              );
            }}
            stepCount={steps.length}
            direction="vertical"
            renderStepIndicator={({ position }) => {
              console.log('gggggggggg', position);
              console.log('currentPosition', currentPosition);

              if (position == currentPosition) {
                return (
                  <View style={styles.completedIndicator}>
                    <Text style={styles.indicatorimg}>✓</Text>
                  </View>
                );
              }
              //   else if (step.status === 'In Progress') {
              //     return (
              //       <View style={styles.inProgressIndicator}>
              //         <Text style={styles.indicatorText}>{position + 1}</Text>
              //       </View>
              //     );
              //   }
              else {
                return (
                  <View style={styles.pendingIndicator}>
                    <Text style={styles.indicatorText}>{position + 1}</Text>
                  </View>
                );
              }
            }}
            onPress={position => {
              // console.log('dddd', position);
              // setCurrentPosition(position);
            }} // Optional: Handle step click
          />

          <View
            style={{
              width: scr_width - 45,
              height: scr_height / 4.7,
              borderRadius: 30,
              position: 'relative',
              marginBottom: scr_height / 8,
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
                  {t("Roadmap.Go Premium")}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#fff',
                    fontFamily: Mulish?.Bold,
                  }}>
                  {t("Roadmap.For Extra Benefits")}!
                </Text>
              </View>
              {/* <Text
                                         style={{
                                           fontSize: 13,
                                           color: '#fff',
                                           fontFamily: Mulish?.Regular,
                                         }}>
                                         Lorem ipsum dolor sit amet
                                       </Text> */}
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 30,
                left: 13,
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: Color?.white,
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate('Membership')
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontFamily: Mulish?.Bold,
                }}>
                {t("Roadmap.See Plans")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  scrollContent: {
    height: 'auto',
    padding: 10,
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 20,
  },
  label: {
    textAlign: 'justify',
    fontSize: 16,
    color: Color.black,
    fontFamily: Mulish.Bold,
  },
  stepLabel: {
    textAlign: 'justify',
    fontSize: 14,
    color: Color.cloudyGrey,
    fontFamily: Mulish.Medium,
    paddingVertical: 5,
  },

  completedIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inProgressIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#27AE60',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#D9DDF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    color: '#000',
    fontSize: 16,
  },
  indicatorimg: {
    color: '#fff',
    fontSize: 16,
  },
});

//make this component available to the app
export default Timeline;

import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { scr_height, scr_width } from '../../Components/Dimensions';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation } from '@react-navigation/native';
import fetchData from '../../Config/fetchData';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPosition] = useState();
  const { t } = useTranslation();

  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2, 
    currentStepStrokeWidth: 0,
    labelAlign: 'flex-start',
    labelFlex: 1,
    separatorFinishedColor: '#27ae60',
    separatorUnFinishedColor: '#EEEEEE',
  };

  const steps = [
    {
      label: t('Roadmap.Complete the SIM Test'),
      subtext: t('Roadmap.Start by taking the SIM Test to evaluate your Smoking habits  and readiness to quit'),
      status: t('Roadmap.Completed'),
    },
    {
      label: t('Roadmap.Watch All 7 Videos'),
      subtext: t('Roadmap.Each video is designed to guide you through the quitting process'),
      status: t('Roadmap.Pending'),
    },
    {
      label: t('Roadmap.Retake the SIM Test (SIM Test 2)'),
      subtext: t('Roadmap.Each video is designed to guide you through the quitting process'),
      status: t('Roadmap.Pending'),
    },
    {
      label: t('Roadmap.Upgrade to premium'),
      subtext: t('Roadmap.Upgrade to premium for advanced resources , personal coaching to support your smoke-free journey'),
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
        } else if (Getcount?.data?.step == 2) {
          setCurrentPosition(1);
        } else if (Getcount?.data?.step == 3) {
          setCurrentPosition(2);
        } else if (Getcount?.data?.step == 4 || Getcount?.data?.step == 5) {
          setCurrentPosition(3);
        }
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetSimTest();
      return () => {};
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
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Mulish.Bold,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}>
            {t('Roadmap.Roadmap')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationsList')}>
            <Iconviewcomponent
              viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
              Icontag="Ionicons"
              icon_size={25}
              icon_color={Color.black}
              iconname="notifications-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.navigate('LanguageSelector')}>
            <Iconviewcomponent
              viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
              Icontag="Ionicons"
              icon_size={25}
              icon_color={Color.black}
              iconname="language-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, width: scr_width - 30, alignItems: 'center' }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={steps.map(step => step.label)}
            stepCount={steps.length}
            direction="vertical"
            renderStepIndicator={({ position }) => (
              position <= currentPosition ? (
                <View style={styles.completedIndicator}>
                  <Text style={styles.indicatorimg}>✓</Text>
                </View>
              ) : (
                <View style={styles.pendingIndicator}>
                  <Text style={styles.indicatorText}>{position + 1}</Text>
                </View>
              )
            )}
            renderLabel={({ position }) => {
              const step = steps[position];
              return (
                <View style={styles.stepTextContainer}>
                  <Text style={styles.label}>{step.label}</Text>
                  <Text style={styles.stepLabel}>{step.subtext}</Text>
                </View>
              );
            }}
          />

          <View
            style={{
              width: scr_width - 45,
              height: scr_height / 4.7,
              borderRadius: 30,
              position: 'relative',
              marginBottom: scr_height / 8,
              marginTop: 20,
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
                <Text style={{ fontSize: 18, color: '#fff', fontFamily: Mulish?.Bold }}>
                  {t('Roadmap.Go Premium')}
                </Text>
                <Text style={{ fontSize: 18, color: '#fff', fontFamily: Mulish?.Bold }}>
                  {t('Roadmap.For Extra Benefits')}!
                </Text>
              </View>
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
              onPress={() => navigation.navigate('Membership')}>
              <Text style={{ fontSize: 16, color: '#000', fontFamily: Mulish?.Bold }}>
                {t('Roadmap.See Plans')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  scrollContent: {
    height: 'auto',
    justifyContent: 'center',
  },
  stepTextContainer: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 5,
    width:scr_width/1.3
  },
  label: {
    textAlign: 'left',
    fontSize: 18,
    color: Color.black,
    fontFamily: Mulish.Bold,
    marginBottom: 5,
  },
  stepLabel: {
    textAlign: 'justify',
    fontSize: 16,
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

export default Timeline;
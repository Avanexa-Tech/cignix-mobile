import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  Alert,
  Modal,
  LogBox,
  AppState,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import fetchData from '../../Config/fetchData';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Mulish } from '../../Global/FontFamily';
import { scr_height, scr_width } from '../../Components/Dimensions';
import FastImage from 'react-native-fast-image';
import common_fn from '../../Components/common_fn';
import Color from '../../Global/Color';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translateText } from '../Context/userContext';

const { width, height } = Dimensions.get('window');
LogBox.ignoreAllLogs();

const SimTest = ({ navigation }) => {
  const [getQuestion, setgetQuestion] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [selctedAnswer, setSelctedAnswer] = React.useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const appState = useRef(AppState.currentState);

  // Check language when component mounts and when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const checkLanguage = async () => {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage') || 'en';
        if (storedLanguage !== currentLanguage) {
          setCurrentLanguage(storedLanguage);
          GetQustion(); // Reload questions if language changed
        }
      };

      checkLanguage();

      return () => { }; // Cleanup function
    }, [currentLanguage])
  );

  // Check language when app comes back to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground, check if language changed
        const checkLanguage = async () => {
          const storedLanguage = await AsyncStorage.getItem('selectedLanguage') || 'en';
          if (storedLanguage !== currentLanguage) {
            setCurrentLanguage(storedLanguage);
            GetQustion(); // Reload questions if language changed
          }
        };

        checkLanguage();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [currentLanguage]);

  // Initial load of questions
  useEffect(() => {
    const initializeApp = async () => {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage') || 'en';
      setCurrentLanguage(storedLanguage);
      GetQustion();
    };

    initializeApp();
  }, []);

  const handleSelectAnswer = (questionId, optionValue) => {
    setSelctedAnswer(prev => ({ ...prev, [questionId]: optionValue }));
  };

  const GetQustion = async () => {
    try {
      setLoader(true);
      const GetQustion = await fetchData.GetQusetion(0);
      if (GetQustion?.success == true) {
        console.log("GetQustion.data================>", GetQustion?.data);

        // Translate all questions before setting to state
        const translatedData = await Promise.all(
          GetQustion?.data.map(async (item) => {
            // Translate the question text
            const translatedQuestion = await translateText(item.question);

            // Return the item with translated question
            return {
              ...item,
              question: translatedQuestion
            };
          })
        );

        // Set the translated data to state
        setgetQuestion(translatedData);

        if (translatedData.length !== 0) {
          const value = translatedData.length / 2;
          console.log('value=================>', value);
          const indexvv = Math.floor(value);
          setIndex(indexvv);
        }
        setLoader(false);
      } else {
        setgetQuestion([]);
        setLoader(false);
      }
    } catch (error) {
      console.log('Catch in GetQuestion', error);
      setLoader(false);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
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
        <View style={{ gap: 25, paddingLeft: 15 }}>
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
                    handleSelectAnswer(item?._id, option?.value);
                  }}>
                  <Iconviewcomponent
                    Icontag="Fontisto"
                    icon_size={24}
                    icon_color={
                      selctedAnswer[item?._id] === option?.value
                        ? '#4254B6'
                        : 'gray'
                    }
                    iconname={
                      selctedAnswer[item?._id] === option?.value
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
            keyExtractor={(option, idx) => `${item?._id}-${idx}`}
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
                padding: 15,
                backgroundColor: '#4254B6',
                borderRadius: 100,
                marginBottom: 70,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if (Object.keys(selctedAnswer)?.length == getQuestion?.length) {
                  const total = Object.values(selctedAnswer).reduce(
                    (sum, value) => sum + Number(value),
                    0,
                  );
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'SuccesScreen',
                        params: { totalScore: total },
                      },
                    ],
                  });
                  common_fn.showToast('Answer Submited Successfully');
                } else {
                  console.log('selctedAnswer', selctedAnswer);
                  common_fn.showToast('Please Answer All Questions');
                }
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Color?.white,
                  fontFamily: Mulish?.SemiBold,
                }}>
                Discover Your Score
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 25, gap: 10 }}>
      <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
        <Pressable
          style={{
            width: scr_width / 3,
            paddingLeft: 10,
          }}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'OnboardScreen' }],
              })
            );
          }}>
          <Iconviewcomponent
            Icontag="AntDesign"
            icon_size={25}
            icon_color={Color.black}
            iconname="left"
          />
        </Pressable>
        <Text
          style={{
            fontSize: 22,
            color: Color?.black,
            fontFamily: Mulish.SemiBold,
          }}>
          SIM Test
        </Text>
        <View>
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
      {loader ? (
        <SkeletonPlaceholder>
          <View style={styles.placeholderText} />
          <View style={styles.placeholderText} />
          <View style={styles.placeholderText} />
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={getQuestion}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
        />
      )}
    </View>
  );
};

export default SimTest;

const styles = StyleSheet.create({
  placeholderCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  placeholderText: {
    height: 50,
    width: '100%',
    borderRadius: 4,
    marginBottom: 10,
  },
});
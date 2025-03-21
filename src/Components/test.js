import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Mulish } from '../Global/FontFamily';
import { Iconviewcomponent } from './Icontag';
import Color from '../Global/Color';
import fetchData from '../Config/fetchData';
import { scr_height } from './Dimensions';
const { width, height } = Dimensions.get('window');
import { useTranslation } from 'react-i18next';
import {translateText} from '../screens/Context/userContext'
import common_fn from './common_fn';

const Test = ({ data, close }) => {
  const [points, setPoints] = useState([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [translatedData, setTranslatedData] = useState([]);
  const { t } = useTranslation();

  console.log("================111111111111111111=============>data:", data);
  useEffect(() => {
    const translateData = async () => {
      if (data && data.length) {
        const translated = await Promise.all(
          data.map(async (item) => {
            const translatedQuestion = await translateText(item.question);
            let translatedOptions = [];
            if (item.options && item.options.length) {
              translatedOptions = await Promise.all(
                item.options.map(async (option) => {
                  const translatedValue = await translateText(option.value);
                  return { ...option, value: translatedValue };
                })
              );
            }
            return {
              ...item,
              question: translatedQuestion,
              options: translatedOptions.length ? translatedOptions : item.options
            };
          })
        );

        setTranslatedData(translated);
      }
    };

    translateData();
  }, [data]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChange = (pointIndex, item, option) => {
    const updatedPoints = [...points];
    if (pointIndex > -1) {
      updatedPoints[pointIndex] = { question_id: item._id, value: option.point };
    } else {
      updatedPoints.push({ question_id: item._id, value: option.point });
    }
    setPoints(updatedPoints);
  };

  const handleCheckboxChange = (pointIndex, item, option) => {
    const updatedPoints = [...points];
    if (pointIndex > -1) {
      const selectedOptions = updatedPoints[pointIndex].value || [];
      if (selectedOptions.includes(option.value)) {
        updatedPoints[pointIndex].value = selectedOptions.filter(
          val => val !== option.value,
        );
      } else {
        updatedPoints[pointIndex].value = [
          ...selectedOptions,
          option.value,
        ];
      }
    } else {
      updatedPoints.push({
        question_id: item._id,
        value: [option.value],
      });
    }
    setPoints(updatedPoints);
  };

  const handleTextChange = (pointIndex, item, value) => {
    console.log(item, value);

    const updatedPoints = [...points];
    if (pointIndex > -1) {
      updatedPoints[pointIndex] = { question_id: item._id, value: value };
    } else {
      updatedPoints.push({ question_id: item._id, value: value });
    }
    setPoints(updatedPoints);
  };

  const handleSubmit = async () => {
    const payload = {
      exercise: data[0]?.route,
      answers: [...points],
    };
    try {
      console.log('reeeeeer', payload);
      const response = await fetchData?.ExerciseAnswers(payload);
      console.log('RESPONSE==================>', response);
      if (response?.success) {
        const translatedMessage = await translateText(response?.message);
            common_fn.showToast(translatedMessage);
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // If data hasn't been translated yet, show a loading state or return null
  if (translatedData.length === 0 && data?.length > 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#000', fontFamily: Mulish?.Medium }}>
          {t("Test.Loading...")}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={{ padding: 10, marginBottom: keyboardVisible ? scr_height / 4 : 0 }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
          <View
            style={{
              width: width / 4,
              height: height / 8,
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Image
              source={require('../assets/Images/test.jpg')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Text
              style={{ color: '#000', fontFamily: Mulish?.SemiBold, fontSize: 16 }}>
              {t("Test.Time for a Quick Exercise!")}
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  color: '#666666',
                  fontFamily: Mulish?.Regular,
                  fontSize: 14,
                }}>
                {t("Test.Let’s reinforce what you learned! Complete")}
              </Text>
              <Text
                style={{
                  color: '#666666',
                  fontFamily: Mulish?.Regular,
                  fontSize: 14,
                }}>
                {t("Test.the short exercise below")}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {translatedData?.length > 0 &&
            translatedData?.map((item, index) => {
              switch (item?.question_type) {
                case 'radio':
                  return (
                    <View key={index} style={{ padding: 10, gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: Mulish?.SemiBold,
                            fontSize: 14,
                          }}>
                          {' '}
                          {index + 1}. {item.question}
                        </Text>
                      </View>
                      <View style={{ padding: 10 }}>
                        {item?.options?.map((option, optionIndex) => {
                          const pointIndex = points.findIndex(
                            i => i?.question_id === item?._id,
                          );
                          return (
                            <Pressable
                              key={optionIndex}
                              style={{
                                gap: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                              }}
                              onPress={() => {
                                handleChange(pointIndex, item, option);
                              }}>
                              {points[pointIndex]?.value === option?.point ? (
                                <Iconviewcomponent
                                  Icontag="Fontisto"
                                  icon_size={20}
                                  icon_color={'#4259B7'}
                                  iconname="radio-btn-active"
                                />
                              ) : (
                                <Iconviewcomponent
                                  Icontag="Fontisto"
                                  icon_size={20}
                                  icon_color={'#000'}
                                  iconname="radio-btn-passive"
                                />
                              )}
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: 14,
                                  fontFamily: Mulish?.Regular,
                                }}>
                                {option?.value}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  );
                case 'checkbox':
                  return (
                    <View key={index} style={{ padding: 10, gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: Mulish?.SemiBold,
                            fontSize: 14,
                          }}>
                          {' '}
                          {index + 1}. {item?.question}
                        </Text>
                      </View>
                      <View style={{ padding: 10 }}>
                        {item?.options?.map((option, optionIndex) => {
                          const pointIndex = points.findIndex(
                            i => i?.question_id === item?._id,
                          );
                          const isChecked = points[
                            pointIndex
                          ]?.value?.includes(option?.value);

                          return (
                            <Pressable
                              key={optionIndex}
                              style={{
                                gap: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 10,
                              }}
                              onPress={() => {
                                handleCheckboxChange(pointIndex, item, option);
                              }}>
                              {isChecked ? (
                                <Iconviewcomponent
                                  Icontag="Feather"
                                  icon_size={20}
                                  icon_color={'#4259B7'}
                                  iconname="check-square"
                                />
                              ) : (
                                <Iconviewcomponent
                                  Icontag="Feather"
                                  icon_size={20}
                                  icon_color={Color.black}
                                  iconname="square"
                                />
                              )}
                              <Text
                                style={{
                                  color: isChecked ? '#4259B7' : '#000',
                                  fontSize: 14,
                                  fontFamily: Mulish?.Regular,
                                }}>
                                {option?.value}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    </View>
                  );
                case 'textarea':
                  return (
                    <View key={index} style={{ padding: 10, gap: 10 }}>
                      <View>
                        <Text
                          style={{
                            color: '#000',
                            fontFamily: Mulish?.SemiBold,
                            fontSize: 14,
                          }}>
                          {' '}
                          {index + 1}. {item?.question}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderRadius: 10,
                          borderColor: '#666666',
                          borderWidth: 1,
                        }}>
                        <TextInput
                          numberOfLines={3}
                          multiline
                          onChangeText={text => {
                            handleTextChange(index, item, text);
                          }}
                          keyboardType="default"
                          style={{
                            color: '#000',
                            fontFamily: Mulish?.Regular,
                            fontSize: 14,
                          }}
                        />
                      </View>
                    </View>
                  );
              }
            })}
        </View>

        <View style={{ gap: 10, marginBottom: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#4259B7',
              padding: 10,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (data?.length == points?.length) {
                handleSubmit();
              } else {
                ToastAndroid.show(`${t("Test.Please answer all the questions")}`, ToastAndroid.SHORT);
              }
            }}>
            <Text
              style={{ color: '#fff', fontFamily: Mulish?.Medium, fontSize: 16 }}>
              {t("Test.Submit & Continue")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Test;

const styles = StyleSheet.create({});
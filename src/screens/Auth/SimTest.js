import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Pressable,
  LogBox,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Mulish } from '../../Global/FontFamily';
import { scr_width, scr_height } from '../../Components/Dimensions';
import common_fn from '../../Components/common_fn';
import Color from '../../Global/Color';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translateText } from '../Context/userContext';
import { useTranslation } from 'react-i18next';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import fetchData from '../../Config/fetchData';

const { width } = Dimensions.get('window');
LogBox.ignoreAllLogs();

const QUESTIONS_PER_PAGE = 8;

const SimTest = ({ navigation }) => {
  const { t } = useTranslation();
  const [cachedQuestions, setCachedQuestions] = useState({});
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selctedAnswer, setSelctedAnswer] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  useFocusEffect(
    useCallback(() => {
      const checkLanguage = async () => {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage') || 'en';
        if (storedLanguage !== currentLanguage) {
          setCurrentLanguage(storedLanguage);
          setCachedQuestions({});
          setSelctedAnswer({});
          fetchQuestions(1);
        }
      };
      checkLanguage();
      return () => { };
    }, [currentLanguage])
  );

  useEffect(() => {
    const initializeApp = async () => {
      const storedLanguage = await AsyncStorage.getItem('selectedLanguage') || 'en';
      setCurrentLanguage(storedLanguage);
      fetchQuestions(1);
    };
    initializeApp();
  }, []);

  const fetchQuestions = async (page) => {
    if (cachedQuestions[page]) {
      setCurrentQuestions(cachedQuestions[page]);
      setCurrentPage(page);
      setLoader(false);
      return;
    }

    try {
      setLoader(true);
      const response = await fetchData.GetQusetion(0, page,8);
      if (response?.success) {
        const translatedData = await Promise.all(
          response.data.map(async (item) => ({
            ...item,
            question: await translateText(item.question),
          }))
        );

        setCachedQuestions(prev => ({
          ...prev,
          [page]: translatedData,
        }));
        setCurrentQuestions(translatedData);

        const total = response.total || response.count || (translatedData.length * page);
        setTotalQuestions(total);
        setTotalPages(Math.ceil(total / QUESTIONS_PER_PAGE));
        setCurrentPage(page);
      } else {
        setCurrentQuestions([]);
        setTotalPages(0);
        setTotalQuestions(0);
      }
    } catch (error) {
      console.log('Error in fetchQuestions:', error);
      setCurrentQuestions([]);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectAnswer = (questionId, optionValue) => {
    setSelctedAnswer(prev => ({ ...prev, [questionId]: optionValue }));
  };

  const handleNext = () => {
    const halfwayPoint = Math.ceil(totalPages / 2);
    const allQuestionsAnswered = Object.keys(selctedAnswer).length === totalQuestions;

    if (currentPage < totalPages) {
      if (currentPage === halfwayPoint && !allQuestionsAnswered) {
        setModalVisible(true);
      } else {
        fetchQuestions(currentPage + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      fetchQuestions(currentPage - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderItem = ({ item, index }) => {
    const questionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE + index + 1;

    return (
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 12, color: '#4254B6', fontFamily: Mulish.Regular }}>
            {t("Sim1.Question")} {questionNumber} {t("Sim1.of")} {totalQuestions}
          </Text>
          <Text style={{ fontSize: 16, color: Color.black, fontFamily: Mulish.Medium }}>
            {item?.question} ?
          </Text>
        </View>
        <View style={{ gap: 25, paddingLeft: 15 }}>
          <FlatList
            data={item?.options}
            renderItem={({ item: option }) => (
              <Pressable
                style={{
                  gap: 10,
                  flexDirection: 'row',
                  width: scr_width,
                  alignItems: 'center',
                  marginBottom: 20,
                }}
                onPress={() => handleSelectAnswer(item?._id, option?.value)}>
                <Iconviewcomponent
                  Icontag="Fontisto"
                  icon_size={24}
                  icon_color={selctedAnswer[item?._id] === option?.value ? '#4254B6' : 'gray'}
                  iconname={selctedAnswer[item?._id] === option?.value ? 'radio-btn-active' : 'radio-btn-passive'}
                />
                <Text style={{ fontSize: 16, color: Color.black, fontFamily: Mulish.Regular }}>
                  {option?.value}
                </Text>
              </Pressable>
            )}
            keyExtractor={(option, idx) => `${item?._id}-${idx}`}
          />
          {questionNumber < totalQuestions && (
            <View style={{ width: '100%', alignItems: 'center', height: 5, backgroundColor: '#F9F9F9' }} />
          )}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    const isLastPage = currentPage === totalPages;
    const currentPageQuestionsAnswered = currentQuestions.every(q => selctedAnswer[q._id] !== undefined);

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: Color.black,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handlePrevious}>
          <Iconviewcomponent
            Icontag="AntDesign"
            icon_size={20}
            icon_color={Color.white}
            iconname="left"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: '#4254B6',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!currentPageQuestionsAnswered) {
              common_fn.showToast(`${t('Sim1.Please Answer All Questions')}`);
              return;
            }

            if (isLastPage) {
              const total = Object.values(selctedAnswer).reduce((sum, value) => sum + Number(value), 0);
              navigation.reset({
                index: 0,
                routes: [{ name: 'SuccesScreen', params: { totalScore: total } }],
              });
              common_fn.showToast(`${t('Sim1.Answer Submitted Successfully')}`);
            } else {
              handleNext();
            }
          }}>
          <Text style={{ fontSize: 16, color: Color.white, fontFamily: Mulish.SemiBold }}>
            {isLastPage ? t("Homescreen.Discover Your Score") : t("Next")}
          </Text>
        </TouchableOpacity>
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
        <Text style={{ fontSize: 17, color: Color.black, fontFamily: Mulish.SemiBold }}>
          {t("Sim1.SIM Test")}
        </Text>
        <View style={{ flex: 1, position: "absolute", right: 1 }}>
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            onPress={() => navigation.navigate("LanguageSelector")}>
            <Iconviewcomponent
              Icontag="Entypo"
              icon_size={24}
              icon_color={Color.black}
              iconname="language"
            />
          </TouchableOpacity>
        </View>
      </View>

      {loader ? (
        <SkeletonPlaceholder>
          <View style={{ height: 30, width: '100%', borderRadius: 4, marginBottom: 10 }} />
          <View style={{ height: 30, width: '50%', borderRadius: 4, marginBottom: 10 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '100%', borderRadius: 4, marginTop: 10 }} />
          <View style={{ height: 30, width: '50%', borderRadius: 4, marginTop: 10 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
          <View style={{ height: 30, width: '10%', borderRadius: 4, marginTop: 15 }} />
        </SkeletonPlaceholder>
      ) : (
        <>
          <FlatList
            data={currentQuestions}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
          />
          {totalPages > 0 && renderFooter()}
        </>
      )}

      {/* Intermediate Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ScrollView
          style={{ flex: 1, backgroundColor: '#0B1215' }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: scr_width,
              height: scr_height / 2.2,
              backgroundColor: '#0B1215',
              marginBottom: 12,
            }}>
            <Image
              source={require('../../assets/Images/Donescreenimage.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
            />
          </View>
          <View
            style={{
              width: scr_width,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Image
              source={require('../../assets/Images/middle_star.png')}
              style={{
                width: '50%',
                height: '40%',
                resizeMode: 'cover',
              }}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
            <Text
              style={{
                color: '#FDE2D3',
                fontSize: 28,
                fontFamily: Mulish?.Bold,
              }}>
              Just a Little More to Go!
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: '#F5F5F5',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                You’re halfway through. Just a few more
              </Text>
              <Text
                style={{
                  color: '#F5F5F5',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                steps to complete your setup.
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#D8DFE9',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 100,
              margin: 15,
              marginVertical: 20,
            }}
            onPress={() => {
              setModalVisible(false);
              fetchQuestions(currentPage + 1);
            }}>
            <Text
              style={{
                color: '#0B1215',
                fontSize: 16,
                fontFamily: Mulish?.SemiBold,
              }}>
              Let’s Get This Done
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
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
});
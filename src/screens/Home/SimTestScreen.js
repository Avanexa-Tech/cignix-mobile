import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Iconviewcomponent } from '../../Components/Icontag';
import Color from '../../Global/Color';
import { scr_width, scr_height } from '../../Components/Dimensions';
import { Mulish } from '../../Global/FontFamily';
import common_fn from '../../Components/common_fn';
import fetchData from '../../Config/fetchData';
import { useTranslation } from 'react-i18next';
import { translateText } from '../Context/userContext';
import { useSelector } from 'react-redux';

const SimTestScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [getQuestion, setgetQuestion] = useState([]);
  const [selctedAnswer, setSelctedAnswer] = useState([]);
  const [loader, setLoader] = useState(false);
  const language = useSelector((state) => state.UserReducer.language);

  const GetQustion = async () => {
    try {
      setLoader(true);
      const GetQustion = await fetchData.GetQusetion(1);
      if (GetQustion?.success === true) {
        const translatedData = await Promise.all(
          GetQustion?.data.map(async (item) => {
            const translatedQuestion = await translateText(item.question);
            return { ...item, question: translatedQuestion };
          })
        );
        setgetQuestion(translatedData);
      } else {
        setgetQuestion([]);
      }
    } catch (error) {
      console.log("Catch in GetQuestion", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    GetQustion();
  }, [language]);

  const handleSelectAnswer = (questionId, optionValue) => {
    setSelctedAnswer(prev => ({ ...prev, [questionId]: optionValue }));
  };

  const SIMTEST_UPDATE_SCORE = async val => {
    try {
      const data = { total_points: val };
      const SIMTEST_UPDATE_SCORE = await fetchData?.POST_USER_LESSON(data);
      if (SIMTEST_UPDATE_SCORE?.success === true) {
        UserStep();
        common_fn.showToast(`${t('Homescreen.Answer Submited Successfully')}`);
      }
    } catch (error) {
      console.log('Catch in SIMTEST_UPDATE_SCORE', error);
    }
  };

  const UserStep = async () => {
    try {
      const data = { step: 3 };
      const Stepupdate = await fetchData?.UpdateProfile(JSON?.stringify(data));
      if (Stepupdate?.success === true) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Catch in UserStep', error);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            {t('Sim1.Question')} {index + 1} {t("Sim1.of")} {getQuestion?.length}
          </Text>
          <Text style={styles.questionText}>
            {item?.question} ?
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <FlatList
            data={item?.options}
            renderItem={({ item: option }) => (
              <Pressable
                style={styles.optionItem}
                onPress={() => handleSelectAnswer(item._id, option.value)}>
                <Iconviewcomponent
                  Icontag="Fontisto"
                  icon_size={scr_width * 0.06}
                  icon_color={
                    selctedAnswer[item._id] === option.value ? '#4254B6' : 'gray'
                  }
                  iconname={
                    selctedAnswer[item._id] === option.value
                      ? 'radio-btn-active'
                      : 'radio-btn-passive'
                  }
                />
                <Text style={styles.optionText}>{option?.value}</Text>
              </Pressable>
            )}
            keyExtractor={(option, idx) => `${item._id}-${idx}`}
          />
          {index + 1 !== getQuestion?.length && (
            <View style={styles.divider} />
          )}
          {index + 1 === getQuestion?.length && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                if (Object.keys(selctedAnswer)?.length === getQuestion?.length) {
                  const total = Object.values(selctedAnswer).reduce(
                    (sum, value) => sum + Number(value),
                    0
                  );
                  SIMTEST_UPDATE_SCORE(total);
                } else {
                  common_fn.showToast(`${t('Homescreen.Please Answer All Questions')}`);
                }
              }}>
              <Text style={styles.submitButtonText}>
                {t("Sim1.Discover Your Score")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ height: scr_height * 0.04, width: '100%', borderRadius: 4, marginBottom: scr_height * 0.015 }} />
      <View style={{ height: scr_height * 0.04, width: '50%', borderRadius: 4, marginBottom: scr_height * 0.015 }} />
      {[...Array(10)].map((_, i) => (
        <View 
          key={i}
          style={{ 
            height: scr_height * 0.04, 
            width: '10%', 
            borderRadius: 4, 
            marginTop: scr_height * 0.02 
          }} 
        />
      ))}
    </SkeletonPlaceholder>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Iconviewcomponent
            Icontag="AntDesign"
            icon_size={scr_width * 0.06}
            icon_color={Color.black}
            iconname="left"
          />
        </Pressable>
        <Text style={styles.headerTitle}>
          {t("Sim1.SIM Test")}
        </Text>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => navigation.navigate("LanguageSelector")}>
          <Iconviewcomponent
            viewstyle={styles.iconView}
            Icontag="Ionicons"
            icon_size={scr_width * 0.06}
            icon_color={Color.black}
            iconname="language-outline"
          />
        </TouchableOpacity>
      </View>
      {loader ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={getQuestion}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scr_width * 0.05,
    paddingVertical: scr_height * 0.02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scr_height * 0.025,
    justifyContent: 'space-between', // Changed to space-between for better alignment
  },
  backButton: {
    width: scr_width * 0.15,
  },
  headerTitle: {
    fontSize: scr_width * 0.055,
    color: Color.black,
    fontFamily: Mulish.SemiBold,
    flex: 1,
    textAlign: 'center',
  },
  languageButton: {
    width: scr_width * 0.15,
    alignItems: 'flex-end',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContent: {
    paddingBottom: scr_height * 0.1,
  },
  questionContainer: {
    width: '100%',
    marginBottom: scr_height * 0.03,
  },
  questionHeader: {
    marginBottom: scr_height * 0.015,
  },
  questionNumber: {
    fontSize: scr_width * 0.035,
    color: '#4254B6',
    fontFamily: Mulish.Regular,
    marginBottom: scr_height * 0.01,
  },
  questionText: {
    fontSize: scr_width * 0.05,
    color: Color.black,
    fontFamily: Mulish.Medium,
    lineHeight: scr_height * 0.03,
  },
  optionsContainer: {
    paddingLeft: scr_width * 0.04,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scr_height * 0.025,
    width: scr_width * 0.9,
  },
  optionText: {
    fontSize: scr_width * 0.045,
    color: Color.black,
    fontFamily: Mulish.Regular,
    marginLeft: scr_width * 0.03,
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#F9F9F9',
    marginVertical: scr_height * 0.015,
  },
  submitButton: {
    paddingVertical: scr_height * 0.02,
    paddingHorizontal: scr_width * 0.05,
    backgroundColor: '#4254B6',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: scr_width * 0.7,
    alignSelf: 'center',
    marginTop: scr_height * 0.03,
  },
  submitButtonText: {
    fontSize: scr_width * 0.045,
    color: Color.white,
    fontFamily: Mulish.SemiBold,
    
  },
});

export default SimTestScreen;
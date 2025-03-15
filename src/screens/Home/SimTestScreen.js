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
import { scr_width } from '../../Components/Dimensions';
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
  const language = useSelector((state) => {
    return state.UserReducer.language;
  });

  const GetQustion = async () => {
    try {
      setLoader(true);
      const GetQustion = await fetchData.GetQusetion(1);
      if (GetQustion?.success === true) {
        const translatedData = await Promise.all(
          GetQustion?.data.map(async (item) => {
            const translatedQuestion = await translateText(item.question);
            return {
              ...item,
              question: translatedQuestion
            };
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
      const data = {
        total_points: val,
      };
      const SIMTEST_UPDATE_SCORE = await fetchData?.POST_USER_LESSON(data);
      if (SIMTEST_UPDATE_SCORE?.success === true) {
        UserStep();
        common_fn.showToast('Answer Submitted Successfully');
      } else {
        console.log('SIMTEST_UPDATE_SCORE', SIMTEST_UPDATE_SCORE);
      }
    } catch (error) {
      console.log('Catch in SIMTEST_UPDATE_SCORE', error);
    }
  };

  const UserStep = async () => {
    try {
      const data = {
        step: 3
      }
      const Stepupdate = await fetchData?.UpdateProfile(JSON?.stringify(data));
      if (Stepupdate?.success === true) {
        console.log('Stepupdate', Stepupdate);
        navigation.goBack();
      } else {
        console.log('Stepupdate', Stepupdate);
      }
    } catch (error) {
      console.log('Catch in UserStep', error);
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
            {t('Sim1.Question')} {index + 1} {t("Sim1.of")} {getQuestion?.length}
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
          {index + 1 === getQuestion?.length ? null : (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                height: 5,
                backgroundColor: '#F9F9F9',
              }}
            />
          )}
          {index + 1 === getQuestion?.length && (
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
                if (Object.keys(selctedAnswer)?.length === getQuestion?.length) {
                  const total = Object.values(selctedAnswer).reduce(
                    (sum, value) => sum + Number(value),
                    0,
                  );
                  SIMTEST_UPDATE_SCORE(total);
                  common_fn.showToast('Answer Submitted Successfully');
                } else {
                  console.log("selctedAnswer", selctedAnswer);
                  common_fn.showToast('Please Answer All Questions');
                }
              }}
            >
              <Text style={{ fontSize: 18, color: Color?.white, fontFamily: Mulish?.SemiBold }}>
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
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 25, gap: 10 }}>
      <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
        <Pressable
          style={{
            width: scr_width / 3,
            paddingLeft: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
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
          {t("Sim1.SIM Test")}
        </Text>
      </View>
      {loader ? (
        renderSkeleton()
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

const styles = StyleSheet.create({
});

export default SimTestScreen;
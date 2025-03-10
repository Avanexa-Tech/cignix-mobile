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
} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import fetchData from '../../Config/fetchData';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Mulish} from '../../Global/FontFamily';
import {scr_height, scr_width} from '../../Components/Dimensions';
import FastImage from 'react-native-fast-image';
import common_fn from '../../Components/common_fn';
import Color from '../../Global/Color';
import {CommonActions} from '@react-navigation/native';


const {width, height} = Dimensions.get('window');
LogBox.ignoreAllLogs();

const SimTest = ({navigation}) => {
  const [DisplayQuestion, setDisplayQuestion] = React.useState(1);
  const [selectedAnswer, setSelectedAnswer] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [getQuestion, setgetQuestion] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [selctedAnswer, setSelctedAnswer] = React.useState([]);
  // const Option = ({ title, index }) => {
  //   const isSelected = selectedAnswer.some(
  //     item =>
  //       item.Questionnumber === DisplayQuestion &&
  //       item.Answeroption.value === title.value,
  //   );
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         width: width / 1.5,
  //         padding: 15,
  //         backgroundColor: isSelected ? '#0B1215' : '#EBEBEB',
  //         alignItems: 'center',
  //         borderRadius: 100,
  //       }}
  //       key={index}
  //       onPress={() => {
  //         setSelectedAnswer(prevAnswers => {
  //           const updatedAnswers = [...prevAnswers];
  //           const existingIndex = updatedAnswers.findIndex(
  //             item => item.Questionnumber === DisplayQuestion,
  //           );
  //           if (existingIndex === -1) {
  //             updatedAnswers.push({
  //               Questionnumber: DisplayQuestion,
  //               Answeroption: {
  //                 value: title.value,
  //                 point: title.point,
  //               },
  //             });
  //           } else {
  //             updatedAnswers[existingIndex] = {
  //               Questionnumber: DisplayQuestion,
  //               Answeroption: {
  //                 value: title.value,
  //                 point: title.point,
  //               },
  //             };
  //           }
  //           return updatedAnswers;
  //         });
  //       }}>
  //       <Text style={{ color: isSelected ? '#fff' : '#666666', fontSize: 20 }}>
  //         {title.value}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };
  useEffect(() => {
    GetQustion();
  }, []);
  const handleSelectAnswer = (questionId, optionValue) => {
    setSelctedAnswer(prev => ({...prev, [questionId]: optionValue}));
  };
  const GetQustion = async () => {
    try {
      setLoader(true);
      const GetQustion = await fetchData.GetQusetion(0);
      if (GetQustion?.success == true) {
        setgetQuestion(GetQustion?.data);
        if (GetQustion?.data.length !== 0) {
          const value = GetQustion?.data?.length / 2;
          console.log('value', value);
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
  const renderItem = ({item, index}) => {
    return (
      <View style={{gap: 20}}>
        <View style={{gap: 10}}>
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
        <View style={{gap: 25, paddingLeft: 15}}>
          <FlatList
            data={item?.options}
            renderItem={({item: option}) => {
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
                // marginBottom: 70,
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
                        params: {totalScore: total},
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
  // return (
  //   <View
  //     style={{ backgroundColor: '#fff', flex: 1, padding: 20, paddingTop: 31 }}>
  //     {loader ? (
  //       <SkeletonPlaceholder>
  //         <View style={{ gap: 5 }}>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //           <View
  //             style={{
  //               backgroundColor: 'red',
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               width: scr_width,
  //             }}>
  //             {/* <View style={styles.placeholderCircle} /> */}
  //             <View style={styles.placeholderText} />
  //           </View>
  //         </View>
  //       </SkeletonPlaceholder>
  //     ) : (
  //       <View style={{ flex: 1, gap: 40 }}>
  //         {/* ****************HEADER*********** */}
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //           <Pressable
  //             style={{ width: width / 2.4 }}
  //             onPress={() => {
  //               if (DisplayQuestion == 1) {
  //                 navigation.goBack();
  //               } else {
  //                 setDisplayQuestion(DisplayQuestion - 1);
  //               }
  //             }}>
  //             <Iconviewcomponent
  //               Icontag="AntDesign"
  //               icon_size={24}
  //               icon_color={'#000'}
  //               iconname="left"
  //             />
  //           </Pressable>
  //           <View>
  //             <Text
  //               style={{
  //                 color: '#666666',
  //                 fontSize: 20,
  //                 fontFamily: Mulish?.Regular,
  //               }}>
  //               {' '}
  //               {`${DisplayQuestion} / ${getQuestion?.length}`}
  //             </Text>
  //           </View>
  //         </View>
  //         {/* ****************QUESTION************ */}
  //         <View style={{ flex: 1 }}>
  //           <View
  //             style={{
  //               paddingBottom: 10,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}>
  //             <Text
  //               style={{
  //                 color: '#000',
  //                 fontSize: 30,
  //                 fontFamily: Mulish?.SemiBold,
  //               }}>
  //               {getQuestion[DisplayQuestion - 1]?.question}
  //             </Text>
  //           </View>
  //           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //             <FlatList
  //               data={getQuestion[DisplayQuestion - 1]?.options}
  //               renderItem={({ item, index }) => (
  //                 <Option title={item} index={index} />
  //               )}
  //               keyExtractor={item => item.id}
  //               ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
  //               showsVerticalScrollIndicator={false}
  //             />
  //           </View>
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: '#0B1215',
  //               borderRadius: 100,
  //               padding: 15,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginTop: 10,
  //             }}
  //             onPress={() => {
  //               if (DisplayQuestion == getQuestion?.length) {
  //                 if (selectedAnswer.length == getQuestion?.length) {
  //                   common_fn.showToast('Answer Submited Successfully');
  //                   // navigation.navigate('SuccesScreen');
  //                   console.log('====================================');
  //                   console.log('Answer', selectedAnswer);
  //                   console.log('====================================');
  //                   let Totalpoint = 0;
  //                   for (
  //                     let index = 0;
  //                     index < selectedAnswer?.length;
  //                     index++
  //                   ) {
  //                     const element = selectedAnswer[index];
  //                     Totalpoint += Number(element?.Answeroption?.point) || 0;
  //                   }
  //                   navigation.reset({
  //                     index: 0,
  //                     routes: [{
  //                       name: 'SuccesScreen',
  //                       params: { totalScore: Totalpoint }
  //                     }],
  //                   })
  //                 } else {
  //                   common_fn.showToast('Please Answer All Questions');
  //                 }
  //               } else {
  //                 if (index == selectedAnswer?.length) {
  //                   setDisplayQuestion(DisplayQuestion + 1);
  //                   setModalVisible(true);
  //                   // setDisplayQuestion(DisplayQuestion + 1)
  //                 } else {
  //                   setDisplayQuestion(DisplayQuestion + 1);
  //                 }
  //               }
  //             }}>
  //             <Text
  //               style={{
  //                 color: '#FFFFFF',
  //                 fontSize: 20,
  //                 fontFamily: Mulish?.SemiBold,
  //               }}>{`${DisplayQuestion == getQuestion?.length ? 'Submit' : 'Next'
  //                 }`}</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     )}

  //     {/* ****************Modal*********** */}
  //     <Modal
  //       animationType="fade"
  //       transparent={true}
  //       visible={modalVisible}
  //       onRequestClose={() => {
  //         // Alert.alert('Modal has been closed.');
  //         setModalVisible(!modalVisible);
  //       }}>
  //       <ScrollView
  //         style={{ flex: 1, backgroundColor: '#0B1215' }}
  //         showsVerticalScrollIndicator={false}>
  //         <View
  //           style={{
  //             width: scr_width,
  //             height: scr_height / 2.2,
  //             // height:scr_height/1,
  //             backgroundColor: '#0B1215',
  //             marginBottom: 12,
  //           }}>
  //           <Image
  //             source={require('../../assets/Images/Donescreenimage.jpg')}
  //             style={{
  //               width: '100%',
  //               height: '100%',
  //               resizeMode: 'cover',
  //               borderBottomLeftRadius: 50,
  //               borderBottomRightRadius: 50,
  //             }}
  //           />
  //         </View>
  //         <View
  //           style={{
  //             width: scr_width,
  //             height: 100,
  //             justifyContent: 'center',
  //             alignItems: 'center', marginVertical: 10
  //           }}>
  //           {/* <FastImage
  //             source={require('../../assets/Images/middle_star.png')}
  //             style={{ width: 296, height: '100%', resizeMode: 'cover' }}
  //           /> */}
  //           <Image
  //             source={require('../../assets/Images/middle_star.png')}
  //             style={{
  //               width: '50%',
  //               height: '40%',
  //               resizeMode: 'cover',
  //             }}
  //           />
  //         </View>
  //         <View
  //           style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
  //           <Text
  //             style={{
  //               color: '#FDE2D3',
  //               fontSize: 28,
  //               fontFamily: Mulish?.Bold,
  //             }}>
  //             Just a Little More to Go!
  //           </Text>
  //           <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  //             <Text
  //               style={{
  //                 color: '#F5F5F5',
  //                 fontSize: 16,
  //                 fontFamily: Mulish?.Regular,
  //               }}>
  //               You’re halfway through. Just a few more
  //             </Text>
  //             <Text
  //               style={{
  //                 color: '#F5F5F5',
  //                 fontSize: 16,
  //                 fontFamily: Mulish?.Regular,
  //               }}>
  //               {' '}
  //               steps to complete your setup.
  //             </Text>
  //           </View>
  //         </View>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: '#D8DFE9',
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             padding: 15,
  //             borderRadius: 100,
  //             margin: 15,
  //             marginVertical: 20
  //           }}
  //           onPress={() => {
  //             setModalVisible(false);
  //           }}>
  //           <Text
  //             style={{
  //               color: '#0B1215',
  //               fontSize: 16,
  //               fontFamily: Mulish?.SemiBold,
  //             }}>
  //             Let’s Get This Done
  //           </Text>
  //         </TouchableOpacity>
  //       </ScrollView>
  //     </Modal>
  //   </View>
  // );
  return (
    <View style={{flex: 1, backgroundColor: '#fff', padding: 25, gap: 10}}>
      <View style={{flexDirection: 'row', paddingBottom: 20}}>
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
      </View>
      <FlatList
        data={getQuestion}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 20}}
      />
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
  },
});

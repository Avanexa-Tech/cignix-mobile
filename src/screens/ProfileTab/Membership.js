//import liraries
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Image,
  ToastAndroid,
} from 'react-native';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { scr_width } from '../../Components/Dimensions';
import LinearGradient from 'react-native-linear-gradient';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Components/common_fn';
import RazorpayCheckout from 'react-native-razorpay';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// create a component
const Membership = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [data, setdata] = useState([
    {
      _id: '67384564541b7f8679e39faa',
      name: 'Free Plan',
      price: '0',
      description:
        'Access essential features to help you begin your quit-smoking journey.',
      duration: 0,
      features: [
        'Limited access to videos',
        'smoke-free days and basic progress metrics',
        'Daily reminders and milestone notifications',
      ],
      createdAt: '2024-11-16T07:10:28.236Z',
      updatedAt: '2024-11-21T07:02:17.733Z',
    },
    {
      _id: '67384564541b7f8679e39faa',
      name: 'Premium Plan',
      price: '0',
      description:
        'Access essential features to help you begin your quit-smoking journey.',
      duration: 0,
      features: [
        'Limited access to videos',
        'smoke-free days and basic progress metrics',
        'Daily reminders and milestone notifications',
      ],
      createdAt: '2024-11-16T07:10:28.236Z',
      updatedAt: '2024-11-21T07:02:17.733Z',
    },
    {
      _id: '67384564541b7f8679e39faa',
      name: 'Premium Plan',
      price: '0',
      description:
        'Access essential features to help you begin your quit-smoking journey.',
      duration: 0,
      features: [
        'Limited access to videos',
        'smoke-free days and basic progress metrics',
        'Daily reminders and milestone notifications',
      ],
      createdAt: '2024-11-16T07:10:28.236Z',
      updatedAt: '2024-11-21T07:02:17.733Z',
    },
    {
      _id: '67357ab223774fd7b6cba916',
      name: 'Premium Plan',
      price: '4999',
      description:
        'Access essential features to help you begin your quit-smoking journey.',
      features: [
        'Limited access to videos',
        'smoke-free days and basic progress metrics',
        'Daily reminders and milestone notifications',
      ],
      duration: 12,
      createdAt: '2024-11-14T04:21:06.133Z',
      updatedAt: '2024-11-22T11:04:49.102Z',
      duration_type: 'month',
      special_price: '4000',
    },
  ]);
  const [Amount, setAmount] = useState(null);
  const [Coupondata, setCouponData] = useState('');
  const [Couponcode, setCouponcode] = useState('');
  const [plan, setplan] = useState([]);
  const [selected, setSelected] = useState(null);
  const [btnloader, setBtnloader] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [Afterdiscountamt, setafterdiscountamt] = useState(null);
  const [successmodal, setSuccessmodal] = useState(false);
  const [failuremodal, setFailuremodal] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [currentplan, setcurrentplan] = useState(null);

  useEffect(() => {
    Get_Membership();
    Userdata();
  }, []);
  // USERDATA :
  const Userdata = async () => {
    try {
      const Userdata = await fetchData?.Getuserdata();
      console.log(' refundrequest();', Userdata?.data);
      if (Userdata?.success) {
        setUserdata(Userdata?.data);
        if (Userdata?.data?.step == 4) {
          getcurrentplan();
        }
      }
    } catch (error) {
      console.log('Catch in Userdata', error);
    }
  };
  // Get_Membership :
  const Get_Membership = async () => {
    try {
      const GetMembership = await fetchData?.Get_Member_Screen();
      console.log('Get_Member_Screen', GetMembership?.data);
      if (GetMembership?.success == true) {
        setplan(GetMembership?.data);
        setSelectedPlan(GetMembership?.data[1]);
        setafterdiscountamt(
          GetMembership?.data[1]?.special_price ? GetMembership?.data[1]?.special_price : GetMembership?.data[1]?.price,
        );
        console.log('setplan', GetMembership?.data);
      } else {
        setplan([]);
      }
    } catch (error) {
      console.log('Catch in Get_Membership', error);
    }
  };
  const getcurrentplan = async () => {
    try {
      const getcurrentplan = await fetchData?.Currentplan();
      if (getcurrentplan?.success == true) {
        setcurrentplan(getcurrentplan?.data);
      }
    } catch (error) { }
  };
  //  Item :
  const Item = ({ title, index }) => {
    console.log('title', title);
    const isSelected = selectedPlan?._id === title?._id;
    console.log('selcted ', isSelected, title);

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          console.log('Click user plan', title);
          if (title?.price != 0) {
            setSelectedPlan(title);
            setafterdiscountamt(
              title?.special_price ? title?.special_price : title?.price,
            );
          }
        }}>
        <LinearGradient
          colors={isSelected ? ['#ffff', '#4254B6'] : ['#ffff', '#CCCCCC']}
          style={{
            borderWidth: 1,
            borderColor: isSelected ? '#4254B6' : '#CCCCCC',
            borderRadius: 10,
            paddingLeft: 17,
            paddingTop: 25,
            paddingBottom: 30,
            marginRight: 5,
            width: scr_width / 1.188,
            marginTop: 10,
          }}
          key={index}>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                textTransform: 'capitalize',
                fontFamily: Mulish?.SemiBold,
              }}>
              {title?.name == 'Free Plan' ? t('Membership.basic Plan') : t('Membership.Cignix Pro')}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: Mulish?.Regular,
                color: '#000',
                fontSize: 40,
              }}>
              {title?.price == 0 ? '₹0' : '₹' + title?.special_price}
              <Text style={{ fontSize: 16 }}>/ {t("Membership.year")}</Text>
            </Text>
          </View>
          {title?.price != 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: Mulish?.Regular,
                  color: '#000',
                  fontSize: 20,
                  textDecorationLine: 'line-through',
                }}>
                {title?.price}
              </Text>
            </View>
          ) : null}
          <View style={{ gap: 15, marginTop: 20 }}>
            {title?.features?.map((item, index) => {
              return (
                <View
                  style={{ gap: 13, flexDirection: 'row', alignItems: 'center' }}
                  key={index}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    icon_size={14}
                    icon_color={'#27AE60'}
                    iconname={'checkcircle'}
                  />
                  <Text
                    style={{
                      color: '#333333',
                      fontFamily: Mulish?.Regular,
                      fontSize: 12,
                      textTransform: 'capitalize',
                      fontWeight: '400',
                    }}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              position: 'absolute',
              top: -15,
              right: 10,
              backgroundColor: '#4254B6',
              borderRadius: 100,
              width: 75,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Mulish?.SemiBold,
                color: '#fff',
                fontSize: 12,
              }}>
              {title?.name == 'Free Plan' ? t('Membership.Free') : t('Membership.Prime')}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  // COUPONCALCULATION :
  const couponvalue = (planamount, coupondata, planid) => {
    try {
      console.log('PLAN DATA', planamount);
      console.log('COUPON DATA', coupondata);
      console.log('PLANID', planid);
      if (coupondata?.type == 'off') {
        const discount = parseInt(planamount) - parseInt(coupondata?.value);
        console.log('discount', discount);
        setafterdiscountamt(discount);
      } else {
        const discount =
          parseInt(planamount) -
          (parseInt(planamount) * coupondata?.value) / 100;
        console.log('PER Discount', discount);
        setafterdiscountamt(discount);
      }
    } catch (error) {
      console.log('ERROR ON CATCH IN COUPONVALUE', error);
    }
  };

  // GST ADD FUN :
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

  // Apply Coupon :
  const Applycoupon = async item => {
    try {
      let data = {
        code: item,
      };
      const Apply_coupon = await fetchData?.Get_Coupon(data);
      if (Apply_coupon?.success == true) {
        setCouponData(Apply_coupon?.data);
        if (Apply_coupon?.data) {
          couponvalue(
            selectedPlan?.special_price
              ? selectedPlan?.special_price
              : selectedPlan?.price,
            Apply_coupon?.data,
            selectedPlan?._id,
          );
        }
      } else {
        common_fn?.showToast(Apply_coupon?.message);
      }
    } catch (error) {
      console.log('CATCH IN Apply Coupon', error);
    }
  };

  const refundrequest = async (val) => {
    try {
      console.log("currentplan", val);

      const data = {
        id: val?._id,
      };
      console.log("booknow", data);

      const requestApi = await fetchData?.Get_Refund_Request(
        JSON.stringify(data),
      );
      console.log('SSS', requestApi);
      if (requestApi?.success == true) {
        console.log('requestApi', requestApi);
        common_fn?.showToast(requestApi?.message);
      }
    } catch (error) {
      console.log('====================================');
      console.log('ERROR IN CATCH IN REFUND REQUEST', error);
      console.log('====================================');
    }
  };
  // callRazorpay :
  // const callRazorpay = async () => {
  //   setBtnloader(true);
  //   try {
  //     const optionvalue = {
  //       plan_id: '67357ab223774fd7b6cba916',
  //       amount: '4999',
  //     };
  //     const Optiondata = await fetchData?.Get_Razorpay_Option(optionvalue);
  //     if (Optiondata?.success == true) {
  //       console.log('Razorpay amount', Optiondata?.data?.payment);
  //       RazorpayCheckout.open(Optiondata?.data?.payment)
  //         .then(data => {
  //           console.dir('Razorpay Success: ', data);
  //           setBtnloader(false);
  //         })
  //         .catch(error => {
  //           console.dir('Razorpay Error: ', error);
  //           alert(
  //             `Payment failed: ${
  //               error?.description || 'Unknown error occurred'
  //             }`,
  //           );
  //           setBtnloader(false);
  //         });
  //     }
  //   } catch (error) {
  //     console.error('Catch in callRazorpay: ', error);
  //   }
  // };
  const callRazorpay = async () => {
    try {
      const razorPayBackend = await fetchData.Get_Razorpay_Option({
        plan_id: selectedPlan._id,
        coupon_id: null,
        amount: 4999,
      });
      console.dir(razorPayBackend, '12345');
      var razorpayOptions = razorPayBackend.data.payment;
      RazorpayCheckout.open(razorpayOptions)
        .then(data => {
          console.log('Payment Success:', data);
        })
        .catch(error => {
          console.error('Payment Failed:', error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#fff', flex: 1 }}>
      <View
        style={{
          backgroundColor: Color?.white,
          flexDirection: 'row',
          paddingLeft: 25,
          paddingTop: 31,
          paddingBottom: 20,
        }}>
        <Pressable
          style={{ width: scr_width / 4 }}
          onPress={() => {
            navigation?.goBack();
          }}>
          <Iconviewcomponent
            // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={25}
            icon_color={'#000'}
            iconname={'chevron-back'}
          />
        </Pressable>
        <View>
          <Text
            style={{
              fontFamily: Mulish?.SemiBold,
              fontSize: 22,
              color: '#000',
            }}>
            Cignix <Text style={{ color: '#D09B37' }}>{t("Membership.Prime")}</Text>
          </Text>
        </View>
      </View>
      {userdata?.step !== 4 ? (
        <View>
          <View style={{ padding: 20 }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#000',
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Choose Your Plan")}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#666666',
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Access essential features to help you begin your quit - journey.")}
              </Text>
            </View>
            <FlatList
              data={plan ? plan : []}
              keyExtractor={item => item?._id}
              renderItem={({ item, index }) => (
                <Item title={item} indxe={index} />
              )}
              // numColumns={1}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            // ListFooterComponent={() => (
            //   <View style={{ height: 50,backgroundColor:"red" }} />
            // )}
            />
          </View>
          <View
            style={{
              height: 10,
              marginLeft: 25,
              marginRight: 25,
              backgroundColor: '#F9F9F9',
            }}></View>
          <View style={{ padding: 25, gap: 20 }}>
            <View>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 22,
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Cignix Pro Plan Benefits")}
              </Text>
            </View>
            <View style={{ gap: 15, width: scr_width / 1.18 }}>
              <View
                style={{ gap: 13, flexDirection: 'row', alignItems: 'center' }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  icon_size={24}
                  icon_color={'#27AE60'}
                  iconname={'checkcircle'}
                />
                <Text
                  style={{
                    color: '#333333',
                    fontFamily: Mulish?.Regular,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontWeight: '400',
                  }}>
                  {t("Membership.Work progress metrics")}
                </Text>
              </View>
              <View
                style={{ gap: 13, flexDirection: 'row', alignItems: 'center' }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  icon_size={24}
                  icon_color={'#27AE60'}
                  iconname={'checkcircle'}
                />
                <Text
                  style={{
                    color: '#333333',
                    fontFamily: Mulish?.Regular,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontWeight: '400',
                  }}>
                  {t("Membership.Daily reminders and milestone notifications")}
                </Text>
              </View>
              <View
                style={{ gap: 13, flexDirection: 'row', alignItems: 'center' }}>
                <Iconviewcomponent
                  Icontag={'AntDesign'}
                  icon_size={24}
                  icon_color={'#27AE60'}
                  iconname={'checkcircle'}
                />
                <Text
                  style={{
                    color: '#333333',
                    fontFamily: Mulish?.Regular,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontWeight: '400',
                  }}>
                  {t("Membership.Limited access to videos")}{' '}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 10,
              marginLeft: 25,
              marginRight: 25,
              backgroundColor: '#F9F9F9',
            }}></View>
          <View style={{ margin: 25, gap: 20 }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#000000',
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Have a coupon code ?")}
              </Text>
              <Text
                style={{
                  color: '#333333',
                  fontFamily: Mulish?.Regular,
                  fontSize: 16,
                  textTransform: 'capitalize',
                  fontWeight: '400',
                }}>
                {t("Membership.Access essential features to help you begin your quit-smoking journey.")}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#F2F4FF',
                flexDirection: 'row',
                alignItems: 'center',
                width: scr_width / 1.18,
                padding: 10,
                justifyContent: 'space-between',
                borderRadius: 10,
              }}>
              <TextInput
                placeholder={t("PlaceHolder.Enter Coupon Code")}
                placeholderTextColor={'#999999'}
                maxLength={6}
                value={Couponcode}
                editable={Coupondata == '' ? true : false}
                onChangeText={text => {
                  setCouponcode(text);
                }}
              />
              {Coupondata == '' ? (
                <TouchableOpacity
                  onPress={() => {
                    if (Couponcode !== '') {
                      Applycoupon(Couponcode);
                    } else {
                      common_fn?.showToast('Please Enter Coupon Code');
                    }
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#4254B6',
                      fontWeight: '700',
                      fontFamily: Mulish?.Bold,
                    }}>
                    {t("Membership.Apply")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#27AE60',
                        fontWeight: '700',
                        fontFamily: Mulish?.Bold,
                        textTransform: 'capitalize',
                      }}>
                      {t("Membership.Applied")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCouponData('');
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#4254B6',
                        fontWeight: '700',
                        fontFamily: Mulish?.Bold,
                      }}>
                      {t("Membership.Edit")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          {selectedPlan?.price != 0 ? (
            <TouchableOpacity
              style={{
                margin: 25,
                padding: 18,
                backgroundColor: '#4254B6',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={async () => {
                const Aftergst = await gstFunction(Afterdiscountamt);
                const razorPayBackend = await fetchData.Get_Razorpay_Option({
                  plan_id: selectedPlan?._id,
                  coupon_id: Coupondata?._id ? Coupondata?._id : null,
                  amount: Aftergst,
                });
                if (razorPayBackend?.success == true) {
                  var razorpayOptions = razorPayBackend.data.payment;
                  RazorpayCheckout.open(razorpayOptions)
                    .then(async data => {
                      const payload = {
                        order_id: data?.razorpay_order_id,
                        payment_id: data?.razorpay_payment_id,
                        id: selectedPlan?._id,
                      };
                      try {
                        const url = 'https://api.cignix.com/user-plan/verify';
                        const ACCESS_TOKEN = await AsyncStorage.getItem(
                          'ACCESS_TOKEN',
                        );
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
                          console.log('Payment verified successfully:', result);
                          // let formData = {
                          //   step: 4
                          // };
                          // const Stepupdate = await fetchData.UpdateProfile(formData);
                          // console.log("Stepupdate",Stepupdate);
                          // if (Stepupdate?.success == true) {
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{ name: 'Tab' }],
                            }),
                          );
                          // }else{
                          //   console.log("Stepupdate in Razorpay",Stepupdate);
                          // }
                        } else {
                          console.error('Payment verification failed:', result);
                          setFailuremodal(true);
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
              }}>
              {btnloader ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: Mulish?.Medium,
                    fontSize: 16,
                  }}>
                  {t("Membership.Buy Now for")} ₹{Afterdiscountamt} + 18% GST
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                margin: 25,
                padding: 18,
                backgroundColor: '#4254B6',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                common_fn?.showToast('Please select a plan');
                // setFailuremodal(true);
              }}>
              {btnloader ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: Mulish?.Medium,
                    fontSize: 16,
                  }}>
                  {t("Membership.Select Premium plan")}
                </Text>
              )}
            </TouchableOpacity>
          )}
          <View style={{ padding: 40, height: 100 }}></View>
        </View>
      ) : (
        <View style={{ margin: 20, gap: 30 }}>
          <View style={{ gap: 15 }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Mulish?.SemiBold,
                color: '#000',
              }}>
              {t("Membership.Active membership")}
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 16,
                fontFamily: Mulish?.Regular,
              }}>
              {t("Membership.Thank you for being a valued member of the CIGNIX family.")}
            </Text>
          </View>
          <LinearGradient
            colors={['#4254B6', '#FFF7E880']}
            style={{
              borderWidth: 1,
              borderColor: '#CCCCCC',
              borderRadius: 10,
              paddingLeft: 17,
              paddingTop: 25,
              paddingBottom: 30,
              gap: 15,
              width: scr_width / 1.188,
              // margin: 20,
            }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Cignix Pro")}
              </Text>
              <Text
                style={{
                  color: '#666666',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Full access to all video series, articles, and quitting guides.")}
              </Text>
            </View>
            <Text style={{ color: '#000', fontSize: 16 }}>
              {t("Membership.Next due date")} - 29-10-2025
            </Text>
            <View style={{ height: 2, width: '93%', backgroundColor: '#fff' }} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 14,
                  color: '#666666CC',
                  fontFamily: Mulish?.Regular,
                }}
                onPress={() => {
                  currentplan?.status == 'refund_requested'
                    ? ToastAndroid.show(
                      'Refund request already requested',
                      ToastAndroid.SHORT,
                    )
                    : refundrequest(currentplan);
                }}>
                {currentplan?.status == 'refund_requested'
                  ? t('Membership.refund in process')
                  : currentplan?.status == 'refund_rejected'
                    ? t('Membership.refund rejected')
                    : t('Membership.Cancel membership')}
              </Text>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginRight: 5,
                }}
                onPress={() => {
                  console.log('upgrade plan');
                }}>
                <Text
                  style={{
                    color: '#ED1E24',
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontFamily: Mulish?.Regular,
                  }}>
                  {t("Membership.Upgrade Plan")}
                </Text>
                <Iconviewcomponent
                  Icontag="AntDesign"
                  icon_size={15}
                  icon_color={'#DB8F00'}
                  iconname="right"
                />
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Payment Success Screen */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={failuremodal}
        onRequestClose={() => {
          setFailuremodal(true);
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
            <View
              style={{
                backgroundColor: Color?.white,
                marginRight: 10,
                marginTop: 10,
                alignItems: 'flex-end',
              }}>
              <Pressable
                style={{}}
                onPress={() => {
                  setFailuremodal(false);
                }}>
                <Iconviewcomponent
                  // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                  Icontag="AntDesign"
                  icon_size={25}
                  icon_color={'#000'}
                  iconname={'closecircle'}
                />
              </Pressable>
            </View>
            <View
              style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
              <Iconviewcomponent
                // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                Icontag="AntDesign"
                icon_size={100}
                icon_color={'red'}
                iconname={'closecircle'}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Failed")}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Unfortunately payment was rejected")}
              </Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'red',
                  borderRadius: 10,
                }}
                onPress={() => {
                  setFailuremodal(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Mulish?.Regular,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* payment failure Screen */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={successmodal}
        onRequestClose={() => {
          setSuccessmodal(true);
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
            <View
              style={{
                backgroundColor: Color?.white,
                marginRight: 10,
                marginTop: 10,
                alignItems: 'flex-end',
              }}>
              <Pressable
                style={{}}
                onPress={() => {
                  setSuccessmodal(false);
                }}>
                <Iconviewcomponent
                  // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                  Icontag="AntDesign"
                  icon_size={25}
                  icon_color={'#000'}
                  iconname={'closecircle'}
                />
              </Pressable>
            </View>
            <View
              style={{ justifyContent: 'center', alignItems: 'center', gap: 15 }}>
              <Iconviewcomponent
                // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                Icontag="AntDesign"
                icon_size={100}
                icon_color={'green'}
                iconname={'checkcircle'}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Success")}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Your payment has been processed Successfully")}
              </Text>
            </View>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'green',
                  borderRadius: 10,
                }}
                onPress={() => {
                  setSuccessmodal(false);
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Mulish?.Regular,
                  }}>
                  {t("Membership.Done")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  listContainer: {
    padding: 10,
  },
  separator: {
    padding: 7,
  },
});

//make this component available to the app
export default Membership;

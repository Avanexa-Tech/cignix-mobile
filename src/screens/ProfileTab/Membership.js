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
import {translateText} from '../Context/userContext';

const Membership = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [Coupondata, setCouponData] = useState('');
  const [Couponcode, setCouponcode] = useState('');
  const [plan, setplan] = useState([]);
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
  const Get_Membership = async () => {
    try {
      const GetMembership = await fetchData?.Get_Member_Screen();
      if (GetMembership?.success === true) {
        const translatedPlans = await Promise.all(
          GetMembership?.data.map(async (plan) => {
            const translatedFeatures = await Promise.all(
              plan.features.map((feature) =>
                translateText(feature, t) 
              )
            );
            return {
              ...plan,
              features: translatedFeatures, 
            };
          })
        );
        setplan(translatedPlans);
        setSelectedPlan(translatedPlans[1]);
        setafterdiscountamt(
          translatedPlans[1]?.special_price
            ? translatedPlans[1]?.special_price
            : translatedPlans[1]?.price
        );
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
    const isSelected = selectedPlan?._id === title?._id;

    return (
      <TouchableOpacity
        style={{ flex: 1,alignContent:'center',alignItems:'center'}}
        onPress={() => {
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
                fontSize: 16,
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
              <Text style={{ fontSize: 14 }}>/ {t("Membership.year")}</Text>
            </Text>
          </View>
          {title?.price != 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: Mulish?.Regular,
                  color: '#000',
                  fontSize: 16,
                  textDecorationLine: 'line-through',
                }}>
                {title?.price}
              </Text>
            </View>
          ) : null}
          <View style={{ gap: 15, marginTop: 20,width:scr_width/1.5}}>
            {title?.features?.map((item, index) => {
              return (
                <View
                  style={{flexDirection: 'row', alignItems: 'center' }}
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
                      marginLeft:5
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
  const couponvalue = (planamount, coupondata, planid) => {
    try {
      if (coupondata?.type == 'off') {
        const discount = parseInt(planamount) - parseInt(coupondata?.value);
        setafterdiscountamt(discount);
      } else {
        const discount =
          parseInt(planamount) -
          (parseInt(planamount) * coupondata?.value) / 100;
        setafterdiscountamt(discount);
      }
    } catch (error) {
      console.log('ERROR ON CATCH IN COUPONVALUE', error);
    }
  };

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
      const data = {
        id: val?._id,
      };
      const requestApi = await fetchData?.Get_Refund_Request(
        JSON.stringify(data),
      );
      if (requestApi?.success == true) {
        common_fn?.showToast(requestApi?.message);
      }
    } catch (error) {
      console.log('ERROR IN CATCH IN REFUND REQUEST', error);
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
              fontSize: 17,
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
                  fontSize: 17,
                  color: '#000',
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Choose Your Plan")}
              </Text>
              <Text
                style={{
                  fontSize: 16,
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
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
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
                  fontSize: 17,
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
                    fontSize: 14,
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
                    fontSize: 14,
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
                    fontSize: 14,
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
                  fontSize: 17,
                  color: '#000000',
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Have a coupon code ?")}
              </Text>
              <Text
                style={{
                  color: '#333333',
                  fontFamily: Mulish?.Regular,
                  fontSize: 14,
                  textTransform: 'capitalize',
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
                style={{color: Color.black}}
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
                      fontSize: 14,
                      color: '#4254B6',
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
                        fontSize: 14,
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
                        fontSize: 14,
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
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 0,
                              routes: [{ name: 'Tab' }],
                            }),
                          );
                        } else {
                          console.error('Payment verification failed:', result);
                          setFailuremodal(true);
                        }
                      } catch (error) {
                        console.log('CATCH IN VERIFY API', error);
                      }
                    })
                    .catch(error => {
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
                    fontSize: 14,
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
              }}>
              {btnloader ? (
                <ActivityIndicator size={'small'} color={'#fff'} />
              ) : (
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: Mulish?.Medium,
                    fontSize: 14,
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
                fontSize: 16,
                fontFamily: Mulish?.SemiBold,
                color: '#000',
              }}>
              {t("Membership.Active membership")}
            </Text>
            <Text
              style={{
                color: '#666666',
                fontSize: 14,
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
            }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Mulish?.SemiBold,
                }}>
                {t("Membership.Cignix Pro")}
              </Text>
              <Text
                style={{
                  color: '#666666',
                  fontSize: 14,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Full access to all video series, articles, and quitting guides.")}
              </Text>
            </View>
            <Text style={{ color: '#000', fontSize: 14 }}>
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
                    fontSize: 14,
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
                Icontag="AntDesign"
                icon_size={100}
                icon_color={'red'}
                iconname={'closecircle'}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Failed")}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
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
                    fontSize: 14,
                    fontFamily: Mulish?.Regular,
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
                Icontag="AntDesign"
                icon_size={100}
                icon_color={'green'}
                iconname={'checkcircle'}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontFamily: Mulish?.Regular,
                }}>
                {t("Membership.Success")}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
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
                    fontSize: 14,
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

export default Membership;

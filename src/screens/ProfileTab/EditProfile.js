//import liraries
import React, {useState, useEffect, useCallback} from 'react';
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
  ImageBackground,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Color from '../../Global/Color';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Mulish} from '../../Global/FontFamily';
import {scr_width} from '../../Components/Dimensions';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Components/common_fn';
import { BottomSheet } from 'react-native-btr';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// create a component
const EditProfile = ({navigation}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [selectGenderbottomSheetVisible, setSelectGenderbottomSheetVisible] =
    useState(false);
  const [Uservalue, setuservalue] = useState({
    Name: '',
    Email: '',
    Phone: '',
    DOB: '',
    Gender: '',
    Step: 0,
    Status: '',
    Type: '',
    profile: '',
  });
   const [genderData, setGenderData] = useState([
      {
        id: '0',
        gender: 'male',
      },
      {
        id: '1',
        gender: 'female',
      }
    ]);
  const [selectGender, setSelectGender] = useState(null);
  const [selectGenderId, setSelectGenderId] = useState('0');
  const selectedItem = item => {
    try {
      // console.log("Item ======================= :", item);
      
      setSelectGender(item.gender);
      setuservalue({...Uservalue, Gender: item?.gender})
      setSelectGenderbottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Register_selectedItem:', error);
    }
  };
  const handleEditInfo = () => {
    console.log('Edit info data : ');
    setIsEditable(!isEditable);
  };
  const handleUpdateProfile = () => {
        const UpdateProfile = async () => {
      try {
        const formData = new FormData();
        formData.append('Dob', Uservalue?.DOB);
        formData.append('email', Uservalue?.Email);
        formData.append('mobile', Uservalue?.Phone);
        formData.append('name', Uservalue?.Name);
        formData.append('status', Uservalue?.Status);
        formData.append('step', Uservalue?.Step);
        formData.append('type', Uservalue?.Type);
        formData.append('gender', Uservalue?.Gender);
        console.log('dddddddd', formData);

        const UpdateProfile = await fetchData?.UpdateProfile(formData);
        console.log('UpdateProfile', UpdateProfile);
        if (UpdateProfile?.success == true) {
          common_fn.showToast(UpdateProfile?.message);
        } else {
          common_fn.showToast(UpdateProfile?.message);
        }
      } catch (error) {
        console.log('CATCH IN UPDATE PROFILE', error);
      }
    }; 
    if(Uservalue?.Phone?.length == 10)
    {      
      UpdateProfile();
      setIsEditable(!isEditable);
    }else{
      ToastAndroid.show('Please enter valid phone number', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    GETUSERDATA();
  }, []);
  const GETUSERDATA = async () => {
    try {
      const Userdata = await fetchData?.Getuserdata();
      if (Userdata?.success == true) {
        setuservalue({
          Name: Userdata?.data?.name,
          Email: Userdata?.data?.email,
          Phone: Userdata?.data?.mobile,
          DOB: Userdata?.data?.dob,
          Gender: Userdata?.data?.gender,
          Step: Userdata?.data?.step,
          Status: Userdata?.data?.status,
          Type: Userdata?.data?.type,
          profile: Userdata?.data?.profile,
        });
      }
    } catch (error) {
      console.log('DATA FROM GETUSERDATA', error);
    }
  };
  const pickImage = () => {
    try {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
        },
        async response => {
          if (response.didCancel) {
            Alert.alert('Cancelled', 'User cancelled image picker');
          } else if (response.errorCode) {
            Alert.alert(
              'Error',
              response.errorMessage || 'Something went wrong',
            );
          } else {
            // const uri = response.assets[0]?.uri;
            const asset = response.assets?.[0];
            console.log('aaaa', asset);
            // console.log("uri",uri);
            if (asset) {
              const {uri, fileSize, fileName, type} = asset;
              if (fileSize && fileSize <= 1048576) {
                console.log('File selected:', uri);
                const formData = new FormData();
                formData.append('profile', {
                  uri,
                  name: fileName || 'profile.jpg', // Fallback to a default name
                  type: type || 'image/jpeg', // Default to JPEG
                });
                console.log('formData', formData);

                const UpdateProfile = await fetchData?.Uploadprofileimg(
                  formData,
                );
                console.log('UpdateProfile', UpdateProfile);
                if (UpdateProfile?.success == true) {
                  GETUSERDATA();
                  common_fn.showToast('User Profile Updated Successfully');
                } else {
                  common_fn.showToast(UpdateProfile?.message);
                }
              } else {
                Alert.alert(
                  'File Too Large',
                  'Please select an image below 1 MB.',
                );
              }
            }
          }
        },
      );
    } catch (error) {
      console.log('CATCH IN ERROR');
    }
  };
  function selectGender_toggleBottomView() {
    try {
      setSelectGenderbottomSheetVisible(!selectGenderbottomSheetVisible);
    } catch (error) {
      console.log('catch in Register_toggleBottomView :', error);
    }
  }
  function selGender_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={selectGenderbottomSheetVisible}
            onBackButtonPress={selectGender_toggleBottomView}
            onBackdropPress={selectGender_toggleBottomView}>
            <View
              style={{
                backgroundColor: Color.white,
                alignItems: 'center',
                borderTopStartRadius: 30,
                borderTopEndRadius: 30,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 15,
                  paddingStart: 30,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: Color.lightBlack,
                    fontFamily: Mulish.SemiBold,
                  }}>
                  Select Gender
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectGenderbottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{color: Color.primary, marginRight: 10}}
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: '95%'}}>
                {genderData.map((item, index) => {
                  return (
                    <View key={index} style={{width: '100%'}}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => selectedItem(item)}
                        style={{
                          alignItems: 'center',
                          padding: 5,
                          backgroundColor:
                            Uservalue?.Gender == item.gender
                              ? Color.primary
                              : Color.white,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 16,
                            textTransform:'capitalize',
                            color:
                            Uservalue?.Gender === item.gender
                                ? Color.white
                                : Color.cloudyGrey,
                            marginVertical: 5,
                            fontFamily: Mulish.SemiBold,
                            padding: 5,
                          }}>
                          {item.gender}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: '100%',
                          height: 3,
                          backgroundColor: Color.softGrey,
                          marginVertical: 5,
                        }}></View>
                    </View>
                  );
                })}
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in Register selGender_BottomSheet_menu :', error);
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: Color?.white,
          flexDirection: 'row',
          paddingLeft: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <Pressable
          style={{width: scr_width / 4}}
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
            style={{fontFamily: Mulish?.SemiBold, fontSize: 22, color: '#000'}}>
            Edit Profile
          </Text>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: 120,
            height: 120,
            padding: 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            backgroundColor: Color.grey,
          }}>
          <Image
            source={
              Uservalue?.profile
                ? {uri: Uservalue?.profile}
                : require('../../assets/Gallery/profile.png')
            }
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 100,
            }}
          />
          <Pressable
            style={{
              position: 'absolute',
              backgroundColor: Color.mediumGrey,
              padding: 5,
              borderRadius: 50,
              bottom: 0,
              right: 10,
            }}
            onPress={() => {
              pickImage();
            }}>
            <Iconviewcomponent
              viewstyle={{alignItems: 'center', justifyContent: 'center'}}
              Icontag="MaterialCommunityIcons"
              icon_size={25}
              icon_color={Color.black}
              iconname="pencil-outline"
            />
          </Pressable>
        </View>
        <TouchableOpacity style={{margin: 20}}>
          <Text
            style={{
              color: '#2E81F8',
              fontSize: 16,
              fontFamily: Mulish?.Medium,
            }}>
            Edit Profile Picture
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '90%',
            height: 3,
            backgroundColor: Color.softGrey,
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        />
      </View>
      <View
        style={{
          flex: 3,
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                color: Color.black,
                fontFamily: Mulish.ExtraBold,
                letterSpacing: 0.5,
              }}>
              Profile Information
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleEditInfo();
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#2E81F8',
                fontFamily: Mulish.Bold,
                letterSpacing: 0.5,
              }}>
              Edit Info
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          label="Full Name"
          value={Uservalue?.Name}
          editable={isEditable == true ? true : false} // Make the TextInput non-editable
          // editable={isEditable} // Toggle edit mode
          onChangeText={text => setuservalue({...Uservalue, Name: text})}
          style={{
            width: '90%',
            height: 60,
            paddingHorizontal: 20,
            backgroundColor: Color.white,
            marginVertical: 10,
          }}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: 30, // Set border radius
            colors: {
              primary: Color.primary, // Outline color when focused
              text: Color.black, // Font color for input text
              placeholder: Color.grey, // Placeholder color
              disabled: Color.black, // Text color when disabled
            },
          }}
          inputStyle={{
            fontSize: 20, // Font size
            fontFamily: Mulish.Black, // Font family
          }}
        />
        <TextInput
          label="Email Address"
          value={Uservalue?.Email?.toLowerCase()}
          editable={isEditable == true ? true : false} // Make the TextInput non-editable
          onChangeText={text => setuservalue({...Uservalue, Email: text})}
          style={{
            width: '90%',
            height: 60,
            paddingHorizontal: 20,
            backgroundColor: Color.white,
            marginVertical: 10,
          }}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: 30, // Set border radius
            colors: {
              primary: Color.primary, // Outline color when focused
              text: Color.black, // Font color for input text
              placeholder: Color.grey, // Placeholder color
              disabled: Color.black, // Text color when disabled
            },
          }}
          inputStyle={{
            fontSize: 16, // Font size
            fontFamily: Mulish.Black, // Font family
          }}
        />
        <TextInput
          label="Phone Number"
          value={Uservalue?.Phone}
          editable={isEditable == true ? true : false} // Make the TextInput non-editable
          onChangeText={text => setuservalue({...Uservalue, Phone: text})}
          style={{
            width: '90%',
            height: 60,
            paddingHorizontal: 20,
            backgroundColor: Color.white,
            marginVertical: 10,
          }}
          keyboardType='numeric'
          maxLength={10}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: 30, // Set border radius
            colors: {
              primary: Color.primary, // Outline color when focused
              text: Color.black, // Font color for input text
              placeholder: Color.grey, // Placeholder color
              disabled: Color.black, // Text color when disabled
            },
          }}
          inputStyle={{
            fontSize: 16, // Font size
            fontFamily: Mulish.Black, // Font family
          }}
          left={
            <TextInput.Icon
              icon={() => (
                <View style={styles.prefixContainer}>
                  <Image
                    source={require('../../assets/Images/india.png')} // Replace with your image path
                    style={styles.icon}
                  />
                  <Text style={styles.prefixText}>+91</Text>
                </View>
              )}
              style={styles.iconContainer} // Ensures proper alignment
            />
          }
        />
        <TextInput
          label="Date of Birth / Age"
          value={Uservalue?.DOB}
          editable={isEditable == true ? true : false} // Make the TextInput non-editable
          onChangeText={text => setuservalue({...Uservalue, DOB: text})}
          style={{
            width: '90%',
            height: 60,
            paddingHorizontal: 20,
            backgroundColor: Color.white,
            marginVertical: 10,
          }}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: 30, // Set border radius
            colors: {
              primary: Color.primary, // Outline color when focused
              text: Color.black, // Font color for input text
              placeholder: Color.grey, // Placeholder color
              disabled: Color.black, // Text color when disabled
            },
          }}
          inputStyle={{
            fontSize: 16, // Font size
            fontFamily: Mulish.Black, // Font family
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <View style={{}}>
                  <Iconviewcomponent
                    // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                    Icontag="AntDesign"
                    icon_size={22}
                    icon_color={Color.cloudyGrey}
                    iconname={'calendar'}
                  />
                </View>
              )}
              style={{
                width: 60,
                marginTop: 7, // Ensures alignment with the text input
              }} // Ensures proper alignment
            />
          }
        />

        <TextInput
          label="Gender"
          value={Uservalue?.Gender}    
          // autoCapitalize='words'      
          editable={isEditable == true ? true : false} // Make the TextInput non-editable
          // onChangeText={text => setuservalue({...Uservalue, Gender: text.charAt(0).toUpperCase() + text.slice(1)})}
          style={{
            width: '90%',
            height: 60,
            textTransform:'capitalize',
            paddingHorizontal: 20,
            backgroundColor: Color.white,
            marginVertical: 10,
          }}
          
          autoCapitalize='characters'
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: 30, // Set border radius
            colors: {
              primary: Color.primary, // Outline color when focused
              text: Color.black, // Font color for input text
              placeholder: Color.grey, // Placeholder color
              disabled: Color.black, 
              
              // Text color when disabled
            },
          }}
          inputStyle={{
            fontSize: 16, // Font size
            fontFamily: Mulish.Black,
          
            // Font family
          }}
          right={
            <TextInput.Icon
              icon={() => (
                <View style={{}}>
                  <Iconviewcomponent
                    // viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                    Icontag="AntDesign"
                    icon_size={20}
                    icon_color={
                      isEditable == true ? Color.lightBlack : Color.Venus
                    }
                    iconname={'caretdown'}
                  />
                </View>
              )}
              style={{
                width: 60,
                marginTop: 7,
              }}
              onPress={() => {
                isEditable == true ?
                selectGender_toggleBottomView() : null
              }}
            />
          }
        />

        <TouchableOpacity
          onPress={() => {
            handleUpdateProfile();
          }}
          disabled={!isEditable} // Disable button when not in edit mode
          style={{
            width: '90%',
            height: 55,
            marginBottom: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isEditable ? Color.primary : Color.grey, // Change color based on edit mode
            borderRadius: 30,
            marginVertical: 20,
          }}>
          <Text
            style={{color: Color.white, fontSize: 16, fontFamily: Mulish.Bold}}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
      {selGender_BottomSheetmenu()}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: Color.white,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20, // Adjust image width
    height: 20, // Adjust image height
    resizeMode: 'contain',
    marginRight: 5, // Space between image and text
  },
  prefixText: {
    fontSize: 16,
    fontFamily: Mulish.Medium, // Ensure font matches your theme
    color: Color.cloudyGrey, // Adjust color as needed
  },
  iconContainer: {
    width: 100,
    // backgroundColor: 'red',
    marginTop: 7, // Ensures alignment with the text input
    left: 15,
  },
});

//make this component available to the app
export default EditProfile;

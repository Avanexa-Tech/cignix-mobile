import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Mulish } from '../../Global/FontFamily';
import { scr_width, scr_height } from '../../Components/Dimensions';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Components/common_fn';
import { BottomSheet } from 'react-native-btr';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { translateText } from '../Context/userContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = ({ navigation }) => {
  const [isEditable, setIsEditable] = useState(false);
  const { t } = useTranslation();
  const [selectGenderbottomSheetVisible, setSelectGenderbottomSheetVisible] = useState(false);
  const [profileOptionsVisible, setProfileOptionsVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectGender, setSelectGender] = useState(null);

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
    { id: '0', gender: 'male' },
    { id: '1', gender: 'female' },
  ]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);

    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    setuservalue({ ...Uservalue, DOB: formattedDate });
  };

  const selectedItem = item => {
    try {
      setSelectGender(item.gender);
      setuservalue({ ...Uservalue, Gender: item?.gender });
      setSelectGenderbottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Register_selectedItem:', error);
    }
  };

  const handleEditInfo = () => {
    setIsEditable(!isEditable);
  };

  const handleUpdateProfile = async () => {
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

        const UpdateProfile = await fetchData?.UpdateProfile(formData);
        if (UpdateProfile?.success == true) {
          const translatedMessage = await translateText(UpdateProfile?.message);
          common_fn.showToast(translatedMessage);
        } else {
          const translatedMessage = await translateText(UpdateProfile?.message);
          common_fn.showToast(translatedMessage);
        }
      } catch (error) {
        console.log('CATCH IN UPDATE PROFILE', error);
      }
    };
    if (Uservalue?.Phone?.length == 10) {
      UpdateProfile();
      setIsEditable(!isEditable);
    } else {
      const translatedMessage = await translateText("Please enter valid phone number");
      ToastAndroid.show(translatedMessage, ToastAndroid.SHORT);
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

  const toggleProfileOptions = () => {
    setProfileOptionsVisible(!profileOptionsVisible);
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
            Alert.alert(`${t("profile.Cancelled")}`, `${t("profile.User cancelled image picker")}`);
          } else {
            const asset = response.assets?.[0];
            console.log('aaaa', asset);
            if (asset) {
              const { uri, fileName, type } = asset;
              const formData = new FormData();
              formData.append('profile', {
                uri,
                name: fileName || 'profile.jpg',
                type: type || 'image/jpeg',
              });
              const UpdateProfile = await fetchData?.Uploadprofileimg(
                formData,
              );
              if (UpdateProfile?.success == true) {
                GETUSERDATA();
                common_fn.showToast(`${t('Homescreen.User Profile Updated Successfully')}`);
              } else {
                const translatedMessage = await translateText(UpdateProfile?.message);
                common_fn.showToast(translatedMessage);
              }
            }
          }
          setProfileOptionsVisible(false);
        },
      );
    } catch (error) {
      console.log('CATCH IN ERROR');
    }
  };
  const takePhoto = async () => {
    try {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 1,
        },
        async response => {
          if (response.didCancel) {
            Alert.alert(`${t("profile.Cancelled")}`, `${t("profile.User cancelled camera")}`);
          } else {
            const asset = response.assets?.[0];
            if (asset) {
              const { uri, fileName, type } = asset;
              const formData = new FormData();
              formData.append('profile', {
                uri,
                name: fileName || 'profile.jpg',
                type: type || 'image/jpeg',
              });
              console.log('111111111111111+============>', formData);

              const UpdateProfile = await fetchData?.Uploadprofileimg(
                formData,
              );
              if (UpdateProfile?.success == true) {
                GETUSERDATA();
                common_fn.showToast(`${t('Homescreen.User Profile Updated Successfully')}`);
              } else {
                const translatedMessage = await translateText(UpdateProfile?.message);
                common_fn.showToast(translatedMessage);
              }
            }
          }
          setProfileOptionsVisible(false);
        },
      );
    } catch (error) {
      console.log('CATCH IN TAKE PHOTO', error);
    }
  };
  const removeProfilePicture = async () => {
    try {
      const RemoveProfile = await fetchData?.RemoveProfilePic();
      console.log("Remove Profile Response:", RemoveProfile);

      if (RemoveProfile?.success === true) {
        setuservalue({ ...Uservalue, profile: '' });
        common_fn.showToast(`${t('Homescreen.Profile picture removed successfully')}`);
      } else {
        const translatedMessage = await translateText(RemoveProfile?.message);
        common_fn.showToast(translatedMessage);
      }
      setProfileOptionsVisible(false);
    } catch (error) {
      console.log('Error in REMOVE PROFILE:', error);
      console.log('Error details:', error.message);
      common_fn.showToast(`${t('Homescreen.Network request failed. Please try again later.')}`);
      setProfileOptionsVisible(false);
    }
  };
  function profileOptionsBottomSheet() {
    return (
      <BottomSheet
        visible={profileOptionsVisible}
        onBackButtonPress={toggleProfileOptions}
        onBackdropPress={toggleProfileOptions}>
        <View style={styles.profileOptionsContainer}>
          <View style={styles.profileOptionsHeader}>
            <Text style={styles.profileOptionsTitle}>
              {t("Editprofile.Profile Picture Options")}
            </Text>
            <TouchableOpacity onPress={toggleProfileOptions}>
              <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'closecircleo'}
                icon_size={scr_width * 0.055}
                iconstyle={{ color: Color.primary, marginRight: scr_width * 0.025 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionButton} onPress={takePhoto}>
              <Iconviewcomponent
                Icontag="MaterialIcons"
                icon_size={scr_width * 0.06}
                icon_color={Color.primary}
                iconname="photo-camera"
              />
              <Text style={styles.optionText}>{t("Editprofile.Take Photo")}</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity style={styles.optionButton} onPress={pickImage}>
              <Iconviewcomponent
                Icontag="MaterialIcons"
                icon_size={scr_width * 0.06}
                icon_color={Color.primary}
                iconname="photo-library"
              />
              <Text style={styles.optionText}>{t("Editprofile.Choose from Gallery")}</Text>
            </TouchableOpacity>
            {Uservalue?.profile && (
              <>
                <View style={styles.divider}></View>
                <TouchableOpacity style={styles.optionButton} onPress={removeProfilePicture}>
                  <Iconviewcomponent
                    Icontag="MaterialIcons"
                    icon_size={scr_width * 0.06}
                    icon_color={'#FF3B30'}
                    iconname="delete"
                  />
                  <Text style={[styles.optionText, { color: '#FF3B30' }]}>
                    {t("Editprofile.Remove Profile Picture")}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </BottomSheet>
    );
  }

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
                borderTopStartRadius: scr_width * 0.075,
                borderTopEndRadius: scr_width * 0.075,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: scr_width * 0.0375,
                  paddingStart: scr_width * 0.075,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopLeftRadius: scr_width * 0.05,
                  borderTopRightRadius: scr_width * 0.05,
                }}>
                <Text
                  style={{
                    fontSize: scr_width * 0.04,
                    color: Color.lightBlack,
                    fontFamily: Mulish.SemiBold,
                  }}>
                  {t("Editprofile.Select Gender")}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectGenderbottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={scr_width * 0.055}
                    iconstyle={{ color: Color.primary, marginRight: scr_width * 0.025 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%' }}>
                {genderData.map((item, index) => {
                  return (
                    <View key={index} style={{ width: '100%' }}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => selectedItem(item)}
                        style={{
                          alignItems: 'center',
                          padding: scr_width * 0.0125,
                          backgroundColor:
                            Uservalue?.Gender == item.gender
                              ? Color.primary
                              : Color.white,
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: scr_width * 0.04,
                            textTransform: 'capitalize',
                            color:
                              Uservalue?.Gender === item.gender
                                ? Color.white
                                : Color.cloudyGrey,
                            marginVertical: scr_width * 0.0125,
                            fontFamily: Mulish.SemiBold,
                            padding: scr_width * 0.0125,
                          }}>
                          {item.gender}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: '100%',
                          height: scr_height * 0.004,
                          backgroundColor: Color.softGrey,
                          marginVertical: scr_width * 0.0125,
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
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation?.goBack()}>
          <Iconviewcomponent
            Icontag="Ionicons"
            icon_size={scr_width * 0.0625}
            icon_color={'#000'}
            iconname={'chevron-back'}
          />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            {t("Editprofile.Edit Profile")}
          </Text>
        </View>
      </View>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={
              Uservalue?.profile
                ? { uri: Uservalue?.profile }
                : require('../../assets/Gallery/profile.jpg')
            }
            style={styles.profileImage}
          />
          <Pressable
            style={styles.editProfileIconContainer}
            onPress={toggleProfileOptions}>
            <Iconviewcomponent
              viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
              Icontag="MaterialCommunityIcons"
              icon_size={scr_width * 0.0625}
              icon_color={Color.black}
              iconname="pencil-outline"
            />
          </Pressable>
        </View>
        <TouchableOpacity
          style={{ margin: scr_width * 0.05 }}
          onPress={toggleProfileOptions}>
          <Text style={styles.editProfileText}>
            {t("Editprofile.Edit Profile Picture")}
          </Text>
        </TouchableOpacity>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              {t("Editprofile.Profile Information")}
            </Text>
          </View>
          <TouchableOpacity onPress={handleEditInfo}>
            <Text style={styles.editInfoText}>
              {t("Editprofile.Edit Info")}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          label={t("PlaceHolder.Full Name")}
          value={Uservalue?.Name}
          editable={isEditable}
          onChangeText={text => setuservalue({ ...Uservalue, Name: text })}
          style={styles.textInput}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: scr_width * 0.5,
            colors: {
              primary: Color.primary,
              text: Color.black,
              placeholder: Color.grey,
              disabled: Color.black,
            },
          }}
          inputStyle={styles.inputText}
        />
        <TextInput
          label={t("PlaceHolder.Email Address")}
          value={Uservalue?.Email?.toLowerCase()}
          editable={isEditable == true ? true : false}
          onChangeText={text => setuservalue({ ...Uservalue, Email: text })}
          style={styles.textInput}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: scr_width * 0.5,
            colors: {
              primary: Color.primary,
              text: Color.black,
              placeholder: Color.grey,
              disabled: Color.black,
            },
          }}
          inputStyle={styles.inputText}
        />
        <TextInput
          label={t("PlaceHolder.Phone Number")}
          value={Uservalue?.Phone}
          editable={isEditable == true ? true : false}
          onChangeText={text => setuservalue({ ...Uservalue, Phone: text })}
          style={styles.textInput}
          keyboardType='numeric'
          maxLength={10}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: scr_width * 0.5,
            colors: {
              primary: Color.primary,
              text: Color.black,
              placeholder: Color.grey,
              disabled: Color.black,
            },
          }}
          inputStyle={styles.inputText}
          left={
            <TextInput.Icon
              icon={() => (
                <View style={styles.prefixContainer}>
                  <Image
                    source={require('../../assets/Images/india.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.prefixText}>+91</Text>
                </View>
              )}
              style={styles.iconContainer}
            />
          }
        />
        <TextInput
          label={t("PlaceHolder.Date of Birth / Age")}
          value={Uservalue?.DOB}
          editable={isEditable == true ? true : false}
          onChangeText={text => setuservalue({ ...Uservalue, DOB: text })}
          style={styles.textInput}
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: scr_width * 0.5,
            colors: {
              primary: Color.primary,
              text: Color.black,
              placeholder: Color.grey,
              disabled: Color.black,
            },
          }}
          inputStyle={styles.inputText}
          right={
            <TextInput.Icon
              icon={() => (
                <View>
                  <Iconviewcomponent
                    Icontag="AntDesign"
                    icon_size={scr_width * 0.055}
                    icon_color={isEditable ? Color.cloudyGrey : Color.Venus}
                    iconname={'calendar'}
                  />
                </View>
              )}
              style={styles.rightIconContainer}
              onPress={() => isEditable && setShowDatePicker(true)}
            />
          }
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
        <TextInput
          label={t("PlaceHolder.Gender")}
          value={Uservalue?.Gender || t("Editprofile.Select Gender")}
          editable={isEditable}
          style={styles.textInput}
          autoCapitalize='characters'
          cursorColor={Color.primary}
          mode="outlined"
          theme={{
            roundness: scr_width * 0.5,
            colors: {
              primary: Color.primary,
              text: Color.black,
              placeholder: Color.grey,
              disabled: Color.black,
            },
          }}
          inputStyle={styles.inputText}
          right={
            <TextInput.Icon
              icon={() => (
                <View>
                  <Iconviewcomponent
                    Icontag="AntDesign"
                    icon_size={scr_width * 0.05}
                    icon_color={isEditable ? Color.lightBlack : Color.Venus}
                    iconname={'caretdown'}
                  />
                </View>
              )}
              style={styles.rightIconContainer}
              onPress={() => isEditable && selectGender_toggleBottomView()}
            />
          }
        />
        <TouchableOpacity
          onPress={handleUpdateProfile}
          disabled={!isEditable}
          style={[
            styles.updateButton,
            { backgroundColor: isEditable ? Color.primary : Color.grey }
          ]}>
          <Text style={styles.updateButtonText}>
            {t("Editprofile.Update Profile")}
          </Text>
        </TouchableOpacity>
      </View>
      {selGender_BottomSheetmenu()}
      {profileOptionsBottomSheet()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerContainer: {
    backgroundColor: Color?.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scr_height * 0.025,
    width: '100%',
  },
  backButton: {
    width: scr_width * 0.15,
    paddingLeft: scr_width * 0.05,
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Mulish?.SemiBold,
    fontSize: scr_width * 0.055,
    color: '#000',
    textAlign: 'center',
  },
  profileImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageWrapper: {
    width: scr_width * 0.3,
    height: scr_width * 0.3,
    padding: scr_width * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scr_width * 0.15,
    backgroundColor: Color.grey,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: scr_width * 0.15,
  },
  editProfileIconContainer: {
    position: 'absolute',
    backgroundColor: Color.mediumGrey,
    padding: scr_width * 0.0125,
    borderRadius: scr_width * 0.125,
    bottom: 0,
    right: scr_width * 0.025,
  },
  editProfileText: {
    color: '#2E81F8',
    fontSize: scr_width * 0.04,
    fontFamily: Mulish?.Medium,
  },
  dividerLine: {
    width: '90%',
    height: scr_height * 0.004,
    backgroundColor: Color.softGrey,
    marginHorizontal: scr_width * 0.05,
    marginBottom: scr_width * 0.025,
  },
  formContainer: {
    flex: 3,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scr_height * 0.015,
  },
  sectionTitle: {
    fontSize: scr_width * 0.045,
    color: Color.black,
    fontFamily: Mulish.ExtraBold,
    letterSpacing: 0.5,
  },
  editInfoText: {
    fontSize: scr_width * 0.04,
    color: '#2E81F8',
    fontFamily: Mulish.Bold,
    letterSpacing: 0.5,
  },
  textInput: {
    width: '90%',
    height: scr_height * 0.075,
    paddingHorizontal: scr_width * 0.05,
    backgroundColor: Color.white,
    marginVertical: scr_height * 0.009,
    color: Color.black
  },
  inputText: {
    fontSize: scr_width * 0.04,
    fontFamily: Mulish.Black,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: scr_width * 0.05,
    height: scr_width * 0.05,
    resizeMode: 'contain',
    marginRight: scr_width * 0.0125,
  },
  prefixText: {
    fontSize: scr_width * 0.04,
    fontFamily: Mulish.Medium,
    color: Color.cloudyGrey,
  },
  iconContainer: {
    width: scr_width * 0.25,
    marginTop: scr_height * 0.009,
    left: scr_width * 0.0375,
  },
  rightIconContainer: {
    width: scr_width * 0.15,
    marginTop: scr_height * 0.009,
  },
  updateButton: {
    width: '90%',
    height: scr_height * 0.07,
    marginBottom: scr_height * 0.125,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scr_width * 0.075,
    marginVertical: scr_height * 0.025,
  },
  updateButtonText: {
    color: Color.white,
    fontSize: scr_width * 0.04,
    fontFamily: Mulish.Bold
  },
  profileOptionsContainer: {
    backgroundColor: Color.white,
    borderTopLeftRadius: scr_width * 0.075,
    borderTopRightRadius: scr_width * 0.075,
  },
  profileOptionsHeader: {
    width: '100%',
    flexDirection: 'row',
    padding: scr_width * 0.0375,
    paddingStart: scr_width * 0.075,
    backgroundColor: '#FBE9EF',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: scr_width * 0.05,
    borderTopRightRadius: scr_width * 0.05,
  },
  profileOptionsTitle: {
    fontSize: scr_width * 0.04,
    color: Color.lightBlack,
    fontFamily: Mulish.SemiBold,
  },
  optionsContainer: {
    padding: scr_width * 0.05,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scr_height * 0.02,
  },
  optionText: {
    marginLeft: scr_width * 0.0375,
    fontSize: scr_width * 0.04,
    color: Color.black,
    fontFamily: Mulish.Medium,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: Color.softGrey,
  }
});

export default EditProfile;
import {api} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const api_name = 'api/';

const AccessToken = async () => {
  try {
    const ACCESS_TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
    const value = JSON.parse(ACCESS_TOKEN);
    console.log('access token', value);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return e;
  }
};

export default {
  // Get_Question :
  GetQusetion: async (event,page,limit = 'inf') => {
    let url = `question?event=${event}&page=${page}&limit=${limit}`;
    return api.getMethod(url);
  },
  getquestionstep4: async event => {
    let url = `question?route=${event}`;
    return api.getMethod(url);
  },
  // LOGIN
  login: async data => {
    let url = `auth/user/login`;
    return api.postMethod(url, data);
  },
  // LOGIN OTP VERIFY :
  User_Login_OTP_Verify: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/verify';
    return api.postMethod(url, data?.otp, data?.token);
  },
  // EMAIL PASSWORD VERIFY :
  User_Login_Email_Password_Verify: async data => {
    console.log('Enter the new fun', data);
    let url = 'auth/user/password-login';
    return api.postMethod(url, data);
  },
  Register: async data => {
    let url = 'auth/user/register';
    return api.postMethod(url, data);
  },
  // CHANGE PASSWORD
  ChangePassword: async data => {
    let url = 'user/profile/password_update';
    console.log('kjbvhvbjhvbjhuv');
    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  // LOGOUT :
  Logout: async () => {
    let url = 'auth/user/logout';
    const accessToken = await AccessToken();
    console.log('accessToken', accessToken);
    return api.getMethod(url, accessToken);
  },
  // GET USER DATA :
  Getuserdata: async () => {
    let url = 'user/profile';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // UPDATE USER DATA :
  UpdateProfile: async data => {
    let url = 'user/profile';
    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  //Remove Profile
  RemoveProfilePic: async () => {
    let url = 'user/profile/delete-pic';
    const accessToken = await AccessToken();
    return api.deleteMethod(url, accessToken);
  },
  // GET NOTIFICATION :
  Getnotification: async () => {
    let url = 'user-notification';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // UPDATE NOTIFICATION :
  UpdateNotification: async (id, data) => {
    let url = `user-notification/notification/${id}`;
    console.log('urlnnnnnnnnnnnn', url);

    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  // FORGET PASSWORD :
  Forgetpassword: async data => {
    let url = 'auth/reset-password';
    return api.postMethod(url, data);
  },
  // USER LESSON :
  UserLesson: async () => {
    let url = 'user-lesson';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // POST_USER_ANSWER :
  Getdayvideo: async item => {
    let url = `user-lesson/?day=${item}`;
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // POST_USER_LESSON :
  POST_USER_LESSON: async data => {
    let url = 'user-answer';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  // PUT_END_VIDEO :
  PUT_END_VIDEO: async (data, body) => {
    let url = `user-lesson/${data}`;
    const accessToken = await AccessToken();
    return api.putMethod(url, body, accessToken);
  },
  // GET SCORE :
  Get_Score: async () => {
    let url = 'user-answer';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET_MEMBER_SCREEN :
  Get_Coupon: async data => {
    let url = 'coupon/verify';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  Get_Member_Screen: async () => {
    let url = 'plan';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // GET RAZORPAY OPTION API :
  Get_Razorpay_Option: async data => {
    let url = 'user-plan';
    const accessToken = await AccessToken();
    return api.postMethod(url, data, accessToken);
  },
  GetnotificationList: async () => {
    let url = 'notification';
    const accessToken = await AccessToken();
    return api.getMethod(url, accessToken);
  },
  // UPLOAD PROFILE IMAGE
  Uploadprofileimg: async data => {
    let url = 'user/profile';
    const accessToken = await AccessToken();
    return api.putMethod(url, data, accessToken);
  },
  ExerciseAnswers: async data => {
    let url = 'user-exercise';
    const accessToken = await AccessToken();
    return api?.postMethod(url, data, accessToken);
  },
  Currentplan: async () => {
    let url = 'user-plan/current';
    const accessToken = await AccessToken();
    return api?.getMethod(url, accessToken);
  },
  Get_Refund_Request:async data => {
    let url = 'user-plan/request-refund';
    const accessToken = await AccessToken();
    return api?.putMethod(url, data, accessToken);
  },
  getlivesession:async () => {
    let url = 'live-session';
    const accessToken = await AccessToken();
    return api?.getMethod(url, accessToken);
  },
  getliveoptions:async (data) => {
    let url = 'user-live-session';
    const accessToken = await AccessToken();
    return api?.postMethod(url,data,accessToken);
  },
  sendotpwhatsapp : async(data) =>{
    let url = 'user/profile/whatsapp-check'
    const accessToken = await AccessToken();
    console.log("aaaa",accessToken);
    console.log("data",data);
    
    return api?.postMethod(url,data,accessToken);
  },
  otpverifywhatsapp : async(data,token) =>{
    let url = 'user/profile/whatsapp-verify'
    return api?.postMethod(url,data,token);
  },
  googleLogin:async(data)=>{
    let url = 'auth/google-login'
    return api?.postMethod(url,data);
  },
  getblogs:async()=>{
    let url = 'blog'
    return api?.getMethod(url);
  },
  getnewsandmedia:async()=>{
    let url = 'news-and-media'
    return api?.getMethod(url);
  }
};

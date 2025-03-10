import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Components/Dimensions';
import {Mulish} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';

const Blogs = ({navigation}) => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState(null);
  const getblogs = async () => {
    try {
      const Blogs = await fetchData?.getblogs();
      console.log('Blogs', Blogs);
      if (Blogs?.success == true) {
        setData(Blogs?.data);
      }
    } catch (error) {
      console.log('CATCH in BLOG', error);
    }
  };
  useEffect(() => {
    getblogs();
  }, []);
  return (
    <View
      style={{flex: 1, backgroundColor: Color?.white, padding: 10, gap: 25}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable
          style={{width: scr_width / 5}}
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
            style={{fontFamily: Mulish?.SemiBold, fontSize: 18, color: '#000'}}>
            Blogs
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            return (
              <View style={{paddingLeft: 5}}>
                <View
                  style={{
                    width: scr_width / 1.085,
                    borderRadius: 20,
                    marginBottom: 15,
                    gap: 10,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 0.1},
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 5,
                    paddingBottom: 10,
                  }}>
                  <View style={{height: scr_height / 4, borderRadius: 10}}>
                    <Image
                      source={{uri: item?.image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        // backgroundColor:"#c8c8c8"
                      }}
                    />
                  </View>
                  <View style={{marginHorizontal: 10, gap: 8}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{color: '#ed580c'}}>{item?.meta_title}</Text>
                      <Text>{moment(item?.createdAt).format('L')}</Text>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: Color?.black,
                        fontFamily: Mulish?.Bold,
                        fontSize: 16,
                      }}>
                      {item?.title}
                    </Text>
                    {/* <Text
                      numberOfLines={1}
                      style={{
                        color: '#c8c8c8',
                        fontFamily: Mulish?.Regular,
                        fontSize: 14,
                      }}>
                      {item?.meta_description}
                    </Text> */}
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingBottom: 5,
                      }}
                      onPress={() => {
                        navigation.navigate('Viewblog', {item: item});
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Mulish?.Regular,
                          color: '#3b84f6',
                        }}>
                        Read More
                      </Text>
                      <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={'arrowright'}
                        icon_color={'#3b84f6'}
                        icon_size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {index == data?.length - 1 ? (
                  <View style={{height: scr_height / 12}} />
                ) : null}
              </View>
            );
          }}
          keyExtractor={item => item?.id}
        />
      </View>
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({});

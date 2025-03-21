import {FlatList, Image, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../Global/Color';
import {scr_height, scr_width} from '../../Components/Dimensions';
import {Mulish} from '../../Global/FontFamily';
import {useNavigation} from '@react-navigation/native';
import {Iconviewcomponent} from '../../Components/Icontag';
import fetchData from '../../Config/fetchData';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
const NewsandMedia = ({navigation}) => {
   const [data, setData] = useState(null);
    const getnewsandmedia = async () => {
      try {
        const newsandmedia = await fetchData?.getnewsandmedia();
        console.log('Blogs', newsandmedia);
        if (newsandmedia?.success == true) {
          setData(newsandmedia?.data);
        }
      } catch (error) {
        console.log('CATCH in BLOG', error);
      }
    };
    useEffect(() => {
      getnewsandmedia();
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
           News and Media
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
            console.log('item', item);

            return (
              <View style={{paddingLeft:5}}>
              <View
                style={{
                  width: scr_width / 1.085,
                  borderRadius:20,
                  marginBottom: 15,
                  gap: 10,
                  backgroundColor:"#fff",
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 0.1}, 
                  shadowOpacity: 0.20,
                  shadowRadius: 4,
                  elevation: 5,
                  paddingBottom:10,
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
                    }}
                  />
                </View>
                <View style={{marginHorizontal: 10, gap: 8}}>
                  <View
                    style={{
                      flexDirection: 'row'
                    }}>
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
                  <TouchableOpacity style={{flexDirection:'row',gap:10,alignItems:'center',justifyContent:'flex-end',paddingBottom:5}}
                  onPress={()=>{
                    Linking?.openURL(item?.link)
                  }}
                  >
                    <Text style={{fontSize:14,fontFamily:Mulish?.Regular,color:'#3b84f6'}}>Read More</Text>
                    <Iconviewcomponent 
                     Icontag={"AntDesign"}
                     iconname={"arrowright"}
                     icon_color={"#3b84f6"}
                     icon_size={20}
                    />
                  </TouchableOpacity>
                </View>
                </View>
                {
                  index == data?.length-1 ?  <View  style={{height:scr_height/12}} /> : null
                }
              </View>
            );
          }}
          keyExtractor={item => item?.id}
        />
      </View>

    </View>
  );
};
export default NewsandMedia;

const styles = StyleSheet.create({});

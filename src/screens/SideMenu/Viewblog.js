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
import React from 'react'
import RenderHtml from 'react-native-render-html';
import { scr_height, scr_width } from '../../Components/Dimensions';
import { Mulish } from '../../Global/FontFamily';
import Color from '../../Global/Color';
import { Iconviewcomponent } from '../../Components/Icontag';
import moment from 'moment';


const Viewblog = ({navigation,route}) => {
    const {item} = route.params
    console.log('====================================');
    console.log("item",item);
    console.log('====================================');
  return (
    <View style={{padding: 10, backgroundColor: '#fff', flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              style={{width: scr_width / 8}}
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
                  fontSize: 16,
                  color: '#000',
                }}>
                {item?.meta_title}
              </Text>
            </View>
          </View>
          <ScrollView style={{gap: 10}} showsVerticalScrollIndicator={false}>
            <View style={{height: scr_height / 4, marginTop: 15}}>
              <Image
                source={{uri: item?.image}}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View style={{gap: 5, marginTop: 10}}>
              <Text
                style={{
                  color: Color?.black,
                  fontFamily: Mulish?.Bold,
                  fontSize: 14,
                }}>
                {item?.title}
              </Text>
              <Text
                style={{
                  color: Color?.cloudyGrey,
                  fontSize: 14,
                  fontFamily: Mulish?.Regular,
                }}>
                itemPublished:{moment(item?.createdAt).format('L')}gggg
              </Text>
              <RenderHtml
                contentWidth={scr_width}
                source={{html: item?.content}}
                
              />
            </View>
          </ScrollView>
        </View>
  )
}

export default Viewblog

const styles = StyleSheet.create({})
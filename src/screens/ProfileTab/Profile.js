//import liraries
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Animated, Text,
    StatusBar, Image,
    SafeAreaView, ImageBackground,
    TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { Iconviewcomponent } from '../../Components/Icontag';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Badge } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

// create a component
const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                hidden={false} // Hides the status bar
                backgroundColor={Color.white} // Matches background color
                translucent={true}
                barStyle={'dark-content'}
            />
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingHorizontal: 15 }}>
                <TouchableOpacity>
                    <Iconviewcomponent
                        viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                        Icontag="Ionicons"
                        icon_size={30}
                        icon_color={Color.black}
                        iconname="chevron-back"
                    />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 20, color: Color.black, fontFamily: Mulish.Bold }}>Profile</Text>
                </View>
                <TouchableOpacity
                    style={{ marginHorizontal: 10 }}
                    onPress={() => navigation.navigate('notification')}>
                    <View style={{ position: 'absolute', zIndex: 999, top: -5, right: -5 }}>
                        <Badge
                            badgeStyle={{
                                position: 'absolute',
                                zIndex: 999,
                                backgroundColor: Color.red,
                                color: Color.white,
                                // fontFamily: Manrope.Bold,
                                fontSize: 12,
                            }} maxLength={3} >
                            10
                        </Badge>
                    </View>
                    <Iconviewcomponent
                        viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
                        Icontag="Ionicons"
                        icon_size={30}
                        icon_color={Color.black}
                        iconname="notifications-outline"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default Profile;

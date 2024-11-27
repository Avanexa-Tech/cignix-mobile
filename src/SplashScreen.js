//import liraries
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Animated, Text,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Color from './Global/Color';
import { useNavigation } from '@react-navigation/native';
// import { SvgUri } from 'react-native-svg';

// create a component
const SplashScreen = () => {
    const imageScale = new Animated.Value(0.1);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const SplashLoad = setTimeout(() => {
                // getloginData();
                // getUserData();
                navigation.navigate("OnboardScreen")
                console.log("******************* LOADING ********************");

            }, 3000);
            return () => clearInterval(SplashLoad);
        } catch (error) {
            console.log('catch in splash_Screen ', error);
        }
    }, [loading]);

    Animated.timing(imageScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                hidden={true} // Hides the status bar
                backgroundColor="#0B1215" // Matches background color
                translucent={true}
            />
            <Animated.Image
                // source={{
                //     uri: 'https://shopeasey.s3.ap-south-1.amazonaws.com/mobile/assets/logos/main.png',
                // }}
                source={require('../src/assets/Logos/cignix_white.png')}
                style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B1215',
    },

    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
});

//make this component available to the app
export default SplashScreen;

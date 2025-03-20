import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { Mulish } from '../Global/FontFamily';
import common_fn from './common_fn';
import { useTranslation } from "react-i18next";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VideoPlayerWithThumbnail = ({
  videoUri,
  thumbnailUri,
  data,
  setCurrentdata,
  currentdata,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoPlayerRef = useRef(null);
  const { t } = useTranslation();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = progress => {
    setCurrentTime(progress.currentTime);
  };

  const handleLoad = meta => {
    setDuration(meta.duration);
  };

  const language = useSelector((state) => {
    return state.UserReducer.language;
  });

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Function to get dynamic styles based on data
  const getDynamicStyles = () => {
    return {
      recentButton: {
        position: 'absolute',
        left: data?._id === currentdata?._id ? screenWidth * 0.3 : (language === 'ta' || language === 'ma' ? screenWidth * 0.1 : screenWidth * 0.2),
        top: screenHeight * 0.35,
        backgroundColor: '#fff',
        padding: screenWidth * 0.025, // Responsive padding
        alignItems: 'center',
        borderRadius: 20,
      },
      buttonText: {
        fontSize: screenWidth * 0.035, // Responsive font size
        fontFamily: Mulish.Bold,
        color: '#000',
      },
    };
  };

  const dynamicStyles = getDynamicStyles();

  return (
    <View style={styles.container}>
      {!isPlaying && (
        <Pressable
          style={styles.thumbnailContainer}
          onPress={() => {
            if (data?.status === 'active' || data?.status === 'completed') {
              setCurrentdata(data);
            } else {
              common_fn.showToast('This video is locked');
            }
          }}>
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
          {data?.status === 'inactive' ? (
            <View style={styles.lockIcon}>
              <FontAwesome name="lock" size={20} color="#000" />
            </View>
          ) : data?.status === 'completed' ? (
            <Pressable style={styles.completedButton} onPress={() => {
              if (data?.status === 'active' || data?.status === 'completed') {
                setCurrentdata(data);
              } else {
                common_fn.showToast('This video is locked');
              }
            }}>
              <Text style={styles.buttonText}>
                {data?._id === currentdata?._id ? t('Homescreen.Current') : t('Homescreen.Watched')}
              </Text>
            </Pressable>
          ) : (
            <Pressable style={dynamicStyles.recentButton} onPress={() => {
              if (data?.status === 'active' || data?.status === 'completed') {
                setCurrentdata(data);
              } else {
                common_fn.showToast('This video is locked');
              }
            }}>
              <Text style={dynamicStyles.buttonText}>
                {data?._id === currentdata?._id ? t('Homescreen.Current') : t('Homescreen.Recently Unlocked')}
              </Text>
            </Pressable>
          )}
        </Pressable>
      )}
      {isPlaying && (
        <>
          <Video
            ref={videoPlayerRef}
            source={{ uri: videoUri }}
            style={styles.video}
            controls={false}
            paused={!isPlaying}
            onProgress={handleProgress}
            onLoad={handleLoad}
            resizeMode="contain"
          />
          <View style={styles.controls}>
            <TouchableOpacity onPress={togglePlayPause}>
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size={30}
                color="#FFF"
              />
            </TouchableOpacity>

            <Text style={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  thumbnailContainer: {
    width: screenWidth,
    height: screenHeight * 0.5,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: screenWidth * 0.02, 
    borderRadius: 5,
  },
  time: {
    color: '#FFF',
    fontSize: screenWidth * 0.04,
  },
  lockIcon: {
    position: 'absolute',
    left: '40%',
    top: '35%',
    backgroundColor: '#fff',
    padding: 13,
    alignItems: 'center',
    borderRadius: 100,
  },
  completedButton: {
    position: 'absolute',
    left: '30%',
    top: '35%',
    backgroundColor: '#fff',
    padding: screenWidth * 0.025, 
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default VideoPlayerWithThumbnail;
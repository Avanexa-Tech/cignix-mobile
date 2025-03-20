import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Global/Color';
import common_fn from './common_fn';
 
import Orientation from 'react-native-orientation-locker';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
 
const {width} = Dimensions.get('window');

const Videoplayercomponent = ({
  source,
  cancel,
  onEnds,
  Videoendfun,
  currentdata,
  navigation
}) => {
  const language = useSelector((state) => {
    console.log('==================state values===>', state);
    return state.UserReducer.language;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0.1);
  const [paused, setPaused] = useState(true);
  const [overlay, setOverlay] = useState(false);
  const [loader, setLoader] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
 
  const videoRef = useRef(null);
  const overlayTimer = useRef(null);
  const lastTap = useRef(null);
 
  useEffect(() => {
    if (videoRef.current) {
      setPaused(true);
      setCurrentTime(0);
      videoRef?.current?.seek(0);
      setLoader(false);
     
      setTimeout(() => {
        setPaused(false);  
      }, 500);  
    }
  }, [currentdata]);
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setPaused(true);
      };
    }, [language])
  );
  const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      clearTimeout(30);
      doubleTapCallback();
    } else {
      lastTap.current = now;
      const timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  };
 
  const getTime = t => {
    const digit = n => (n < 10 ? `0${n}` : `${n}`);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return hr + ':' + min + ':' + sec;
  };  
 
  const load = ({duration}) => {
    console.log("duration",duration);
    setDuration(duration), setLoader(false)
  };
 
  const progress = ({currentTime}) => {
    // const exercises = currentdata?.lesson_details?.exercise || [];
    // const targetTime = Math.floor(currentTime);
        // const data = exercises?.find(item => item?.time == targetTime);
        // if(data)
        // {
        //   console.log('====>llll<===',data);  
        // }
    setCurrentTime(currentTime);
    if (Math?.round(currentTime) === Math?.round(duration - 0.025)) {
      console.log('Video has ended');
      console.log('Current', currentdata?.status);
      if (currentdata?.status == 'active') {
        Videoendfun(currentdata);
      } else {
        console.log('Video Already apply a Feedback', currentdata);
        // Videoendfun(currentdata);
      }
      setPaused(!paused);
      setCurrentTime(0);
      videoRef.current.seek(0);
    }
  };
 
  const backward = () => {
    if (Math.round(currentTime) >= 5) {
      videoRef.current.seek(currentTime - 5);
      clearTimeout(timer);
      overlayTimer = setTimeout(() => setOverlay(false), 3000);
    } else {
      common_fn?.showToast("You can't go backward");
    }
  };
 
  const forward = () => {
    common_fn?.showToast("You can't go forward");
  };
 
  const onslide = slide => {
    videoRef.current.seek(slide * duration);
    // clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setOverlay(false), 10000);
  };
 
  const youtubeSeekLeft = () => {
    handleDoubleTap(
      () => {
        videoRef.current.seek(currentTime - 5);
      },
      () => {
        setOverlay(true);
        overlayTimer = setTimeout(() => setOverlay(false), 3000);
      },
    );
  };
 
  const youtubeSeekRight = () => {
    handleDoubleTap(
      () => {
        videoRef.current.seek(currentTime + 5);
      },
      () => {
        setOverlay(true);
        overlayTimer = setTimeout(() => setOverlay(false), 3000);
      },
    );
  };
 
  const handleFullscreen = () => {
    const newFullscreen = !fullscreen;
    console.log('newFullscreen', newFullscreen);
 
    if (newFullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
    setFullscreen(newFullscreen);
  };
 
  return (
    <View style={style.container}>
      <View style={{position: 'absolute', top: 20, left: 20}}>
        <TouchableOpacity
          onPress={() => {
            cancel(false);
          }}>
          <AntDesign name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={fullscreen ? style.fullscreenVideo : style.video}>
       
        <Video
          fullscreen={fullscreen}
          paused={paused}
          ref={videoRef}
          source={{uri: source}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoad={load}
          onProgress={progress}
          controls={false}
          onFullscreenPlayerDidDismiss={handleFullscreen}
          // onEnd={text => {
          //     if (currentdata?.status !== 'completed') {
          //         console.log("Data",currentdata);
 
          //         Videoendfun(currentdata);
          //     }
          //     console.log("G  Video has ended");
 
          //   }}
        />
 
        {!loader ? (
          <View style={style.overlay}>
            {overlay ? (
              <View style={{...style.overlaySet, backgroundColor: '#0006'}}>
                {/* {
                                    Math.round(currentTime) > 5 ? (
                                        <Icons name="replay-5" style={style.icon} onPress={backward} />
                                    ):null
                                } */}
                <Icons name="replay-5" style={style.icon} onPress={backward} />
                {console.log('duration', Math.round(duration))}
                <Icon
                  name={paused ? 'play' : 'pause'}
                  style={style.icon}
                  onPress={() => setPaused(!paused)}
                />
 
                <Icons name="forward-5" style={style.icon} onPress={forward} />
 
                <View style={style.sliderCont}>
                  <View style={style.timer}>
                    <Text style={{color: 'white'}}>{getTime(currentTime)}</Text>
                    <Text style={{color: 'white'}}>
                      {getTime(duration)}{' '}
                      <TouchableOpacity
                        style={{marginLeft: 5}}
                        onPress={handleFullscreen}>
                        <Icon
                          //   onPress={handleFullscreen}
                          name={fullscreen ? 'compress' : 'expand'}
                          style={{
                            fontSize: 13,
                            marginLeft: 5,
                            zindex: 100,
                            color: 'white',
                          }}
                        />
                      </TouchableOpacity>
                    </Text>
                  </View>
                  {/* <Slider
                    maximumTrackTintColor="white"
                    minimumTrackTintColor="white"
                    thumbTintColor="white"
                    value={currentTime / duration}
                    onValueChange={onslide}
                  /> */}
                </View>
              </View>
            ) : (
              <View style={style.overlaySet}>
                <TouchableNativeFeedback
                  onPress={() => {
                    setOverlay(true),
                      setTimeout(() => {
                        setOverlay(false);
                      }, 3000);
                  }}>
                  <View style={{flex: 1}} />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={() => {
                    setOverlay(true),
                      setTimeout(() => {
                        setOverlay(false);
                      }, 3000);
                  }}>
                  <View style={{flex: 1}} />
                </TouchableNativeFeedback>
              </View>
            )}
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Color?.white} />
          </View>
        )}
      </View>
    </View>
  );
};
 
const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  video: {...StyleSheet.absoluteFillObject},
  fullscreenVideo: {
    backgroundColor: '#000',
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
});
 
export default Videoplayercomponent;
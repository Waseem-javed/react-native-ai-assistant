import React, {useEffect, useRef, useState} from 'react';
import Voice from '@react-native-community/voice';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Tts from 'react-native-tts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Features from '../components/Features';
import {apiCall} from '../apis/openai/openai';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef();

  const speechStartHandler = e => {
    console.log('Starter', e);
  };
  const speechEndHandler = e => {
    console.log('End', e);
  };
  const speechResultsHandler = e => {
    setRecording();
    setResult(e.value[0]);
  };

  const speechErrorHandler = e => {
    console.log('voice error event', e);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    //tts
    Tts.addEventListener('tts-start', event => console.log('start', event));
    Tts.addEventListener('tts-finish', event => {
      console.log('finish', event), setSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    setRecording(true);
    Tts.stop();
    try {
      await Voice.start('en-GB'); // en-US
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);

      //   fetch responses
      fetchResponse();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResponse = () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);
      updateScrollView();
      setLoading(true);
      apiCall(result.trimEnd(), newMessages).then(res => {
        setLoading(false);
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
          setResult('');
          startTextToSpeech(res.data.length - 1);
        } else {
          Alert.alert('Error', res.msg);
        }
      });
    }
  };

  const startTextToSpeech = message => {
    if (!message.content.includes('https')) {
      Tts.speak('Welcome this is text to speech dummy test!', {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 200);
  };

  const clear = () => {
    setMessages([]);
    Tts.stop();
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  return (
    <View className="flex-1 bg-white-100">
      <SafeAreaView className="flex-1 flex justify-evenly mx-5">
        {/* bot logo */}
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/rebot.png')}
            style={{height: hp(15), width: hp(15)}}
          />
        </View>

        {/* features  || messages */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              style={{fontSize: wp(5)}}
              className="text-cyan-700 font-semibold ml-1">
              Assistant
            </Text>
            <View
              className="bg-neutral-200 rounded-3xl p-4"
              style={{height: hp(58)}}>
              <ScrollView
                ref={scrollViewRef}
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}>
                {messages.map((msg, index) => {
                  if (msg.role === 'assistant') {
                    if (msg.content.includes('https')) {
                      // its an image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View
                            style={{width: wp(70)}}
                            className="p-2 flex bg-cyan-600 rounded-xl rounded-tl-none">
                            <Image
                              source={{uri: msg.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60)}}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      // text response
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="bg-cyan-600 rounded-xl rounded-tl-none p-2">
                            <Text className="text-white">{msg.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  } else {
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View className="bg-white rounded-xl rounded-tr-none p-2">
                          <Text>{msg.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}

        <View className="flex justify-center items-center flex-end">
          {/* when recording starter and animated mic button
              animated gif when recording start
          */}
          {loading ? (
            <Image
              className="rounded-full mb-1"
              source={require('../../assets/images/mic.gif')}
              style={{width: hp(10), height: hp(10)}}
            />
          ) : recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                className="rounded-full mb-1"
                source={require('../../assets/images/mic.gif')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                className="rounded-full mb-2"
                source={require('../../assets/images/mic-2.png')}
                style={{width: hp(12), height: hp(12)}}
              />
            </TouchableOpacity>
          )}
          {/* clear messages */}
          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-12">
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}

          {/* stop recording */}
          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-12">
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

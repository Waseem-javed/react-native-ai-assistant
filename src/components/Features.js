import React from 'react';
import {Image, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Features = () => {
  return (
    <View style={{height: hp(70)}} className="space-y-4">
      <Text style={{fontSize: wp(6.5)}} className="font-semibold text-cyan-600">
        Features
      </Text>
      <View className="bg-emerald-600 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assets/images/gptIcon.png')}
            style={{height: hp(5), width: hp(5)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-white mx-1">
            ChatGPT
          </Text>
        </View>
        <Text
          style={{fontSize: wp(3.1)}}
          className="text-gray-200 text-justify font-medium mx-1">
          ChatGPT is an AI-powered language model developed by OpenAI that can
          understand and generate human-like text based on the input it receives
        </Text>
      </View>
      <View className="bg-gray-700 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assets/images/dall-e.png')}
            style={{height: hp(5), width: hp(5)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-white mx-1">
            DALL-E
          </Text>
        </View>
        <Text
          style={{fontSize: wp(3.1)}}
          className="text-gray-200 text-justify font-medium mx-1">
          DALL·E is an Open AI model by OpenAI that generates diverse and
          imaginative images from textual descriptions.
        </Text>
      </View>
      <View className="bg-cyan-600 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require('../../assets/images/smart-ai.png')}
            style={{height: hp(5), width: hp(5)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-white mx-1">
            Smart AI
          </Text>
        </View>
        <Text
          style={{fontSize: wp(3.1)}}
          className="text-gray-200 text-justify font-medium mx-1">
          Smart-AI is the combination of ChatGPT & DALL-E that denotes advanced
          artificial intelligence systems with sophisticated learning and
          problem-solving capabilities.
        </Text>
      </View>
    </View>
  );
};

export default Features;

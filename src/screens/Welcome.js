import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-around items-center bg-white">
      <View className="space-y-2">
        <Text
          style={{fontSize: wp(10)}}
          className="text-center font-bold text-cyan-600">
          Welcome
        </Text>
        <Text
          style={{fontSize: wp(4)}}
          className="text-center tracking-wider text-cyan-600 semi-bold">
          Prompt Future Assistant, By AI!
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../../assets/images/bot.png')}
          style={{width: wp(70), height: wp(70)}}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-cyan-600 mx-5 p-4 rounded-full"
        style={{width: hp(35)}}>
        <Text
          style={{fontSize: wp(5)}}
          className="text-white font-bold text-center">
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Welcome;

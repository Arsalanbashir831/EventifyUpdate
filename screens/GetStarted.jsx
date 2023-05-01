import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const GetStarted = () => {
  const navigation = useNavigation();

  const signup = () => {
    navigation.navigate("Signup");
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      className="flex-1"
      source={require("../assets/background-image.jpg")}
    >
      <LinearGradient
        className="flex-1"
        colors={["rgba(191,90,224,0.75)", "rgba(168,17,218,0.75)"]}
      >
        <View className="flex-1 items-center px-8">
          <View className="flex-1 justify-between py-20">
            <Image source={require("../assets/Logo.png")} />
            <View className="w-full">
              <Text className="text-white font-light text-center text-3xl uppercase">
                Discover whats
              </Text>
              <Text className="text-white font-bold text-center text-5xl uppercase">
                happening
              </Text>
              <TouchableOpacity onPress={signup}>
                <LinearGradient
                  className="rounded-2xl mt-4"
                  colors={[
                    "rgba(161, 255, 206, 0.6)",
                    "rgba(250, 255, 209, 0.6)",
                  ]}
                >
                  <View className="flex-row items-center justify-center space-x-2">
                    <Text className="text-center py-3 text-xl text-white">
                      Get Started
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row mb-6 space-x-2">
            <Text className="text-white">Already have an account?</Text>
            <TouchableOpacity onPress={goToLogin}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GetStarted;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { StatusBar } from "react-native";
import { Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Menu = () => {
  const {
    params: { user },
  } = useRoute();
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile");
  };
  const goToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <LinearGradient
      className="flex-1"
      colors={["rgba(191,90,224,100)", "rgba(168,17,218,100)"]}
    >
      <View style={styles.container} className="mx-5">
        <View className="flex-row justify-between items-center mt-12 mb-7">
          <TouchableOpacity onPress={goToHome}>
            <Image className="h-7 w-7" source={require("../assets/back.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToProfile}>
            <View className="rounded-full border-2 border-white">
              <Image
                className="w-8 h-8 rounded-full"
                source={{ uri: user.image }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View className="mx-2">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddEvent");
            }}
          >
            <Text className="text-white text-4xl font-medium mb-2">
              Add Event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white text-4xl font-medium mb-2">
              Buddies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white text-4xl font-medium">Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default Menu;

import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import CheckBox from "react-native-check-box";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";



const Login = () => {
  const [isChecked, setIsChecked] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const toggleIsChecked = () => {
    setIsChecked(!isChecked);
  };

  const navigation = useNavigation();
  const goToSignUp = () => {
    navigation.navigate("Signup");
  };

  const login = async () => {
    if (email === "admin" && password === "admin") {
      navigation.navigate("Admin");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Signed in user email:", user.email);
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login failed:", errorMessage);
      });
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
        <View className="flex-1 justify-center items-center px-4">
          <Image source={require("../assets/Logo.png")} />
          <View className="w-full">
            <Text className="text-white text-3xl mt-10">Welcome back!</Text>
            <Text className="text-gray-200">
              Welcome! Please enter your details.
            </Text>
            <Text className="text-white text-lg mt-5">Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1 text-lg"
            ></TextInput>
            <Text className="text-white text-lg mt-3">Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1"
            ></TextInput>
            <View className="flex-row items-center mt-3 space-x-1">
              <CheckBox
                isChecked={isChecked}
                onClick={toggleIsChecked}
                checkBoxColor={"#FFF"}
              />
              <Text className="text-white flex-1">Remember for 30 days</Text>
              <Text>Forgot Password</Text>
            </View>
            <TouchableOpacity
              onPress={login}
              className="bg-[#512DA8] rounded-2xl mt-7"
            >
              <Text className="text-center py-3 text-lg text-white">
                Sign in
              </Text>
            </TouchableOpacity>
           
          </View>
          <View className="flex-row mt-3 space-x-2">
            <Text className="text-white">Don't have an account?</Text>
            <TouchableOpacity onPress={goToSignUp}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Login;
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
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, signInWithGoogle } from "./config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isChecked, setIsChecked] = useState();
  const toggleIsChecked = () => {
    setIsChecked(!isChecked);
  };

  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const handleChange = (name, value) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const Register = async () => {
    try {
      const { email, password, username } = user;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(async (cred) => {
        await setDoc(doc(db, "users", cred.user.uid), {
          username,
          buddies: [],
          firstName: "",
          lastName: "",
          cnic: "",
          phone: "",
          score: 0,
          email: email,
          image:
            "https://firebasestorage.googleapis.com/v0/b/eventify-86b12.appspot.com/o/user_318-159711.webp?alt=media&token=43cd37a5-38ba-4d16-96de-633ac62deb84",
        });
      });
      console.log(userCredential);
      setUser({ ...user, email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error(error);
    }
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
            <Text className="text-white text-lg mt-5">Username</Text>
            <TextInput
              name="username"
              value={user.username}
              onChangeText={(value) => handleChange("username", value)}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1 text-lg"
            ></TextInput>
            <Text className="text-white text-lg mt-3">Email</Text>
            <TextInput
              name="email"
              value={user.email}
              onChangeText={(value) => handleChange("email", value)}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1 text-lg"
            ></TextInput>
            <Text className="text-white text-lg mt-3">Password</Text>
            <TextInput
              name="password"
              value={user.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry={true}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1"
            ></TextInput>
            <Text className="text-white mt-1 text-xs">
              Password must have 8 characters and a symbol
            </Text>
            <Text className="text-white text-lg mt-3">Confirm Password</Text>
            <TextInput
              name="confirmPassword"
              value={user.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              secureTextEntry={true}
              className="bg-gray-200 rounded-md py-2 px-3 mt-1"
            />
            <TouchableOpacity
              onPress={Register}
              className="bg-[#512DA8] rounded-2xl mt-7"
            >
              <Text className="text-center py-3 text-lg text-white">
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signInWithGoogle}>
              <LinearGradient
                className="rounded-2xl mt-3"
                colors={["rgba(194,229,156,0.5)", "rgba(100,179,224,0.5)"]}
              >
                <View className="flex-row items-center justify-center space-x-2">
                  <Image
                    className="w-7 h-7"
                    source={require("../assets/google.png")}
                  ></Image>
                  <Text className="text-center py-3 text-lg text-white">
                    Sign up with Google
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View className="flex-row mt-3 space-x-2">
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

export default Signup;

import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../store";

const AddEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    price: "",
    duration: "",
    venue: "",
    description: "",
    longitude: "",
    latitude: "",
    header: "",
    gallery: [],
    people: [],
    score: 0,
  });

  const handleChange = (name, value) => {
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const navigation = useNavigation();
  const collectionRef = collection(db, "events");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const upload = async () => {
    if (event.title == "") {
      Alert.alert("Upload", "Please enter title");
      return;
    }
    if (event.price == "") {
      Alert.alert("Upload", "Please enter price");
      return;
    }
    if (event.duration == "") {
      Alert.alert("Upload", "Please enter duration");
      return;
    }
    if (event.venue == "") {
      Alert.alert("Upload", "Please enter location");
      return;
    }
    if (event.longitude == "") {
      Alert.alert("Upload", "Please enter Longitude");
      return;
    }
    if (event.latitude == "") {
      Alert.alert("Upload", "Please enter Latitude");
      return;
    }
    if (event.description == "") {
      Alert.alert("Upload", "Please enter description");
      return;
    }
    if (event.header == "") {
      Alert.alert("Upload", "Please upload header photo");
      return;
    }
    if (event.gallery.length == 0) {
      Alert.alert("Upload", "Please upload gallery photos");
      return;
    }
    let uploadData = { ...event };
    uploadData.price = Number(event.price);
    uploadData.duration = Number(event.duration);
    uploadData.location = {
      longitude: Number(event.longitude),
      latitude: Number(event.latitude),
    };
    await addDoc(collectionRef, uploadData);
    Alert.alert("Upload", "Event uploaded");
    dispatch(login(user));
    navigation.navigate("Home");
  };

  const headerInput = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (result == null) return;
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();
    const filename = result.assets[0].uri.substring(
      result.assets[0].uri.lastIndexOf("/") + 1
    );
    const imageRef = ref(storage, `images/${filename}`);
    uploadBytes(imageRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const update = { ...event };
        update.header = url;
        setEvent(update);
      });
    });
  };
  const galleryInput = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });
    if (result.assets.length !== 3) {
      Alert.alert("Upload Gallery", "Please select 3 images");
      return;
    }
    let gallery = [];
    result.assets.forEach((asset) => {
      const uploadImage = async () => {
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        const filename = asset.uri.substring(asset.uri.lastIndexOf("/") + 1);
        const imageRef = ref(storage, `images/${filename}`);
        uploadBytes(imageRef, blob).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            gallery.push(url);
          });
        });
      };
      uploadImage();
    });
    setEvent({
      ...event,
      ["gallery"]: gallery,
    });
  };

  return (
    <LinearGradient
      className="flex-1"
      colors={["rgba(191,90,224,100)", "rgba(168,17,218,100)"]}
    >
      <View className="flex-1 px-4">
        <View className="w-full justify-center flex-1">
          <Text className="text-white text-4xl text-center mt-4">
            Add Event
          </Text>
          <Text className="text-white text-lg mt-4">Title</Text>
          <TextInput
            name="title"
            value={event.title}
            onChangeText={(value) => handleChange("title", value)}
            className="bg-gray-200 rounded-md py-2 px-3 mt-1 text-lg"
          ></TextInput>
          <Text className="text-white text-lg mt-1">Price</Text>
          <TextInput
            name="price"
            value={event.price}
            onChangeText={(value) => handleChange("price", value)}
            keyboardType="numeric"
            className="bg-gray-200 rounded-md py-2 px-3 mt-1"
          ></TextInput>
          <Text className="text-white text-lg mt-1">Duration</Text>
          <TextInput
            name="duration"
            value={event.duration}
            onChangeText={(value) => handleChange("duration", value)}
            keyboardType="numeric"
            placeholder="hours"
            className="bg-gray-200 rounded-md py-2 px-3 mt-1"
          ></TextInput>
          <Text className="text-white text-lg mt-1">Venue</Text>
          <TextInput
            value={event.venue}
            onChangeText={(value) => handleChange("venue", value)}
            name="venue"
            className="bg-gray-200 rounded-md py-2 px-3 mt-1"
          ></TextInput>
          <View className="flex-row space-x-3">
            <View className="flex-1">
              <Text className="text-white text-lg mt-1">Latitude</Text>
              <TextInput
                name="latitude"
                value={event.latitude}
                onChangeText={(value) => handleChange("latitude", value)}
                keyboardType="numeric"
                className="bg-gray-200 rounded-md py-2 px-3 mt-1"
              ></TextInput>
            </View>
            <View className="flex-1">
              <Text className="text-white text-lg mt-1">Longitude</Text>
              <TextInput
                name="longitude"
                value={event.longitude}
                onChangeText={(value) => handleChange("longitude", value)}
                keyboardType="numeric"
                className="bg-gray-200 w-full rounded-md py-2 px-3 mt-1"
              ></TextInput>
            </View>
          </View>
          <Text className="text-white text-lg mt-1">Description</Text>
          <TextInput
            name="description"
            value={event.descrtiption}
            onChangeText={(value) => handleChange("description", value)}
            multiline={true}
            className="bg-gray-200 rounded-md py-3 px-3 mt-1 h-24"
            style={{ textAlignVertical: "top" }}
          ></TextInput>
          <View className="flex-row space-x-4 mt-1">
            <View>
              <Text className="text-white text-lg mt-1">Header</Text>
              <TouchableOpacity onPress={headerInput}>
                <View className="flex-row">
                  <Text className="bg-[#512DA8] py-2 px-4 mt-1 rounded-xl text-white">
                    Select Photo
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-white text-lg mt-1">Gallery</Text>
              <TouchableOpacity onPress={galleryInput}>
                <View className="flex-row">
                  <Text className="bg-[#512DA8] py-2 px-4 mt-1 rounded-xl text-white">
                    Select 3 Photos
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* sign up button */}
          <TouchableOpacity
            onPress={upload}
            className="bg-[#512DA8] rounded-2xl mt-6"
          >
            <Text className="text-center py-3 text-lg text-white">Upload</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default AddEvent;

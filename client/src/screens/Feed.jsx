import { View, Text, Pressable, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { isLoaded, useFonts } from "expo-font";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { DMSans_400Regular, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import EStyleSheet from "react-native-extended-stylesheet";

import { useAppContext } from "../context/appContext";
import { FormRow, RoundButton } from "../components";

const initialState = {
  chatPrompt: "",
  chatResponse: "",
};

const Feed = ({ navigation }) => {
  const [values, setValues] = useState(initialState);
  const {
    user,
    displayAlert,
    logoutUser,
    submitPrompt,
    chatResponse,
    isLoading,
  } = useAppContext();

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { chatPrompt } = values;
    if (!chatPrompt) {
      displayAlert();
      return;
    }
    submitPrompt({ chatPrompt });
  };

  const onLogout = () => {
    logoutUser();
    navigation.navigate("Landing");
  };

  // fonts
  let [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSans_400Regular,
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{`Hello, ${user.username}`}</Text>
      </View>
      <View style={styles.chatContainer}>
        <Text style={styles.chatInstructions}>Please enter a prompt:</Text>
        <FormRow
          name="ChatPrompt"
          handleChange={handleChange}
          value={values.chatPrompt}
          useTitle={false}
        />
        <Pressable onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>
            {isLoading ? "Please wait..." : "Submit"}
          </Text>
        </Pressable>
        <Pressable onPress={onLogout} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Logout</Text>
        </Pressable>
        <Text style={styles.chatResponse}>{chatResponse}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Feed;

const entireScreenWidth = Dimensions.get("window").width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: "48rem",
    fontFamily: "DMSerifDisplay_400Regular",
  },
  chatContainer: {
    flex: 1,
    width: "100%",
    rowGap: 20,
    paddingHorizontal: 20,
  },
  chatInstructions: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  chatResponse: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  submitButton: {
    height: 57,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 17,
    fontFamily: "DMSans_700Bold",
  },
});

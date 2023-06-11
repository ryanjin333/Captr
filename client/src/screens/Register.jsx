import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { DMSans_400Regular, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import { useAppContext } from "../context/appContext";

import { FormRow, RoundButton } from "../components";

const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = ({ navigation }) => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, isMember } = values;
    if (!email || !password || (!isMember && !username)) {
      displayAlert();
      return;
    }
    const currentUser = { username, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      try {
        registerUser(currentUser);
      } catch (error) {
        console.error("The error");
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigation.navigate("Feed");
    }
  }, [user]);
  // fonts
  let [fontsLoaded] = useFonts({
    DMSerifDisplay_400Regular,
    DMSans_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {values.isMember ? "Log in" : "Sign up"}
        </Text>
      </View>
      <View style={styles.form}>
        {!values.isMember && (
          <FormRow
            name="Username"
            handleChange={handleChange}
            value={values.username}
          />
        )}
        <FormRow
          name="Email"
          handleChange={handleChange}
          value={values.email}
        />
        <FormRow
          name="Password"
          isPassword={true}
          handleChange={handleChange}
          value={values.password}
        />
      </View>
      <RoundButton
        title={values.isMember ? "Log in" : "Create Account"}
        onSubmit={onSubmit}
      />
      <View style={styles.toggleMember}>
        <Text
          style={{
            color: "#D6D6D6",
            fontFamily: "DMSans_400Regular",
            fontSize: 14,
          }}
        >
          {values.isMember ? "Not a member yet? " : "Already a member? "}
        </Text>
        <Pressable onPress={toggleMember}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "DMSans_700Bold",
              fontSize: 14,
            }}
          >
            {values.isMember ? "Register" : "Login"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  titleContainer: {
    paddingHorizontal: 20,
    rowGap: 20,
    marginTop: 25,
    width: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 48,
    fontFamily: "DMSerifDisplay_400Regular",
  },
  form: {
    width: "100%",
    rowGap: 25,
    marginVertical: 55,
    paddingHorizontal: 20,
  },
  toggleMember: {
    marginTop: 25,
    flexDirection: "row",
  },
});

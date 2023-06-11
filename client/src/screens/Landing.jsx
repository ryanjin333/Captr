import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";

import landing from "../assets/images/landing.png";
import { RoundButton } from "../components";
import { useAppContext } from "../context/appContext";

const Landing = ({ navigation }) => {
  const { user } = useAppContext();
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
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Captr helps you with photo ideas through AI suggestions
        </Text>
      </View>
      <Image style={styles.landingImage} source={landing} />
      <RoundButton title="Continue" navigateTo="Register" />
    </SafeAreaView>
  );
};

export default Landing;

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
  subtitle: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  landingImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 567,
    height: 346,
    resizeMode: "contain",
    marginVertical: 120,
  },
});

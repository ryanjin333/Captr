import { Text, Pressable, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import { useNavigation } from "@react-navigation/native";

const RoundButton = ({ title, navigateTo, onSubmit }) => {
  // navigation
  const navigation = useNavigation();
  // fonts
  let [fontsLoaded] = useFonts({
    DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "rgb(181, 181, 181)" : "white",
          },
          styles.btn,
        ]}
        title={title}
        onPress={
          onSubmit
            ? onSubmit
            : () => {
                navigation.navigate(navigateTo);
              }
        }
      >
        <Text style={styles.btnText}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  btn: {
    height: 57,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#000",
    fontSize: 17,
    fontFamily: "DMSans_700Bold",
  },
});

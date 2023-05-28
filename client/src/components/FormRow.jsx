import { View, Text, TextInput, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";

const FormRow = ({ name, value, isPassword, handleChange, useTitle }) => {
  // fonts
  let [fontsLoaded] = useFonts({
    DMSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      {useTitle ?? <Text style={styles.name}>{name}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor="#2C2C2C"
        secureTextEntry={isPassword ? true : false}
        onChangeText={(value) =>
          handleChange(value, name.charAt(0).toLowerCase() + name.slice(1))
        }
        value={value}
      />
    </View>
  );
};

export default FormRow;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  name: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 15,
    marginBottom: 10,
    fontFamily: "DMSans_400Regular",
  },
  input: {
    height: 57,
    fontSize: 15,
    backgroundColor: "#181818",
    color: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2C2C2C",
    width: "100%",
    paddingHorizontal: 20,
    fontFamily: "DMSans_400Regular",
  },
});

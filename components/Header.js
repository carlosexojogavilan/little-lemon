import { View, Text, Image, StyleSheet } from "react-native";
import littleLemonLogo from "../assets/images/Logo.png";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={littleLemonLogo} alt="Little Lemon Logo"></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#EDEFEE",
  },
});

export default Header;

import { View, Image, StyleSheet } from "react-native";
import littleLemonLogo from "../assets/images/Logo.png";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={littleLemonLogo} alt="Little Lemon Logo" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default Header;

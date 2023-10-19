import { View, Text, Image, StyleSheet } from "react-native";
import littleLemonLogo from "../assets/images/Logo.png";

const Header = ({ profileImg }) => {
  return (
    <View style={profileImg ? styles.profileContainer : styles.container}>
      <Image source={littleLemonLogo} alt="Little Lemon Logo"></Image>
      {profileImg && <Image source={profileImg} style={styles.profilePic} />}
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
  profileContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  profilePic: {
    height: 50,
    width: 50,
  },
});

export default Header;

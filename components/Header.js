import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import littleLemonLogo from "../assets/images/Logo.png";
import defaultProfilePic from "../assets/images/Profile.png";
import { useNavigation } from "@react-navigation/native";

const Header = ({ profileImg }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.profileContainer}>
      <Image source={littleLemonLogo} alt="Little Lemon Logo"></Image>
      {profileImg ? (
        <Image source={{ uri: profileImg }} style={styles.profilePic} />
      ) : (
        <Pressable>
          <Image source={defaultProfilePic} style={styles.profilePic} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  profilePic: {
    height: 50,
    width: 50,
  },
});

export default Header;

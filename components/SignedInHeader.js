import { View, Image, StyleSheet, Pressable } from "react-native";
import littleLemonLogo from "../assets/images/Logo.png";
import defaultProfilePic from "../assets/images/Profile.png";
import { useNavigation } from "@react-navigation/native";

const SignedInHeader = ({ profilePic }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={littleLemonLogo} alt="Little Lemon Logo" />
      <Pressable onPress={() => navigation.navigate("Profile")}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <Image source={defaultProfilePic} style={styles.profilePic} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
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

export default SignedInHeader;

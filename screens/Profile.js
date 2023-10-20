import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import Header from "../components/Header";
import ProfileInfoForm from "../components/ProfileInfoForm";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ onLogout }) => {
  const [profilePic, setProfilePic] = useState();

  const changeProfilePic = (newPic) => {
    setProfilePic(newPic);
  };

  useEffect(() => {
    const getProfilePic = async () => {
      try {
        const value = await AsyncStorage.getItem("profilePic");
        if (value !== null) {
          setProfilePic(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getProfilePic();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header profileImg={profilePic} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Personal Information</Text>
        <ProfileInfoForm changeProfilePic={changeProfilePic} />
        <Pressable style={styles.btn} onPress={onLogout}>
          <Text style={styles.btnText}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flex: 1,
  },
  btn: {
    backgroundColor: "#f4ce14",
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: "auto",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C7A709",
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Profile;

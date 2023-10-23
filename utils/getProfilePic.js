import AsyncStorage from "@react-native-async-storage/async-storage";

const getProfilePic = async () => {
  try {
    const value = await AsyncStorage.getItem("profilePic");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export default getProfilePic;

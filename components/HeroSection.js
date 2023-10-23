import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import heroImage from "../assets/images/HeroImage.png";

const HeroSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textImageContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.text}>
            We are a little family owned Mediterranean restaurant, focused on
            traditional recipies served with a modern twist.
          </Text>
        </View>
        <Image source={heroImage} style={styles.image}></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4d5d57",
    paddingVertical: 26,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#f4ce14",
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
    marginBottom: 20,
  },
  textImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
  image: {
    height: 80,
    width: 80,
  },
  input: {
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
  },
});

export default HeroSection;

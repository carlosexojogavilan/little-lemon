import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";

import { Text, StyleSheet, SafeAreaView } from "react-native";

const Onboarding = ({ signIn }) => {
  const goToProfile = () => {
    signIn();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Let us get to know you</Text>
      <RegisterForm goToProfile={goToProfile} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    fontWeight: "600",
    color: "#333333",
  },
});

export default Onboarding;

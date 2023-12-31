import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Pressable,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik } from "formik";

const RegisterForm = ({ goToProfile }) => {
  const validateForm = ({ firstName, email }) => {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(firstName)) {
      errors.firstName = "First name should only contain alphabets and spaces";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  const handleRegister = async (values) => {
    const keyValuePairs = Object.entries(values);
    try {
      await AsyncStorage.multiSet(keyValuePairs, (error) => console.log(error));
      goToProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ firstName: "", email: "" }}
      validate={validateForm}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorMessage}>{errors.firstName}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
          </View>
          <Pressable
            style={[styles.btn, { opacity: isValid ? 1 : 0.5 }]}
            onPress={handleSubmit}
            disabled={!isValid}
          >
            <Text style={styles.btnText}>Next</Text>
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
    marginVertical: 40,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333333",
  },
  input: {
    width: "100%",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#495E57",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  btn: {
    alignSelf: "flex-end",
    backgroundColor: "#495E57",
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 20,
    borderRadius: 10,
  },
  btnText: {
    color: "#F4CE14",
    fontSize: 20,
    fontWeight: "600",
  },
  errorMessage: {
    color: "red",
    marginTop: 4,
  },
});

export default RegisterForm;

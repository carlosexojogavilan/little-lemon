import {
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Pressable,
} from "react-native";

import Checkbox from "expo-checkbox";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik } from "formik";
import { useEffect } from "react";
import { useState } from "react";

const RegisterForm = () => {
  const [FormInitialData, setFormInitialData] = useState({});

  const getCurrentData = async () => {
    let values;
    try {
      values = await AsyncStorage.multiGet([
        "firstName",
        "lastName",
        "email",
        "phone",
      ]);
    } catch (error) {
      console.log(error);
    }

    const formData = {};
    values.map((keyValuePair) => {
      formData[keyValuePair[0]] = keyValuePair[1];
    });
    setFormInitialData(formData);
    console.log(FormInitialData);
  };

  useEffect(() => {
    getCurrentData();
  }, []);

  const validateForm = ({ firstName, lastName, email, phone }) => {
    const errors = {};

    if (!firstName) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(firstName)) {
      errors.firstName = "First name should only contain alphabets and spaces";
    }

    if (!lastName) {
      errors.lastName = "First name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(lastName)) {
      errors.lastName = "First name should only contain alphabets and spaces";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!phone) {
      errors.phone = "phone is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    ) {
      errors.phone = "phone is invalid";
    }

    return errors;
  };

  const handleRegister = async (values) => {
    const keyValuePairs = Object.entries(values);
    try {
      await AsyncStorage.multiSet(keyValuePairs, (error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: FormInitialData.firstName,
          lastName: FormInitialData.lastName,
          email: FormInitialData.email,
          phone: FormInitialData.phone,
        }}
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
            <View>
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
            <View>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorMessage}>{errors.lastName}</Text>
              )}
            </View>
            <View>
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
            <View>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={values.phone}
                keyboardType="phone-pad"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
              />
              {touched.phone && errors.phone && (
                <Text style={styles.errorMessage}>{errors.phone}</Text>
              )}
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                style={[
                  styles.btn,
                  {
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: "#495E57",
                  },
                ]}
              >
                <Text style={[styles.btnText, { color: "#495E57" }]}>
                  Discard Changes
                </Text>
              </Pressable>
              <Pressable
                style={[styles.btn, { opacity: isValid ? 1 : 0.5 }]}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.btnText}>Save Changes</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Text style={styles.title}>Email Notifications</Text>
      <View style={{ gap: 10 }}>
        <View style={styles.checkboxContainer}>
          <Checkbox value={true} color={"#495E57"} />
          <Text>Order Statuses</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox value={true} color={"#495E57"} />
          <Text>Password Changes</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox value={true} color={"#495E57"} />
          <Text>Special Orders</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox value={true} color={"#495E57"} />
          <Text>Newsletter</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 12,
    marginVertical: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
  },
  input: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginTop: 4,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#495E57",
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  errorMessage: {
    color: "red",
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default RegisterForm;

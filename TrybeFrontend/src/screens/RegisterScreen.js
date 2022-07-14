import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import { createAlert } from "../functions/createAlert";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { register } = useContext(AuthContext);

  const handleRegister = () => {
    if (email === null) {
      createAlert("Error!", "email field cannot be empty");
    } else if (password === null) {
      createAlert("Error!", "password field cannot be empty");
    } else if (password.length < 8) {
      createAlert("Error!", "password must be at least 8 characters");
    } else if (username === null) {
      createAlert("Error!", "username field cannot be empty");
    } else {
      register(email, username, password);
      // navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.wrapper}>
        <TextInput
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={username}
          placeholder="Enter username"
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button
          mode="contained"
          icon="account-plus"
          onPress={() => {
            handleRegister();
          }}
        >
          Register
        </Button>

        <View style={styles.register}>
          <Text>Already have an account? </Text>
          <Button
            icon="account-circle"
            // onPress={() => navigation.navigate("Login")}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    alignItems: "center",
    marginTop: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: "blue",
  },
});

export default RegisterScreen;

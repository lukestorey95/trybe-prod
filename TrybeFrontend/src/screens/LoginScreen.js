import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, Keyboard } from "react-native";

import { TextInput, Button } from "react-native-paper";

import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import { createAlert } from "../functions/createAlert";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    if (username === null) {
      createAlert("Error!", "email field cannot be empty");
    } else if (password === null) {
      createAlert("Error!", "password field cannot be empty");
    } else {
      login(username, password);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.wrapper}>
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
          icon="account-circle"
          onPress={() => {
            handleLogin();
          }}
        >
          Login
        </Button>

        <View style={styles.register}>
          <Text>Don't have an account? </Text>
          <Button
            icon="account-plus"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  register: {
    alignItems: "center",
    marginTop: 40,
  },
});

export default LoginScreen;

import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  FlatList,
} from "react-native";
import { sendMessage, loadMessages } from "../../store/goals/messages.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextInput,
  Card,
  Title,
  Avatar,
  IconButton,
} from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import { createAlert } from "../functions/createAlert";

function SupportGoalDetailScreen(props) {
  const id = props.route.params.id;
  let goal = useSelector((state) =>
    state.supporterGoals.find((goal) => goal.id === id)
  );

  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  const messages = useSelector((state) => state.messages);

  useEffect(() => {
    function load() {
      dispatch(loadMessages({ token: user.auth_token, id: id }));
    }
    load();
  }, [dispatch]);

  const handleSendSupport = (message) => {
    if (message) {
      dispatch(
        sendMessage({ token: user.auth_token, id: goal.id, text: message })
      );
      setMessage(null);
      Keyboard.dismiss();
    } else {
      createAlert("Invalid Input!", "Field cannot be empty");
    }
  };

  return (
    <SafeAreaView style={styles.viewStyle}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Title>Goal</Title>
          <Text>{goal.goal_description}</Text>
        </Card.Content>
      </Card>

      <View style={{ marginTop: 5 }}>
        <TextInput
          style={styles.input}
          value={message}
          placeholder="enter a supportive message"
          onChangeText={(text) => setMessage(text)}
        />
        <Button
          mode="contained"
          onPress={() => {
            handleSendSupport(message);
          }}
        >
          Send support
        </Button>
      </View>

      <Title style={styles.text}>Support for this goal</Title>
      <FlatList
        data={messages}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Card style={styles.cardStyle}>
            <Card.Title
              subtitle={item.sender_username}
              left={(props) => (
                <Avatar.Icon {...props} icon="face-man-profile" />
              )}
            />
            <Card.Content>
              <Text>{item.message}</Text>
            </Card.Content>
          </Card>
        )}
        ListFooterComponent={() => <View style={{ padding: 150 }}></View>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 10,
    padding: 10,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    justifyContent: "space-around",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  cardStyle: {
    marginBottom: 10,
  },
  update: {
    marginBottom: 20,
  },
});

export default SupportGoalDetailScreen;

import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Keyboard } from "react-native";
import { removeGoal, editGoal } from "../../store/goals/goals.actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput, Card, Title } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import { createAlert } from "../functions/createAlert";
import postMessage from "../functions/postMessage";

function SupportGoalDetailScreen(props) {
  const id = props.route.params.id;
  let goal = useSelector((state) =>
    state.supporterGoals.find((goal) => goal.id === id)
  );

  // const [shouldShow, setShouldShow] = useState(false);
  // const [text, onChangeText] = useState(goal.goal_description);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);

  useEffect(() => {}, [dispatch]);

  const handleSendSupport = (message) => {
    // console.log(message);
    postMessage(user.auth_token, goal.id, message);
    setMessage(null);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.viewStyle}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Title>Goal</Title>
          <Text>{goal.goal_description}</Text>
        </Card.Content>
      </Card>

      <View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 50,
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
    padding: 10,
  },
  update: {
    marginBottom: 20,
  },
});

export default SupportGoalDetailScreen;

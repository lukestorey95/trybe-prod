import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Keyboard,
  FlatList,
} from "react-native";
import { removeGoal, editGoal } from "../../store/goals/goals.actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  TextInput,
  Card,
  Title,
  ProgressBar,
  Avatar,
  IconButton,
  Portal,
  Dialog,
} from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import { createAlert } from "../functions/createAlert";

import emailSupporter from "../functions/emailSupporter";
import inviteSupporter from "../functions/inviteSupporter";
import { loadMessages, sendMessage } from "../../store/goals/messages.actions";

function GoalDetailScreen(props) {
  const id = props.route.params.id;
  let goal = useSelector((state) => state.goals.find((goal) => goal.id === id));

  const [shouldShow, setShouldShow] = useState(false);
  const [text, onChangeText] = useState(goal.goal_description);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const messages = useSelector((state) => state.messages);
  const [message, setMessage] = useState(null);

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    function load() {
      dispatch(loadMessages({ token: user.auth_token, id: id }));
    }
    load();
  }, [dispatch]);

  const handleEditGoal = () => {
    if (text != "") {
      dispatch(
        editGoal({
          token: user.auth_token,
          id: goal.id,
          goal_description: text,
          progress: goal.progress,
        })
      );
      Keyboard.dismiss();
      setShouldShow(!shouldShow);
    } else {
      createAlert("Invalid Input!", "Field cannot be empty");
    }
  };

  const handleSubmitSupporter = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      emailSupporter(email, goal);
      inviteSupporter(user.auth_token, email, goal.id);
      setEmail(null);
      Keyboard.dismiss();
    } else {
      createAlert("Invalid Input!", "Field must be an email");
    }
  };

  const updateProgress = () => {
    let updatedProgress = parseFloat(goal.progress) + 0.25;
    dispatch(
      editGoal({
        token: user.auth_token,
        id: goal.id,
        goal_description: goal.goal_description,
        progress: updatedProgress,
      })
    );
  };

  const handleSendReply = (message) => {
    dispatch(
      sendMessage({ token: user.auth_token, id: goal.id, text: message })
    );
    setMessage(null);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.viewStyle}>
      <Card style={styles.cardStyle}>
        <Card.Content>
          <Title>Goal</Title>
          <Text>{goal.goal_description}</Text>
          <Button onPress={() => updateProgress()}>+</Button>
          <ProgressBar progress={parseFloat(goal.progress)} />
        </Card.Content>
      </Card>
      <View style={styles.row}>
        <Button icon="pencil" onPress={() => setShouldShow(!shouldShow)}>
          Update Goal
        </Button>
        <Button
          icon="delete"
          onPress={() => {
            dispatch(removeGoal({ token: user.auth_token, id: goal.id }));
            props.navigation.navigate("GoalsScreen");
          }}
        >
          Delete Goal
        </Button>
      </View>

      {shouldShow ? (
        <View style={styles.update}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={onChangeText}
          />
          <Button
            title="Update"
            icon="content-save-edit"
            mode="contained"
            onPress={() => {
              handleEditGoal();
            }}
          >
            Update
          </Button>
        </View>
      ) : null}

      <View>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="enter supporter email"
          onChangeText={(text) => setEmail(text)}
        />
        <Button
          mode="contained"
          icon="account-multiple-plus"
          onPress={() => {
            handleSubmitSupporter();
          }}
        >
          Add Supporter
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Reply to Supporter</Dialog.Title>
          <Dialog.Content>
            <TextInput
              style={styles.input}
              value={message}
              placeholder="enter your message"
              onChangeText={(text) => setMessage(text)}
            />
            <Button
              mode="contained"
              onPress={() => {
                handleSendReply(message);
                hideDialog();
              }}
            >
              Reply
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Text style={styles.text}>Encouragement from your Trybe</Text>
      <FlatList
        data={messages}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Card style={styles.cardStyle}>
            <Card.Title
              subtitle={item.sender_username}
              style={{ fontSize: 1 }}
              left={(props) => (
                <Avatar.Icon {...props} icon="face-man-profile" />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="reply"
                  onPress={() => {
                    showDialog();
                  }}
                />
              )}
            />
            <Card.Content>
              <Text>{item.message}</Text>
            </Card.Content>
          </Card>
        )}
        ListFooterComponent={() => <View style={{ padding: 190 }}></View>}
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

export default GoalDetailScreen;

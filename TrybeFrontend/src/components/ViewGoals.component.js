import React, { useEffect, useState, useContext } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "./ViewGoals.component.style";
import { loadGoals } from "../../store/goals/goals.actions";
import { useDispatch, useSelector } from "react-redux";
import { Card, ProgressBar } from "react-native-paper";

import { AuthContext } from "../context/AuthContext";

function ViewGoals(props) {
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let goals = useSelector((state) => state.goals);

  useEffect(() => {
    async function load() {
      await dispatch(loadGoals(user.auth_token));
      setLoading(false);
    }
    load();
  }, [dispatch]);

  const clickedItem = (id) => {
    props.navigation.navigate("GoalDetailScreen", { id: id });
  };

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Card style={styles.cardStyle} onPress={() => clickedItem(item.id)}>
              <Card.Content>
                <Text>{item.goal_description}</Text>
                <ProgressBar
                  progress={parseFloat(item.progress)}
                  style={{ marginTop: 10 }}
                />
              </Card.Content>
            </Card>
          )}
          ListFooterComponent={() => <View style={{ padding: 70 }}></View>}
        />
      )}
    </View>
  );
}

export default ViewGoals;

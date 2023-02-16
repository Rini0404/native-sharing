import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const Shared = () => {
  const route = useRoute();

  const [loading, setLoading] = React.useState(true);

  if (!route.params) return null;

  const { id } = route.params;

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getReci() {
      await fetch(
        `https://api.spoonacular.com/recipes/${id}/summary?apiKey=1de7ce9afa06453da20342dd9eec2217`
      )
        .then((response) => response.json())
        .then((data) => {
          const summary = data.summary.replace(/(<([^>]+)>)/gi, "");
          setData(summary);
          console.log("DTA: ", summary);
        });
    }
    getReci();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>Shared ID: {id}</Text>
          <Text style={styles.text}>Shared ID: {id}</Text>
          <Text style={styles.text}>Shared ID: {id}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default Shared;

import React from "react";
import { View, StyleSheet, Text, Share, FlatList, Image } from "react-native";
import { get } from "../Api/get";
const Home = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // use get() here
    get()
      .then((data) => {
        let { results } = data;

        console.log(results);
        setData(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderedItems = ({ item }) => {
    return (
      <View key={item.id} style={styles.data}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />

          <View style={styles.textContainer}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={data}
        renderItem={renderedItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
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
  data: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  imageContainer: {
    flex: 1,
    height: 100,
  },
  image: {
    width: 125,
    height: 125,
    margin: 5.5,
    borderRadius: 10,
    paddingBottom: 20,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});

export default Home;

import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Share,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

import { get } from "../Api/get";

import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  // const [data, setData] = React.useState([]);

  let data = [
    {
      id: 782585,
      image: "https://spoonacular.com/recipeImages/782585-312x231.jpg",
      imageType: "jpg",
      title: "Cannellini Bean and Asparagus Salad with Mushrooms",
    },
    {
      id: 716426,
      image: "https://spoonacular.com/recipeImages/716426-312x231.jpg",
      imageType: "jpg",
      title: "Cauliflower, Brown Rice, and Vegetable Fried Rice",
    },
    {
      id: 715497,
      image: "https://spoonacular.com/recipeImages/715497-312x231.jpg",
      imageType: "jpg",
      title: "Berry Banana Breakfast Smoothie",
    },
    {
      id: 715415,
      image: "https://spoonacular.com/recipeImages/715415-312x231.jpg",
      imageType: "jpg",
      title: "Red Lentil Soup with Chicken and Turnips",
    },
    {
      id: 716406,
      image: "https://spoonacular.com/recipeImages/716406-312x231.jpg",
      imageType: "jpg",
      title: "Asparagus and Pea Soup: Real Convenience Food",
    },
    {
      id: 644387,
      image: "https://spoonacular.com/recipeImages/644387-312x231.jpg",
      imageType: "jpg",
      title: "Garlicky Kale",
    },
    {
      id: 715446,
      image: "https://spoonacular.com/recipeImages/715446-312x231.jpg",
      imageType: "jpg",
      title: "Slow Cooker Beef Stew",
    },
    {
      id: 782601,
      image: "https://spoonacular.com/recipeImages/782601-312x231.jpg",
      imageType: "jpg",
      title: "Red Kidney Bean Jambalaya",
    },
    {
      id: 795751,
      image: "https://spoonacular.com/recipeImages/795751-312x231.jpg",
      imageType: "jpg",
      title: "Chicken Fajita Stuffed Bell Pepper",
    },
    {
      id: 766453,
      image: "https://spoonacular.com/recipeImages/766453-312x231.jpg",
      imageType: "jpg",
      title: "Hummus and Za'atar",
    },
  ];

  // React.useEffect(() => {
  //   // use get() here
  //   get()
  //     .then((data) => {
  //       let { results } = data;

  //       console.log(results);
  //       setData(results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const shareFunc = async (id) => {
    console.log("ID: ", id);
    try {
      const result = await Share.share({
        message: "Check out this recipe!",
        url: `exp://192.168.0.3:19000/--/Shared?id=${id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const [likedIds, setLikedIds] = React.useState([]);

  const toggleLike = (id) => {
    if (likedIds.includes(id)) {
      // Remove the recipe id from the likedIds array
      setLikedIds(likedIds.filter((likedId) => likedId !== id));
    } else {
      // Add the recipe id to the likedIds array
      setLikedIds([...likedIds, id]);
    }
  };

  const isLiked = (id) => likedIds.includes(id);

  const renderedItems = ({ item }) => {
    const { id, image, title } = item;

    return (
      <View style={styles.containerBox}>
        <View style={styles.back}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <Text style={styles.text}>{title}</Text>
        {/* add  like button and share */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 150,
          }}
        >
          <TouchableOpacity onPress={() => toggleLike(id)}>
            <Ionicons
              name="heart"
              size={24}
              color={isLiked(id) ? "red" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => shareFunc(id)}>
            <Ionicons name="share-social" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#2f4f4f" }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderedItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerBox: {
    width: 170,
    height: 250,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginTop: 15,
  },
  back: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Home;

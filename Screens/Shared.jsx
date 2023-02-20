import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const Shared = () => {
  const route = useRoute();

  const [loading, setLoading] = React.useState(true);

  if (!route.params) return null;

  console.log(route.params);

  const { id, picture } = route.params;

  const [summary, setSummary] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);
  const [cuisine, setCuisine] = React.useState("");
  React.useEffect(() => {
    async function getReci() {
      await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=1de7ce9afa06453da20342dd9eec2217`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const ingredients = data.extendedIngredients.map(
              (ingredient) => ingredient.name
            );
            setIngredients(ingredients);
            const summary = data.summary.replace(/(<([^>]+)>)/gi, "");
            const cuisine = data.cuisines;
            console.log("CUSIINES: ", cuisine);
            setCuisine(cuisine);
            setSummary(summary);
            setTitle(data.title);
            setLoading(false);
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getReci();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SafeAreaView>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: picture }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                {cuisine.length == 0 ? null : (
                  <Text style={styles.cuisine}>Cuisine: {cuisine}</Text>
                )}
                <Text style={styles.summary}>{summary}</Text>
                <Text style={styles.ingredient}>Ingredients:</Text>
                {ingredients.map((ingredient, index) => (
                  <Text key={index.toString()} style={styles.ingrText}>
                    {ingredient}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ingredient: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  ingrText: {
    fontSize: 16,
    marginTop: 20,
    color: "white",
  },
  cuisine: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2f4f4f",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // add shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
    // center
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
    color: "white",
  },
});

export default Shared;

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const CategortyList = () => {
  const categories = [
    {
      name: "Starters",
    },
    {
      name: "Mains",
    },
    {
      name: "Desserts",
    },
    {
      name: "Drinks",
    },
    {
      name: "Specials",
    },
  ];

  const Category = ({ item }) => (
    <Pressable style={styles.categoryContainer}>
      <Text style={styles.text}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Category item={item} />}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  categoryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "lightgray",
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
  },
});
export default CategortyList;

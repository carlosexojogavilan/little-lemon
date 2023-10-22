import { useState } from "react";
import { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const CategoryList = ({ setActiveCategories }) => {
  const [categories, setCategories] = useState([
    {
      name: "starters",
      active: false,
    },
    {
      name: "mains",
      active: false,
    },
    {
      name: "desserts",
      active: false,
    },
    {
      name: "drinks",
      active: false,
    },
    {
      name: "specials",
      active: false,
    },
  ]);

  useEffect(() => {
    const activeCategories = categories
      .filter((category) => category.active)
      .map((category) => category.name);
    setActiveCategories(activeCategories);
  }, [categories]);

  const Category = ({ item, index }) => (
    <Pressable
      style={[
        styles.categoryContainer,
        item.active && styles.activeCategoryContainer,
      ]}
      onPress={() => {
        const newCategories = [...categories];
        newCategories[index].active = !newCategories[index].active;
        setCategories(newCategories);
      }}
    >
      <Text style={[styles.text, item.active && styles.activeText]}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
      <FlatList
        data={categories}
        renderItem={({ item, index }) => <Category item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
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
  activeCategoryContainer: {
    backgroundColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "black",
  },
  activeText: {
    color: "white",
  },
});

export default CategoryList;

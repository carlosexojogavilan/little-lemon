import {
  Pressable,
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
} from "react-native";
import Header from "../components/Header";
import CategortyList from "../components/CategoryList";
import HeroSection from "../components/HeroSection";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

const Home = ({ navigation }) => {
  const [menu, setMenu] = useState([]);
  const [menuImages, setMenuImages] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const data = await response.json();
      setMenu(data.menu);
      const images = {};
      await Promise.all(
        data.menu.map(async (menuItem) => {
          const response = await fetch(
            `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${menuItem.image}?raw=true`
          );
          const blob = await response.blob();
          images[menuItem.name] = URL.createObjectURL(blob);
        })
      );
      setMenuImages(images);
      // Insert menu items into SQLite database
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS items_menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL
          );`
        );
        data.menu.forEach((menuItem) => {
          tx.executeSql(
            `INSERT INTO items_menu (name, description, price, image) VALUES (?, ?, ?, ?);`,
            [
              menuItem.name,
              menuItem.description,
              menuItem.price,
              menuItem.image,
            ],
            (_, result) =>
              console.log(`Inserted ${menuItem.name} into items_menu table`),
            (_, error) =>
              console.log(
                `Error inserting ${menuItem.name} into items_menu table: ${error}`
              )
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const loadMenuFromDatabase = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `SELECT * FROM items_menu;`,
  //       [],
  //       (_, result) => {
  //         const data = result.rows._array;
  //         setMenu(data);
  //         const images = {};
  //         data.forEach((menuItem) => {
  //           images[menuItem.name] = menuItem.image;
  //         });
  //         setMenuImages(images);
  //       },
  //       (_, error) => console.log(`Error loading menu from database: ${error}`)
  //     );
  //   });
  // };

  useEffect(() => {
    //   db.transaction((tx) => {
    //     tx.executeSql(
    //       `SELECT COUNT(*) FROM items_menu;`,
    //       [],
    //       (_, result) => {
    //         const count = result.rows._array[0]["COUNT(*)"];
    //         if (count === 0) {
    fetchData();
    //         } else {
    //           loadMenuFromDatabase();
    //         }
    //       },
    //       (_, error) =>
    //         console.log(`Error checking if items_menu table is empty: ${error}`)
    //     );
    //   });
  }, []);

  const Item = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View>
          <Image style={styles.image} source={{ uri: menuImages[item.name] }} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <HeroSection />
      <CategortyList />
      <FlatList
        data={menu}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemInfoContainer: {
    paddingHorizontal: 12,
    marginVertical: 6,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {},
  price: { fontSize: 18, color: "#060606", marginTop: 8 },
  image: { width: 80, height: 80 },
});

export default Home;

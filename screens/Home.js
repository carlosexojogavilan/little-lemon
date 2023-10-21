import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState } from "react";

import SignedInHeader from "../components/SignedInHeader";
import getProfilePic from "../utils/getProfilePic";
import HeroSection from "../components/HeroSection";
import CategortyList from "../components/CategoryList";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon.db");

const Home = () => {
  const [menu, setMenu] = useState([]);
  const [menuImages, setMenuImages] = useState({});
  const [profilePic, setProfilePic] = useState();

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
      // insertIntoSqlite();
    } catch (error) {
      console.log(error);
    }
  };

  // const insertIntoSqlite = () => {
  //   // Insert menu items into SQLite database
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS items_menu (
  //           id INTEGER PRIMARY KEY AUTOINCREMENT,
  //           name TEXT NOT NULL,
  //           description TEXT NOT NULL,
  //           price REAL NOT NULL,
  //           image TEXT NOT NULL
  //         );`
  //     );
  //     data.menu.forEach((menuItem) => {
  //       tx.executeSql(
  //         `INSERT INTO items_menu (name, description, price, image) VALUES (?, ?, ?, ?);`,
  //         [menuItem.name, menuItem.description, menuItem.price, menuItem.image],
  //         (_, result) =>
  //           console.log(`Inserted ${menuItem.name} into items_menu table`),
  //         (_, error) =>
  //           console.log(
  //             `Error inserting ${menuItem.name} into items_menu table: ${error}`
  //           )
  //       );
  //     });
  //   });
  // };

  // const loadMenuFromDatabase = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       `SELECT * FROM items_menu;`,
  //       [],
  //       (_, result) => {
  //         const data = result.rows._array;
  //         console.log(data);
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
    const fetchProfilePic = async () => {
      const pic = await getProfilePic();
      setProfilePic(pic);
    };

    fetchProfilePic();
    fetchData();
    // db.transaction((tx) => {
    //   tx.executeSql(
    //     `SELECT COUNT(*) FROM items_menu;`,
    //     [],
    //     (_, result) => {
    //       const count = result.rows._array[0]["COUNT(*)"];
    //       if (count === 0) {
    //         console.log("Heyy");
    //         fetchData();
    //       } else {
    //         console.log("UOOOOOOO");
    //         loadMenuFromDatabase();
    //       }
    //     },
    //     (_, error) =>
    //       console.log(`Error checking if items_menu table is empty: ${error}`)
    //   );
    // });
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
      <SignedInHeader profilePic={profilePic} />
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
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flex: 1,
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

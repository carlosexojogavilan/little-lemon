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

import GreekSalad from "../assets/images/greekSalad.jpg";
import Bruschetta from "../assets/images/bruschetta.jpg";
import GrilledFish from "../assets/images/grilledFish.jpg";
import Pasta from "../assets/images/pasta.jpg";
import LemonDessert from "../assets/images/lemonDessert.jpg";

const images = [GreekSalad, Bruschetta, GrilledFish, Pasta, LemonDessert];

const db = SQLite.openDatabase("little_lemon.db");

const Home = () => {
  const [menu, setMenu] = useState([]);
  // const [menuImages, setMenuImages] = useState({});
  const [profilePic, setProfilePic] = useState();
  const [activeCategories, setActiveCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const data = await response.json();
      setMenu(data.menu);
      insertIntoSqlite(data);
    } catch (error) {
      console.log(error);
    }
  };

  const insertIntoSqlite = (data) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items_menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL
          );`
      );
      data.menu.forEach((menuItem) => {
        tx.executeSql(
          `INSERT INTO items_menu (name, description, price, category) VALUES (?, ?, ?, ?);`,
          [
            menuItem.name,
            menuItem.description,
            menuItem.price,
            menuItem.category,
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
  };

  const loadMenuFromDatabase = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM items_menu;`,
        [],
        (_, result) => {
          const data = result.rows._array;
          setMenu(data);
        },
        (_, error) => console.log(`Error loading menu from database: ${error}`)
      );
    });
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      const pic = await getProfilePic();
      setProfilePic(pic);
    };
    fetchProfilePic();

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT COUNT(*) FROM items_menu;`,
        [],
        (_, result) => {
          const count = result.rows._array[0]["COUNT(*)"];
          if (count === 0) {
            fetchData();
          } else {
            loadMenuFromDatabase();
          }
        },
        (_, error) =>
          console.log(`Error checking if items_menu table is empty: ${error}`)
      );
    });
  }, []);

  useEffect(() => {
    if (activeCategories.length !== 0) {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM items_menu WHERE category IN (${activeCategories
            .map(() => "?")
            .join(", ")})`,
          activeCategories,
          (_, result) => {
            const data = result.rows._array;
            setMenu(data);
          },
          (_, error) =>
            console.log(`Error loading menu items from database: ${error}`)
        );
      });
    } else {
      loadMenuFromDatabase();
    }
  }, [activeCategories]);

  const Item = ({ item, index }) => {
    const source = images[index];
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View>
          <Image style={styles.image} source={source} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SignedInHeader profilePic={profilePic} />
      <HeroSection />
      <CategortyList
        setActiveCategories={(newCategories) => {
          setActiveCategories(newCategories);
        }}
      />
      <FlatList
        data={menu}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
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
  price: { fontSize: 18, color: "#060606", marginTop: 8 },
  image: { width: 80, height: 80 },
});

export default Home;

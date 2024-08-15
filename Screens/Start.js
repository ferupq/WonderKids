import React, { useEffect } from "react";
import {
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Start({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: "Lecciones",
    });
  }, [navigation]);

  const sections = [
    {
      type: "single",
      images: [
        {
          image: require("../assets/1.png"),
          onPress: () => navigation.navigate("Vocales"),
        },
      ],
    },
    {
      type: "triple",
      images: [
        {
          image: require("../assets/2.png"),
          onPress: () => navigation.navigate("Vocales"), // Cambiado a "Vocales"
        },
        {
          image: require("../assets/6.png"),
          onPress: () => navigation.navigate("Numeros"), // Cambiado a "Numeros"
        },
        {
          image: require("../assets/4.png"),
          onPress: () => navigation.navigate("Animales"),
        },
      ],
    },
    {
      type: "triple",
      images: [
        {
          image: require("../assets/5.png"),
          onPress: () => navigation.navigate("Frutas"),
        },
        {
          image: require("../assets/6.png"),
          onPress: () => navigation.navigate("Colores"),
        },
        {
          image: require("../assets/7.png"),
          onPress: () => navigation.navigate("Numeros"),
        },
      ],
    },
    {
      type: "double",
      images: [
        {
          image: require("../assets/8.png"),
          onPress: () => navigation.navigate("Abecedario"),
        },
        {
          image: require("../assets/9.png"),
          onPress: () => navigation.navigate("Abecedario"),
        },
      ],
    },
  ];

  const renderSection = (section) => {
    switch (section.type) {
      case "single":
        return (
          <View
            style={{
              width: width,
              alignItems: "center",
              justifyContent: "center",
              height: width * 0.7,
            }}
          >
            <TouchableOpacity
              style={{
                width: width * 0.9,
                height: width * 0.6,
                borderRadius: width * 0.05,
              }}
              onPress={() => navigation.navigate("toys")}
            >
              <Image
                source={section.images[0].image}
                style={{
                  width: width * 0.9,
                  height: width * 0.6,
                  borderRadius: width * 0.05,
                }}
              />
            </TouchableOpacity>
          </View>
        );
      case "double":
      case "triple":
        return (
          <ScrollView
            contentContainerStyle={styles.horizontalContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {section.images.map((img, index) => (
              <TouchableOpacity
                key={index}
                style={styles.imageContainer}
                onPress={img.onPress}
              >
                <Image
                  source={img.image}
                  style={{
                    width: "90%",
                    height: "90%",
                    borderRadius: width * 0.05,
                  }}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Botón de retroceso con mejor posicionamiento */}

      {sections.map(renderSection)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: width * 0.6,
    marginTop: Platform.OS === "ios" ? width * 0.4 : 0,
    backgroundColor: "#fff",
  },
  sectionContainer: {
    marginVertical: width * 0.05,
    width: width,
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: width * 0.02,
    color: "#333",
    paddingHorizontal: width * 0.05,
    textAlign: "left",
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  verticalContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    height: width * 0.5,
    marginHorizontal: width * 0.03,
    borderRadius: width * 0.05,
    backgroundColor: "#f4f4f4",
    marginTop: width * 0.05,
    marginBottom: width * 0.05,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  backButton: {
    width: width * 0.2,
    height: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0088f0",
    position: "absolute",
    borderRadius: width * 0.2,
    top: width * 0.1,
    left: width * 0.05,
  },
});

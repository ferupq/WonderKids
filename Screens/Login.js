import { View } from "moti";
import React from "react";
import {
  ImageBackground,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Login({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#594389",
      }}
    >
      <StatusBar hidden={true} />
      <ImageBackground
        source={require("../assets/Tutorial intro.png")}
        resizeMode="contain"
        style={{
          width: width,
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View
            style={{
              width: width,
              height: height * 0.4,
              alignItems: "center",
              justifyContent: "flex-start",
              padding: width * 0.05,
            }}
          >
            <View
              style={{
                width: width * 0.8,
                height: width * 0.35,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.09,
                  fontWeight: "400",
                  letterSpacing: -1,
                }}
              >
                Bienvenido{" "}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.09,
                  fontWeight: "bold",
                }}
              >
                a WonderKids!
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.05,
                  fontWeight: "400",
                  letterSpacing: -1,
                  marginTop: width * 0.05,
                }}
              >
                Juega, descubre y aprende con nosotros
              </Text>
            </View>

            <TouchableOpacity
              style={{
                width: width * 0.8,
                height: width * 0.15,
                backgroundColor: "white",
                borderRadius: width * 0.1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: width * 0.1,
              }}
              onPress={() => navigation.navigate("Start")}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: width * 0.05,
                  fontWeight: "bold",
                }}
              >
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

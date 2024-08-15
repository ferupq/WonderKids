import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Button,
} from "react-native";
import * as Speech from "expo-speech";
import { useIsFocused } from "@react-navigation/native";

import pelota from "../assets/pelota.png";
import barbie from "../assets/barbie.png";
import carro from "../assets/carro.png";
import bicicleta from "../assets/bicicleta.png";
import avion from "../assets/avion.png";
import tren from "../assets/tren.png";
import osito from "../assets/osito.png";
import barco from "../assets/barco.png";
import robot from "../assets/robot.png";
import bebe from "../assets/bebe.png";

const toys = [
  { name: "la Pelota", image: pelota },
  { name: "la Barbie", image: barbie },
  { name: "el Carro", image: carro },
  { name: "la Bicicleta", image: bicicleta },
  { name: "el Avión", image: avion },
  { name: "el Tren", image: tren },
  { name: "el Osito", image: osito },
  { name: "el Barco", image: barco },
  { name: "el Robot", image: robot },
  { name: "el Bebe", image: bebe },
];

const getRandomToys = (correctToy) => {
  const shuffled = toys
    .filter((toy) => toy !== correctToy)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  return [correctToy, ...shuffled].sort(() => 0.5 - Math.random());
};

const speakText = (text) => {
  Speech.speak(text, {
    language: "es-MX",
    pitch: 1.2,
    rate: 0.8,
    volume: 1,
  });
};

const { width, height } = Dimensions.get("window");

const ToyGuessingGame = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currentToy, setCurrentToy] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [roundInProgress, setRoundInProgress] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isWaitingForAnswer, setIsWaitingForAnswer] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: "Toys",
    });
  }, [navigation]);

  const randomMessages = [
    "¡Buen intento! Intenta de nuevo.",
    "¡Casi! Prueba otra vez.",
    "¡Genial! Vamos a seguir.",
    "¡Muy bien! ¡Estás en el camino correcto!",
    "¡Perfecto! Vamos a la siguiente.",
    "¡Sigue así! Estás haciéndolo excelente.",
    "¡Bien hecho! Ahora, a por el siguiente.",
    "¡Fantástico! Vamos con otra ronda.",
    "¡Eso es! ¡Continúa así!",
    "¡Impresionante! Listo para la siguiente.",
  ];

  useEffect(() => {
    if (isFocused) {
      setShowWelcome(true);
      const welcomeMessage =
        "¡Hola! Bienvenido al juego de adivinar el juguete. Aquí podrás probar tu habilidad para identificar juguetes. Si estás listo, presiona el botón de comenzar para empezar la prueba.";
      setMessage(welcomeMessage);
      speakText(welcomeMessage);
    }
  }, [isFocused]);

  const startGame = () => {
    setShowWelcome(false);
    startNewRound();
  };

  useEffect(() => {
    if (gameEnded) {
      Speech.stop();
    }
  }, [gameEnded]);

  useEffect(() => {
    if (!gameEnded && attempts < 10 && !roundInProgress && !showWelcome) {
      startNewRound();
    }
  }, [attempts, gameEnded, roundInProgress, showWelcome]);

  const startNewRound = () => {
    if (gameEnded || roundInProgress) return;

    const correctToy = toys[Math.floor(Math.random() * toys.length)];
    setCurrentToy(correctToy);
    setOptions(getRandomToys(correctToy));
    setRoundInProgress(true);
    setIsWaitingForAnswer(true);
    setSelectedOption(null); // Reinicia la opción seleccionada
    speakText(`¿Cuál es ${correctToy.name}?`);
  };

  const handleOptionClick = (toy) => {
    if (!isWaitingForAnswer || gameEnded) return;

    setIsWaitingForAnswer(false);
    setSelectedOption(toy); // Guarda la opción seleccionada

    if (toy === currentToy) {
      setScore(score + 1);
      setMessage(`¡Correcto! ¡El juguete es ${currentToy.name}!`);
      speakText(`¡Correcto! ¡El juguete es ${currentToy.name}!`);

      setTimeout(() => {
        setRoundInProgress(false);
        setAttempts(attempts + 1);
        if (attempts + 1 >= 10) {
          setGameEnded(true);
          setModalVisible(true); // Mostrar el modal al finalizar el juego
          setMessage(`¡Juego terminado! Puntaje final: ${score}.`);
          speakText(`¡Juego terminado! Puntaje final: ${score}.`);
        } else {
          setTimeout(startNewRound, 2000);
        }
      }, 2000);
    } else {
      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      setMessage(`¡No es correcto! ${randomMessage}`);
      speakText(`¡No es correcto! ${randomMessage}`);

      setTimeout(() => {
        speakText(`¿Cuál es ${currentToy.name}?`);
        setIsWaitingForAnswer(true);
      }, 50000); // Espera de 50 segundos antes de permitir una nueva respuesta
    }
  };

  const handlePlayAgain = () => {
    setAttempts(0);
    setScore(0);
    setGameEnded(false);
    setModalVisible(false);
    startGame();
  };

  return (
    <View style={styles.container}>
      {showWelcome ? (
        <View
          style={{
            width: width,
            height: height * 0.17,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: width * 0.08,
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            ¡Bienvenido al juego de adivinar el juguete!
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: width,
            height: height * 0.17,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontSize: width * 0.08,
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            ¡Adivina el juguete!
          </Text>
        </View>
      )}

      {showWelcome ? (
        <View
          style={{
            width: width * 0.9,
            height: height * 0.6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: width * 0.9,
              height: width * 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/ju.png")}
              style={{
                width: width * 0.5,
                height: width * 0.9,
                borderRadius: width * 0.05,
                transform: [{ rotate: "-90deg" }],
                resizeMode: "stretch",
              }}
            />
          </View>
          <Text
            style={{
              fontSize: width * 0.05,
              color: "#000",
              marginBottom: width * 0.02,
              textAlign: "center",
              fontWeight: "200",
              marginTop: width * 0.1,
            }}
          >
            Demuestra tu habilidad para escuchar y reconocer juguetes. Escucha
            con atención y selecciona la imagen correcta.
          </Text>
          <Text
            style={{
              fontSize: width * 0.06,
              color: "#000",
              marginBottom: width * 0.02,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: width * 0.07,
            }}
          >
            Puntaje: {score}
          </Text>
          <TouchableOpacity
            onPress={startGame}
            style={{
              width: width * 0.4,
              height: width * 0.12,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4CAF50",
              borderRadius: width * 0.05,
              marginTop: width * 0.08,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: width * 0.05,
                fontWeight: "bold",
              }}
            >
              Comenzar
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          {currentToy && selectedOption && (
            <View style={styles.imageContainer}>
              {selectedOption === currentToy ? (
                <Image
                  source={currentToy.image}
                  style={{
                    width: width * 0.7,
                    height: width * 0.7,
                    borderRadius: width * 0.05,
                  }}
                />
              ) : (
                <Text style={{ fontSize: 18, color: "#000" }}>
                  ¡Selecciona una opción para ver la respuesta correcta!
                </Text>
              )}
            </View>
          )}
          <View style={styles.optionsContainer}>
            {options.map((toy, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionClick(toy)}
                style={styles.optionButton}
              >
                <Image
                  source={toy.image}
                  style={{
                    width: width * 0.4,
                    height: width * 0.4,
                    borderRadius: width * 0.05,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text
            style={{
              fontSize: width * 0.05,
              color: "#000",
              marginBottom: width * 0.02,
              textAlign: "center",
              fontWeight: "200",
              marginTop: width * 0.07,
            }}
          >
            {message}
          </Text>
          <Text
            style={{
              fontSize: width * 0.06,
              color: "#000",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: width * 0.07,
            }}
          >
            Puntaje: {score}
          </Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Button title="Jugar de nuevo" onPress={handlePlayAgain} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionButton: {
    margin: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});

export default ToyGuessingGame;

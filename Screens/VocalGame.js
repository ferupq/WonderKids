import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const VocalGame = ({ navigation }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [correctVocal, setCorrectVocal] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [shownImages, setShownImages] = useState({});
  const [gameOver, setGameOver] = useState(false);

  const imageList = [
    { img: require("../assets/avion.png"), vocal: "A" },
    { img: require("../assets/elefante.png"), vocal: "E" },
    { img: require("../assets/iglu.png"), vocal: "I" },
    { img: require("../assets/oso.png"), vocal: "O" },
    { img: require("../assets/uvas.png"), vocal: "U" },
  ];

  const imageScale = useRef(new Animated.Value(1)).current;
  const buttonFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: "Encuentra la Vocal!",
    });
    nextImage(); // Cargar la primera imagen al iniciar
  }, [navigation]);

  const nextImage = () => {
    if (gameOver) return;

    // Filtra las imágenes ya mostradas
    const availableImages = imageList.filter(
      (img) => !(shownImages[img.img] >= 1)
    );

    if (availableImages.length === 0) {
      setGameOver(true);
      return;
    }

    // Selecciona una imagen aleatoria
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const randomImage = availableImages[randomIndex];

    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentImage(randomImage.img);
    setCorrectVocal(randomImage.vocal);
    setShownImages((prev) => ({
      ...prev,
      [randomImage.img]: (prev[randomImage.img] || 0) + 1,
    }));
    setMessage("");
  };

  const checkAnswer = (vocal) => {
    if (vocal === correctVocal) {
      setMessage("¡Correcto!");
      setScore((prevScore) => prevScore + 1);

      Animated.sequence([
        Animated.timing(buttonFade, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => nextImage()); // Muestra la siguiente imagen
    } else {
      setMessage("Inténtalo de nuevo.");
    }
  };

  const resetGame = () => {
    setScore(0);
    setShownImages({});
    setGameOver(false);
    nextImage();
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <View>
          <Text style={styles.gameOverText}>¡Juego terminado!</Text>
          <Text style={styles.scoreText}>
            Tu puntuación final es: <Text style={styles.score}>{score}</Text>
          </Text>
          <TouchableOpacity onPress={resetGame} style={styles.button}>
            <Text style={styles.buttonText}>Jugar de nuevo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {currentImage && (
            <Animated.Image
              source={currentImage}
              style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
          )}
          <Animated.View
            style={[styles.buttonsContainer, { opacity: buttonFade }]}
          >
            {["A", "E", "I", "O", "U"].map((vocal) => (
              <TouchableOpacity
                key={vocal}
                onPress={() => checkAnswer(vocal)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{vocal}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <Text
            style={[
              styles.message,
              message === "¡Correcto!"
                ? styles.correctMessage
                : styles.incorrectMessage,
            ]}
          >
            {message}
          </Text>
          <Text style={styles.scoreLabel}>
            Puntuación: <Text style={styles.score}>{score}</Text>
          </Text>
        </>
      )}
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#ffffff",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  message: {
    fontSize: 25,
    marginVertical: 20,
  },
  correctMessage: {
    color: "#4CAF50",
  },
  incorrectMessage: {
    color: "#F44336",
  },
  scoreLabel: {
    fontSize: 20,
    color: "#FF9800",
    marginTop: 20,
  },
  score: {
    fontWeight: "bold",
  },
  gameOverText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#F44336",
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default VocalGame;

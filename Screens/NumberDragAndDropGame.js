import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const initialNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

// Desordenar los números al inicio
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Generar un color aleatorio
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generar un color aleatorio para los números
const getRandomTextColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const NumberDragAndDropGame = ({ navigation }) => {
  const [numbers, setNumbers] = useState(shuffleArray([...initialNumbers]));
  const [colors, setColors] = useState(numbers.map(() => getRandomColor()));
  const [textColors, setTextColors] = useState(
    numbers.map(() => getRandomTextColor())
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);

  const checkOrder = () => {
    if (numbers.join("") === initialNumbers.join("")) {
      setMessage("¡Muy bien! ¡Has ordenado todos los números correctamente!");
      setScore(100);
    } else {
      setMessage("El orden no es correcto. Intenta nuevamente.");
      const correctPositions = numbers.filter(
        (num, index) => num === initialNumbers[index]
      ).length;
      setScore(correctPositions * 10);
    }
    setModalVisible(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
      title: "Ordena los números",
    });
  }, [navigation]);

  const renderItem = ({ item, index, drag }) => (
    <View style={[styles.itemContainer, { backgroundColor: colors[index] }]}>
      <TouchableOpacity onLongPress={drag} style={styles.draggableItem}>
        <Text style={[styles.itemText, { color: textColors[index] }]}>
          {item}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f8ff",
          marginTop: Platform.OS === "ios" ? width * 0.4 : 0,
        }}
      >
        <DraggableFlatList
          data={numbers}
          renderItem={renderItem}
          keyExtractor={(item) => item.toString()}
          onDragEnd={({ data }) => {
            setNumbers(data);
            // Actualiza los colores cuando se reordenan los números
            setColors(data.map(() => getRandomColor()));
            setTextColors(data.map(() => getRandomTextColor()));
          }}
          contentContainerStyle={styles.list}
          scrollEnabled={false} // Desactiva el scroll
        />
        <TouchableOpacity style={styles.checkButton} onPress={checkOrder}>
          <Text
            style={{
              fontSize: width * 0.05,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Verificar Orden
          </Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width,
                height: height * 0.5,
                backgroundColor: "#0088f0",
                borderTopLeftRadius: width * 0.05,
                borderTopRightRadius: width * 0.05,
                justifyContent: "center",
                alignItems: "center",
                padding: width * 0.05,
              }}
            >
              <Text style={styles.modalMessage}>{message}</Text>
              <Text
                style={{
                  color: "#fff",
                }}
              >
                Puntaje: {score}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
    backgroundColor: "#f0f8ff",
  },
  list: {
    width: width * 0.9,
    height: width * 1.4,
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: width * 0.8,
    height: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: width * 0.02,
    borderRadius: width * 0.02,
    overflow: "hidden",
  },
  draggableItem: {
    width: "100%",
    height: "100%",
    borderRadius: width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  itemText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  checkButton: {
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: width * 0.05,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * -0.1,
  },
  buttonText: {
    fontSize: width * 0.05,
    color: "#ffffff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: "#ffffff",
    borderRadius: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.05,
  },
  modalMessage: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  modalScore: {
    fontSize: width * 0.05,
    color: "#4a90e2",
    marginBottom: height * 0.02,
  },
  closeButton: {
    marginTop: height * 0.03,
    width: width * 0.4,
    height: height * 0.07,
    borderRadius: width * 0.05,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: width * 0.05,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default NumberDragAndDropGame;

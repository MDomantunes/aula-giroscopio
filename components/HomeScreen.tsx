import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  highScore: number;
  onStartGame: () => void;
  timeBonus: number;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ highScore, onStartGame, timeBonus }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayTitle}>🎮 Gyro Orb 🎮</Text>
      <Text style={styles.overlayScore}>Recorde: {highScore}</Text> 
      <Text style={styles.overlayText}>Colete a orbe inclinando seu telefone.</Text>
      <Text style={styles.overlayText}>Você ganha **{timeBonus} segundos** por orbe!</Text>
      <TouchableOpacity style={styles.button} onPress={onStartGame}> 
        <Text style={styles.buttonText}>Começar Jogo!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, 
  },
  overlayTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  overlayScore: {
    fontSize: 28,
    color: '#3498db',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  overlayText: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'coral',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 220,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default HomeScreen;
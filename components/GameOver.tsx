import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface GameOverProps {
  finalScore: number;
  highScore: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ finalScore, highScore, onPlayAgain, onGoHome }) => {
  const isNewRecord = finalScore > highScore;
  
  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayTitle}>FIM DE JOGO!</Text>
      <Text style={styles.overlayScore}>
        Pontuação Final: {finalScore} {isNewRecord ? "👑 NOVO RECORDE!" : ""}
      </Text>
      <Text style={styles.overlayText}>Recorde Atual: {Math.max(finalScore, highScore)}</Text>
      
      <TouchableOpacity style={{ ...styles.button, marginBottom: 15 }} onPress={onPlayAgain}> 
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={onGoHome}> 
        <Text style={styles.buttonText}>Página Inicial</Text>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'coral',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 220,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#3498db',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default GameOver;
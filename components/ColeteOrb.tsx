import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Gyroscope } from 'expo-sensors';

// Importa os novos componentes de tela
import HomeScreen from './HomeScreen';
import GameOver from './GameOver';

const { width, height } = Dimensions.get('window');
const PLAYER_SIZE = 50;
const ORB_SIZE = 30;

// Constantes do Jogo
const GAME_STATE = {
  READY: 'ready', 
  PLAYING: 'playing', 
  GAMEOVER: 'gameover', 
};
const INITIAL_TIME = 30; 
const TIME_BONUS = 3; 
const MOVEMENT_SENSITIVITY = 5; 

const generateRandomPosition = () => {
  const position = {
    x: Math.random() * (width - ORB_SIZE),
    y: Math.random() * (height - ORB_SIZE),
  };
  return position;
};

export default function ColeteOrbe() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [playerPosition, setPlayerPosition] = useState({ x: width / 2, y: height / 2 });
  const [orbPosition, setOrbPosition] = useState(generateRandomPosition());
  
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [gameState, setGameState] = useState(GAME_STATE.READY);

  // Função para começar um novo jogo (usada na Home Screen e no Play Again)
  const startGame = () => {
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setPlayerPosition({ x: width / 2, y: height / 2 });
    setOrbPosition(generateRandomPosition());
    setGameState(GAME_STATE.PLAYING);
  };
  
  // Função para voltar à tela inicial (usada no Game Over)
  const goToHome = () => {
    setGameState(GAME_STATE.READY);
    setScore(0); 
    setTimeLeft(INITIAL_TIME);
  };

  // 1. Efeito do Giroscópio (Movimento do Jogador)
  useEffect(() => {
    Gyroscope.setUpdateInterval(16);
    const subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });
    return () => subscription.remove();
  }, []);

  // 2. Lógica de Movimento e Limites da Tela
  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) return;

    let newX = playerPosition.x - data.y * MOVEMENT_SENSITIVITY; 
    let newY = playerPosition.y - data.x * MOVEMENT_SENSITIVITY; 

    // Limites da tela
    if (newX < 0) newX = 0;
    if (newX > width - PLAYER_SIZE) newX = width - PLAYER_SIZE;
    if (newY < 0) newY = 0;
    if (newY > height - PLAYER_SIZE) newY = height - PLAYER_SIZE;

    setPlayerPosition({ x: newX, y: newY });
  }, [data, gameState]);

  // 3. Lógica de Colisão, Pontuação e Bônus de Tempo
  useEffect(() => {
    if (gameState !== GAME_STATE.PLAYING) return;

    const playerCenterX = playerPosition.x + PLAYER_SIZE / 2;
    const playerCenterY = playerPosition.y + PLAYER_SIZE / 2;
    const orbCenterX = orbPosition.x + ORB_SIZE / 2;
    const orbCenterY = orbPosition.y + ORB_SIZE / 2;

    const dx = playerCenterX - orbCenterX;
    const dy = playerCenterY - orbCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < (PLAYER_SIZE / 2) + (ORB_SIZE / 2)) {
      setScore(prevScore => prevScore + 1);
      
      // BÔNUS DE TEMPO
      setTimeLeft(prevTime => prevTime + TIME_BONUS);
      
      setOrbPosition(generateRandomPosition());
    }
  }, [playerPosition, gameState]);

  // 4. Lógica do Contador de Tempo (Timer, Game Over e Recorde)
  useEffect(() => {
    if (gameState === GAME_STATE.READY) {
        setTimeLeft(INITIAL_TIME); 
        return;
    }

    if (timeLeft <= 0) {
      // ATUALIZA RECORD
      if (score > highScore) {
        setHighScore(score);
      }
      setGameState(GAME_STATE.GAMEOVER);
      return;
    }

    if (gameState === GAME_STATE.PLAYING) {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }
  }, [timeLeft, gameState, score, highScore]);


  // 5. Renderização das Telas e do Jogo
  const renderGameOverlay = () => {
    if (gameState === GAME_STATE.READY) {
      return (
        <HomeScreen 
          highScore={highScore}
          onStartGame={startGame}
          timeBonus={TIME_BONUS}
        />
      );
    }
    
    if (gameState === GAME_STATE.GAMEOVER) {
      return (
        <GameOver 
          finalScore={score}
          highScore={highScore}
          onPlayAgain={startGame}
          onGoHome={goToHome}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho de Pontuação e Tempo (visível durante o jogo) */}
      <View style={[styles.header, { opacity: gameState === GAME_STATE.PLAYING ? 1 : 0 }]}>
        <Text style={styles.headerText}>Pontos: {score}</Text>
        <Text style={styles.headerText}>Recorde: {highScore}</Text> 
        <Text style={styles.headerText}>Tempo: {timeLeft}s</Text>
      </View>
      
      {/* Instrução (visível durante o jogo) */}
      <Text style={[styles.instructions, { opacity: gameState === GAME_STATE.PLAYING ? 1 : 0 }]}>
          Colete o orbe azul!
      </Text>
      
      {/* Orbe */}
      <View
        style={[
          styles.orb,
          {
            left: orbPosition.x,
            top: orbPosition.y,
            opacity: gameState === GAME_STATE.PLAYING ? 1 : 0.2, 
          },
        ]}
      />
      
      {/* Jogador */}
      <View
        style={[
          styles.player,
          {
            left: playerPosition.x,
            top: playerPosition.y,
          },
        ]}
      />
      
      {/* Renderiza as telas de Início/Fim por cima de tudo */}
      {renderGameOverlay()}
    </View>
  );
}

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructions: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  player: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    borderRadius: PLAYER_SIZE / 2,
    backgroundColor: 'coral',
    borderWidth: 2,
    borderColor: '#fff',
  },
  orb: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    backgroundColor: '#3498db',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
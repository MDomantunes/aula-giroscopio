🎮 Gyro Orb: Um Jogo de Coleta Controlado por Giroscópio
Este é um projeto de jogo arcade simples construído com React Native e Expo, utilizando o sensor de Giroscópio do dispositivo para controlar o movimento do jogador.

Visão Geral do Jogo
O objetivo do jogador (bola coral) é coletar o máximo de orbes azuis possível dentro do limite de tempo de 30 segundos, utilizando a inclinação do dispositivo como controle.

Funcionalidades Chave
Controle por Giroscópio: O movimento da bola coral é diretamente mapeado para a inclinação do seu celular. A sensibilidade foi ajustada para um controle suave (multiplicador de 5).

Sistema de Pontuação: A pontuação é incrementada a cada orbe azul coletado.

Tempo Limite (Game Over): O jogo tem um timer regressivo de 30 segundos. Ao chegar a zero, a tela de Game Over exibe a pontuação final.

Gerenciamento de Estado: Telas de início, jogo ativo e fim de jogo controlam o fluxo e a interação.

Limites de Tela: Tanto o jogador quanto os orbes são garantidos de permanecer dentro das bordas da tela.

Primeiros Passos
Este é um projeto Expo criado com create-expo-app.

1. Instalação de Dependências
Certifique-se de ter o Node.js e o Expo CLI instalados. Em seguida, instale as dependências do projeto:

npm install

2. Rodando o Aplicativo
Para iniciar o servidor de desenvolvimento:

npx expo start

Você pode abrir o aplicativo em:

Expo Go: Use o aplicativo Expo Go no seu celular e escaneie o código QR (Recomendado para testar o Gyroscope).

Emulador/Simulador: Abra o projeto em um Android emulator ou iOS simulator.

3. Começando a Desenvolver
Você pode começar a desenvolver editando os arquivos dentro do diretório app (ou o arquivo principal do jogo que contém a lógica).

Aprenda Mais
Para aprender mais sobre o desenvolvimento do seu projeto com Expo, consulte os seguintes recursos:

Documentação do Expo: Aprenda os fundamentos e tópicos avançados.

Tutorial Learn Expo: Siga um tutorial passo a passo.
# 🎮 Gyro Orb: Um Jogo de Coleta Controlado por Giroscópio

Gyro Orb é um jogo arcade simples e divertido, desenvolvido com **React Native** e **Expo**, que utiliza o **sensor de giroscópio** do dispositivo para controlar o movimento do jogador.  

---

## 📖 Visão Geral
O objetivo do jogador (**bola coral**) é coletar o máximo de **orbes azuis** possível dentro do limite de **30 segundos**, inclinando o celular para se movimentar.  

---

## ✨ Funcionalidades
- 🎛️ **Controle por Giroscópio**: o movimento da bola coral é mapeado diretamente para a inclinação do celular.  
- 🌀 **Sensibilidade ajustada**: controle suave (multiplicador de 5).  
- ⭐ **Sistema de Pontuação**: cada orbe azul coletado aumenta sua pontuação.  
- ⏳ **Tempo Limite**: contador regressivo de 30 segundos (Game Over ao chegar a zero).  
- 📱 **Fluxo de Telas**: início → jogo ativo → fim de jogo, tudo com gerenciamento de estado.  
- 🔒 **Limites de Tela**: jogador e orbes sempre permanecem dentro das bordas da tela.  

---

## 🚀 Primeiros Passos

Este projeto foi criado com **create-expo-app**.  

### 1️⃣ Instalação de Dependências
Certifique-se de ter **Node.js** e o **Expo CLI** instalados. Depois, rode:  
```bash
npm install
2️⃣ Rodando o Aplicativo
Para iniciar o servidor de desenvolvimento:

bash
Copiar código
npx expo start
3️⃣ Executando o Jogo
Você pode abrir o app de duas formas:

📲 Expo Go: abra o app no seu celular e escaneie o QR Code (recomendado para testar o giroscópio).

💻 Emulador/Simulador: rode em um emulador Android ou simulador iOS.

🛠️ Desenvolvimento
Comece a modificar os arquivos dentro da pasta app/ ou o arquivo principal do jogo que contém a lógica.

📷 Demonstração (Opcional)
👉 Adicione aqui um GIF ou imagem mostrando o jogo em funcionamento.

📌 Tecnologias Utilizadas
React Native

Expo

Expo Sensors

👨‍💻 Autor
Feito com ❤️ por Maria Julia Domingues Antunes
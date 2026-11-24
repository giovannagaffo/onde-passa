# OndePassa

Integrantes:
- Giovanna Gaffo - 1670482512009


### 1. Backend
1. Entre na pasta do backend:
   ```bash
   cd backend

Instale as dependências:   
npm install


Crie um arquivo .env a partir do arquivo .env.example, configurando o seu token de acesso da API do TMDB:   
cp .env.example .env


Inicie o servidor do backend:   
npm run dev


2. Aplicativo (Mobile)
Entre na pasta do aplicativo:   
cd mobile

Instale as dependências:   
npm install

Abra o arquivo mobile/src/utils/backendClient.js e ajuste o endereço IP correspondente ao seu computador na rede local para estabelecer a comunicação com o backend.

Inicie o aplicativo com o Expo
npx expo start

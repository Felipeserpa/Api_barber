# 1. Base da imagem Node 22
FROM node:22-alpine

# 2. Cria diretório da aplicação
WORKDIR /app

# 3. Copia arquivos de dependências
COPY package*.json ./

# 4. Instala dependências
RUN npm install

# 5. Copia todo o código
COPY . .

# 6. Build TypeScript
RUN npm run build

# 7. Expõe porta 3333
EXPOSE 3333

# 8. Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]

# Estágio 1: Build da Aplicação React
# Usamos uma imagem Node para ter acesso ao npm e construir nosso projeto
FROM node:18 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o container
COPY package*.json ./

# Instala todas as dependências do projeto
RUN npm install

# Copia todo o resto do código-fonte do projeto para o container
COPY . .

# Executa o comando de build para gerar os arquivos estáticos
RUN npm run build

# Estágio 2: Servidor de Produção
# Usamos uma imagem Nginx super leve para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio de build para a pasta do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# O comando para iniciar o servidor Nginx quando o container for executado
CMD ["nginx", "-g", "daemon off;"]
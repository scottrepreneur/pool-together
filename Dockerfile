FROM node

WORKDIR /app
COPY package.json /app

RUN npm install

EXPOSE 3000
CMD ["yarn", "start"]
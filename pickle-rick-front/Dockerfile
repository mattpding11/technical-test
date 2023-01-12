FROM node:18.13.0

RUN mkdir -p /usr/src/app_front

WORKDIR /usr/src/app_front

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .

EXPOSE 5173 

CMD ["npm", "start"]
    
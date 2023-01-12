FROM node:18.13.0

RUN mkdir -p /usr/src/app_back

WORKDIR /usr/src/app_back

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .

EXPOSE 3000 

CMD ["npm", "start"]
    
FROM node:22-alpine
VOLUME /public
WORKDIR /srv/dangerous
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
ENTRYPOINT ["node", "./bin/dangerous"]

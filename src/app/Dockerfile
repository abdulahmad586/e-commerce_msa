FROM node:19.0-alpine
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]
COPY src ./src
COPY www ./www
EXPOSE 3000
CMD ["npm", "start"]
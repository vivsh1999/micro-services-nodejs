# Set the base image to Node
FROM node:lts-alpine

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
RUN npm install

# Define working directory
WORKDIR /src
ADD . /src

# Run app using pm2
CMD ["npm", "start"]

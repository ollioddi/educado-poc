FROM node:22-alpine
# Installing libvips-dev for sharp Compatibility
ARG UID=1000
ARG GID=1000

RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

RUN addgroup -g ${GID} strapi && adduser -u ${UID} -G strapi -s /bin/sh -D strapi

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R strapi:strapi /opt/app
USER strapi
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]

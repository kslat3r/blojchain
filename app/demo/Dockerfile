FROM node:alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN set -ex; \
  npm install --production; \
  mkdir /usr/src/app/build; \
  npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=0 /usr/src/app/build/ /usr/share/nginx/html
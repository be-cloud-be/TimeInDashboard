FROM node:8-alpine as builder

COPY package.json package-lock.json ./

RUN npm install npm@latest -g

RUN npm install -g @angular/cli

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && ng build --prod \ 
    && apk del .gyp

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

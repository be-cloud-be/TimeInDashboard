<<<<<<< HEAD
# Stage 0, based on Node.js, to build and compile Angular
FROM node:8.6 as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build -- --prod --environment $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
=======
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
>>>>>>> baffa67eead67cef4c2b0a485cffa89ad98d3a53

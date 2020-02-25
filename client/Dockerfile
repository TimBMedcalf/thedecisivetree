FROM node:alpine as build-deps
WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /client/build /client/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ngnix/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  
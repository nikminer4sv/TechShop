# Stage 1
FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm install
RUN npm run build


# Stage 2
FROM nginx:latest
COPY --from=build /usr/local/app/dist/tech-shop /usr/share/nginx/html

EXPOSE 80
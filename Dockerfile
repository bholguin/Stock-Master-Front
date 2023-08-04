FROM node:18.7.0-alpine3.16 AS build

# Set up environment
ENV PATH /app/node_modules/.bin:$PATH
ENV GENERATE_SOURCEMAP false
WORKDIR /app

ENV REACT_APP_API_URL=http://stock-master-backend.azurewebsites.net/

# Prepare souces for build
COPY src ./src
COPY tsconfig.json ./
COPY public ./public
COPY package.json ./
COPY package-lock.json ./
# Install dependencies
RUN npm ci
# Build the application
RUN npm run build

FROM node:18.7.0-alpine3.16 AS release
LABEL Maintainer="QuickConnect - Volante Technologies"
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install --global serve
CMD serve -s build

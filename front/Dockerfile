FROM arm64v8/node:18.18.2-buster-slim

WORKDIR /app

COPY . ./

RUN npm install --legacy-peer-deps
RUN npm run build

CMD ["npm", "run", "dev"]
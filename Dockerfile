FROM node:20
RUN apt-get install openssl -y
RUN npm install -g pnpm
RUN mkdir -p /home/app
COPY . /home/app/
WORKDIR /home/app
RUN pnpm install
EXPOSE 3000
CMD ["pnpm", "run", "dev"]

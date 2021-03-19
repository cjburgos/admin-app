FROM node:dubnium

RUN apt-get update && \
    apt-get install -y jq

RUN mkdir -p /app

WORKDIR /app

COPY . /app/

RUN npm install --unsafe-perm

EXPOSE 8020

CMD ["npm","start"]
FROM onfinality/subql-node:v0.34.1-3

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --ignore-scripts

COPY . .
RUN yarn && \ 
  yarn codegen && \
  yarn build

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/lib/node_modules/@subql/node/bin/run"]
CMD ["-f","/app"]

FROM loadimpact/k6 as k6
FROM cypress/browsers:node12.14.1-chrome83-ff77

COPY --from=k6 /usr/bin/k6 /usr/bin/k6

RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && apt-get update && apt-get install -y \
      postgresql-client && \
      rm -rf /var/lib/apt/lists/*

#Bundle app source
ADD . /home/node/app

WORKDIR /home/node/app

# install dependencies
RUN yarn config set registry https://registry.npmjs.com/ && \
    yarn --frozen-lockfile && \
    $(yarn bin)/cypress verify

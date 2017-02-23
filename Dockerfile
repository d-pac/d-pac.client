FROM mhart/alpine-node:6.5.0
MAINTAINER Camille Reynders

RUN apk upgrade libssl1.0 --update-cache \
    && apk add --no-cache --virtual .build-deps ca-certificates git

# add group "dpac"
# add user "dpac" with (-s) bash as a login shell, (-G) add it to an existing group "dpac" and (-D) without password
#RUN addgroup dpac \
#    && adduser dpac -s /bin/bash -G dpac -D
#USER dpac

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

ADD bower.json /tmp/bower.json
RUN cd /tmp && ./node_modules/.bin/bower install --allow-root

RUN mkdir -p /home/dpac && mv /tmp/node_modules /home/dpac/ && mv /tmp/bower_components /home/dpac
RUN mv /tmp/package.json /home/dpac/package.json && mv /tmp/bower.json /home/dpac/bower.json

ADD webpack.config.js /home/dpac/webpack.config.js

WORKDIR /home/dpac

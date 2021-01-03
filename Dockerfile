FROM mhart/alpine-node:14.5

# Maintainer
LABEL maintainer="myWorkBench <suren@jsworkbench.com>"

RUN apk update && apk add nginx supervisor

# Override Nginx's default config
RUN mkdir -p /run/nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

COPY supervisord.conf /etc/supervisord.conf

# Copy all the required files
WORKDIR /usr/src/app
COPY . /usr/src/app/

EXPOSE 80 3000 9001

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

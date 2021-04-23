FROM alpine:3.13.5 as builder

RUN apk add zip

WORKDIR /app

CMD ["/bin/sh"]

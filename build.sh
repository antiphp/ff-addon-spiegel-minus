#!/bin/sh

dir=$(cd "$(dirname $0)" && pwd)

DOCKER=${DOCKER:-sudo docker}
IMAGE=${IMAGE:-antiphp/ff-addon-spiegel-minus}
CONTAINER=${CONTAINER:-ff-addon-spiegel-minus}
ARCHIVE=${ARCHIVE:-minus.zip}

rm $ARCHIVE

$DOCKER build -f $dir/build.dockerfile -t $IMAGE $dir
$DOCKER run --name=$CONTAINER --rm -v $dir:/app:z --user "$(id -u):$(id -g)" $IMAGE zip -r $ARCHIVE LICENSE manifest.json minus.js minus.png
$DOCKER rmi -f $IMAGE

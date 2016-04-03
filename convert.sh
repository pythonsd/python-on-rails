#!/bin/bash

pushd assets/photos
for i in *.jpg; do
    if [ "$i" -nt "../thumbs/$i" ]; then
        convert "$i" -thumbnail 400 "../thumbs/$i";
    fi
done;
popd

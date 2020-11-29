#!/bin/bash

helm upgrade --install blojchain-demo -f blojchain-demo/values.yaml --set image.tag=$CIRCLE_SHA1 blojchain-demo


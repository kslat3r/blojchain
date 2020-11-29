#!/bin/bash

helm upgrade --install blojchain-node-a -f blojchain-node-a/values.yaml --set image.tag=$CIRCLE_SHA1 blojchain-node
helm upgrade --install blojchain-node-b -f blojchain-node-b/values.yaml --set image.tag=$CIRCLE_SHA1 blojchain-node
helm upgrade --install blojchain-node-c -f blojchain-node-c/values.yaml --set image.tag=$CIRCLE_SHA1 blojchain-node

#!/bin/bash

helm upgrade --install blojchain-generator -f blojchain-generator/values.yaml --set image.tag=$CIRCLE_SHA1 blojchain-generator


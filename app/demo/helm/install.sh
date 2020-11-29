#!/bin/bash

helm upgrade --install blojchain-demo --set image.tag=$CIRCLE_SHA1 blojchain-demo


#!/bin/bash

helm upgrade --install blojchain-node-a -f blojchain-node-a/values.yaml blojchain-node
helm upgrade --install blojchain-node-b -f blojchain-node-b/values.yaml blojchain-node
helm upgrade --install blojchain-node-c -f blojchain-node-c/values.yaml blojchain-node
helm upgrade --install blojchain-node-d -f blojchain-node-d/values.yaml blojchain-node

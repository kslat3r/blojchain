#!/usr/bin/env bash

source ./helpers/install-terraform.sh
source ../helpers/check-credentials.sh

terraform init
terraform apply
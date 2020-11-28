#!/usr/bin/env bash

TF_VERSION="0.11.14"
TF_INSTALLER="https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_darwin_amd64.zip"

terraform version &> /dev/null || {
    pushd /tmp
    curl -sSLfO "${TF_INSTALLER}"
    unzip terraform_${TF_VERSION}_darwin_amd64.zip -d /usr/local/bin
    popd
}
#!/bin/bash

source /scripts/common.sh
source /scripts/bootstrap-helm.sh


run_tests() {
    echo Running tests...

    wait_pod_ready polkadot-subql
}

teardown() {
    helm delete polkadot-subql
}

main(){
    if [ -z "$KEEP_W3F_POLKADOT_SUBQL" ]; then
        trap teardown EXIT
    fi

    /scripts/build-helm.sh \
        --set environment=ci \
        --set image.tag="${CIRCLE_SHA1}" \
        polkadot-subql \
        ./charts/polkadot-subql

    run_tests
}

main

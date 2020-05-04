#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}"/../android || exit

if [[ "${MYAPP_RELEASE_STORE_FILE}" == "" ]]; then
  echo "Missing MYAPP_RELEASE_STORE_FILE"
  exit 1
fi

echo -n "Enter keystore password: "; stty -echo; read password; stty echo; echo
export MYAPP_RELEASE_STORE_PASSWORD=${password}
password=

export MYAPP_RELEASE_KEY_ALIAS=upload

./gradlew assembleRelease

cp android/app/build/outputs/apk/release/app-release.apk edu.rise.ihnilatis.apk

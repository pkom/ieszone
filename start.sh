#!/bin/bash
set -e
set -x
if [ "$RUN_MIGRATIONS" ]; then
  echo "RUNNING MIGRATIONS";
  yarn run typeorm:migration:run
fi
echo "START SERVER";
yarn run start:prod
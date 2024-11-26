#!/bin/bash

if [ ! -d "node_module" ]; then
  npm install
fi

exec "$@"

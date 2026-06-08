#!/bin/bash
cd /home/z/my-project
while true; do
  node node_modules/.bin/next dev -p 3000 -H 0.0.0.0 2>&1
  echo "[restart] $(date)" >&2
  sleep 2
done

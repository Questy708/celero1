#!/bin/bash
cd /home/z/my-project
while true; do
  rm -f dev.log
  npx next dev -p 3000 > dev.log 2>&1
  echo "[$(date)] Next.js exited, restarting in 3s..." >> dev.log
  sleep 3
done

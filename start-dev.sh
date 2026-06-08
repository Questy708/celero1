#!/bin/bash
cd /home/z/my-project
while true; do
  rm -rf .next 2>/dev/null
  node node_modules/.bin/next dev -p 3000 2>&1 | tee /home/z/my-project/dev.log
  echo "[watchdog] Server exited at $(date), restarting in 2s..."
  sleep 2
done

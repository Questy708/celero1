#!/bin/bash
cd /home/z/my-project
while true; do
  node node_modules/.bin/next dev -p 3000 -H 0.0.0.0 2>&1
  echo "[watchdog] Server exited at $(date), restarting in 3s..."
  sleep 3
done

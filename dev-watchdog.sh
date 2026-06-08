#!/bin/bash
cd /home/z/my-project
FIRST_RUN=1
while true; do
  if [ "$FIRST_RUN" = "1" ]; then
    rm -rf .next 2>/dev/null
    FIRST_RUN=0
  fi
  node node_modules/.bin/next dev -p 3000 2>&1 >> /home/z/my-project/dev.log
  echo "[watchdog] Restarting at $(date)" >> /home/z/my-project/dev.log
  sleep 2
done

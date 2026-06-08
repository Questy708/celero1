#!/bin/bash
while true; do
  cd /home/z/my-project
  bun run dev 2>&1 | tee -a /home/z/my-project/dev.log
  echo "Server crashed at $(date), restarting in 3s..." >> /home/z/my-project/dev.log
  sleep 3
done

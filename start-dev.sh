#!/bin/bash
cd /home/z/my-project
rm -f dev.log
exec npx next dev -p 3000 > dev.log 2>&1

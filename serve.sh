#!/bin/bash
nvm install 22.11.0
nvm use 22.11.0
npm run build
npm install -g serve
sudo serve -s build -l 80


#!/bin/bash

echo "Switching to master branch"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
sshpass -p 'NyyCANwrAag8' scp -r ./build/* ubuntu@15.235.211.74:/var/www/facebook.com/

echo "Done!!!"

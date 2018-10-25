#!/bin/bash
#set -x #echo on

# INSTRUCTIONS how to auto deploy UI
# 1. clone UI project into home directory ~/
# 2. place this script in ~/
# 3. run chmod 777 publish_ui_script.sh
# 4. run ./publish_ui_script.sh


echo "INFO - deleting old app: FileHubFrontend"
rm -rf /var/www/FileHub

echo "INFO - moving into directory: /FileHubFrontend"
cd ~/FileHubFrontend

echo "INFO - pulling latest changes"
git pull

echo "INFO - publishing app: FileHubFrontend"
ng build --prod

echo "INFO - copying new app to be served: FileHubFrontend"
sudo cp -a ~/FileHubFrontend/dist/FileHub/ /var/www/

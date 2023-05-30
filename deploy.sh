#!/bin/bash
UI=/home/ubuntu/video-app/josh-meet-ui
cd ${UI}
npm i && npm run build
sudo cp -r build/* /var/www/html/ 
sudo systemctl restart nginx
cd -
